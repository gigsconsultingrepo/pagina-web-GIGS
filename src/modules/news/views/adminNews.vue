<script setup>
import { ref, computed, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { auth, db } from '@/firebase'
import { addDoc, collection, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { getApiUrl } from '@/services/api-service'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'

const route = useRoute()
const router = useRouter()

const editId = route.query.editId || null

const title = ref('')
const slug = ref('')
const excerpt = ref('')
const tagsCsv = ref('')
const status = ref('draft')
const coverFile = ref(null)
const apoyoFile = ref(null)
const coverPreview = ref('')
const apoyoPreview = ref('')
const coverUrl = ref('')
const img_one = ref('')
const img_two = ref('')
const img_one_id = ref('')
const img_two_id = ref('')
const saving = ref(false)
const message = ref('')
const messageType = ref('success')
const valid = ref(false)
const formRef = ref(null)

const rules = {
	required: v => (!!v && String(v).trim().length > 0) || 'Este campo es obligatorio',
	slug: v => {
		if (!v) return true // Si está vacío, required se encargará
		return (/^[a-z0-9-]+$/.test(v)) || 'Usa solo minúsculas, números y guiones'
	},
	minLength: (min) => v => {
		if (!v) return true
		return (String(v).trim().length >= min) || `Mínimo ${min} caracteres`
	},
	maxLength: (max) => v => {
		if (!v) return true
		return (String(v).trim().length <= max) || `Máximo ${max} caracteres`
	},
	excerptMax: v => {
		if (!v) return true
		return (String(v).trim().length <= 300) || 'El resumen no debe exceder 300 caracteres'
	}
}

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit.configure({ 
      heading: { levels: [1,2,3] },
      link: false // Excluir Link de StarterKit para evitar duplicado
    }),
    TextStyle,
    Color,
    Underline,
    Link.configure({ openOnClick: true, autolink: true, linkOnPaste: true, HTMLAttributes: { rel: 'noopener', target: '_blank' } }),
    Image.configure({ inline: false, allowBase64: true }),
    TextAlign.configure({ types: ['heading','paragraph'] })
  ],
  editorProps: { attributes: { class: 'prose-area' } }
})
onBeforeUnmount(() => editor?.value?.destroy?.())

const autoSlug = () => {
  if (!title.value || slug.value) return
  slug.value = String(title.value)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'')
}

const fileToPreview = (file, tgtRef) => {
  if (!file) return (tgtRef.value = '')
  const reader = new FileReader()
  reader.onload = e => tgtRef.value = e.target.result
  reader.readAsDataURL(file)
}

const onCover = (files) => {
  const f = Array.isArray(files) ? files[0] : files
  coverFile.value = f || null
  if (coverFile.value) {
    fileToPreview(coverFile.value, coverPreview)
  } else {
    // Si se limpia el archivo, restaurar la imagen existente si estamos editando
    coverPreview.value = editId && (coverUrl.value || img_one.value) ? (coverUrl.value || img_one.value) : ''
  }
}
const onApoyo = (files) => {
  const f = Array.isArray(files) ? files[0] : files
  apoyoFile.value = f || null
  if (apoyoFile.value) {
    fileToPreview(apoyoFile.value, apoyoPreview)
  } else {
    // Si se limpia el archivo, restaurar la imagen existente si estamos editando
    apoyoPreview.value = editId && img_two.value ? img_two.value : ''
  }
}

const signUpload = async ({ folder, publicId }) => {
  try {
    const { data } = await axios.post(getApiUrl('/api/media/sign'), {
      folder,
      public_id: publicId
    })
    return data
  } catch (error) {
    console.error('Error al obtener firma de Cloudinary:', error)
    throw new Error('Error al conectar con el servidor de imágenes. Verifica que el backend esté corriendo y configurado correctamente.')
  }
}

const deleteInCloudinary = async (public_id) => {
  if (!public_id) return
  try {
    await axios.delete(getApiUrl('/api/media'), { params: { public_id } })
  } catch (e) {
    // No lanzamos error para no interrumpir el proceso
    console.warn('No se pudo borrar imagen en Cloudinary:', public_id, e?.response?.data || e.message)
  }
}

const uploadToCloudinarySigned = async (file, publicId) => {
  if (!file) return { url: '', id: '' }
  try {
    // El publicId que recibimos es solo el nombre (sin folder)
    // NO incluir el folder en el public_id, lo enviaremos por separado
    const publicIdClean = publicId.replace(/^blog\//, '') // Remover 'blog/' si ya lo tiene
    
    // Enviar folder y public_id (sin folder) al backend
    // El backend generará la firma con folder por separado
    const sign = await signUpload({ folder: 'blog', publicId: publicIdClean })
    
    if (!sign.cloudName || !sign.apiKey || !sign.signature) {
      throw new Error('Credenciales de Cloudinary no configuradas. Verifica el archivo .env')
    }
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', sign.apiKey)
    formData.append('timestamp', sign.timestamp)
    formData.append('signature', sign.signature)
    if (sign.uploadPreset) formData.append('upload_preset', sign.uploadPreset)
    
    // CRÍTICO: Usar el public_id sin folder (solo el nombre)
    // El folder se envía por separado para que tenga prioridad sobre el folder del preset
    const publicIdToUse = sign.public_id || publicIdClean
    // Asegurar que el public_id NO incluya el folder (solo el nombre)
    const finalPublicIdForFormData = publicIdToUse.replace(/^blog\//, '')
    formData.append('public_id', finalPublicIdForFormData)
    // Enviar el folder por separado - esto sobrescribirá el folder del upload preset
    formData.append('folder', 'blog')
    // Forzar que Cloudinary use el public_id exacto que proporcionamos (sin modificar)
    formData.append('use_filename', 'false')
    formData.append('unique_filename', 'false')
    
    const endpoint = `https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`
    const { data } = await axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    
    // Cloudinary devuelve el public_id que puede incluir el folder
    // Si el folder se especificó por separado, Cloudinary puede devolver solo el nombre
    let cloudinaryPublicId = data.public_id || ''
    // Si el public_id no incluye el folder, agregarlo para mantener consistencia
    if (cloudinaryPublicId && !cloudinaryPublicId.includes('/')) {
      // Intentar extraer el public_id completo de la URL
      const urlPublicId = publicIdFromUrl(data.secure_url)
      if (urlPublicId && urlPublicId.includes('/')) {
        cloudinaryPublicId = urlPublicId
      } else {
        // Si no se puede extraer de la URL, construir el public_id con el folder
        cloudinaryPublicId = `blog/${cloudinaryPublicId}`
      }
    }
    
    return { url: data.secure_url, id: cloudinaryPublicId }
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error)
    const errorMessage = error.response?.data?.error?.message || error.message || 'Error desconocido'
    throw new Error(`Error al subir imagen: ${errorMessage}`)
  }
}

const publicIdFromUrl = (url) => {
  try {
    if (!url) return ''
    const u = new URL(url)
    const parts = u.pathname.split('/')
    const uploadIdx = parts.findIndex(p => p === 'upload')
    if (uploadIdx === -1) return ''
    
    // Obtener todo después de 'upload'
    const after = parts.slice(uploadIdx + 1)
    
    // Remover la versión si existe (ej: 'v1234567890')
    const noVersion = after[0]?.startsWith('v') && /^v\d+$/.test(after[0]) 
      ? after.slice(1) 
      : after
    
    // Unir las partes (esto incluye el folder si existe, ej: 'blog/nombre-imagen')
    const joined = noVersion.join('/')
    
    // Remover la extensión del archivo
    const noExt = joined.replace(/\.[a-z0-9]+$/i, '')
    
    return noExt
  } catch (error) {
    console.warn('Error al extraer public_id de URL:', url, error)
    return ''
  }
}

const loadData = async () => {
  if (!editId) return
  const d = await getDoc(doc(db, 'news', editId))
  if (!d.exists()) return
  const data = d.data()
  title.value = data.title || ''
  slug.value = data.slug || ''
  excerpt.value = data.excerpt || ''
  tagsCsv.value = (data.tags || []).join(', ')
  status.value = data.status || 'draft'
  
  // Cargar imágenes - priorizar img_one sobre coverUrl
  img_one.value = data.img_one || ''
  coverUrl.value = data.img_one || data.coverUrl || ''
  img_two.value = data.img_two || ''
  img_one_id.value = data.img_one_id || ''
  img_two_id.value = data.img_two_id || ''
  
  editor.value?.commands?.setContent?.(data.content || '')
  
  // Usar nextTick para asegurar que los cambios se reflejen en el template
  await nextTick()
  
  // Mostrar las imágenes existentes en el preview cuando se está editando
  // Esto asegura que las imágenes se muestren inmediatamente al cargar
  const portadaUrl = img_one.value || coverUrl.value || ''
  const apoyoUrl = img_two.value || ''
  
  if (portadaUrl) {
    coverPreview.value = portadaUrl
  }
  if (apoyoUrl) {
    apoyoPreview.value = apoyoUrl
  }
  
  // Limpiar archivos seleccionados al cargar datos existentes
  coverFile.value = null
  apoyoFile.value = null
}

const savePost = async (forceStatus = null) => {
  const isValid = await formRef.value?.validate()
  if (!isValid?.valid) return

  const html = editor.value?.getHTML() || ''
  saving.value = true
  message.value = ''
  try {
    // Mantener las URLs existentes si no hay archivos nuevos
    let portada = { url: coverUrl.value || img_one.value || '', id: img_one_id.value || '' }
    let apoyo = { url: img_two.value || '', id: img_two_id.value || '' }

    // Guardar los image_id antiguos para eliminarlos si hay nuevas imágenes
    const oldPortadaId = editId && coverFile.value && img_one_id.value ? img_one_id.value : ''
    const oldApoyoId = editId && apoyoFile.value && img_two_id.value ? img_two_id.value : ''

    // Solo subir si hay archivos nuevos
    // Generar publicId único basado en el slug
    const baseSlug = slug.value || title.value || 'draft'
    const slugClean = String(baseSlug)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/(^-|-$)/g,'')
    
    try {
      if (coverFile.value) {
        // Si estamos editando y hay una imagen antigua, eliminarla primero de Cloudinary
        if (oldPortadaId) {
          try {
            await deleteInCloudinary(oldPortadaId)
            console.log('Imagen de portada antigua eliminada de Cloudinary:', oldPortadaId)
          } catch (deleteError) {
            // No interrumpir el proceso si falla la eliminación, solo registrar el error
            console.warn('No se pudo eliminar la imagen de portada antigua de Cloudinary:', deleteError)
          }
        }
        
        const portadaPublicId = `${slugClean}-portada`
        portada = await uploadToCloudinarySigned(coverFile.value, portadaPublicId)
      }
    } catch (imageError) {
      console.warn('Error al subir imagen de portada:', imageError)
      // Continuar sin la imagen nueva, usar la existente
      message.value = `Advertencia: No se pudo subir la imagen de portada. ${imageError.message}`
      messageType.value = 'warning'
    }

    try {
      if (apoyoFile.value) {
        // Si estamos editando y hay una imagen antigua, eliminarla primero de Cloudinary
        if (oldApoyoId) {
          try {
            await deleteInCloudinary(oldApoyoId)
            console.log('Imagen de apoyo antigua eliminada de Cloudinary:', oldApoyoId)
          } catch (deleteError) {
            // No interrumpir el proceso si falla la eliminación, solo registrar el error
            console.warn('No se pudo eliminar la imagen de apoyo antigua de Cloudinary:', deleteError)
          }
        }
        
        const apoyoPublicId = `${slugClean}-apoyo`
        apoyo = await uploadToCloudinarySigned(apoyoFile.value, apoyoPublicId)
      }
    } catch (imageError) {
      console.warn('Error al subir imagen de apoyo:', imageError)
      // Continuar sin la imagen nueva, usar la existente
      if (message.value) {
        message.value += ` No se pudo subir la imagen de apoyo.`
      } else {
        message.value = `Advertencia: No se pudo subir la imagen de apoyo. ${imageError.message}`
        messageType.value = 'warning'
      }
    }

    const user = auth.currentUser
    const tagsArr = tagsCsv.value.split(',').map(t => t.trim()).filter(Boolean)

    const finalStatus = forceStatus ?? status.value
    
    const payload = {
      title: title.value,
      slug: slug.value.trim(),
      excerpt: excerpt.value,
      content: html,
      tags: tagsArr,
      status: finalStatus,
      img_one: portada.url || '',
      img_two: apoyo.url || '',
      coverUrl: portada.url || (img_one.value || ''),
      img_one_id: portada.id || img_one_id.value || '',
      img_two_id: apoyo.id || img_two_id.value || '',
      author: user?.email || null,
      updatedAt: serverTimestamp()
    }

    // Si estamos editando, verificar si ya tenía publishedAt
    if (editId) {
      const docSnap = await getDoc(doc(db, 'news', editId))
      if (docSnap.exists()) {
        const previousData = docSnap.data()
        // Si el estado final es 'published' y no tenía publishedAt, agregarlo
        if (finalStatus === 'published') {
          if (!previousData.publishedAt) {
            // Primera vez que se publica, agregar publishedAt
            payload.publishedAt = serverTimestamp()
          }
        }
      } else {
        // Si por alguna razón no existe el doc, agregar publishedAt si se publica
        if (finalStatus === 'published') {
          payload.publishedAt = serverTimestamp()
        }
      }
      await updateDoc(doc(db, 'news', editId), payload)
    } else {
      // Nueva noticia: si se publica, agregar publishedAt
      if (finalStatus === 'published') {
        payload.publishedAt = serverTimestamp()
      }
      await addDoc(collection(db, 'news'), {
        ...payload,
        createdAt: serverTimestamp()
      })
    }

    messageType.value = 'success'
    message.value = `Noticia guardada correctamente como "${finalStatus === 'published' ? 'Publicada' : 'Borrador'}"`
    
    // Redirigir después de un pequeño delay para que el usuario vea el mensaje
    setTimeout(() => {
      router.push('/admin/noticias-lista')
    }, 1500)
  } catch (e) {
    console.error('Error guardando la noticia:', e)
    messageType.value = 'error'
    const errorMessage = e?.message || e?.code || 'Error desconocido'
    message.value = `Error guardando la noticia: ${errorMessage}`
  } finally {
    saving.value = false
  }
}

onMounted(loadData)

/* ---------- Toolbar Pro ---------- */
const linkDialog = ref(false)
const linkUrl = ref('')
const colorMenu = ref(false)
const colorValue = ref('#0d6efd')

const wordCount = computed(() => {
  const text = editor.value?.state?.doc?.textBetween(
    0, editor.value.state.doc.content.size, ' '
  ) || ''
  return text.trim().split(/\s+/).filter(Boolean).length
})

const openLinkDialog = () => {
  linkUrl.value = editor.value?.getAttributes('link')?.href || ''
  linkDialog.value = true
}

const applyLink = () => {
  if (!linkUrl.value) return (linkDialog.value = false)
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.value }).run()
  linkDialog.value = false
}

const removeLink = () => {
  editor.value?.chain().focus().unsetLink().run()
  linkDialog.value = false
}

const insertInlineImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    const baseSlug = slug.value || title.value || 'draft'
    const slugClean = String(baseSlug)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/(^-|-$)/g,'')
    const inlinePublicId = `${slugClean}-inline-${Date.now()}`
    const { url } = await uploadToCloudinarySigned(file, inlinePublicId)
    const tUrl = url.replace('/upload/', '/upload/f_auto,q_auto,w_1200/')
    editor.value?.chain().focus().setImage({ src: tUrl, alt: '' }).run()
  }
  input.click()
}

const applyColor = (hex) => {
  editor.value?.chain().focus().setColor(hex).run()
  colorMenu.value = false
}

const btnPrimary = computed(() => ({
  background: 'var(--color-primary)',
  color: 'var(--vt-c-white)',
}))
</script>

<template>
  <v-container max-width="900" class="py-8">
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h5" style="color: var(--color-heading)">Panel — Noticias</h1>
      <v-btn variant="text" style="color: var(--color-primary)" @click="$router.push('/')">Volver</v-btn>
    </div>

    <v-card elevation="2" class="pa-6" style="background: var(--color-background-soft); border:1px solid var(--color-border);">
      <v-form ref="formRef" v-model="valid">
        <div class="d-grid" style="gap:16px;">
          <v-text-field 
            v-model="title" 
            label="Título" 
            :rules="[rules.required, rules.minLength(5), rules.maxLength(200)]" 
            variant="outlined"
            density="comfortable" 
            @blur="autoSlug" 
          />
          <v-text-field 
            v-model="slug" 
            label="Slug (ej. lanzamiento-gigs)" 
            :rules="[rules.required, rules.slug, rules.minLength(3), rules.maxLength(100)]"
            variant="outlined" 
            density="comfortable" 
            hint="Solo minúsculas, números y guiones" 
            persistent-hint 
          />
          <v-text-field 
            v-model="excerpt" 
            label="Resumen corto" 
            :rules="[rules.required, rules.minLength(10), rules.excerptMax]" 
            variant="outlined"
            density="comfortable" 
          />
          <v-text-field v-model="tagsCsv" label="Tags separadas por coma (ej. Tecnología,Seguridad)" variant="outlined"
            density="comfortable" hint="Se guardan como array" persistent-hint />

        <!-- TOOLBAR PRO -->
        <v-toolbar density="comfortable" rounded="lg" class="mb-3" :elevation="1"
          style="border:1px solid var(--color-border); background: var(--vt-c-white);">
          <!-- Tipografía -->
          <div class="toolbar-group">
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('bold') }"
              @click="editor?.chain().focus().toggleBold().run()" icon="mdi-format-bold" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('italic') }"
              @click="editor?.chain().focus().toggleItalic().run()" icon="mdi-format-italic" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('underline') }"
              @click="editor?.chain().focus().toggleUnderline().run()" icon="mdi-format-underline" />
            <v-divider vertical class="mx-1" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }"
              @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()">H1</v-btn>
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }"
              @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()">H2</v-btn>
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }"
              @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()">H3</v-btn>
          </div>

          <v-spacer />

          <!-- Listas / Alineación -->
          <div class="toolbar-group">
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('bulletList') }"
              @click="editor?.chain().focus().toggleBulletList().run()" icon="mdi-format-list-bulleted" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('orderedList') }"
              @click="editor?.chain().focus().toggleOrderedList().run()" icon="mdi-format-list-numbered" />
            <v-divider vertical class="mx-1" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }"
              @click="editor?.chain().focus().setTextAlign('left').run()" icon="mdi-format-align-left" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }"
              @click="editor?.chain().focus().setTextAlign('center').run()" icon="mdi-format-align-center" />
            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }"
              @click="editor?.chain().focus().setTextAlign('right').run()" icon="mdi-format-align-right" />
          </div>

          <v-spacer />

          <!-- Colores / vínculos / imagen / undo/redo -->
          <div class="toolbar-group">
            <v-menu v-model="colorMenu" :close-on-content-click="false" location="bottom">
              <template #activator="{ props }">
                <v-btn v-bind="props" size="small" variant="text" icon>
                  <span class="color-dot" :style="{ background: colorValue }"></span>
                </v-btn>
              </template>
              <v-color-picker v-model="colorValue" hide-inputs show-swatches @update:modelValue="applyColor" />
            </v-menu>

            <v-btn size="small" variant="text" :class="{ 'is-active': editor?.isActive('link') }"
              @click="openLinkDialog" icon="mdi-link-variant" />

            <v-btn size="small" variant="text" icon="mdi-image" @click="insertInlineImage" />

            <v-divider vertical class="mx-1" />

            <v-btn size="small" variant="text" icon="mdi-undo" :disabled="!editor?.can().undo()"
              @click="editor?.chain().focus().undo().run()" />
            <v-btn size="small" variant="text" icon="mdi-redo" :disabled="!editor?.can().redo()"
              @click="editor?.chain().focus().redo().run()" />
            <v-btn size="small" variant="text" icon="mdi-format-clear"
              @click="editor?.chain().focus().unsetAllMarks().clearNodes().run()" />
          </div>
        </v-toolbar>

        <v-sheet class="pa-4 rounded editor-surface" style="border:1px solid var(--color-border); background: var(--vt-c-white);">
          <EditorContent :editor="editor" />
        </v-sheet>

        <div class="d-flex align-center justify-space-between mt-2">
          <div class="text-caption" style="color: var(--vt-c-text-light-2)">{{ wordCount }} palabras</div>
          <v-chip size="small" variant="flat" style="background: var(--color-background-soft)">Estado: {{ status }}</v-chip>
        </div>

        <div class="d-flex flex-column" style="gap:8px;">
          <v-file-input 
            label="Portada (img_one)" 
            accept="image/*" 
            variant="outlined" 
            density="comfortable" 
            @update:model-value="onCover" 
            prepend-icon="mdi-image" 
            :clearable="true"
            hint="Selecciona una nueva imagen para reemplazar la actual"
            persistent-hint
          />
          <v-img 
            v-if="coverPreview || img_one || coverUrl" 
            :src="coverPreview || img_one || coverUrl" 
            alt="Portada" 
            class="rounded" 
            height="200" 
            cover 
            style="border:1px solid var(--color-border); background: var(--vt-c-white);" 
          />
          <v-alert v-if="editId && !coverPreview && !img_one && !coverUrl" type="info" variant="tonal" density="compact">
            No hay imagen de portada. Selecciona una imagen para agregarla.
          </v-alert>
        </div>

        <div class="d-flex flex-column" style="gap:8px;">
          <v-file-input 
            label="Imagen de apoyo (img_two)" 
            accept="image/*" 
            variant="outlined" 
            density="comfortable" 
            @update:model-value="onApoyo" 
            prepend-icon="mdi-image-multiple" 
            :clearable="true"
            hint="Selecciona una nueva imagen para reemplazar la actual"
            persistent-hint
          />
          <v-img 
            v-if="apoyoPreview || img_two" 
            :src="apoyoPreview || img_two" 
            alt="Apoyo" 
            class="rounded" 
            height="200" 
            cover 
            style="border:1px solid var(--color-border); background: var(--vt-c-white);" 
          />
          <v-alert v-if="editId && !apoyoPreview && !img_two" type="info" variant="tonal" density="compact">
            No hay imagen de apoyo. Selecciona una imagen para agregarla.
          </v-alert>
        </div>

        <v-select v-model="status" label="Estado" :items="[{ title:'Publicado', value:'published' }, { title:'Borrador', value:'draft' }]" variant="outlined" style="max-width:240px;" />

        <div class="d-flex flex-wrap align-center" style="gap:12px;">
          <v-spacer />
          <v-btn variant="outlined" :loading="saving" :disabled="saving" @click="savePost('draft')">Guardar como borrador</v-btn>
          <v-btn :loading="saving" :disabled="saving" class="btn-primary" :style="btnPrimary"
            @click="savePost('published')">
            Publicar
          </v-btn>
        </div>

          <v-alert v-if="message" :type="messageType" variant="tonal" class="mt-2" border="start">
            {{ message }}
          </v-alert>
        </div>
      </v-form>
    </v-card>
  </v-container>

  <!-- Diálogo de enlace -->
  <v-dialog v-model="linkDialog" max-width="480">
    <v-card>
      <v-card-title>Insertar enlace</v-card-title>
      <v-card-text>
        <v-text-field v-model="linkUrl" label="URL" placeholder="https://..." variant="outlined" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="removeLink" color="error">Quitar</v-btn>
        <v-btn variant="flat" :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }"
          @click="applyLink">Aplicar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.d-grid {
  display: grid;
}

.toolbar-group {
  display: flex;
  gap: 4px;
  align-items: center;
}

.w-100 {
  width: 100%;
}

.btn-primary:hover {
  transform: scale(1.02);
  background: var(--color-navy) !important;
  color: var(--color-primary-soft) !important;
}

/* Área de edición con tu paleta */
.prose-area {
  min-height: 220px;
  outline: none;
}

.editor-surface :deep(h1, h2, h3) {
  color: var(--color-heading);
  margin: 1rem 0 .5rem;
  line-height: 1.2;
}

:deep(.ProseMirror) {
  height: 50vh;
  overflow: overlay;
  padding: 1em 1.5em;
}

.editor-surface :deep(p, li) {
  color: var(--color-text);
  line-height: 1.75;
}

.editor-surface :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.editor-surface :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: .75rem 0;
}

/* Activo en toolbar */
.v-btn.is-active,
.v-btn--variant-text.v-btn--selected {
  background: var(--color-primary-soft) !important;
}

.color-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: inline-block;
}
</style>

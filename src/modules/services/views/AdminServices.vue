<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { db } from '@/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { getApiUrl } from '@/services/api-service'

const services = ref([])
const loading = ref(false)
const saving = ref(false)
const deletingId = ref('')
const error = ref('')

const dialog = ref(false)
const formValid = ref(false)
const formRef = ref()
const form = ref({
  id: '',
  title: '',
  summary: '',
  description: '',
  image: '',
  image_id: '', // Guardar el public_id de Cloudinary para facilitar el borrado
  order: ''
})
const imageFile = ref(null)
const imagePreview = ref('')

const search = ref('')

const headers = [
  { title: 'Título', key: 'title', sortable: true },
  { title: 'Resumen', key: 'summary', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return services.value.filter(svc => {
    if (!q) return true
    return [svc.title, svc.summary, svc.route]
      .filter(Boolean)
      .some(t => t.toLowerCase().includes(q))
  })
})

const resetForm = () => {
  form.value = {
    id: '',
    title: '',
    summary: '',
    description: '',
    image: '',
    image_id: '',
    order: ''
  }
  formValid.value = false
  imageFile.value = null
  imagePreview.value = ''
}

const openCreate = () => {
  resetForm()
  dialog.value = true
}

const openEdit = (svc) => {
  form.value = {
    id: svc.id,
    title: svc.title || '',
    summary: svc.summary || '',
    description: svc.description || '',
    image: svc.image || '',
    image_id: svc.image_id || '', // Cargar el public_id si existe
    order: ''
  }
  imageFile.value = null
  imagePreview.value = svc.image || ''
  formValid.value = false
  dialog.value = true
}

const rowData = (slotItem) => slotItem?.raw ?? slotItem

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const ensureServiceId = async (title) => {
  const base = slugify(title)
  if (!base) return `service-${Date.now()}`
  let candidate = base
  let i = 1
  // Si existe, agrega sufijos incrementales
  while (true) {
    const snap = await getDoc(doc(db, 'services', candidate))
    if (!snap.exists()) return candidate
    candidate = `${base}-${i++}`
  }
}

const fileToPreview = (file) => {
  if (!file) return (imagePreview.value = '')
  const reader = new FileReader()
  reader.onload = e => imagePreview.value = e.target?.result || ''
  reader.readAsDataURL(file)
}

const onImage = (files) => {
  const f = Array.isArray(files) ? files[0] : files
  imageFile.value = f || null
  fileToPreview(imageFile.value)
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
    throw new Error('Error al conectar con el servidor de imágenes. Verifica que el backend esté corriendo.')
  }
}

const deleteInCloudinary = async (public_id) => {
  if (!public_id) return
  try {
    await axios.delete(getApiUrl('/api/media'), { params: { public_id } })
  } catch (e) {
    // No lanzamos error para no interrumpir el borrado del servicio
    console.warn('No se pudo borrar imagen en Cloudinary:', public_id, e?.response?.data || e.message)
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

const uploadToCloudinarySigned = async (file, publicId) => {
  if (!file) return { url: '', id: '' }
  try {
    // El publicId que recibimos es solo el nombre (sin folder)
    // NO incluir el folder en el public_id, lo enviaremos por separado
    // Esto evita conflictos con el upload preset que puede tener un folder por defecto
    const publicIdClean = publicId.replace(/^services\//, '') // Remover 'services/' si ya lo tiene
    
    // Enviar folder y public_id (sin folder) al backend
    // El backend generará la firma con folder por separado
    const sign = await signUpload({ folder: 'services', publicId: publicIdClean })
    
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
    const finalPublicId = publicIdToUse.replace(/^services\//, '')
    formData.append('public_id', finalPublicId)
    // Enviar el folder por separado - esto sobrescribirá el folder del upload preset
    formData.append('folder', 'services')
    // Forzar que Cloudinary use el public_id exacto que proporcionamos (sin modificar)
    formData.append('use_filename', 'false')
    formData.append('unique_filename', 'false')
    
    const endpoint = `https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`
    const { data } = await axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    
    // Cloudinary devuelve el public_id que puede incluir el folder
    // Si el folder se especificó por separado, Cloudinary puede devolver solo el nombre
    // o el nombre con el folder. Necesitamos construir el public_id completo.
    let cloudinaryPublicId = data.public_id || ''
    
    // Si el public_id no incluye el folder pero se especificó un folder, agregarlo
    // Nota: Como las imágenes se guardan en "blog" por el upload preset,
    // el public_id puede ser "blog/nombre" o solo "nombre"
    // Si solo es "nombre", intentamos extraerlo de la URL para obtener el folder completo
    if (cloudinaryPublicId && !cloudinaryPublicId.includes('/')) {
      // Si no tiene folder, intentar extraerlo de la URL
      const urlPublicId = publicIdFromUrl(data.secure_url)
      if (urlPublicId && urlPublicId.includes('/')) {
        cloudinaryPublicId = urlPublicId
      }
    }
    
    return { url: data.secure_url, id: cloudinaryPublicId }
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error)
    const errorMessage = error.response?.data?.error?.message || error.message || 'Error desconocido'
    throw new Error(`Error al subir imagen: ${errorMessage}`)
  }
}

const loadServices = async () => {
  try {
    loading.value = true
    error.value = ''
    const snap = await getDocs(collection(db, 'services'))
    services.value = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }))
  } catch (e) {
    console.error(e)
    error.value = 'No se pudieron cargar los servicios.'
  } finally {
    loading.value = false
  }
}

const required = (v) => (!!v && String(v).trim().length > 0) || 'Campo requerido'
const minLength = (min) => (v) => {
  if (!v) return true
  return (String(v).trim().length >= min) || `Mínimo ${min} caracteres`
}
const maxLength = (max) => (v) => {
  if (!v) return true
  return (String(v).trim().length <= max) || `Máximo ${max} caracteres`
}

const saveService = async () => {
  const formEl = formRef.value
  const valid = await formEl?.validate?.()
  if (!valid?.valid) return

  saving.value = true
  error.value = ''

  let imageUrl = (form.value.image || '').trim()
  const isEdit = !!form.value.id
  let targetId = form.value.id

  try {
    if (!isEdit) {
      targetId = await ensureServiceId(form.value.title)
    }

    let imageId = form.value.image_id || '' // Mantener el image_id existente si no hay nueva imagen
    
    if (imageFile.value) {
      // Generar un public_id único para el servicio
      // IMPORTANTE: Solo el nombre del archivo, sin el folder (el folder se maneja por separado)
      const serviceSlug = slugify(form.value.title) || `service-${targetId || Date.now()}`
      // NO incluir 'services/' aquí, se agregará en uploadToCloudinarySigned
      const publicId = serviceSlug
      const uploaded = await uploadToCloudinarySigned(imageFile.value, publicId)
      imageUrl = uploaded.url
      // Guardar el public_id que Cloudinary devuelve (incluye el folder si lo tiene)
      imageId = uploaded.id || ''
    }

    if (!imageUrl) {
      throw new Error('Sube una imagen del servicio.')
    }

    const payload = {
      title: form.value.title.trim(),
      summary: form.value.summary.trim(),
      description: form.value.description.trim(),
      image: imageUrl,
      image_id: imageId, // Guardar el public_id para facilitar el borrado
      updatedAt: serverTimestamp()
    }

    if (isEdit) {
      await updateDoc(doc(db, 'services', targetId), payload)
      services.value = services.value.map(s => s.id === targetId ? { ...s, ...payload } : s)
    } else {
      await setDoc(doc(db, 'services', targetId), {
        ...payload,
        createdAt: serverTimestamp()
      })
      services.value.push({ id: targetId, ...payload })
    }
    services.value = services.value.slice()
    dialog.value = false
  } catch (e) {
    console.error(e)
    error.value = 'No se pudo guardar el servicio.'
  } finally {
    saving.value = false
  }
}

const removeService = async (svc) => {
  const confirmed = window.confirm(`¿Eliminar el servicio "${svc.title}"?\nEsto también intentará borrar su imagen en Cloudinary.`)
  if (!confirmed) return
  
  deletingId.value = svc.id
  
  try {
    // 1. Borrar imagen en Cloudinary PRIMERO (antes de borrar el documento)
    let pid = ''
    
    // Intentar usar el image_id guardado primero (más confiable)
    if (svc.image_id) {
      pid = svc.image_id
    } else if (svc.image) {
      // Si no hay image_id, extraerlo de la URL
      pid = publicIdFromUrl(svc.image)
    }
    
    if (pid) {
      await deleteInCloudinary(pid)
    }
    
    // 2. Borrar documento en Firestore
    await deleteDoc(doc(db, 'services', svc.id))
    
    // 3. Quitar de la lista local (actualizar la página principal)
    services.value = services.value.filter(s => s.id !== svc.id)
    
  } catch (e) {
    console.error('Error al eliminar servicio:', e)
    error.value = 'No se pudo eliminar el servicio. Por favor, intenta de nuevo.'
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      error.value = ''
    }, 5000)
  } finally {
    deletingId.value = ''
  }
}

onMounted(loadServices)
</script>

<template>
  <v-container class="py-8" max-width="1100">
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <div class="text-caption" style="color: var(--vt-c-text-light-2);">ADMIN / SERVICIOS</div>
        <h1 class="text-h5" style="color: var(--color-heading); margin: 4px 0 0;">Panel de servicios</h1>
        <p class="text-body-2" style="color: var(--vt-c-text-light-2); margin: 4px 0 0;">
          Gestiona la lista que se muestra en la web: título, resumen, imagen y ruta de detalle.
        </p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">
        Nuevo servicio
      </v-btn>
    </div>

    <v-card elevation="1" style="border:1px solid var(--color-border);">
      <v-card-text>
        <div class="d-flex flex-wrap align-center" style="gap:12px;">
          <v-text-field
            v-model="search"
            density="comfortable"
            variant="outlined"
            placeholder="Buscar por título, resumen o ruta"
            prepend-inner-icon="mdi-magnify"
            hide-details
            style="max-width:360px;"
          />
          <v-spacer />
          <v-chip color="primary" variant="flat" label>
            {{ filtered.length }} servicios
          </v-chip>
        </div>
      </v-card-text>

      <v-divider />

      <v-alert v-if="error" type="error" variant="tonal" class="ma-4">
        {{ error }}
      </v-alert>

      <v-data-table
        :headers="headers"
        :items="filtered"
        :loading="loading"
        class="elevation-0"
      >
        <template #item.title="{ item }">
          <div class="d-flex align-center" style="gap:10px;">
            <v-avatar size="52" rounded="lg" color="grey-lighten-4">
              <v-img :src="rowData(item).image" alt="" cover />
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ rowData(item).title || '—' }}</div>
              <div class="text-caption" style="color: var(--vt-c-text-light-2);">ID: {{ rowData(item).id }}</div>
            </div>
          </div>
        </template>

        <template #item.summary="{ item }">
          <span class="text-truncate" style="max-width: 320px; display: inline-block;">
            {{ rowData(item).summary || '—' }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex align-center" style="gap:4px;">
            <v-btn icon variant="text" size="small" @click="openEdit(rowData(item))">
              <v-icon size="20">mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="text"
              size="small"
              color="error"
              :loading="deletingId === rowData(item).id"
              @click="removeService(rowData(item))"
            >
              <v-icon size="20">mdi-trash-can</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="640" persistent>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div>{{ form.id ? 'Editar servicio' : 'Nuevo servicio' }}</div>
          <v-chip v-if="form.id" size="small" variant="tonal">ID: {{ form.id }}</v-chip>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-text-field
              v-model="form.title"
              label="Título"
              :rules="[required, minLength(5), maxLength(200)]"
              variant="outlined"
              density="comfortable"
            />
            <v-textarea
              v-model="form.summary"
              label="Resumen corto"
              :rules="[required, minLength(10), maxLength(300)]"
              variant="outlined"
              density="comfortable"
              rows="2"
              auto-grow
            />
            <v-textarea
              v-model="form.description"
              label="Descripción"
              :rules="[required, minLength(20), maxLength(2000)]"
              variant="outlined"
              density="comfortable"
              rows="4"
              auto-grow
            />
            <v-file-input
              label="Imagen del servicio"
              accept="image/*"
              variant="outlined"
              density="comfortable"
              @update:model-value="onImage"
              prepend-icon="mdi-image"
              :clearable="true"
            />
            <v-img
              v-if="imagePreview || form.image"
              :src="imagePreview || form.image"
              alt="Vista previa"
              class="rounded"
              height="180"
              cover
              style="border:1px solid var(--color-border); background: var(--vt-c-white);"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
          <v-btn :loading="saving" color="primary" @click="saveService">
            {{ form.id ? 'Guardar cambios' : 'Crear servicio' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


<script setup>
/**
 * Panel de administración de Noticias (lista + editar + borrar)
 * - Firestore: lee toda la colección 'news' y filtra en cliente (evita índices compuestos)
 * - Cloudinary: al eliminar, borra public_ids (img_one_id, img_two_id) o los deduce desde la URL
 */
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { db, auth } from '@/firebase';
import { getApiUrl } from '@/services/api-service';
import {
  collection, getDocs, doc, deleteDoc, updateDoc, getDoc, serverTimestamp
} from 'firebase/firestore';

/* ------------ State ------------ */
const loading = ref(true);
const saving = ref(false);
const items = ref([]);         // todas las noticias
const search = ref('');
const statusFilter = ref('all'); // all | published | draft
const error = ref('');

/* ------------ Edición ------------ */
const editDialog = ref(false);
const editForm = ref({
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  tagsCsv: '',
  status: 'draft',
});
const editValid = ref(false);

/* ------------ Utils ------------ */
const fmtDate = (ts) => {
  try {
    if (!ts) return '—';
    const d = ts?.toDate?.() || (ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts));
    if (!d || isNaN(d.getTime())) return '—';
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  } catch { return '—'; }
};
const clUrl = (url, w = 240) => (url || '').replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`);

/** Deducción de public_id desde una URL segura de Cloudinary*/
const publicIdFromUrl = (url) => {
  try {
    if (!url) return '';
    const u = new URL(url);
    const parts = u.pathname.split('/'); 
    const uploadIdx = parts.findIndex(p => p === 'upload');
    if (uploadIdx === -1) return '';
    const after = parts.slice(uploadIdx + 1); 
    const noVersion = after[0]?.startsWith('v') ? after.slice(1) : after;
    const joined = noVersion.join('/'); 
    const noExt = joined.replace(/\.[a-z0-9]+$/i, '');
    return noExt;
  } catch { return ''; }
};

/* ------------ Carga ------------ */
const loadAll = async () => {
  try {
    loading.value = true;
    error.value = '';
    const snap = await getDocs(collection(db, 'news'));
    items.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.publishedAt?.seconds || 0) - (a.publishedAt?.seconds || 0));
  } catch (e) {
    console.error(e);
    error.value = 'No fue posible cargar las noticias.';
  } finally {
    loading.value = false;
  }
};
onMounted(loadAll);

/* ------------ Filtro + búsqueda ------------ */
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  const st = statusFilter.value;
  const currentUserEmail = auth.currentUser?.email;
  
  return items.value.filter(n => {
    // Filtrar solo noticias del usuario actual
    if (currentUserEmail && n.author !== currentUserEmail) return false;
    
    if (st !== 'all' && n.status !== st) return false;
    if (!q) return true;
    const text = [
      n.title, n.slug, n.excerpt, (n.tags || []).join(','), n.author
    ].join(' ').toLowerCase();
    return text.includes(q);
  });
});

/* ------------ Acciones ------------ */
const isOwner = (n) => {
  const currentUserEmail = auth.currentUser?.email;
  return currentUserEmail && n.author === currentUserEmail;
};

const openEdit = (n) => {
  // Verificar que el usuario sea el autor
  if (!isOwner(n)) {
    error.value = 'No tienes permiso para editar esta noticia.';
    setTimeout(() => { error.value = ''; }, 5000);
    return;
  }
  
  editForm.value = {
    id: n.id,
    title: n.title || '',
    slug: n.slug || '',
    excerpt: n.excerpt || '',
    tagsCsv: Array.isArray(n.tags) ? n.tags.join(', ') : '',
    status: n.status || 'draft',
  };
  editDialog.value = true;
};

const saveEdit = async () => {
  if (!editForm.value.id) return;
  
  // Verificar que el usuario sea el autor
  const docSnap = await getDoc(doc(db, 'news', editForm.value.id));
  if (!docSnap.exists()) {
    error.value = 'La noticia no existe.';
    setTimeout(() => { error.value = ''; }, 5000);
    return;
  }
  
  const newsData = docSnap.data();
  if (!isOwner({ author: newsData.author })) {
    error.value = 'No tienes permiso para editar esta noticia.';
    editDialog.value = false;
    setTimeout(() => { error.value = ''; }, 5000);
    return;
  }
  
  try {
    saving.value = true;
    const ref = doc(db, 'news', editForm.value.id);
    const payload = {
      title: editForm.value.title.trim(),
      slug: editForm.value.slug.trim(),
      excerpt: editForm.value.excerpt,
      tags: editForm.value.tagsCsv
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      status: editForm.value.status,
      updatedAt: serverTimestamp(),
    };
    
    // Si se cambia a 'published' y no tiene publishedAt, agregarlo
    if (editForm.value.status === 'published') {
      if (!newsData.publishedAt) {
        payload.publishedAt = serverTimestamp();
      }
    }
    
    await updateDoc(ref, payload);
   
    const idx = items.value.findIndex(x => x.id === editForm.value.id);
    if (idx >= 0) {
      items.value[idx] = { ...items.value[idx], ...payload };
      if (payload.publishedAt) {
        items.value[idx].publishedAt = payload.publishedAt;
      }
    }
    editDialog.value = false;
  } catch (e) {
    console.error(e);
  } finally {
    saving.value = false;
  }
};

const toggleStatus = async (n) => {
  // Verificar que el usuario sea el autor
  if (!isOwner(n)) {
    error.value = 'No tienes permiso para cambiar el estado de esta noticia.';
    setTimeout(() => { error.value = ''; }, 5000);
    return;
  }
  
  try {
    const next = n.status === 'published' ? 'draft' : 'published';
    const updateData = { 
      status: next, 
      updatedAt: serverTimestamp() 
    };
    
    // Si cambia a 'published' y no tiene publishedAt, agregarlo
    if (next === 'published') {
      // Verificar en la BD si realmente no tiene publishedAt (por si acaso)
      const docSnap = await getDoc(doc(db, 'news', n.id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (!data.publishedAt) {
          updateData.publishedAt = serverTimestamp();
        }
      }
    }
    
    await updateDoc(doc(db, 'news', n.id), updateData);
    n.status = next;
    if (updateData.publishedAt) {
      n.publishedAt = updateData.publishedAt;
    }
  } catch (e) {
    console.error('Error cambiando estado:', e);
  }
};

const deleting = ref(false);
const confirm = (msg) => window.confirm(msg);

const deleteInCloudinary = async (public_id) => {
  if (!public_id) return;
  try {
    await axios.delete(getApiUrl('/api/media'), { params: { public_id } });
  } catch (e) {
    // solo loguea
    console.warn('Cloudinary delete failed for', public_id, e?.response?.data || e.message);
  }
};

const removeNews = async (n) => {
  if (!n?.id) return;
  
  // Verificar que el usuario sea el autor
  if (!isOwner(n)) {
    error.value = 'No tienes permiso para eliminar esta noticia.';
    setTimeout(() => { error.value = ''; }, 5000);
    return;
  }
  
  const ok = confirm(`¿Eliminar la noticia "${n.title || n.slug}"?\nEsto también intentará borrar sus imágenes en Cloudinary.`);
  if (!ok) return;

  try {
    deleting.value = true;

    // 1) Borrar imágenes en Cloudinary (si tenemos public_id, si no lo deducimos)
    const ids = [];
    if (n.img_one_id) ids.push(n.img_one_id);
    if (n.img_two_id) ids.push(n.img_two_id);
    if (!ids.length) {
      if (n.img_one || n.coverUrl) ids.push(publicIdFromUrl(n.img_one || n.coverUrl));
      if (n.img_two) ids.push(publicIdFromUrl(n.img_two));
    }
    for (const pid of ids.filter(Boolean)) {
      await deleteInCloudinary(pid);
    }

    // 2) Borrar documento en Firestore
    await deleteDoc(doc(db, 'news', n.id));

    // 3) Quitar de la lista
    items.value = items.value.filter(x => x.id !== n.id);
  } catch (e) {
    console.error(e);
    error.value = 'No fue posible eliminar la noticia.';
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      error.value = '';
    }, 5000);
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <v-container class="py-8">
    <!-- Header / Toolbar -->
    <div class="d-flex align-center justify-space-between mb-5">
      <div>
        <div class="text-caption" style="color: var(--vt-c-text-light-2);">ADMIN / BLOG</div>
        <h1 class="text-h6" style="color: var(--color-heading); margin: 2px 0 0;">Gestión de noticias</h1>
      </div>
      <router-link to="/admin/noticias">
        <v-btn class="btn-primary" :style="{ background: 'var(--color-primary)', color: 'white' }"
          prepend-icon="mdi-plus">
          Nueva noticia
        </v-btn>
      </router-link>
    </div>

    <!-- Filtros -->
    <v-card class="mb-4" elevation="1" style="border:1px solid var(--color-border);">
      <v-card-text class="d-flex flex-wrap align-center" style="gap:12px;">
        <v-text-field v-model="search" density="comfortable" variant="outlined"
          placeholder="Buscar por título, slug, tags…" prepend-inner-icon="mdi-magnify" hide-details
          style="max-width:420px;" />
        <v-chip-group v-model="statusFilter" mandatory class="ml-auto" selected-class="text-primary" column>
          <v-chip value="all" label>Todos</v-chip>
          <v-chip value="published" label>Publicadas</v-chip>
          <v-chip value="draft" label>Borradores</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <!-- Estados -->
    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

    <v-skeleton-loader v-if="loading" type="table" />

    <!-- Lista estilo “feed” -->
    <v-card v-else elevation="1" style="border:1px solid var(--color-border); overflow: hidden;">
      <v-list lines="two">
        <template v-if="filtered.length">
          <v-list-item v-for="n in filtered" :key="n.id">
            <!-- Icono estado -->
            <template #prepend>
              <v-tooltip v-if="isOwner(n)" text="Cambiar estado">
                <template #activator="{ props }">
                  <v-btn v-bind="props" icon variant="text" :color="n.status === 'published' ? 'success' : 'warning'"
                    @click.stop="toggleStatus(n)">
                    <v-icon>{{ n.status === 'published' ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-icon v-else :color="n.status === 'published' ? 'success' : 'warning'" class="ml-2">
                {{ n.status === 'published' ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template>

            <!-- Contenido -->
            <v-list-item-title class="font-medium" :title="n.title">
              {{ n.title || '—' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="opacity-70">/{{ n.slug }}</span> ·
              <span class="opacity-70">{{ n.author || 'GIGS' }}</span> ·
              <span class="opacity-70">{{ fmtDate(n.publishedAt) }}</span>
              <span v-if="n.tags?.length" class="ml-2">
                <v-chip v-for="t in n.tags" :key="t" size="x-small" variant="tonal" class="mr-1">#{{ t }}</v-chip>
              </span>
            </v-list-item-subtitle>

            <!-- Miniatura a la derecha -->
            <template #append>
              <div class="d-flex align-center" style="gap:8px;">
                <v-chip :color="n.status === 'published' ? 'success' : 'warning'" size="small" label>
                  {{ n.status === 'published' ? 'Publicado' : 'Borrador' }}
                </v-chip>

                <v-avatar size="64" rounded="lg" class="ml-2" style="border:1px solid var(--color-border);">
                  <v-img :src="clUrl(n.img_one || n.coverUrl)" alt="" />
                </v-avatar>

                <v-tooltip v-if="isOwner(n)" text="Editar">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" icon variant="text" @click.stop="openEdit(n)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip v-if="isOwner(n)" text="Eliminar">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" icon variant="text" color="error" :loading="deleting"
                      @click.stop="removeNews(n)">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-list-item>
        </template>

        <v-list-item v-else>
          <v-list-item-title>No hay resultados con esos filtros.</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Diálogo de edición rápida -->
    <v-dialog v-model="editDialog" max-width="720">
      <v-card>
        <v-card-title>Editar noticia</v-card-title>
        <v-card-text>
          <v-form v-model="editValid" @submit.prevent="saveEdit">
            <div class="d-grid" style="gap:12px;">
              <v-text-field v-model="editForm.title" label="Título" variant="outlined" :rules="[v => !!v || 'Requerido']" />
              <v-text-field v-model="editForm.slug" label="Slug" hint="solo minúsculas, números y guiones"
                persistent-hint variant="outlined" :rules="[v => /^[a-z0-9-]+$/.test(v || '') || 'Formato inválido']" />
              <v-textarea v-model="editForm.excerpt" label="Resumen" variant="outlined" rows="3" />
              <v-text-field v-model="editForm.tagsCsv" label="Tags (separadas por coma)" variant="outlined" />
              <v-select v-model="editForm.status" :items="[
                { title: 'Publicado', value: 'published' },
                { title: 'Borrador', value: 'draft' }
              ]" label="Estado" variant="outlined" style="max-width:240px;" />
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="editDialog = false">Cancelar</v-btn>
          <v-btn variant="flat" :loading="saving" :style="{ background: 'var(--color-primary)', color: 'white' }"
            @click="saveEdit">
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.opacity-70 {
  opacity: .7;
}

.d-grid {
  display: grid;
}

.btn-primary:hover {
  transform: scale(1.02);
  background: var(--color-navy) !important;
  color: var(--color-primary-soft) !important;
}
</style>

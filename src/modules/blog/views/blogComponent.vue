<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from '@/firebase';
import {
  collection, getDocs, orderBy, query, where, limit, startAfter
} from 'firebase/firestore';

const loading = ref(true);
const items = ref([]);
const error = ref('');
const missingIndexUrl = ref('');   
const search = ref('');
const activeChip = ref('Todos');
const chips = ['Todos', 'Tecnología', 'Seguridad', 'Desarrollo', 'Aprendizaje', 'Negocios'];

const perPage = 9;
const lastDoc = ref(null);
const hasMore = ref(false);
const initialLoaded = ref(false);

const baseQuery = (opts = {}) => {
  const parts = [
    collection(db, 'news'),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
  ];
  if (opts.startAfter) parts.push(startAfter(opts.startAfter));
  parts.push(limit(perPage + 1));
  return query(...parts);
};

const loadPosts = async (next = false) => {
  try {
    loading.value = true;
    error.value = '';
    missingIndexUrl.value = '';

    // Ejecuta la consulta que de resultado correcto
    const q = next && lastDoc.value
      ? baseQuery({ startAfter: lastDoc.value })
      : baseQuery();

    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, _snap: d, ...d.data() }));

    // Calcula si hay más y define página
    hasMore.value = docs.length > perPage;
    const page = hasMore.value ? docs.slice(0, perPage) : docs;

    // Aplica resultados y cursor (último de la página, NO del snapshot completo)
    if (next) items.value = [...items.value, ...page];
    else items.value = page;

    lastDoc.value = hasMore.value ? page[page.length - 1]._snap : null;
    initialLoaded.value = true;
  } catch (e) {
    console.error('Firestore error:', e);

    // Si falta el índice compuesto, Firestore pone el link en e.message
    if (e?.code === 'failed-precondition' && typeof e.message === 'string') {
      const match = e.message.match(/https?:\/\/[^\s)]+/);
      if (match) missingIndexUrl.value = match[0];
      error.value = 'Falta crear el índice compuesto (status + publishedAt).';
      return;
    }

    // Fallback temporal: al menos listar sin orden/where para depurar
    try {
      const snapFallback = await getDocs(collection(db, 'news'));
      items.value = snapFallback.docs.map(d => ({ id: d.id, _snap: d, ...d.data() }))
        // muestra solo publicados y con publishedAt si quieres mantener la idea
        .filter(p => p.status === 'published')
        .sort((a, b) => (b.publishedAt?.seconds || 0) - (a.publishedAt?.seconds || 0))
        .slice(0, perPage);
      hasMore.value = false;
      lastDoc.value = null;
      error.value = 'Usando fallback sin índice (crea el índice para habilitar paginación y orden).';
    } catch (e2) {
      console.error('Fallback error:', e2);
      error.value = 'No fue posible cargar el blog.';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => loadPosts());

const fmtDate = ts => {
  try {
    const d = ts?.toDate?.() || (ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts));
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  } catch { return ''; }
};

const filtered = computed(() => {
  const q = (search.value || '').toLowerCase();
  const cat = activeChip.value.toLowerCase();
  return items.value.filter(p => {
    const textMatch =
      !q ||
      (p.title || '').toLowerCase().includes(q) ||
      (p.excerpt || '').toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q);

    const tags = Array.isArray(p.tags) ? p.tags.map(t => String(t).toLowerCase()) : [];
    const catMatch = activeChip.value === 'Todos' || tags.includes(cat);

    return textMatch && catMatch;
  });
});
</script>

<template>
  <v-container class="py-8">
    <div class="text-caption mb-1" style="color: var(--vt-c-text-light-2);">INICIO / BLOG</div>
    <h1 class="text-h5 mb-2" style="color: var(--color-heading);">Blog Gigs: Ideas que Impulsan Negocios</h1>
    <p class="mb-6" style="max-width:720px; color: var(--vt-c-text-light-2);">
      Descubre noticias, consejos y tendencias sobre tecnología, ventas y estrategias digitales.
      Aquí compartimos conocimiento para que tu empresa crezca y se mantenga a la vanguardia.
    </p>

    <!-- Filtros -->
    <div class="d-flex align-center flex-wrap gap-3 mb-4">
      <v-text-field v-model="search" placeholder="Buscar" prepend-inner-icon="mdi-magnify" density="comfortable"
        variant="outlined" hide-details style="max-width: 360px;" />
      <div class="d-flex flex-wrap" style="gap:8px;">
        <v-chip v-for="c in chips" :key="c" :color="activeChip === c ? 'primary' : undefined"
          :variant="activeChip === c ? 'flat' : 'outlined'" @click="activeChip = c" class="chip-filter">
          {{ c }}
        </v-chip>
      </div>
    </div>

    <!-- Indicador de índice faltante -->
    <v-alert v-if="missingIndexUrl" type="warning" variant="tonal" class="mb-4">
      Falta el índice compuesto para <code>status</code> + <code>publishedAt</code>.
      Ábrelo y créalo aquí:
      <a :href="missingIndexUrl" target="_blank" rel="noopener">Crear índice</a>.
    </v-alert>

    <!-- Grid -->
    <v-row v-if="loading && !initialLoaded" dense>
      <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
        <v-skeleton-loader type="image, article" />
      </v-col>
    </v-row>

    <v-alert v-else-if="error" :type="missingIndexUrl ? 'warning' : 'error'" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>

    <template v-else>
      <v-row v-if="filtered.length" dense>
        <v-col v-for="post in filtered" :key="post.slug || post.id" cols="12" sm="6" md="4">
          <v-card class="h-100" elevation="1"
            style="border:1px solid var(--color-border); background: var(--vt-c-white);">
            <v-img :src="post.img_one || post.coverUrl" height="160" cover alt="" class="rounded-t"
              style="background: var(--color-background-mute);" />
            <v-card-item class="pb-1">
              <div class="text-caption mb-1" style="color: var(--vt-c-text-light-2);">
                {{ (post.tags && post.tags[0]) || 'Noticia' }}
              </div>
              <v-card-title class="text-truncate-2" :title="post.title" style="color: var(--color-heading);">
                {{ post.title }}
              </v-card-title>
              <v-card-subtitle class="opacity-70">
                {{ fmtDate(post.publishedAt) }} · {{ post.author || 'GIGS' }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="pt-0">
              <div class="line-clamp-3" style="color: var(--vt-c-text-light-2);">
                {{ post.excerpt }}
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0">
              <router-link :to="`/blog/${post.slug}`">
                <v-btn variant="flat" class="btn-primary"
                  :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }">
                  Leer
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-alert v-else type="info" variant="tonal">No hay entradas que coincidan.</v-alert>

      <div class="d-flex justify-center mt-6" v-if="hasMore">
        <v-btn variant="flat" class="btn-primary"
          :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }" @click="loadPosts(true)"
          :loading="loading">
          Cargar Más
        </v-btn>
      </div>
    </template>
  </v-container>
</template>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.chip-filter {
  border-color: var(--color-border) !important;
  color: var(--color-text) !important;
  background: var(--color-background-soft);
}

.btn-primary:hover {
  transform: scale(1.02);
  background: var(--color-navy) !important;
  color: var(--color-primary-soft) !important;
}
</style>

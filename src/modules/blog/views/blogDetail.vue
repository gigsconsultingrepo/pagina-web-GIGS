<script setup>
import { ref, onMounted, computed } from 'vue';
import DOMPurify from 'dompurify';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import he from 'he'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import BackToTop from "@/components/navs/BackToTop.vue"


import {
  collection, getDocs, limit, query, where, doc, getDoc
} from 'firebase/firestore';

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref('');

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');

function clUrl(url, w = 1200) {
  return (url || '').replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`);
}

onMounted(async () => {
  const param = String(route.params.slug || '');
  const paramDecoded = decodeURIComponent(param);
  const target = norm(paramDecoded);

  try {
    loading.value = true;
    error.value = '';

    // 1) Doc por ID
    try {
      const byId = await getDoc(doc(db, 'news', paramDecoded));
      if (byId.exists()) {
        const d = { id: byId.id, ...byId.data() };
        if (d.status === 'published') post.value = d;
        else error.value = 'Esta entrada no está publicada.';
        return;
      }
    } catch { }

    // 2) Query por slug
    try {
      const q = query(
        collection(db, 'news'),
        where('slug', '==', target),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = { id: snap.docs[0].id, ...snap.docs[0].data() };
        if (d.status === 'published') post.value = d;
        else error.value = 'Esta entrada no está publicada.';
        return;
      }
    } catch { }

    // 3) Fallback: leer colección y filtrar en cliente
    try {
      const all = await getDocs(collection(db, 'news'));
      const list = all.docs.map(x => ({ id: x.id, ...x.data() }));
      const found = list.find(x => norm(x.slug) === target);
      if (found) {
        if (found.status === 'published') post.value = found;
        else error.value = 'Esta entrada no está publicada.';
        return;
      }
    } catch { }

    error.value = 'No se encontró la entrada.';
  } catch (e) {
    console.error(e);
    error.value = 'Error al cargar la entrada.';
  } finally {
    loading.value = false;
  }
});

// Sanitiza pero preserva HTML común del editor
const safeHtml = computed(() => {
  const raw = post.value?.content || '';
  const decoded = he.decode(raw);
  return DOMPurify.sanitize(decoded, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['header', 'main', 'article', 'section', 'figure', 'figcaption'],
    ADD_ATTR: ['class', 'style', 'loading', 'width', 'height']
  });
});

const fmtDateTime = (ts) => {
  try {
    const d = ts?.toDate?.() || (ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts));
    return d.toLocaleString(undefined, { year: 'numeric', month: 'long', day: '2-digit' });
  } catch { return ''; }
};
</script>

<template>
  <Breadcrumbs />
  <v-container class="py-8">

    <v-skeleton-loader v-if="loading" type="image, article, article" />

    <v-alert v-else-if="error" type="error" variant="tonal">{{ error }}</v-alert>

    <v-card v-else elevation="1" style="background: var(--vt-c-white); border:1px solid var(--color-border);">
      <v-img v-if="post.img_one || post.coverUrl" :src="clUrl(post.img_one || post.coverUrl, 1400)" height="260" cover
        class="rounded-t" style="background: var(--color-background-mute);" />

      <v-card-item class="pb-0">
        <div class="text-caption mb-1" style="color: var(--vt-c-text-light-2);">
          {{ (post.tags && post.tags[0]) || 'Noticia' }}
        </div>
        <v-card-title style="color: var(--color-heading);">
          {{ post.title }}
        </v-card-title>
        <v-card-subtitle class="opacity-70">
          {{ fmtDateTime(post.publishedAt) }} · {{ post.author || 'GIGS' }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="pt-2">
        <div class="prose" v-html="safeHtml"></div>

        <v-img v-if="post.img_two" :src="clUrl(post.img_two, 1200)" class="my-6 rounded" height="260" cover
          style="border:1px solid var(--color-border); background: var(--color-background-mute);" />
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <router-link to="/blog">
          <v-btn variant="text" style="color: var(--color-primary);">← Volver al blog</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
  <BackToTop />
</template>

<style scoped>
.prose :where(h1, h2, h3) {
  color: var(--color-heading);
  margin: 1.25rem 0 .5rem;
  line-height: 1.2;
}

.prose :where(p, li) {
  color: var(--color-text);
  line-height: 1.75;
}

.prose :where(ul) {
  padding-left: 1.25rem;
  margin: .5rem 0;
}

.prose :where(ol) {
  padding-left: 1.25rem;
  margin: .5rem 0;
}

.prose :where(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding-left: .75rem;
  margin: 1rem 0;
  color: var(--vt-c-text-light-2);
}

.prose :where(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 1rem 0;
}

.prose :where(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .prose :where(h1) {
    font-size: 1.6rem;
  }

  .prose :where(h2) {
    font-size: 1.3rem;
  }

  .prose :where(h3) {
    font-size: 1.15rem;
  }
}

.prose article {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem 0;
}

.prose header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.prose header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: .5rem;
}

.prose header .meta {
  font-size: .9rem;
  color: var(--vt-c-text-light-2);
}

.prose section.intro {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.prose figure {
  margin: 2rem 0;
  text-align: center;
}

.prose figure img {
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.prose figure figcaption {
  margin-top: .5rem;
  font-size: .85rem;
  color: var(--vt-c-text-light-2);
}

.prose section.main-content h2 {
  font-size: 1.5rem;
  margin: 1.5rem 0 .75rem;
  color: var(--color-heading);
}

.prose section.main-content p {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.prose ul,
.prose ol {
  margin: 1rem 0 1.5rem 1.5rem;
}

.prose li {
  margin-bottom: .5rem;
}

.prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--vt-c-text-light-2);
}

.prose blockquote footer {
  font-size: .85rem;
  margin-top: .5rem;
  text-align: right;
  color: var(--vt-c-text-dark-2);
}

.prose footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  font-size: .95rem;
}

.prose .tags {
  margin-top: .75rem;
}

.prose .tags span {
  font-weight: 600;
  margin-right: .5rem;
}

.prose .tags a {
  margin-right: .5rem;
  color: var(--color-primary);
  text-decoration: none;
}

.prose .tags a:hover {
  text-decoration: underline;
}
</style>

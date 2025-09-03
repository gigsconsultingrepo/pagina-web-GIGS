<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const items = ref([]);
const loading = ref(true);

onMounted(async () => {
  const q = query(
    collection(db, 'news'),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc')
  );
  const snap = await getDocs(q);
  items.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  loading.value = false;
});
</script>

<template>
  <section class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Noticias</h2>
    <p v-if="loading">Cargando…</p>
    <div v-for="n in items" :key="n.slug" class="card">
      <img v-if="n.coverUrl" :src="n.coverUrl" alt="" />
      <h3 class="text-xl font-semibold">
        <router-link :to="`/news/${n.slug}`">{{ n.title }}</router-link>
      </h3>
      <small>{{ n.publishedAt?.toDate?.().toLocaleString?.() }}</small>
      <p class="mt-2">{{ n.excerpt }}</p>
      <div class="mt-2 flex gap-2">
        <span v-for="t in (n.tags || [])" :key="t" class="tag">#{{ t }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, .06);
  margin-bottom: 1rem;
}

img {
  width: 100%;
  border-radius: 12px;
}

.tag {
  font-size: .8rem;
  background: #f2f2f2;
  padding: .2rem .5rem;
  border-radius: .5rem;
}
</style>

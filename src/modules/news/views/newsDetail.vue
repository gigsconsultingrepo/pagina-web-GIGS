<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

const route = useRoute();
const post = ref(null);

onMounted(async () => {
	const q = query(collection(db, 'news'), where('slug', '==', route.params.slug), limit(1));
	const snap = await getDocs(q);
	post.value = snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
});
</script>

<template>
	<article v-if="post" class="max-w-3xl mx-auto p-6">
		<h1 class="text-3xl font-bold">{{ post.title }}</h1>
		<small class="opacity-70">{{ post.publishedAt?.toDate?.().toLocaleString?.() }} · {{ post.author }}</small>
		<img v-if="post.coverUrl" :src="post.coverUrl" class="my-4 rounded-xl" />
		<div v-html="post.content"></div>
	</article>
	<p v-else class="p-6 text-center">No se encontró la noticia.</p>
</template>

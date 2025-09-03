<script setup>
import { ref, computed } from 'vue';
import { auth, db, storage } from '@/firebase';
import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

const title = ref('');
const slug = ref('');
const excerpt = ref('');
const content = ref('');
const tags = ref(''); // coma-separadas
const status = ref('published');
const coverFile = ref(null);
const coverPreview = ref('');
const saving = ref(false);
const message = ref('');
const img_one = ref(null);
const img_two = ref(null);
const messageType = ref('success');

const valid = ref(false);
const formRef = ref(null);

const rules = {
	required: v => (!!v && String(v).trim().length > 0) || 'Este campo es obligatorio',
	slug: v => (/^[a-z0-9-]+$/.test(v || '')) || 'Usa solo minúsculas, números y guiones',
};

const autoSlug = () => {
	if (!title.value || slug.value) return;
	slug.value = String(title.value)
		.toLowerCase()
		.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
};

const onFile = async (files) => {
	const file = Array.isArray(files) ? files[0] : files;
	coverFile.value = file || null;
	if (file) {
		const reader = new FileReader();
		reader.onload = e => { coverPreview.value = e.target.result; };
		reader.readAsDataURL(file);
	} else {
		coverPreview.value = '';
	}
};

const logout = async () => {
	await signOut(auth);
	window.location.href = '/';
};

const savePost = async () => {
	if (!formRef.value) return;
	const isValid = await formRef.value.validate();
	if (!isValid?.valid) return;

	try {
		saving.value = true;
		message.value = '';
		let coverUrl = '';

		if (coverFile.value) {
			const fileRef = sRef(storage, `news_covers/${Date.now()}-${coverFile.value.name}`);
			await uploadBytes(fileRef, coverFile.value);
			coverUrl = await getDownloadURL(fileRef);
		}

		await addDoc(collection(db, 'news'), {
			title: title.value,
			slug: slug.value.trim(),
			excerpt: excerpt.value,
			content: content.value, // puedes guardar Markdown o HTML
			tags: tags.value.split(',').map(t => t.trim()).filter(Boolean),
			coverUrl,
			status: status.value, // 'draft' | 'published'
			publishedAt: serverTimestamp(),
			img_one: '',
			img_two: '',
			author: auth.currentUser?.email || 'admin'
		});

		messageType.value = 'success';
		message.value = 'Noticia publicada 🎉';

		// reset
		title.value = '';
		slug.value = '';
		excerpt.value = '';
		content.value = '';
		tags.value = '';
		coverFile.value = null;
		img_one.value = null;
		img_two.value = null;
		coverPreview.value = '';
		formRef.value?.resetValidation?.();

	} catch (e) {
		messageType.value = 'error';
		message.value = 'Error guardando la noticia';
	} finally {
		saving.value = false;
	}
};

const btnStyle = computed(() => ({
	background: 'var(--color-primary)',
	color: 'var(--vt-c-white)',
}));
</script>

<template>
	<v-container max-width="900" class="py-8">
		<div class="d-flex align-center justify-space-between mb-6">
			<h1 class="text-h5" style="color: var(--color-heading);">Panel — Noticias</h1>
			<v-btn variant="text" @click="logout" style="color: var(--color-primary);">Salir</v-btn>
		</div>

		<v-card elevation="2" class="pa-6"
			style="background: var(--color-background-soft); border:1px solid var(--color-border);">
			<v-form ref="formRef" v-model="valid">
				<div class="d-grid" style="gap: 16px;">
					<v-text-field v-model="title" label="Título" :rules="[rules.required]" variant="outlined"
						density="comfortable" @blur="autoSlug" :style="{ '--v-field-border': 'var(--color-border)' }" />
					<v-text-field v-model="slug" label="Slug (ej. lanzamiento-gigs)" :rules="[rules.required, rules.slug]"
						variant="outlined" density="comfortable" hint="Solo minúsculas, números y guiones" persistent-hint />
					<v-text-field v-model="excerpt" label="Resumen corto" :rules="[rules.required]" variant="outlined"
						density="comfortable" />
					<v-textarea v-model="content" label="Contenido (Markdown o HTML)" :rows="8" :rules="[rules.required]"
						auto-grow variant="outlined" density="comfortable" />

					<v-text-field v-model="tags" label="Tags separadas por coma (ej. gigs,lanzamiento)" variant="outlined"
						density="comfortable" hint="Se guardan como array" persistent-hint />

					<div class="d-flex flex-column" style="gap:8px;">
						<v-file-input label="Imagen de portada" accept="image/*" variant="outlined" density="comfortable"
							@update:model-value="onFile" prepend-icon="mdi-image" :clearable="true" />
						<v-img v-if="coverPreview" :src="coverPreview" alt="Vista previa" class="rounded" height="200" cover
							style="border:1px solid var(--color-border); background: var(--vt-c-white);" />
					</div>

					<v-select v-model="status" label="Estado" :items="[
						{ title: 'Publicado', value: 'published' },
						{ title: 'Borrador', value: 'draft' }
					]" variant="outlined" density="comfortable" />

					<v-btn :loading="saving" :disabled="saving" size="large" class="w-100 btn-primary" :style="btnStyle"
						@click="savePost">
						{{ saving ? 'Guardando…' : 'Publicar' }}
					</v-btn>

					<v-alert v-if="message" :type="messageType" variant="tonal" class="mt-2" border="start" :style="{
						'--v-theme-alert-border-color': 'var(--color-border)',
						color: messageType === 'success' ? 'var(--color-text)' : undefined
					}">
						{{ message }}
					</v-alert>
				</div>
			</v-form>
		</v-card>
	</v-container>
</template>

<style scoped>
/* Integramos tu estética base.css con Vuetify */
.d-grid {
	display: grid;
}

.w-100 {
	width: 100%;
}

/* Hover del botón primario respetando tus tokens */
.btn-primary:hover {
	transform: scale(1.02);
	background: var(--color-navy) !important;
	color: var(--color-primary-soft) !important;
}

/* Ajustes suaves para campos con tu paleta */
:deep(.v-field) {
	--v-field-border-color: var(--color-border);
	--v-field-hover-border-color: var(--color-border-hover);
	--v-theme-on-surface-variant: var(--color-text);
}

:deep(.v-label) {
	color: var(--color-text);
}
</style>

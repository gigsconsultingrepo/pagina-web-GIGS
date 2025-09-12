<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { auth, db, storage } from '@/firebase';
import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

/* ---------- TIPTAP ---------- */
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

/* ---------- State ---------- */
const title = ref('');
const slug = ref('');
const excerpt = ref('');
const tags = ref('');
const status = ref('published'); // 'published' | 'draft'

// portada (img_one)
const imgOneFile = ref(null);       
// apoyo (img_two)
const imgTwoFile = ref(null);       
const imgOnePreview = ref('');
const imgTwoPreview = ref('');

const saving = ref(false);
const message = ref('');
const messageType = ref('success');
const valid = ref(false);
const formRef = ref(null);

const rules = {
	required: v => (!!v && String(v).trim().length > 0) || 'Este campo es obligatorio',
	slug: v => (/^[a-z0-9-]+$/.test(v || '')) || 'Usa solo minúsculas, números y guiones',
};

/* ---------- Utils ---------- */
const autoSlug = () => {
	if (!title.value || slug.value) return;
	slug.value = String(title.value)
		.toLowerCase()
		.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
};

const fileToPreview = (file, tgtRef) => {
	if (!file) return (tgtRef.value = '');
	const reader = new FileReader();
	reader.onload = e => { tgtRef.value = e.target.result; };
	reader.readAsDataURL(file);
};
const onImgOne = (files) => {
	const f = Array.isArray(files) ? files[0] : files;
	imgOneFile.value = f || null;
	fileToPreview(imgOneFile.value, imgOnePreview);
};
const onImgTwo = (files) => {
	const f = Array.isArray(files) ? files[0] : files;
	imgTwoFile.value = f || null;
	fileToPreview(imgTwoFile.value, imgTwoPreview);
};
const uploadAndGetUrl = async (file, prefix) => {
	if (!file) return '';
	const path = `${prefix}/${Date.now()}-${file.name}`;
	const rf = sRef(storage, path);
	await uploadBytes(rf, file);
	return await getDownloadURL(rf);
};

/* ---------- Editor Tiptap ---------- */
const editor = useEditor({
	content: '',
	extensions: [
		StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
		TextStyle,
		Color,
		Underline,
		Link.configure({
			openOnClick: true,
			autolink: true,
			linkOnPaste: true,
			HTMLAttributes: { rel: 'noopener', target: '_blank' },
		}),
		Image.configure({ inline: false, allowBase64: true }),
		TextAlign.configure({ types: ['heading', 'paragraph'] }),
	],
	editorProps: {
		attributes: { class: 'prose-area' },
	},
});
onBeforeUnmount(() => editor?.value?.destroy?.());

/* ---------- Toolbar Pro ---------- */
const linkDialog = ref(false);
const linkUrl = ref('');
const colorMenu = ref(false);
const colorValue = ref('#0d6efd');

const wordCount = computed(() => {
	const text = editor.value?.state?.doc?.textBetween(
		0, editor.value.state.doc.content.size, ' '
	) || '';
	return text.trim().split(/\s+/).filter(Boolean).length;
});

const openLinkDialog = () => {
	linkUrl.value = editor.value?.getAttributes('link')?.href || '';
	linkDialog.value = true;
};
const applyLink = () => {
	if (!linkUrl.value) return (linkDialog.value = false);
	editor.value?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.value }).run();
	linkDialog.value = false;
};
const removeLink = () => {
	editor.value?.chain().focus().unsetLink().run();
	linkDialog.value = false;
};
const insertInlineImage = async () => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.onchange = async () => {
		const file = input.files?.[0];
		if (!file) return;
		const url = await uploadAndGetUrl(file, 'news_inline');
		editor.value?.chain().focus().setImage({ src: url, alt: '' }).run();
	};
	input.click();
};
const applyColor = (hex) => {
	editor.value?.chain().focus().setColor(hex).run();
	colorMenu.value = false;
};

/* ---------- Acciones ---------- */
const logout = async () => { await signOut(auth); window.location.href = '/'; };

const btnPrimary = computed(() => ({
	background: 'var(--color-primary)',
	color: 'var(--vt-c-white)',
}));

const savePost = async (forceStatus = null) => {
	const isValid = await formRef.value?.validate();
	if (!isValid?.valid) return;

	try {
		saving.value = true;
		message.value = '';

		const html = editor.value?.getHTML() || '';

		const imgOneUrl = await uploadAndGetUrl(imgOneFile.value, 'news_portada'); // portada
		const imgTwoUrl = await uploadAndGetUrl(imgTwoFile.value, 'news_apoyo');   // apoyo

		await addDoc(collection(db, 'news'), {
			title: title.value,
			slug: slug.value.trim(),
			excerpt: excerpt.value,
			content: html, // 🔴 HTML
			tags: tags.value.split(',').map(t => t.trim()).filter(Boolean),
			status: forceStatus ?? status.value,
			publishedAt: serverTimestamp(),
			author: auth.currentUser?.email || 'admin',
			img_one: imgOneUrl,
			img_two: imgTwoUrl,
			coverUrl: imgOneUrl || '',
		});

		messageType.value = 'success';
		message.value = 'Noticia guardada 🎉';

		// Reset
		title.value = slug.value = excerpt.value = tags.value = '';
		status.value = 'published';
		editor.value?.commands.clearContent(true);
		imgOneFile.value = imgTwoFile.value = null;
		imgOnePreview.value = imgTwoPreview.value = '';
		formRef.value?.resetValidation?.();
	} catch (e) {
		console.error(e);
		messageType.value = 'error';
		message.value = 'Error guardando la noticia';
	} finally {
		saving.value = false;
	}
};
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
						density="comfortable" @blur="autoSlug" />
					<v-text-field v-model="slug" label="Slug (ej. lanzamiento-gigs)" :rules="[rules.required, rules.slug]"
						variant="outlined" density="comfortable" hint="Solo minúsculas, números y guiones" persistent-hint />
					<v-text-field v-model="excerpt" label="Resumen corto" :rules="[rules.required]" variant="outlined"
						density="comfortable" />

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

					<!-- EDITOR -->
					<v-sheet class="pa-4 rounded editor-surface"
						style="border:1px solid var(--color-border); background: var(--vt-c-white);">
						<EditorContent :editor="editor" />
					</v-sheet>

					<!-- Footer editor -->
					<div class="d-flex align-center justify-space-between mt-2">
						<div class="text-caption" style="color: var(--vt-c-text-light-2);">
							{{ wordCount }} palabras
						</div>
						<v-chip size="small" variant="flat" style="background: var(--color-background-soft);">
							Estado: {{ status }}
						</v-chip>
					</div>

					<v-text-field v-model="tags" label="Tags separadas por coma (ej. Tecnología,Seguridad)" variant="outlined"
						density="comfortable" hint="Se guardan como array" persistent-hint />

					<!-- Portada (img_one) -->
					<div class="d-flex flex-column" style="gap:8px;">
						<v-file-input label="Portada (img_one)" accept="image/*" variant="outlined" density="comfortable"
							@update:model-value="onImgOne" prepend-icon="mdi-image" :clearable="true" />
						<v-img v-if="imgOnePreview" :src="imgOnePreview" alt="Portada" class="rounded" height="200" cover
							style="border:1px solid var(--color-border); background: var(--vt-c-white);" />
					</div>

					<!-- Imagen de apoyo (img_two) -->
					<div class="d-flex flex-column" style="gap:8px;">
						<v-file-input label="Imagen de apoyo (img_two)" accept="image/*" variant="outlined" density="comfortable"
							@update:model-value="onImgTwo" prepend-icon="mdi-image-multiple" :clearable="true" />
						<v-img v-if="imgTwoPreview" :src="imgTwoPreview" alt="Apoyo" class="rounded" height="200" cover
							style="border:1px solid var(--color-border); background: var(--vt-c-white);" />
					</div>

					<!-- Estado + acciones -->
					<div class="d-flex flex-wrap align-center" style="gap:12px;">
						<v-select v-model="status" label="Estado" :items="[
							{ title: 'Publicado', value: 'published' },
							{ title: 'Borrador', value: 'draft' }
						]" variant="outlined" density="comfortable" style="max-width: 240px;" />

						<v-spacer />

						<v-btn variant="outlined" :loading="saving" :disabled="saving" @click="savePost('draft')">
							Guardar como borrador
						</v-btn>

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
	/* height: 40vh; */
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

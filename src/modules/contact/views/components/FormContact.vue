<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Forms from '../../../../components/navs/Forms.vue'

const title = {
	es: 'Envíanos un Mensaje',
	en: 'Send Us a Message'
}
const subtitle = {
	es: 'Cuéntanos sobre tu proyecto y te contactaremos pronto',
	en: 'Tell us about your project and we will contact you soon'
}
const textButton = { es: 'Enviar Mensaje', en: 'Send Message' }

const { locale } = useI18n()
const pick = (v: string | Record<string, string>) =>
	typeof v === 'string' ? v : v?.[locale.value] ?? v?.es ?? Object.values(v ?? {})[0] ?? ''

const L = {
	fullName: { es: 'Nombre Completo *', en: 'Full Name *' },
	company: { es: 'Empresa', en: 'Company' },
	email: { es: 'Correo Electrónico *', en: 'Email *' },
	phone: { es: 'Teléfono *', en: 'Phone *' },
	subject: { es: 'Asunto *', en: 'Subject *' },
	message: { es: 'Mensaje *', en: 'Message *' },
	messageHint: {
		es: 'Describe tu proyecto, objetivos, funcionalidades deseadas, etc.',
		en: 'Describe your project, objectives, desired features, etc.'
	}
}

const subjectOptions = [
	{ es: 'Selecciona una opción', en: 'Select an option', value: '' },
	{ es: 'Consultoría Tecnológica', en: 'Tech Consulting', value: 'consulting' },
	{ es: 'Desarrollo de Software', en: 'Software Development', value: 'development' },
	{ es: 'Soporte Técnico', en: 'Technical Support', value: 'support' },
	{ es: 'Otro', en: 'Other', value: 'other' }
]

const loading = ref(false)
const formRef = ref()
const fullName = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')

const req = (m = { es: 'Campo requerido', en: 'Required field' }) => (v: any) => !!v || pick(m)
const emailRule = (v: string) =>
	(!v && true) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || pick({ es: 'Correo inválido', en: 'Invalid email' })
const phoneRule = (v: string) =>
	(!v && true) || /^[\d\-\+\s()]{6,}$/.test(v) || pick({ es: 'Teléfono inválido', en: 'Invalid phone' })

const onSave = async () => {
	const form = formRef.value as any
	const valid = await form?.validate?.().then((r: any) => r.valid ?? r)
	if (!valid) return

	loading.value = true
	try {
		const payload = {
			fullName: fullName.value,
			company: company.value,
			email: email.value,
			phone: phone.value,
			subject: subject.value,
			message: message.value
		}
		console.log('submit:', payload)
	} finally {
		loading.value = false
	}
}

const subjectsI18n = computed(() => subjectOptions.map(o => ({ title: pick(o), value: o.value })))
</script>

<template>
	<Forms 
	 id="form-contacto"
	 :title="title" :subtitle="subtitle" :textButton="textButton" :loading="loading" @save="onSave">
		<v-form ref="formRef" class="grid" @submit.prevent="onSave">
			<v-text-field v-model="fullName" :label="pick(L.fullName)" :rules="[req()]" variant="outlined"
				density="comfortable" :disabled="loading" />
			<v-text-field v-model="company" :label="pick(L.company)" variant="outlined" density="comfortable"
				:disabled="loading" />

			<v-text-field v-model="email" :label="pick(L.email)" :rules="[req(), emailRule]" type="email" variant="outlined"
				density="comfortable" :disabled="loading" />
			<v-text-field v-model="phone" :label="pick(L.phone)" :rules="[req(), phoneRule]" variant="outlined"
				density="comfortable" :disabled="loading" />

			<v-select v-model="subject" :label="pick(L.subject)" :rules="[req()]" :items="subjectsI18n" item-title="title"
				item-value="value" variant="outlined" density="comfortable" class="span-2" :disabled="loading" />

			<v-textarea v-model="message" :label="pick(L.message)" :hint="pick(L.messageHint)" persistent-hint
				:rules="[req()]" rows="4" auto-grow variant="outlined" density="comfortable" class="span-2"
				:disabled="loading" />

			<button type="submit" style="display:none"></button>
		</v-form>
	</Forms>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
}

.span-2 {
	grid-column: 1;
}

@media (min-width: 900px) {
	.grid {
		grid-template-columns: repeat(2, 1fr);
	}

	.span-2 {
		grid-column: span 2;
	}
}
</style>

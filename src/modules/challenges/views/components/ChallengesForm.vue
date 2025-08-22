<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Forms from '../../../../components/navs/Forms.vue'

const title = {
  es: 'Compartimos el riesgo y compartimos el éxito!',
  en: 'We share the risk and the success!'
}
const subtitle = {
  es: 'No importa qué tan grande o pequeño sea tu reto, tenemos la experiencia y la creatividad para resolverlo.',
  en: 'No matter how big or small your challenge is, we have the experience and creativity to solve it.'
}
const textButton = { es: 'Enviar Reto', en: 'Submit Challenge' }

const { locale } = useI18n()

const pick = (v: string | Record<string, string>) =>
  typeof v === 'string' ? v : v?.[locale.value] ?? v?.es ?? Object.values(v ?? {})[0] ?? ''

const L = {
  fullName: { es: 'Nombre Completo *', en: 'Full Name *' },
  company: { es: 'Empresa', en: 'Company' },
  email: { es: 'Correo Electrónico *', en: 'Email *' },
  phone: { es: 'Teléfono', en: 'Phone' },
  title: { es: 'Título del Reto *', en: 'Challenge Title *' },
  desc: { es: 'Descripción Detallada *', en: 'Detailed Description *' },
  descHint: {
    es: 'Ej. Sistema de gestión de inventario inteligente',
    en: 'e.g., Intelligent inventory management system'
  },
  budget: { es: 'Presupuesto Estimado', en: 'Estimated Budget' },
  timeline: { es: 'Timeline Deseado', en: 'Desired Timeline' }
}

const budgetOptions = [
  { es: 'Selecciona una opción', en: 'Select an option', value: '' },
  { es: 'USD 5k – 10k', en: 'USD 5k – 10k', value: '5-10' },
  { es: 'USD 10k – 25k', en: 'USD 10k – 25k', value: '10-25' },
  { es: 'USD 25k – 50k', en: 'USD 25k – 50k', value: '25-50' },
  { es: 'USD 50k+', en: 'USD 50k+', value: '50+' }
]
const timelineOptions = [
  { es: 'Selecciona una opción', en: 'Select an option', value: '' },
  { es: '1–2 meses', en: '1–2 months', value: '1-2' },
  { es: '3–4 meses', en: '3–4 months', value: '3-4' },
  { es: '5–6 meses', en: '5–6 months', value: '5-6' },
  { es: '6+ meses', en: '6+ months', value: '6+' }
]

const loading = ref(false)
const formRef = ref()
const fullName = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')
const challengeTitle = ref('')
const description = ref('')
const budget = ref('')
const timeline = ref('')

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
      title: challengeTitle.value,
      description: description.value,
      budget: budget.value,
      timeline: timeline.value
    }
    // TODO: enviar payload (fetch/axios). Mantengo vacío por ahora.
    console.log('submit:', payload)
  } finally {
    loading.value = false
  }
}

const budgetsI18n = computed(() => budgetOptions.map(o => ({ title: pick(o), value: o.value })))
const timelinesI18n = computed(() => timelineOptions.map(o => ({ title: pick(o), value: o.value })))
</script>

<template>
  <Forms :title="title" :subtitle="subtitle" :textButton="textButton" :loading="loading" @save="onSave">
    <v-form ref="formRef" class="grid" @submit.prevent="onSave">
      <v-text-field v-model="fullName" :label="pick(L.fullName)" :rules="[req()]" variant="outlined"
        density="comfortable" :disabled="loading" />
      <v-text-field v-model="company" :label="pick(L.company)" variant="outlined" density="comfortable"
        :disabled="loading" />

      <v-text-field v-model="email" :label="pick(L.email)" :rules="[req(), emailRule]" type="email" variant="outlined"
        density="comfortable" :disabled="loading" />
      <v-text-field v-model="phone" :label="pick(L.phone)" :rules="[phoneRule]" variant="outlined" density="comfortable"
        :disabled="loading" />

      <v-text-field v-model="challengeTitle" :label="pick(L.title)" :rules="[req()]" variant="outlined"
        density="comfortable" class="span-2" :disabled="loading" />

      <v-textarea v-model="description" :label="pick(L.desc)" :hint="pick(L.descHint)" persistent-hint :rules="[req()]"
        rows="4" auto-grow variant="outlined" density="comfortable" class="span-2" :disabled="loading" />

      <v-select v-model="budget" :label="pick(L.budget)" :items="budgetsI18n" item-title="title" item-value="value"
        variant="outlined" density="comfortable" :disabled="loading" />
      <v-select v-model="timeline" :label="pick(L.timeline)" :items="timelinesI18n" item-title="title"
        item-value="value" variant="outlined" density="comfortable" :disabled="loading" />

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

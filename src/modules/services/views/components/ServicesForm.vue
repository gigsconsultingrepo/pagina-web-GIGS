<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Forms from '../../../../components/navs/Forms.vue'

const title = {
  es: 'Solicita tu Cotización Personalizada',
  en: 'Get Your Custom Quote'
}
const subtitle = {
  es: 'Cuéntanos sobre tu proyecto y te enviaremos una propuesta detallada.',
  en: 'Tell us about your project and we\'ll send you a detailed proposal.'
}
const textButton = { es: 'Solicitar Cotización', en: 'Request Quote' }

const { locale } = useI18n()

const pick = (v: string | Record<string, string>) =>
  typeof v === 'string' ? v : v?.[locale.value] ?? v?.es ?? Object.values(v ?? {})[0] ?? ''

const L = {
  fullName: { es: 'Nombre Completo *', en: 'Full Name *' },
  company: { es: 'Empresa', en: 'Company' },
  email: { es: 'Correo Electrónico *', en: 'Email *' },
  phone: { es: 'Teléfono *', en: 'Phone *' },
  projectType: { es: 'Tipo de Proyecto', en: 'Project Type' },
  projectDesc: { es: 'Descripción del Proyecto *', en: 'Project Description *' },
  projectDescHint: {
    es: 'Describe tu proyecto, objetivos, funcionalidades deseadas, etc.',
    en: 'Describe your project, objectives, desired functionalities, etc.'
  },
  budget: { es: 'Presupuesto Estimado', en: 'Estimated Budget' },
  timeline: { es: 'Timeline Deseado', en: 'Desired Timeline' }
}

const projectTypeOptions = [
  { es: 'Selecciona una opción', en: 'Select an option', value: '' },
  { es: 'Fábrica de Software', en: 'Software Factory', value: 'fabrica-software' },
  { es: 'TaaS (Talent as a Service)', en: 'TaaS (Talent as a Service)', value: 'taas' },
  { es: 'Transformación Digital', en: 'Digital Transformation', value: 'transformacion-digital' },
  { es: 'Mesa de Ayuda/Servicio', en: 'Help Desk/Service', value: 'mesa-ayuda' },
  { es: 'Gestión de Bases de Datos', en: 'Database Management', value: 'gestion-bd' },
  { es: 'Mantenimiento y Soporte', en: 'Maintenance and Support', value: 'mantenimiento' },
  { es: 'Otro', en: 'Other', value: 'otro' }
]

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
const projectType = ref('')
const projectDesc = ref('')
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
      projectType: projectType.value,
      projectDesc: projectDesc.value,
      budget: budget.value,
      timeline: timeline.value
    }
    // TODO: enviar payload (fetch/axios). Mantengo vacío por ahora.
    console.log('submit:', payload)
  } finally {
    loading.value = false
  }
}

const projectTypesI18n = computed(() => projectTypeOptions.map(o => ({ title: pick(o), value: o.value })))
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
      <v-text-field v-model="phone" :label="pick(L.phone)" :rules="[req()]" variant="outlined" density="comfortable"
        :disabled="loading" />

      <v-select v-model="projectType" :label="pick(L.projectType)" :items="projectTypesI18n" item-title="title" item-value="value"
        variant="outlined" density="comfortable" class="span-2" :disabled="loading" />

      <v-textarea v-model="projectDesc" :label="pick(L.projectDesc)" :hint="pick(L.projectDescHint)" persistent-hint :rules="[req()]"
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

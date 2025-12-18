<script setup lang="ts">
import { ref } from 'vue'
import { sendChallengeEmail } from '@/services/email-service'
import Forms from '@/components/navs/Forms.vue'

const title = 'Compartimos el riesgo y compartimos el éxito!'
const subtitle = 'No importa qué tan grande o pequeño sea tu reto, tenemos la experiencia y la creatividad para resolverlo.'
const textButton = 'Enviar Reto'

const fullName = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')
const challengeTitle = ref('')
const description = ref('')
const budget = ref('')
const timeline = ref('')

const loading = ref(false)
const formRef = ref()
const message = ref('')
const messageType = ref<'success' | 'error' | 'warning'>('success')

const req = (m = 'Campo requerido') => (v: any) => {
  if (!v || (typeof v === 'string' && !v.trim())) return m
  return true
}

const emailRule = (v: string) => {
  if (!v) return true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(v) || 'Correo electrónico inválido'
}

const phoneRule = (v: string) => {
  if (!v) return true
  const phoneRegex = /^[\d\-\+\s()]{6,20}$/
  return phoneRegex.test(v) || 'Teléfono debe tener entre 6 y 20 caracteres'
}

const minLength = (min: number, m?: string) => (v: string) => {
  if (!v) return true
  return v.trim().length >= min || (m || `Mínimo ${min} caracteres`)
}

const maxLength = (max: number, m?: string) => (v: string) => {
  if (!v) return true
  return v.trim().length <= max || (m || `Máximo ${max} caracteres`)
}

const budgetOptions = [
  { title: 'Selecciona una opción', value: '' },
  { title: 'USD 5k – 10k', value: 'USD 5k – 10k' },
  { title: 'USD 10k – 25k', value: 'USD 10k – 25k' },
  { title: 'USD 25k – 50k', value: 'USD 25k – 50k' },
  { title: 'USD 50k+', value: 'USD 50k+' }
]

const timelineOptions = [
  { title: 'Selecciona una opción', value: '' },
  { title: '1–2 meses', value: '1–2 meses' },
  { title: '3–4 meses', value: '3–4 meses' },
  { title: '5–6 meses', value: '5–6 meses' },
  { title: '6+ meses', value: '6+ meses' }
]

const onSubmit = async () => {
  const form = formRef.value as any
  const valid = await form?.validate?.().then((r: any) => r.valid ?? r)
  if (!valid) {
    message.value = 'Por favor completa correctamente todos los campos obligatorios'
    messageType.value = 'warning'
    setTimeout(() => {
      message.value = ''
    }, 5000)
    return
  }

  loading.value = true

  try {
    await sendChallengeEmail({
      fullName: fullName.value,
      company: company.value,
      email: email.value,
      phone: phone.value,
      challengeTitle: challengeTitle.value,
      description: description.value,
      budget: budget.value,
      timeline: timeline.value
    })

    message.value = 'Tu reto fue enviado correctamente. Te contactaremos pronto.'
    messageType.value = 'success'

    fullName.value = ''
    company.value = ''
    email.value = ''
    phone.value = ''
    challengeTitle.value = ''
    description.value = ''
    budget.value = ''
    timeline.value = ''
    formRef.value?.resetValidation?.()

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      message.value = ''
    }, 5000)

  } catch (error: any) {
    console.error(error)
    message.value = error.message || 'Ocurrió un error al enviar el reto. Por favor, intenta de nuevo.'
    messageType.value = 'error'
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      message.value = ''
    }, 5000)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Forms
    :title="title"
    :subtitle="subtitle"
    :textButton="textButton"
    :loading="loading"
    @save="onSubmit"
  >
    <v-form ref="formRef" class="grid" @submit.prevent="onSubmit">

      <v-text-field 
        v-model="fullName" 
        label="Nombre Completo *" 
        :rules="[req('Nombre completo es requerido'), minLength(2, 'Mínimo 2 caracteres'), maxLength(100, 'Máximo 100 caracteres')]" 
        variant="outlined" 
        density="comfortable" 
      />
      <v-text-field 
        v-model="company" 
        label="Empresa" 
        :rules="[maxLength(100, 'Máximo 100 caracteres')]"
        variant="outlined" 
        density="comfortable" 
      />
      <v-text-field 
        v-model="email" 
        label="Correo Electrónico *" 
        type="email" 
        :rules="[req('Correo electrónico es requerido'), emailRule]" 
        variant="outlined" 
        density="comfortable" 
      />
      <v-text-field 
        v-model="phone" 
        label="Teléfono" 
        :rules="[phoneRule]"
        variant="outlined" 
        density="comfortable" 
      />

      <v-text-field
        v-model="challengeTitle"
        label="Título del Reto *"
        :rules="[req('Título del reto es requerido'), minLength(5, 'Mínimo 5 caracteres'), maxLength(200, 'Máximo 200 caracteres')]"
        variant="outlined"
        density="comfortable"
        class="span-2"
      />

      <v-textarea
        v-model="description"
        label="Descripción Detallada *"
        :rules="[req('Descripción es requerida'), minLength(10, 'Mínimo 10 caracteres'), maxLength(2000, 'Máximo 2000 caracteres')]"
        rows="4"
        auto-grow
        variant="outlined"
        density="comfortable"
        class="span-2"
      />

      <v-select
        v-model="budget"
        label="Presupuesto Estimado"
        :items="budgetOptions"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="comfortable"
      />

      <v-select
        v-model="timeline"
        label="Timeline Deseado"
        :items="timelineOptions"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="comfortable"
      />

      <button type="submit" style="display:none"></button>
    </v-form>
    
    <v-alert v-if="message" :type="messageType" variant="tonal" class="mt-2" border="start">
      {{ message }}
    </v-alert>
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

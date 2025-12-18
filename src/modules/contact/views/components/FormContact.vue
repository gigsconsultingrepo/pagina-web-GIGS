<script setup lang="ts">
import { ref, computed } from 'vue'
import { sendContactEmail } from '@/services/email-service'
import Forms from '@/components/navs/Forms.vue'

const title = 'Envíanos un Mensaje'
const subtitle = 'Cuéntanos sobre tu proyecto y te contactaremos pronto'
const textButton = 'Enviar Mensaje'

const pick = (v: string | Record<string, string>) =>
  typeof v === 'string' ? v : ''

const L = {
  fullName: 'Nombre Completo *',
  company: 'Empresa',
  email: 'Correo Electrónico *',
  phone: 'Teléfono *',
  subject: 'Asunto *',
  message: 'Mensaje *',
  messageHint: 'Describe tu proyecto, objetivos, funcionalidades deseadas, etc.'
}

const subjectOptions = [
  { title: 'Selecciona una opción', value: '' },
  { title: 'Consultoría Tecnológica', value: 'Consultoría Tecnológica' },
  { title: 'Desarrollo de Software', value: 'Desarrollo de Software' },
  { title: 'Soporte Técnico', value: 'Soporte Técnico' },
  { title: 'Otro', value: 'Otro' }
]

const loading = ref(false)
const formRef = ref()
const alertMessage = ref('')
const messageType = ref<'success' | 'error'>('success')

const fullName = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')

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

const onSave = async () => {
  const form = formRef.value as any
  const valid = await form?.validate?.().then((r: any) => r.valid ?? r)
  if (!valid) return

  loading.value = true

  try {
    await sendContactEmail({
      fullName: fullName.value,
      company: company.value,
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value
    })

    alertMessage.value = 'Tu mensaje fue enviado con éxito. Te responderemos pronto.'
    messageType.value = 'success'

    fullName.value = ''
    company.value = ''
    email.value = ''
    phone.value = ''
    subject.value = ''
    message.value = ''
    form.resetValidation?.()

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      alertMessage.value = ''
    }, 5000)

  } catch (err: any) {
    console.error(err)
    alertMessage.value = err.message || 'Ocurrió un error al enviar tu mensaje. Por favor, intenta de nuevo.'
    messageType.value = 'error'
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      alertMessage.value = ''
    }, 5000)
  } finally {
    loading.value = false
  }
}

const subjectsOptions = computed(() =>
  subjectOptions.map(o => ({ title: o.title, value: o.value }))
)
</script>

<template>
  <Forms
    id="form-contacto"
    :title="title"
    :subtitle="subtitle"
    :textButton="textButton"
    :loading="loading"
    @save="onSave"
  >
    <v-form ref="formRef" class="grid" @submit.prevent="onSave">

      <v-text-field
        v-model="fullName"
        :label="pick(L.fullName)"
        :rules="[req('Nombre completo es requerido'), minLength(2, 'Mínimo 2 caracteres'), maxLength(100, 'Máximo 100 caracteres')]"
        variant="outlined"
        density="comfortable"
      />

      <v-text-field
        v-model="company"
        :label="pick(L.company)"
        :rules="[maxLength(100, 'Máximo 100 caracteres')]"
        variant="outlined"
        density="comfortable"
      />

      <v-text-field
        v-model="email"
        :label="pick(L.email)"
        :rules="[req('Correo electrónico es requerido'), emailRule]"
        type="email"
        variant="outlined"
        density="comfortable"
      />

      <v-text-field
        v-model="phone"
        :label="pick(L.phone)"
        :rules="[req('Teléfono es requerido'), phoneRule]"
        variant="outlined"
        density="comfortable"
      />

      <v-select
        v-model="subject"
        :label="pick(L.subject)"
        :rules="[req('Asunto es requerido')]"
        :items="subjectsOptions"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="comfortable"
        class="span-2"
      />

      <v-textarea
        v-model="message"
        :label="pick(L.message)"
        :hint="pick(L.messageHint)"
        persistent-hint
        :rules="[req('Mensaje es requerido'), minLength(10, 'Mínimo 10 caracteres'), maxLength(2000, 'Máximo 2000 caracteres')]"
        rows="4"
        auto-grow
        variant="outlined"
        density="comfortable"
        class="span-2"
      />

      <button type="submit" style="display:none"></button>
    </v-form>
    
    <v-alert v-if="alertMessage" :type="messageType" variant="tonal" class="mt-2" border="start">
      {{ alertMessage }}
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

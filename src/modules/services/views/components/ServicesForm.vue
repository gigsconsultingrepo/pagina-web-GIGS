<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { sendServicesEmail } from '@/services/email-service'
import Forms from '@/components/navs/Forms.vue'

const route = useRoute()

// Scroll al formulario si viene con hash y query parameter - esperar a que todo se cargue
onMounted(async () => {
  if (route.hash === '#formulario-servicios' && route.query.scrollToForm === 'true') {
    // Función para hacer scroll al formulario
    const scrollToForm = () => {
      const element = document.getElementById('formulario-servicios')
      if (element) {
        const rect = element.getBoundingClientRect()
        // Verificar que el elemento tenga altura y esté en el DOM
        if (rect.height > 0) {
          const topbarHeight = 64
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - topbarHeight)
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          return true
        }
      }
      return false
    }
    
    // Esperar a que las imágenes se carguen
    const waitForImages = () => {
      return new Promise((resolve) => {
        const images = document.querySelectorAll('img')
        let loaded = 0
        const total = images.length
        
        if (total === 0) {
          resolve()
          return
        }
        
        const checkComplete = () => {
          loaded++
          if (loaded === total) {
            resolve()
          }
        }
        
        images.forEach((img) => {
          if (img.complete) {
            checkComplete()
          } else {
            img.addEventListener('load', checkComplete)
            img.addEventListener('error', checkComplete)
          }
        })
        
        // Timeout de seguridad
        setTimeout(resolve, 3000)
      })
    }
    
    // Esperar múltiples ciclos para que los componentes se monten
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 400))
    await nextTick()
    
    // Esperar a que las imágenes se carguen
    await waitForImages()
    
    // Hacer scroll con múltiples intentos para asegurar que funcione
    await nextTick()
    let scrollAttempts = 0
    const maxScrollAttempts = 15
    
    const attemptScroll = () => {
      scrollAttempts++
      const success = scrollToForm()
      
      if (!success && scrollAttempts < maxScrollAttempts) {
        // Intentar de nuevo con delay progresivo
        const delay = scrollAttempts < 5 ? 300 : scrollAttempts < 10 ? 500 : 800
        setTimeout(attemptScroll, delay)
      }
    }
    
    attemptScroll()
    
    // Intentos adicionales de seguridad por si el contenido sigue cargando
    setTimeout(() => scrollToForm(), 1000)
    setTimeout(() => scrollToForm(), 2000)
    setTimeout(() => scrollToForm(), 3000)
  }
})

const title = 'Solicita tu Cotización Personalizada'
const subtitle = 'Cuéntanos sobre tu proyecto y te enviaremos una propuesta detallada.'
const textButton = 'Solicitar Cotización'

const pick = (v: string | Record<string, string>) =>
  typeof v === 'string' ? v : ''

const L = {
  fullName: 'Nombre Completo *',
  company: 'Empresa',
  email: 'Correo Electrónico *',
  phone: 'Teléfono *',
  projectType: 'Tipo de Proyecto',
  projectDesc: 'Descripción del Proyecto *',
  projectDescHint: 'Describe tu proyecto, objetivos, funcionalidades deseadas, etc.',
  budget: 'Presupuesto Estimado',
  timeline: 'Timeline Deseado'
}

const projectTypeOptions = [
  { title: 'Selecciona una opción', value: '' },
  { title: 'Fábrica de Software', value: 'Fábrica de Software' },
  { title: 'TaaS (Talent as a Service)', value: 'TaaS' },
  { title: 'Transformación Digital', value: 'Transformación Digital' },
  { title: 'Mesa de Ayuda/Servicio', value: 'Mesa de Ayuda' },
  { title: 'Gestión de Bases de Datos', value: 'Gestión de Bases de Datos' },
  { title: 'Mantenimiento y Soporte', value: 'Mantenimiento y Soporte' },
  { title: 'Otro', value: 'Otro' }
]

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

const loading = ref(false)
const formRef = ref()
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const fullName = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')
const projectType = ref('')
const projectDesc = ref('')
const budget = ref('')
const timeline = ref('')

const req = (m = 'Campo requerido') => (v: any) => {
  if (!v || (typeof v === 'string' && !v.trim())) return m
  return true
}

const emailRule = (v: string) => {
  if (!v) return true // Si está vacío, req() se encargará
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(v) || 'Correo electrónico inválido'
}

const phoneRule = (v: string) => {
  if (!v) return true // Si está vacío, req() se encargará
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
    await sendServicesEmail({
      fullName: fullName.value,
      company: company.value,
      email: email.value,
      phone: phone.value,
      projectType: projectType.value,
      projectDesc: projectDesc.value,
      budget: budget.value,
      timeline: timeline.value
    })

    message.value = 'Solicitud enviada correctamente. Te contactaremos pronto.'
    messageType.value = 'success'

    fullName.value = ''
    company.value = ''
    email.value = ''
    phone.value = ''
    projectType.value = ''
    projectDesc.value = ''
    budget.value = ''
    timeline.value = ''
    form.resetValidation?.()

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      message.value = ''
    }, 5000)

  } catch (err: any) {
    console.error(err)
    message.value = err.message || 'Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo.'
    messageType.value = 'error'
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      message.value = ''
    }, 5000)
  } finally {
    loading.value = false
  }
}

const projectTypesOptions = computed(() =>
  projectTypeOptions.map(o => ({ title: o.title, value: o.value }))
)
const budgetsOptions = computed(() =>
  budgetOptions.map(o => ({ title: o.title, value: o.value }))
)
const timelinesOptions = computed(() =>
  timelineOptions.map(o => ({ title: o.title, value: o.value }))
)
</script>

<template>
  <div id="formulario-servicios">
    <Forms
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
        v-model="projectType" 
        :label="pick(L.projectType)" 
        :items="projectTypesOptions" 
        item-title="title" 
        item-value="value" 
        variant="outlined" 
        density="comfortable" 
      />
      <v-textarea 
        v-model="projectDesc" 
        :label="pick(L.projectDesc)" 
        :hint="pick(L.projectDescHint)" 
        persistent-hint 
        :rules="[req('Descripción del proyecto es requerida'), minLength(10, 'Mínimo 10 caracteres'), maxLength(2000, 'Máximo 2000 caracteres')]" 
        rows="4" 
        auto-grow 
        variant="outlined" 
        density="comfortable" 
        class="span-2" 
      />
      <v-select 
        v-model="budget" 
        :label="pick(L.budget)" 
        :items="budgetsOptions" 
        item-title="title" 
        item-value="value" 
        variant="outlined" 
        density="comfortable" 
      />
      <v-select 
        v-model="timeline" 
        :label="pick(L.timeline)" 
        :items="timelinesOptions" 
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
  </div>
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

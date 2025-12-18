<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'
import ServicesSection from '@/modules/services/views/components/ServicesSection.vue'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import BackToTop from "@/components/navs/BackToTop.vue"

import { ref, watch, computed, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const route = useRoute()
const db = getFirestore()

const service = ref(null)
const loading = ref(true)

const title = ref('¿Tienes Preguntas sobre el Servicio?')
const text = ref('Nuestro equipo está listo para responder todas tus dudas y ayudarte a elegir la mejor opción.')
const introTitle = ref('')
const introText = ref('')
const leftParagraphs = ref([])
const ctaLabel = ref('Solicitar Cotización')
const ctaHref = ref('/servicios#formulario-servicios?scrollToForm=true')
const testimonialQuote = ref('')
const testimonialAuthor = ref('')
const testimonialAvatar = ref('')
const image = ref('')

const isServiceRoute = computed(() => route.name === 'service-detail')

function resetState() {
  service.value = null
  introTitle.value = ''
  introText.value = ''
  leftParagraphs.value = []
  testimonialQuote.value = ''
  testimonialAuthor.value = ''
  testimonialAvatar.value = ''
  image.value = ''
  loading.value = false
}

async function fetchService(slug) {
  resetState()
  loading.value = true

  try {
    const docRef = doc(db, 'services', slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      service.value = data
      introTitle.value = data.title
      introText.value = data.description
      leftParagraphs.value = data.leftParagraphs || []
      testimonialQuote.value = data.testimonialQuote || ''
      testimonialAuthor.value = data.testimonialAuthor || ''
      testimonialAvatar.value = data.testimonialAvatar || ''
      image.value = data.image || ''
    }
  } catch (e) {
    console.error(e)
    resetState()
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.slug,
  (slug) => {
    if (slug && isServiceRoute.value) fetchService(slug)
    else resetState()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  resetState()
})
</script>

<template>
  <section v-if="isServiceRoute" class="content-home">
    <Breadcrumbs />
    <BackToTop />

    <template v-if="loading">
      <p class="text-center py-10">Cargando servicio...</p>
    </template>

    <template v-else-if="service">
      <IntroSection
        :title="introTitle"
        :text="introText"
        :image="image"
        :reverse="false"
      />

      <InterestService
        :leftParagraphs="leftParagraphs"
        :ctaLabel="ctaLabel"
        :ctaHref="ctaHref"
        :testimonialQuote="testimonialQuote"
        :testimonialAuthor="testimonialAuthor"
        :testimonialAvatar="testimonialAvatar"
      />

      <ServicesSection />

      <CardFooter
        :title="title"
        :text="text"
        :ctaHref="ctaHref"
      />
    </template>

    <template v-else>
      <p class="text-center py-10">Servicio no encontrado.</p>
    </template>
  </section>
</template>

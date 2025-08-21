<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'

// Traducciones del cardFooter
const title = {
  es: 'Impulsemos juntos tu próxima gran idea',
  en: 'Let’s boost your next big idea',
}
const text = {
  es: 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.',
  en: 'Every great project starts with one action. Share your idea with us and let’s start making it real today.'
}

// Traducciones y datos del IntroSection
const introTitle = {
  es: 'Fábrica de Software',
  en: 'Software Factory',
}
const introText = {
  es: 'Ofrecemos desarrollo a la medida, bajo un modelo de Fábrica de Software, aplicando tecnologías y metodologías de punta, buenas prácticas, recurso humano calificado, con la integralidad y diversidad de perfiles que permitan asegurar las condiciones de calidad, tiempo y forma exigidos por la compañía, que respondan a su visión estratégica organizacional y tecnológica.',
  en: 'We offer tailored development under a Software Factory model, applying cutting-edge technologies and methodologies, best practices, and qualified talent, with the integrity and diversity of profiles to ensure the quality, time, and form required by the company, aligned with its organizational and technological strategy.',
}
const introImage = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop'
</script>

<template>
  <section class="content-home">
    <IntroSection :title="introTitle" :text="introText" :image="introImage" :reverse="false" />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'

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
  en: 'We offer tailored development under a Software Factory model, applying cutting‑edge technologies and methodologies, best practices, and qualified talent, with the integrity and diversity of profiles to ensure the quality, time, and form required by the company, aligned with its organizational and technological strategy.',
}
const introImage = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop'

// Traducciones y datos del IntroSection
const leftParagraphs = [
  {
    es: 'Contamos con equipos multidisciplinarios que integran analistas, arquitectos, desarrolladores, diseñadores y testers, capaces de abordar proyectos de cualquier complejidad. Aplicamos metodologías ágiles para optimizar tiempos y costos, manteniendo una comunicación constante con el cliente para garantizar que el producto final cumpla con los estándares de calidad y la visión estratégica de la organización.',
    en: 'We have multidisciplinary teams including analysts, architects, developers, designers and testers, able to tackle projects of any complexity. We apply agile methodologies to optimize time and costs, keeping constant communication with the client to ensure the final product meets quality standards and the organization’s strategic vision.',
  },
  {
    es: 'Nuestro compromiso no termina con la entrega: ofrecemos soporte continuo, actualizaciones y mejoras que aseguren la evolución del software a la par de tu negocio.',
    en: 'Our commitment does not end with delivery: we provide continuous support, updates and improvements to ensure the software evolves alongside your business.',
  },
]
const ctaLabel = {
  es: 'Solicitar Cotización',
  en: 'Request a Quote',
}
const ctaHref = '/contacto'

const testimonialQuote = {
  es: 'Gracias al modelo de Fábrica de Software de GIGS, logramos desarrollar una solución personalizada que se adaptó perfectamente a nuestras necesidades y cumplió con todos los estándares de calidad.',
  en: 'Thanks to GIGS’ Software Factory model, we built a tailored solution that matched our needs perfectly and met all quality standards.',
}
const testimonialAuthor = {
  es: '– PAULA HERNÁNDEZ, GERENTE DE TECNOLOGÍA EN SOLUTECH',
  en: '– PAULA HERNÁNDEZ, CTO AT SOLUTECH',
}
const testimonialAvatar = '' 
</script>

<template>
  <section class="content-home">
    <IntroSection :title="introTitle" :text="introText" :image="introImage" :reverse="false" />

    <InterestService :leftParagraphs="leftParagraphs" :ctaLabel="ctaLabel" :ctaHref="ctaHref"
      :testimonialQuote="testimonialQuote" :testimonialAuthor="testimonialAuthor"
      :testimonialAvatar="testimonialAvatar" />

    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

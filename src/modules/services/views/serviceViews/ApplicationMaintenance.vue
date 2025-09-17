<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'
import ServicesSection from '@/modules/services/views/components/ServicesSection.vue'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import mantenimiento from '@/assets/img/services/mantenimiento.png'
import BackToTop from "@/components/navs/BackToTop.vue"

// Traducciones del cardFooter
const title = {
  es: '¿Tienes Preguntas sobre el Servicio?',
  en: 'Do you have questions about the Service?',
}

const text = {
  es: 'Nuestro equipo está listo para responder todas tus dudas y ayudarte a elegir la mejor opción.',
  en: 'Our team is ready to answer all your questions and help you choose the best option.',
}

// Traducciones y datos del IntroSection
const introTitle = {
  es: 'Mantenimiento y Soporte a Aplicaciones',
  en: 'Application Maintenance and Support',
}

const introText = {
  es: 'En GIGS Consulting ofrecemos un servicio integral de Mantenimiento y Soporte a Aplicaciones que garantiza la continuidad operativa y el óptimo desempeño de tus sistemas. Nos encargamos de realizar actualizaciones, corregir errores, optimizar funcionalidades y asegurar la compatibilidad con nuevas tecnologías.',
  en: 'At GIGS Consulting we provide a comprehensive Application Maintenance and Support service that ensures operational continuity and optimal performance of your systems. We handle updates, fix errors, optimize functionalities, and ensure compatibility with new technologies.',
}

const leftParagraphs = [
  {
    es: 'Nuestro equipo monitorea de forma proactiva el estado de las aplicaciones para anticipar incidentes y minimizar el impacto en la operación de tu negocio. Además, brindamos soporte especializado para resolver incidencias críticas y asegurar que las aplicaciones estén siempre disponibles y alineadas con los objetivos estratégicos.',
    en: 'Our team proactively monitors the status of applications to anticipate incidents and minimize business impact. We also provide specialized support to resolve critical issues and ensure applications are always available and aligned with strategic objectives.',
  },
  {
    es: 'Ya sea en entornos locales o en la nube, nos aseguramos de que tus aplicaciones se mantengan actualizadas y evolucionen junto con las necesidades cambiantes de tu negocio.',
    en: 'Whether in on-premise or cloud environments, we ensure your applications remain updated and evolve with your business’s changing needs.',
  },
]

const ctaLabel = {
  es: 'Solicitar Cotización',
  en: 'Request a Quote',
}
const ctaHref = '/contacto'

const testimonialQuote = {
  es: 'Gracias al servicio de mantenimiento y soporte de aplicaciones de GIGS, nuestras soluciones tecnológicas se mantienen siempre estables y optimizadas, lo que nos ha permitido reducir costos y evitar caídas críticas en momentos clave.',
  en: 'Thanks to GIGS’ application maintenance and support service, our technology solutions remain stable and optimized, allowing us to reduce costs and avoid critical downtimes at key moments.',
}

const testimonialAuthor = {
  es: '– RICARDO LÓPEZ, JEFE DE SISTEMAS EN SOFTPLUS S.A.',
  en: '– RICARDO LÓPEZ, IT MANAGER AT SOFTPLUS S.A.',
}
const testimonialAvatar = ''
</script>

<template>
  <section class="content-home">
    <Breadcrumbs />
    <BackToTop />
    <IntroSection :title="introTitle" :text="introText" :image="mantenimiento" :reverse="false" />

    <InterestService :leftParagraphs="leftParagraphs" :ctaLabel="ctaLabel" :ctaHref="ctaHref"
      :testimonialQuote="testimonialQuote" :testimonialAuthor="testimonialAuthor"
      :testimonialAvatar="testimonialAvatar" />

    <ServicesSection />

    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'
import ServicesSection from '@/modules/services/views/components/ServicesSection.vue'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import BackToTop from "@/components/navs/BackToTop.vue"

import transformacionDigital from '@/assets/img/services/transformacion-digital.png'
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
  es: 'Transformación Digital',
  en: 'Digital Transformation',
}

const introText = {
  es: 'Deja a un lado las tareas repetitivas, ahorra tiempo cada día enfocándote en las cosas que realmente importan. En GIGS Consulting creemos que la transformación digital comienza con los procesos automatizados, manteniendo tu TI concentrada en las decisiones y acciones que impulsan tu negocio.',
  en: 'Leave repetitive tasks behind, save time every day by focusing on what really matters. At GIGS Consulting we believe that digital transformation starts with automated processes, keeping your IT focused on the decisions and actions that drive your business.',
}

const leftParagraphs = [
  {
    es: 'Imagina este escenario: una tarea que normalmente te toma 15 minutos al día, automatizada. Con un promedio de 22 días laborales al mes, esto significa más de 5 horas liberadas cada mes, que puedes invertir en actividades estratégicas, resolver problemas críticos y desarrollar nuevos oportunidades.',
    en: 'Imagine this scenario: a task that normally takes you 15 minutes a day, automated. With an average of 22 working days per month, this means more than 5 hours freed up each month, which you can invest in strategic activities, solving critical problems, and developing new opportunities.',
  },
  {
    es: 'Con resultados visibles y rápidos podrás evidenciar el ahorro, tanto en tiempo como en costos, fortaleciendo la eficiencia de tu organización y elevando tu ventaja competitiva en el mercado.',
    en: 'With visible and quick results you will see savings, both in time and costs, strengthening your organization’s efficiency and raising your competitive edge in the market.',
  },
]

const ctaLabel = {
  es: 'Solicitar Cotización',
  en: 'Request a Quote',
}
const ctaHref = '/contacto'

const testimonialQuote = {
  es: 'Gracias a la automatización implementada por GIGS, logramos optimizar nuestros procesos internos y mejorar significativamente los tiempos de respuesta en todas las áreas de la compañía. Una verdadera transformación que impulsó el crecimiento de nuestro negocio.',
  en: 'Thanks to the automation implemented by GIGS, we optimized our internal processes and significantly improved response times across all areas of the company. A true transformation that boosted our business growth.',
}

const testimonialAuthor = {
  es: '– JUAN PABLO RESTREPO, DIRECTOR GENERAL EN ALTIMAYEC S.A.S.',
  en: '– JUAN PABLO RESTREPO, CEO AT ALTIMAYEC S.A.S.',
}

const testimonialAvatar = ''
</script>

<template>
  <section class="content-home">
    <Breadcrumbs />
    <BackToTop />
    <IntroSection :title="introTitle" :text="introText" :image="transformacionDigital" :reverse="false" />

    <InterestService :leftParagraphs="leftParagraphs" :ctaLabel="ctaLabel" :ctaHref="ctaHref"
      :testimonialQuote="testimonialQuote" :testimonialAuthor="testimonialAuthor"
      :testimonialAvatar="testimonialAvatar" />

    <ServicesSection />

    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

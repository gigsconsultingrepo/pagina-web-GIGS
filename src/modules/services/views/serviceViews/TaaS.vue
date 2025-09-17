<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'
import ServicesSection from '@/modules/services/views/components/ServicesSection.vue'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import BackToTop from "@/components/navs/BackToTop.vue"

const title = {
  es: '¿Tienes Preguntas sobre el Servicio?',
  en: 'Do you have questions about the Service?',
}

const text = {
  es: 'Nuestro equipo está listo para responder todas tus dudas y ayudarte a elegir la mejor opción.',
  en: 'Our team is ready to answer all your questions and help you choose the best option.',
}

const introTitle = {
  es: 'TaaS (Talent as a Service)',
  en: 'TaaS (Talent as a Service)',
}
const introText = {
  es: 'En GIGS Consulting ofrecemos TaaS (Talent as a Service), un modelo flexible que te permite acceder, bajo demanda, a profesionales de Tecnologías de la Información altamente calificados. Esto reduce costos operativos y acelera la entrega de proyectos gracias a la rápida disponibilidad de talento, alineado con las necesidades específicas de tu negocio.',
  en: 'At GIGS Consulting we offer TaaS (Talent as a Service), a flexible model that gives you on‑demand access to highly qualified IT professionals. It reduces operational costs and speeds up project delivery thanks to fast talent availability, aligned with your company’s specific needs.',
}
const introImage =
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'

const leftParagraphs = [
  {
    es: 'Olvídate de los largos procesos de reclutamiento: con TaaS accedes a talento validado técnica y culturalmente, listo para integrarse a tu equipo en semanas, no meses. Nos encargamos de la atracción, evaluación (técnica y soft skills) y selección para asegurar el mejor encaje con tu organización y proyecto.',
    en: 'Forget long recruitment cycles: with TaaS you get technically and culturally vetted talent ready to join your team in weeks, not months. We handle sourcing, technical and soft‑skills assessments, and selection to ensure the best fit with your organization and project.',
  },
  {
    es: 'Nuestro modelo es flexible y escalable: puedes aumentar o reducir recursos según la demanda. Nosotros gestionamos la administración, el seguimiento del desempeño y el acompañamiento continuo del talento, para que tu equipo se enfoque en la estrategia y los resultados.',
    en: 'Our model is flexible and scalable—you can ramp resources up or down as needed. We manage administration, performance follow‑up, and continuous support so your team stays focused on strategy and outcomes.',
  },
]
const ctaLabel = {
  es: 'Solicitar Cotización',
  en: 'Request a Quote',
}
const ctaHref = '/contacto'

const testimonialQuote = {
  es: 'Con el servicio TaaS de GIGS incorporamos en poco tiempo un equipo de desarrolladores que se adaptó perfectamente a nuestras necesidades y cumplió con los estándares de calidad.',
  en: 'With GIGS’ TaaS service we quickly onboarded a team of developers that fit our needs perfectly and met our quality standards.',
}
const testimonialAuthor = {
  es: '– MIGUEL ÁLVAREZ, GERENTE DE TECNOLOGÍA EN NOVA SOLUTIONS',
  en: '– MIGUEL ÁLVAREZ, CTO AT NOVA SOLUTIONS',
}
const testimonialAvatar = ''
</script>

<template>
  <section class="content-home">
    <Breadcrumbs />
    <BackToTop />
    <IntroSection :title="introTitle" :text="introText" :image="introImage" :reverse="false" />

    <InterestService :leftParagraphs="leftParagraphs" :ctaLabel="ctaLabel" :ctaHref="ctaHref"
      :testimonialQuote="testimonialQuote" :testimonialAuthor="testimonialAuthor"
      :testimonialAvatar="testimonialAvatar" />

    <ServicesSection />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

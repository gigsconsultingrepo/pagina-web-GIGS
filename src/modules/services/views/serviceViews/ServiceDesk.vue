<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'
import ServicesSection from '@/modules/services/views/components/ServicesSection.vue'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import mesaAyuda from '@/assets/img/services/mesa-ayuda.png'
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
  es: 'Mesa de Ayuda/Servicio',
  en: 'Help Desk / Service Desk',
}

const introText = {
  es: 'En GIGS Consulting diseñamos y desarrollamos plataformas de Mesa de Ayuda adaptadas a las necesidades específicas de cada organización. Creamos sistemas que optimizan la gestión de solicitudes, incidentes y requerimientos, integrando funciones como seguimiento en tiempo real, reportes automatizados y canales de comunicación que permiten evaluar el desempeño.',
  en: 'At GIGS Consulting we design and develop Help Desk platforms tailored to the specific needs of each organization. We create systems that optimize the management of requests, incidents and requirements, integrating features such as real-time tracking, automated reporting, and communication channels that allow performance evaluation.',
}

const leftParagraphs = [
  {
    es: 'Nuestras soluciones son seguras, escalables y fáciles de usar, reduciendo el uso de soporte tradicional de forma manual. Al centralizar la atención en una única plataforma, logramos mayor eficiencia, control total sobre los incidentes y una mejor experiencia para los usuarios.',
    en: 'Our solutions are secure, scalable and user-friendly, reducing reliance on traditional manual support. By centralizing service into a single platform, we achieve greater efficiency, full control over incidents, and an improved user experience.',
  },
  {
    es: 'Integrar una Mesa de Ayuda con GIGS te ayudará a mejorar la atención a clientes y la productividad.',
    en: 'Integrating a Help Desk with GIGS will help you improve customer service and productivity.',
  },
]

const ctaLabel = {
  es: 'Solicitar Cotización',
  en: 'Request a Quote',
}
const ctaHref = '/contacto'

const testimonialQuote = {
  es: 'Nuestras soluciones son seguras, escalables y fáciles de usar, permitiendo a las organizaciones gestionar de manera más eficiente sus recursos y brindar una mejor experiencia a los usuarios. Con la Mesa de Ayuda de GIGS se fortalece la productividad y se asegura la continuidad del negocio.',
  en: 'Our solutions are secure, scalable and easy to use, enabling organizations to manage their resources more efficiently and deliver a better user experience. With GIGS’ Help Desk, productivity is strengthened, and business continuity is ensured.',
}

const testimonialAuthor = {
  es: '– ANDRÉS GÓMEZ, GERENTE DE SISTEMAS EN INFODCIP S.A.',
  en: '– ANDRÉS GÓMEZ, IT MANAGER AT INFODCIP S.A.',
}

const testimonialAvatar = ''
</script>

<template>
  <section class="content-home">
    <Breadcrumbs />
    <BackToTop />
    <IntroSection :title="introTitle" :text="introText" :image="mesaAyuda" :reverse="false" />

    <InterestService :leftParagraphs="leftParagraphs" :ctaLabel="ctaLabel" :ctaHref="ctaHref"
      :testimonialQuote="testimonialQuote" :testimonialAuthor="testimonialAuthor"
      :testimonialAvatar="testimonialAvatar" />

    <ServicesSection />

    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

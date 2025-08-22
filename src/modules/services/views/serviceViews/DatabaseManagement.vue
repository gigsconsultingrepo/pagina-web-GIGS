<script setup>
import CardFooter from '@/components/navs/CardFooter.vue'
import IntroSection from '@/modules/services/views/components/IntroSection.vue'
import InterestService from '@/modules/services/views/components/InterestService.vue'
import ServicesSection from '@/modules/services/views/components/ServicesSection.vue'
import gestionBaseDatos from '@/assets/img/services/gestion-bd.png'

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
  es: 'Gestión de Bases de Datos',
  en: 'Database Management',
}

const introText = {
  es: 'En GIGS Consulting ofrecemos un servicio integral de Gestión de Bases de Datos que garantiza un acceso rápido, seguro y confiable a la información crítica de tu organización. Implementamos arquitecturas optimizadas, aplicamos buenas prácticas y realizamos mantenimientos preventivos y correctivos para asegurar la continuidad de tus operaciones.',
  en: 'At GIGS Consulting we provide a comprehensive Database Management service that ensures fast, secure, and reliable access to your organization’s critical information. We implement optimized architectures, apply best practices, and perform preventive and corrective maintenance to ensure business continuity.',
}

const leftParagraphs = [
  {
    es: 'Nuestro equipo de especialistas domina las principales plataformas del mercado —MySQL, PostgreSQL, SQL Server y Oracle— y utiliza herramientas de monitoreo en tiempo real que permiten anticipar incidentes, optimizar el rendimiento y asegurar la integridad de los datos.',
    en: 'Our team of specialists masters the leading platforms in the market —MySQL, PostgreSQL, SQL Server, and Oracle— and uses real-time monitoring tools that allow anticipating incidents, optimizing performance, and ensuring data integrity.',
  },
  {
    es: 'Ya sea en entornos locales o en la nube, diseñamos soluciones escalables y resilientes, adaptadas a las necesidades de cada cliente. Con GIGS, tus datos estarán siempre disponibles, protegidos y listos para generar valor estratégico.',
    en: 'Whether on-premises or in the cloud, we design scalable and resilient solutions tailored to each client’s needs. With GIGS, your data will always be available, protected, and ready to generate strategic value.',
  },
]

const ctaLabel = {
  es: 'Solicitar Cotización',
  en: 'Request a Quote',
}
const ctaHref = '/contacto'

const testimonialQuote = {
  es: 'El servicio de gestión de bases de datos de GIGS ha sido clave para optimizar el rendimiento y garantizar la disponibilidad de la información crítica en el momento en el que realmente se ha necesitado.',
  en: 'GIGS’ database management service has been key to optimizing performance and ensuring the availability of critical information exactly when it was needed.',
}

const testimonialAuthor = {
  es: '– ANDRÉS GÓMEZ, GERENTE DE SISTEMAS EN INFODCIP S.A.',
  en: '– ANDRÉS GÓMEZ, IT MANAGER AT INFODCIP S.A.',
}
const testimonialAvatar = ''
</script>

<template>
  <section class="content-home">
    <IntroSection :title="introTitle" :text="introText" :image="gestionBaseDatos" :reverse="false" />

    <InterestService :leftParagraphs="leftParagraphs" :ctaLabel="ctaLabel" :ctaHref="ctaHref"
      :testimonialQuote="testimonialQuote" :testimonialAuthor="testimonialAuthor"
      :testimonialAvatar="testimonialAvatar" />

    <ServicesSection />

    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

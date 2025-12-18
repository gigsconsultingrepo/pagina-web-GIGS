<script setup>
import Services from './components/Services.vue'
import PortfolioServices from './components/PortfolioServices.vue'
import WorkProcess from './components/WorkProcess.vue'
import ServicesForm from './components/ServicesForm.vue'
import CardFooter from "@/components/navs/CardFooter.vue"
import BackToTop from "@/components/navs/BackToTop.vue"

const title = '¿Tienes Preguntas sobre los Servicio?'
const text = 'Nuestro equipo está listo para responder todas tus dudas y ayudarte a elegir la mejor opción'
</script>

<template>
  <section class="content-about">
    <Services />
    <PortfolioServices />
    <WorkProcess />
    <ServicesForm />
    <BackToTop />
    <CardFooter :title="title" :text="text" ctaHref="#formulario-servicios?scrollToForm=true" />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

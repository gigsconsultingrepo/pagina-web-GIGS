<script setup>
import Services from './components/Services.vue'
import PortfolioServices from './components/PortfolioServices.vue'
import WorkProcess from './components/WorkProcess.vue'
import ServicesForm from './components/ServicesForm.vue'
import CardFooter from "../../../components/navs/CardFooter.vue";

const title = {
  es: '¿Tienes Preguntas sobre los Servicio?',
  in: 'Do you have questions about our services?'
}
const text = {
  es: 'Nuestro equipo está listo para responder todas tus dudas y ayudarte a elegir la mejor opción',
  in: 'Our team is ready to answer all your questions and help you choose the best option.'
}

</script>


<template>
  <section class="content-about">
    <Services />
    <PortfolioServices />
    <WorkProcess />
    <ServicesForm />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

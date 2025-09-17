<script setup>
import AboutUs from "./components/AboutUs.vue";
import OurHistory from "./components/OurHistory.vue";
import Values from "./components/Values.vue";
import OurTeam from "./components/OurTeam.vue";
import CardFooter from "../../../components/navs/CardFooter.vue";
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import BackToTop from "@/components/navs/BackToTop.vue"

const title = {
  es: ' ', en: ' ',
}
const text = {
  es: '¿Te apasiona la tecnología y quieres crear soluciones que marcan la diferencia? En Gigs Consulting buscamos personas creativas, proactivas y con visión digital. Súmate a nuestro equipo y construyamos juntos el futuro de la innovación.',
  en: 'Are you passionate about technology and want to create solutions that make a difference? At Gigs Consulting, we’re looking for creative, proactive, and digitally savvy people. Join our team and let’s build the future of innovation together.'

}


</script>

<template>
  <section class="content-about">
    <Breadcrumbs />
    <AboutUs />
    <OurHistory />
    <Values />
    <OurTeam />
    <BackToTop />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

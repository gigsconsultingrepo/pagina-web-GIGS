<script setup>
import AboutUs from "./components/AboutUs.vue";
import OurHistory from "./components/OurHistory.vue";
import Values from "./components/Values.vue";
import OurTeam from "./components/OurTeam.vue";
import CardFooter from "@/components/navs/CardFooter.vue";
import BackToTop from "@/components/navs/BackToTop.vue"

const title = ' '
const text = '¿Te apasiona la tecnología y quieres crear soluciones que marcan la diferencia? En Gigs Consulting buscamos personas creativas, proactivas y con visión digital. Súmate a nuestro equipo y construyamos juntos el futuro de la innovación.'


</script>

<template>
  <section class="content-about">
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

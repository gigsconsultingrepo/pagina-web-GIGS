<script setup>
import Clients from "./components/Clients.vue";
import ActivitySectors from "./components/ActivitySectors.vue";
import OurClients from "./components/OurClients.vue";
import FeaturedClients from "./components/FeaturedClients.vue";
import Testimonials from "./components/Testimonials.vue";
import CardFooter from "@/components/navs/CardFooter.vue";
import BackToTop from "@/components/navs/BackToTop.vue"

const title = 'Impulsemos juntos tu próxima gran idea'
const text = 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.'

</script>

<template>
  <section class="content-about">
    <Clients />
    <ActivitySectors />
    <OurClients />
    <FeaturedClients />
    <Testimonials />
    <BackToTop />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

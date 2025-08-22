<script setup>
import Clients from "./components/Clients.vue";
import ActivitySectors from "./components/ActivitySectors.vue";
import OurClients from "./components/OurClients.vue";
import FeaturedClients from "./components/FeaturedClients.vue";
import Testimonials from "./components/Testimonials.vue";
import CardFooter from "../../../components/navs/CardFooter.vue";

const title = {
  es: 'Impulsemos juntos tu próxima gran idea', en: 'Let’s boost your next big idea',
}
const text = {
  es: 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.',
  en: 'Every great project starts with one action. Share your idea with us and let’s start making it real today.'
}

</script>

<template>
  <section class="content-about">
    <Clients />
    <ActivitySectors />
    <OurClients />
    <FeaturedClients />
    <Testimonials />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

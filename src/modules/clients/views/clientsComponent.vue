<script setup>
import Clients from "./components/Clients.vue";
import ActivitySectors from "./components/ActivitySectors.vue";
import OurClients from "./components/OurClients.vue";
import FeaturedClients from "./components/FeaturedClients.vue";
import Testimonials from "./components/Testimonials.vue";
</script>

<template>
  <section class="content-about">
    <Clients />
    <ActivitySectors />
    <OurClients />
    <FeaturedClients />
    <Testimonials />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

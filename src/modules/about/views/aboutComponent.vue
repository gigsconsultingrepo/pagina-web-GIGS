<script setup>
import AboutUs from "./components/AboutUs.vue";
import OurHistory from "./components/OurHistory.vue";
import Values from "./components/Values.vue";
import OurTeam from "./components/OurTeam.vue";
</script>

<template>
  <section class="content-about">
    <AboutUs />
    <OurHistory />
    <Values />
    <OurTeam />
  </section>
</template>

<style scoped>
.content-about {
  background: var(--color-background);
}
</style>

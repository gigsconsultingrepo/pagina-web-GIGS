<script setup>
import IntroContactSection from './components/IntroContactSection.vue';
import OptionsContactSection from './components/OptionsContactSection.vue';
import FormContact from './components/FormContact.vue';
import BackToTop from "@/components/navs/BackToTop.vue"

const title = 'Impulsemos juntos tu próxima gran idea'
const text = 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.'

</script>

<template>
  <section class="content-home">
    <IntroContactSection />
    <OptionsContactSection />
    <FormContact />
    <BackToTop />
  </section>
</template>

<style scoped></style>

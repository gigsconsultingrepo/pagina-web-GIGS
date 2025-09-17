<script setup>
import IntroContactSection from './components/IntroContactSection.vue';
import OptionsContactSection from './components/OptionsContactSection.vue';
import FormContact from './components/FormContact.vue';
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'
import BackToTop from "@/components/navs/BackToTop.vue"

const title = {
  es: 'Impulsemos juntos tu próxima gran idea', en: 'Let’s boost your next big idea',
}
const text = {
  es: 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.',
  en: 'Every great project starts with one action. Share your idea with us and let’s start making it real today.'
}

</script>

<template>
  <section class="content-home">
    <Breadcrumbs />
    <IntroContactSection />
    <OptionsContactSection />
    <FormContact />
    <BackToTop />
  </section>
</template>

<style scoped></style>

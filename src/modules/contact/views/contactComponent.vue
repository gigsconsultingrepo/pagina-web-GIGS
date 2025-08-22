<script setup>
import IntroContactSection from './components/IntroContactSection.vue';
import OptionsContactSection from './components/OptionsContactSection.vue';
import FormContact from './components/FormContact.vue';

const title = {
  es: 'Impulsemos juntos tu próxima gran idea', in: 'Let’s boost your next big idea',
}
const text = {
  es: 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.',
  in: 'Every great project starts with one action. Share your idea with us and let’s start making it real today.'
}

</script>

<template>
  <section class="content-home">
    <IntroContactSection />
    <OptionsContactSection />
    <FormContact />
  </section>
</template>

<style scoped></style>

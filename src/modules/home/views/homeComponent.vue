<script setup>
import Hero from './components/Hero.vue';
import Services from './components/Services.vue';
import Opinions from './components/Opinions.vue';
import CardFooter from '../../../components/navs/CardFooter.vue';

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
    <Hero />
    <Services />
    <Opinions />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

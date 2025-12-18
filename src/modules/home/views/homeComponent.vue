<script setup>
import Hero from './components/Hero.vue';
import Services from './components/Services.vue';
import Opinions from './components/Opinions.vue';
import WhyChooseUs from './components/WhyChooseUs.vue';
import CardFooter from '@/components/navs/CardFooter.vue';
import BackToTop from "@/components/navs/BackToTop.vue"

const title = 'Impulsemos juntos tu próxima gran idea'
const text = 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.'

</script>

<template>
  <section class="content-home">

    <Hero />
    <Services />
    <Opinions />
    <WhyChooseUs />
    <BackToTop />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

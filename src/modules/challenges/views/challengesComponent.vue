<script setup>
import CardFooter from '@/components/navs/CardFooter.vue';
import ChallengesForm from './components/ChallengesForm.vue';
import IntroChallenges from './components/IntroChallenges.vue';
import ProcessEvaluate from './components/ProcessEvaluate.vue';
import BackToTop from "@/components/navs/BackToTop.vue"

const title = 'Impulsemos juntos tu próxima gran idea'
const text = 'Cada gran proyecto empieza con una acción. Comparte tu idea con nosotros y comencemos hoy a convertirla en realidad.'

</script>

<template>
  <section class="content-home">
    <IntroChallenges />
    <ProcessEvaluate />
    <ChallengesForm />
    <BackToTop />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

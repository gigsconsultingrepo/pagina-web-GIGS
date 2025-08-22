<script setup>
import CardFooter from '../../../components/navs/CardFooter.vue';
import ChallengesForm from './components/ChallengesForm.vue';
import IntroChallenges from './components/IntroChallenges.vue';
import ProcessEvaluate from './components/ProcessEvaluate.vue';

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
    <IntroChallenges />
    <ProcessEvaluate />
    <ChallengesForm />
    <CardFooter :title="title" :text="text" ctaHref="/contacto" />
  </section>
</template>

<style scoped></style>

<script setup>
import { useI18n } from 'vue-i18n'
import { VContainer, VRow, VCol, VIcon } from 'vuetify/components'
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'

// Traducciones locales
const messages = {
  es: {
    challenges: {
      title: '¿Tienes un desafío tecnológico?',
      subtitle:
        'Si tienes un reto que requiere una solución digital con base en tecnologías tradicionales o disruptivas (Inteligencia Artificial, Analítica, Blockchain, Realidad Virtual o Aumentada), cuéntanos y afrontémoslo juntos.',
      items: [
        { icon: 'mdi-lightbulb-on-outline', text: 'Ideas Innovadoras' },
        { icon: 'mdi-bullseye-arrow', text: 'Resultados Garantizados' },
        { icon: 'mdi-rocket-launch-outline', text: 'Soluciones Personalizadas' },
      ],
    },
  },
  en: {
    challenges: {
      title: 'Do you have a technological challenge?',
      subtitle:
        'If you face a challenge that requires a digital solution based on traditional or disruptive technologies (Artificial Intelligence, Analytics, Blockchain, Virtual or Augmented Reality), tell us and let’s tackle it together.',
      items: [
        { icon: 'mdi-lightbulb-on-outline', text: 'Innovative Ideas' },
        { icon: 'mdi-bullseye-arrow', text: 'Guaranteed Results' },
        { icon: 'mdi-rocket-launch-outline', text: 'Tailored Solutions' },
      ],
    },
  },
}

const { t, tm } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages,
})
</script>

<template>
  <section class="intro-challenges">
    <Breadcrumbs />
    <v-container class="py-12 text-center">
      <h2 class="intro-title">{{ t('challenges.title') }}</h2>
      <p class="intro-subtitle mb-10">{{ t('challenges.subtitle') }}</p>

      <v-row justify="center" align="center" class="g-8">
        <v-col v-for="(item, i) in tm('challenges.items')" :key="'challenge-' + i" cols="12" sm="4"
          class="d-flex flex-column align-center">
          <VIcon :icon="item.icon" size="56" color="primary" class="mb-4" />
          <p class="challenge-text">{{ item.text }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.intro-title {
  font-weight: 900;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 12px;
}

.intro-subtitle {
  font-size: 1rem;
  max-width: 75ch;
  margin: 0 auto;
  opacity: 0.85;
  line-height: 1.45;
}

.challenge-text {
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
  text-align: center;
}
</style>

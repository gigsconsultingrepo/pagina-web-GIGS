<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    hero: {
      eyebrow: 'INICIO',
      title: 'Asesoría para el éxito empresarial',
      description:
        'Ofrecemos soluciones y servicios integrales basados en las últimas tecnologías, orientados a transformar digitalmente las organizaciones, generando valor a través del descubrimiento de oportunidades mediante innovación con Tecnología y Procesos.',
      btnOne: 'Nuestros Servicios',
      btnTwo: 'Trabaja Con Nosotros'
    }
  },
  en: {
    hero: {
      eyebrow: 'HOME',
      title: 'Business Success Consulting',
      description:
        'We offer comprehensive solutions and services based on the latest technologies, aimed at digitally transforming organizations and generating value through the discovery of opportunities via innovation with Technology and Processes.',
      btnOne: 'Our Services',
      btnTwo: 'Work With Us'
    }
  }
}

const { t } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages
})
</script>

<template>
  <section class="hero-wrap">
    <v-container class="py-10 py-md-14">
      <v-row align="center" justify="space-between" class="hero-row">
        <v-col cols="12" md="7" lg="6">
          <div class="eyebrow">{{ t('hero.eyebrow') }}</div>
          <h1 class="hero-title">{{ t('hero.title') }}</h1>
          <p class="hero-desc">{{ t('hero.description') }}</p>

          <div class="d-flex flex-wrap ga-3 mt-4">
            <v-btn variant="flat" color="white" class="text-high-emphasis font-weight-bold rounded-m btn-primary" size="large" :to="{ name: 'services' }">
              {{ t('hero.btnOne') }}
            </v-btn>

            <v-btn variant="flat" color="grey-darken-4" class="font-weight-bold rounded-m btn-second" size="large" :to="{ name: 'contact' }">
              {{ t('hero.btnTwo') }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="5" lg="5" class="order-1 order-md-2 d-flex justify-center px-4 mb-6 mb-md-0">
          <v-img src="@/assets/img/hero.png" alt="Ilustración de asesor" class="hero-figure" cover eager />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero-wrap {
  position: relative;
  overflow: hidden;
  color: var(--vt-c-white, #fff);
  background: linear-gradient(140deg,
      var(--g1, #0d2c85) 0%,
      var(--g2, #0f48c9) 50%,
      var(--g3, #0ea5e9) 100%);
}

.eyebrow {
  letter-spacing: .1em;
  font-size: 12px;
  text-transform: uppercase;
  opacity: .9;
  margin-bottom: 8px;
}

.hero-title {
  margin: 0 0 14px;
  line-height: 1.05;
  font-weight: 800;
  font-size: clamp(28px, 4.5vw, 56px);
}

.hero-desc {
  margin: 0 0 22px;
  max-width: 60ch;
  opacity: .95;
}

.hero-img :deep(img) {
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, .3));
}
</style>

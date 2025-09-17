<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    hero: {
      title: 'Asesoría para el éxito empresarial',
      description:
        'Ofrecemos soluciones y servicios integrales basados en las últimas tecnologías, orientados a transformar digitalmente las organizaciones, generando valor a través del descubrimiento de oportunidades mediante innovación con Tecnología y Procesos.',
      btnOne: 'Nuestros Servicios',
      btnTwo: 'Trabaja Con Nosotros'
    }
  },
  en: {
    hero: {
      title: 'Business Success Consulting',
      description:
        'We offer comprehensive solutions and services based on the latest technologies, aimed at digitally transforming organizations and generating value through the discovery of opportunities via innovation with Technology and Processes.',
      btnOne: 'Our Services',
      btnTwo: 'Work With Us'
    }
  }
}

const { t } = useI18n({ useScope: 'local', inheritLocale: true, messages })
</script>

<template>
  <section class="hero-wrap">
    <v-container class="py-8 py-md-14">
      <v-row class="hero-row" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="7" lg="6" class="order-2 order-md-1 text-center text-md-start px-4">

          <h1 class="hero-title">{{ t('hero.title') }}</h1>
          <p class="hero-desc mx-auto mx-md-0">{{ t('hero.description') }}</p>

          <div class="d-flex flex-wrap ga-3 mt-4 justify-center justify-md-start">
            <v-btn variant="flat" color="white"
              class="text-high-emphasis font-weight-bold rounded-m btn-primary" size="large"
              :to="{ name: 'services' }">
              {{ t('hero.btnOne') }}
            </v-btn>

            <v-btn variant="flat" color="grey-darken-4" class="font-weight-bold rounded-m btn-second"
              size="large" :to="{ name: 'contact' }">
              {{ t('hero.btnTwo') }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="5" lg="5" class="order-1 order-md-2 d-flex justify-center px-4 mb-6 mb-md-0">
          <img src="@/assets/img/hero.png" alt="Ilustración de asesor" width="258" class="hero-figure" />
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


.hero-title {
  margin: 0 0 14px;
  line-height: 1.05;
  font-weight: 800;
  font-size: clamp(28px, 6vw, 56px);
}

.hero-desc {
  margin: 0 0 22px;
  max-width: 60ch;
  opacity: .95;
}

.hero-figure {
  height: auto;
  border-radius: 0;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, .3));
}

@media (max-width: 959px) {
  .hero-desc {
    max-width: 70ch;
  }
  .hero-figure{
    margin-top: 1em;
    width: 200px;
  }
  .hero-row{ flex-direction: column-reverse; }
}
</style>

<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    services: {
      eyebrow: 'INICIO / SERVICIOS',
      subtitle: 'Nuestros Servicios',
      title: 'Soluciones Tecnológicas Integrales',
      description: 'Transformamos ideas en realidades digitales con servicios de desarrollo, consultoría e implementación tecnológica que impulsan el crecimiento de tu empresa.'
    }
  },
  en: {
    services: {
      eyebrow: 'HOME / SERVICES',
      subtitle: 'Our Services',
      title: 'Integrated Technological Solutions',
      description: 'We transform ideas into digital realities through development, consulting, and technology implementation services that drive your company’s growth.'
    }
  }
}

const { t } = useI18n({ useScope: 'local', inheritLocale: true, messages })
</script>

<template>
  <section class="services-wrap">
    <v-container class="py-8 py-md-14">
      <v-row class="services-row" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="7" lg="6" class="order-2 order-md-1 text-center text-md-start px-4">
          <div class="eyebrow">{{ t('services.eyebrow') }}</div>
          <div class="subtitle">{{ t('services.subtitle') }}</div>
          <h1 class="services-title">{{ t('services.title') }}</h1>
          <p class="services-desc mx-auto mx-md-0">{{ t('services.description') }}</p>
        </v-col>

        <v-col cols="12" md="5" lg="5" class="order-1 order-md-2 d-flex justify-center px-4 mb-6 mb-md-0">
          <div class="illustration-container">
            <div class="character">
              <div class="character-placeholder">
                <img src="@/assets/img/services/services-character.png" alt="Clientes GIGS" class="character-img" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.services-wrap {
  position: relative;
  overflow: hidden;
  color: var( --vt-c-white);
  background: var( --color-primary);
}

.eyebrow {
  letter-spacing: .1em;
  font-size: 12px;
  text-transform: uppercase;
  opacity: .7;
  margin-bottom: 8px;
  color: var( --vt-c-white);
}

.subtitle {
  font-size: 18px;
  font-weight: 700;
  color: var(  --vt-c-white);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.services-title {
  margin: 0 0 20px;
  width: 20ch;
  line-height: 1.1;
  font-weight: 800;
  font-size: clamp(32px, 6vw, 56px);
  color: var(  --vt-c-white);
}

.services-desc {
  margin: 0;
  max-width: 80ch;
  opacity: .9;
  font-size: 16px;
  line-height: 1.6;
}


@media (max-width: 959px) {
  .services-desc {
    max-width: 70ch;
  }
  
  .illustration-container {
    height: 310px;
  }
  
  .services-row {
    flex-direction: column-reverse;
  }
}
</style>

<script setup>
import { useI18n } from 'vue-i18n'

const MESSAGES = {
  es: {
    title: 'En construcción',
    subtitle: 'Estamos preparando algo increíble.',
    desc: 'Esta sección aún no está lista, pero pronto estará disponible. Gracias por tu paciencia.',
    ctas: {
      home: 'Volver al inicio',
      contact: 'Contáctanos'
    }
  },
  en: {
    title: 'Under Construction',
    subtitle: 'We’re building something great.',
    desc: 'This section isn’t ready yet, but it will be available soon. Thanks for your patience.',
    ctas: {
      home: 'Go to Home',
      contact: 'Contact Us'
    }
  }
}

const { t, mergeLocaleMessage } = useI18n({ useScope: 'local' })
mergeLocaleMessage('es', MESSAGES.es)
mergeLocaleMessage('en', MESSAGES.en)
</script>

<template>
  <section class="uc-section">
    <v-container class="py-12 py-md-16">
      <v-row justify="center" align="center">
        <v-col cols="12" md="10" lg="8">
          <v-card class="uc-card" elevation="0">
            <div class="uc-card__grid">
              <div class="uc-hero">
                <div class="uc-icon-wrap" aria-hidden="true">
                  <v-icon size="52" class="uc-icon">mdi-cog-sync</v-icon>
                  <v-icon size="24" class="uc-icon small">mdi-chip</v-icon>
                </div>

                <div class="uc-headings">
                  <h1 class="uc-title">
                    <span class="glow">{{ t('title') }}</span>
                  </h1>
                  <p class="uc-subtitle">{{ t('subtitle') }}</p>
                </div>
              </div>

              <div class="uc-content">
                <p class="uc-desc">
                  {{ t('desc') }}
                </p>

                <div class="uc-cta">
                  <v-btn color="primary" class="btn-primary" variant="flat" :to="{ path: '/' }"
                    prepend-icon="mdi-home-variant-outline">
                    {{ t('ctas.home') }}
                  </v-btn>

                  <v-btn class="btn-second" variant="outlined" color="primary" :to="{ path: '/contacto' }"
                    prepend-icon="mdi-email-outline">
                    {{ t('ctas.contact') }}
                  </v-btn>
                </div>

                <div class="circuit">
                  <span /><span /><span /><span />
                </div>
              </div>
            </div>

            <div class="scanline" aria-hidden="true"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.uc-section {
  background:
    radial-gradient(1000px 500px at 10% -20%, rgba(13, 110, 253, 0.08), transparent 50%),
    radial-gradient(1000px 500px at 90% 120%, rgba(10, 21, 51, 0.12), transparent 52%),
    var(--color-background);
  color: var(--color-text);
}

.uc-card {
  position: relative;
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg,
      var(--color-background-soft) 0%,
      var(--color-background-mute) 100%);
  border-radius: 16px;
  overflow: hidden;
}

.uc-card__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 28px 22px;
}

@media (min-width: 960px) {
  .uc-card__grid {
    grid-template-columns: 1.1fr 1fr;
    padding: 36px 32px;
    gap: 24px;
  }
}

.uc-hero {
  display: grid;
  align-content: start;
  gap: 12px;
}

.uc-icon-wrap {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 20px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  box-shadow: 0 12px 30px rgba(13, 110, 253, .18);
}

.uc-icon.small {
  position: absolute;
  right: -8px;
  bottom: -8px;
  background: var(--vt-c-white);
  color: var(--color-primary);
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 6px 18px rgba(13, 110, 253, .18);
}

.uc-headings {
  margin-top: 8px;
}

.uc-title {
  margin: 0;
  font-weight: 800;
  color: var(--color-heading);
  font-size: clamp(1.4rem, 1.2rem + 1vw, 2rem);
  letter-spacing: .2px;
}

.uc-subtitle {
  margin: 6px 0 0;
  color: var(--vt-c-text-light-2);
  font-size: 1rem;
}

.glow {
  text-shadow:
    0 0 12px rgba(13, 110, 253, .2),
    0 0 2px rgba(13, 110, 253, .2);
}

.uc-content {
  display: grid;
  align-content: start;
  gap: 16px;
}

.uc-desc {
  margin: 0;
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.7;
}

.uc-cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-primary:hover {
  transform: translateY(-1px);
}

.btn-second:hover {
  transform: translateY(-1px);
}

.circuit {
  position: relative;
  margin-top: 8px;
  height: 24px;
}

.circuit span {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), transparent);
  opacity: .6;
  border-radius: 2px;
}

.circuit span:nth-child(1) {
  left: 0;
  top: 4px;
  width: 42%;
}

.circuit span:nth-child(2) {
  left: 12%;
  top: 10px;
  width: 58%;
}

.circuit span:nth-child(3) {
  left: 4%;
  top: 16px;
  width: 26%;
}

.circuit span:nth-child(4) {
  right: 6%;
  top: 16px;
  width: 22%;
  background: linear-gradient(270deg, var(--color-primary), transparent);
}

.scanline {
  position: absolute;
  left: 0;
  right: 0;
  top: -120px;
  height: 120px;
  background: linear-gradient(180deg, rgba(13, 110, 253, 0.12), transparent 70%);
  filter: blur(10px);
  animation: sweep 4.2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes sweep {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  50% {
    transform: translateY(360px);
    opacity: .75;
  }

  90% {
    opacity: 0;
  }

  100% {
    transform: translateY(720px);
    opacity: 0;
  }
}
</style>

<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    process: {
      title: 'Nuestro Proceso de Trabajo',
      subtitle: 'Metodología probada para entregar resultados excepcionales',
      steps: [
        { title: 'Descubrimiento y Análisis', desc: 'Entendemos tus necesidades, analizamos el contexto y definimos los objetivos del proyecto.' },
        { title: 'Planificación y Diseño', desc: 'Desarrollamos la arquitectura técnica, diseñamos la experiencia de usuario y creamos prototipos.' },
        { title: 'Desarrollo e Implementación', desc: 'Construimos la solución usando las mejores tecnologías y metodologías ágiles.' },
        { title: 'Testing y Calidad', desc: 'Realizamos pruebas exhaustivas para asegurar la calidad y el rendimiento óptimo.' },
        { title: 'Despliegue y Soporte', desc: 'Realizamos pruebas exhaustivas para asegurar la calidad y el rendimiento óptimo.' }
      ]
    }
  },
  en: {
    process: {
      title: 'Our Work Process',
      subtitle: 'Proven methodology to deliver exceptional results.',
      steps: [
        { title: 'Discovery and Analysis', desc: 'We understand your needs, analyze the context, and define the project objectives.' },
        { title: 'Planning and Design', desc: 'We develop the technical architecture, design the user experience, and create prototypes.' },
        { title: 'Development and Implementation', desc: 'We build the solution using the best technologies and agile methodologies.' },
        { title: 'Testing and Quality', desc: 'We conduct thorough testing to ensure quality and optimal performance.' },
        { title: 'Deployment and Support', desc: 'We perform thorough testing to ensure quality and optimal performance.' }
      ]
    }
  }
}

const { t, tm } = useI18n({ useScope: 'local', inheritLocale: true, messages })
</script>

<template>
  <section class="process-section">
    <v-container class="py-12 py-md-14">
      <header class="text-center mb-8 mb-md-10">
        <h2 class="title">{{ t('process.title') }}</h2>
        <p class="subtitle">{{ t('process.subtitle') }}</p>
      </header>

      <div class="timeline">
        <div class="line" aria-hidden="true">
          <span class="glow"></span>
        </div>

        <v-row class="gy-8" justify="center">
          <v-col v-for="(step, i) in tm('process.steps')" :key="i" cols="12" md="10" class="step-col">
            <div class="step" :class="{ right: i % 2 === 1 }">
              <div class="badge"><span>{{ i + 1 }}</span></div>

              <v-card class="step-card" elevation="0">
                <div class="step-card__body">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-desc">{{ step.desc }}</p>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.process-section {
  background: #D9D9D9;
  color: var(--color-text);
}

.title {
  margin: 0 0 6px;
  font-weight: 900;
  color: var(--color-heading);
  font-size: clamp(24px, 4vw, 32px);
}

.subtitle {
  margin: 0 auto;
  max-width: 75ch;
  font-size: 16px;
  opacity: .9;
  line-height: 1.5;
}

.timeline {
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: 12px 0;
}

.line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, var(--color-border), transparent 18%, var(--color-border) 50%, transparent 82%, var(--color-border));
  opacity: .9;
  border-radius: 2px;
}

.line .glow {
  position: absolute;
  left: 50%;
  width: 220px;
  height: 220px;
  background: radial-gradient(closest-side, rgba(13, 110, 253, .14), transparent 70%);
  transform: translateX(-50%);
  top: 20%;
  filter: blur(12px);
  animation: float 7s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0% {
    transform: translate(-50%, 0);
    opacity: .6
  }

  50% {
    transform: translate(-50%, 60px);
    opacity: .8
  }

  100% {
    transform: translate(-50%, 0);
    opacity: .6
  }
}

.step {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 56px 1fr;
  gap: 16px;
  align-items: center;
}

.step:not(.right) .step-card {
  grid-column: 1;
}

.step:not(.right) .badge {
  grid-column: 2;
  justify-self: center;
}

.step.right .step-card {
  grid-column: 3;
}

.step.right .badge {
  grid-column: 2;
  justify-self: center;
}

.badge {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: var(--vt-c-white);
  background: linear-gradient(180deg, var(--color-primary), var(--color-primary-dark));
  box-shadow: 0 8px 22px rgba(13, 110, 253, .22), inset 0 2px 6px rgba(255, 255, 255, .25);
  border: 1px solid rgba(255, 255, 255, .2);
}

.badge span {
  font-weight: 900;
  font-size: 18px;
}

.step-card {
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, var(--color-background-soft), var(--color-background-mute));
  border-radius: 14px;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}

.step-card__body {
  padding: 18px;
}

.step-title {
  margin: 0 0 6px;
  font-weight: 800;
  font-size: 18px;
  color: var(--color-heading);
}

.step-desc {
  margin: 0;
  color: var(--vt-c-text-light-2);
  line-height: 1.6;
  font-size: .98rem;
}

.step-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-hover);
  box-shadow: 0 10px 28px rgba(13, 110, 253, .12);
}

@media (max-width: 959px) {

  .line {
    left: 20px;
    transform: none;
    width: 2px;
    top: 0;
    bottom: 0;
  }

  .line .glow {
    display: none;
  }

  .step {
    gap: 12px;
    align-items: start;
  }

  .badge {
    width: 40px;
    height: 40px;
    box-shadow: 0 6px 16px rgba(13, 110, 253, .18), inset 0 2px 5px rgba(255, 255, 255, .25);
  }

  .badge span {
    font-size: 15px;
  }

  .step .badge {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    margin-top: 2px;
  }

  .step .step-card {
    grid-column: 2;
    grid-row: 1;
  }

  .step-card__body {
    padding: 14px 14px;
  }

  .step-title {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .step-desc {
    font-size: .92rem;
    line-height: 1.55;
  }
}

@media (max-width: 600px) {
  .subtitle {
    font-size: 15px;
  }

  .timeline {
    padding-top: 4px;
  }

  .step {
    gap: 10px;
  }

  .step-card__body {
    padding: 12px 12px;
  }
}
@media (max-width: 450px) {
  .step {
    grid-template-columns: auto !important
  }

}
</style>

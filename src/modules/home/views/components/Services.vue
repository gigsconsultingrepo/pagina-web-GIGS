<script setup>
import { useI18n } from 'vue-i18n'
import empresa from '@/assets/img/empresas.png'
import chatbots from '@/assets/img/chatbots.png'
import nube from '@/assets/img/nube.png'
import portafolio from '@/assets/img/portafolio.png'

const messages = {
  es: {
    head: { top: '4', category: 'SERVICIOS', today: 'GIGS CONSULTING' },
    items: [
      { title: 'Empresas', desc: 'Webs corporativas funcionales y escalables.' },
      { title: 'Chatbots', desc: 'Asistentes virtuales inteligentes 24/7.' },
      { title: 'Soluciones en la nube', desc: 'Migración y gestión segura desde cualquier dispositivo.' },
      { title: 'Portafolios', desc: 'Diseños visuales para mostrar tu trabajo profesional.' }
    ]
  },
  en: {
    head: { top: '4', category: 'SERVICES', today: 'GIGS CONSULTING' },
    items: [
      { title: 'Companies', desc: 'Corporate websites: functional and scalable.' },
      { title: 'Chatbots', desc: 'Smart virtual assistants 24/7.' },
      { title: 'Cloud Solutions', desc: 'Secure migration & management from any device.' },
      { title: 'Portfolios', desc: 'Visual designs to showcase your work.' }
    ]
  }
}

const { t, tm } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages
})

const icons = [empresa, chatbots, nube, portafolio]
</script>

<template>
  <section class="services-top">
    <v-container class="py-8 py-md-12">
      <div class="title-wrap d-flex align-start ga-4 mb-8 mb-md-12">
        <span class="t-big">{{ t('head.top') }}</span>
        <div class="t-side">
          <div class="t-cat">{{ t('head.category') }}</div>
          <div class="t-today">{{ t('head.today') }}</div>
        </div>
      </div>

      <v-row class="g-6" align="stretch">
        <v-col v-for="(it, i) in tm('items')" :key="`svc-${i}`" cols="12" sm="6" md="3" class="d-flex">
          <!-- wrapper para poder posicionar el número FUERA de la tarjeta -->
          <div class="rank-wrap">
            <div class="rank-num" :aria-hidden="true">{{ i + 1 }}</div>

            <div class="rank-card">
              <div class="poster">
                <img :src="icons[i]" :alt="it.title" />
              </div>

              <h3 class="svc-title">{{ it.title }}</h3>
              <p class="svc-desc">{{ it.desc }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.services-top {
  position: relative;
  background: var(--vt-c-white);
  color: var(--vt-c-text-light-1);
}

.title-wrap {
  user-select: none;
}

.t-big {
  font-weight: 900;
  letter-spacing: .02em;
  line-height: .85;
  font-size: clamp(48px, 12vw, 150px);
  color: var(--vt-c-text-light-1);
}

.t-side {
  margin-top: .6rem;
}

.t-cat,
.t-today {
  font-weight: 800;
  letter-spacing: .35em;
  font-size: clamp(12px, 1.8vw, 20px);
  opacity: .8;
}

.rank-wrap {
  position: relative;
  width: 100%;
  padding-left: clamp(18px, 5vw, 50px);
}

/* NÚMERO AZUL con resplandor y fuera de la tarjeta */
.rank-num {
  position: absolute;
  left: 0;
  /* pegado al borde izquierdo del wrapper */
  bottom: -18px;
  transform: translateX(-10%);
  /* lo empuja hacia afuera */
  z-index: 0;
  font-weight: 900;
  line-height: .8;
  font-size: clamp(110px, 16vw, 220px);
  color: transparent;
  /* azul principal (de base.css) */
  /* -webkit-text-stroke: 6px var(--vt-c-indigo); */
  text-stroke: 6px var(--vt-c-indigo);
  text-shadow:
    0 0 10px rgba(15, 72, 201, .25),
    0 0 22px rgba(15, 72, 201, .25),
    0 6px 18px rgba(0, 0, 0, .15);
  pointer-events: none;
}

.rank-num:hover{
  -webkit-text-stroke: 6px var(--vt-c-indigo);
}

/* Tarjeta en blanco con borde de base.css */
.rank-card {
  position: relative;
  z-index: 1;
  /* por encima del número */
  width: 100%;
  background: var(--vt-c-white);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 18px 16px 20px;
  overflow: visible;
  /* no recorta nada */
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

.rank-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--color-border), var(--vt-c-indigo) 25%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, .12);
}

/* icono */
.poster {
  width: 100%;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
}

.poster img {
  width: min(160px, 70%);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, .12));
}

/* textos */
.svc-title {
  margin: 0 0 6px;
  font-weight: 800;
  font-size: clamp(16px, 2.2vw, 18px);
  color: var(--vt-c-text-light-1);
}

.svc-desc {
  margin: 0;
  opacity: .85;
  font-size: 13px;
  line-height: 1.35;
  min-height: 2.7em;
}

/* Responsivo: ajusta la “salida” del número en pantallas pequeñas */
@media (max-width: 600px) {
  .rank-wrap {
    padding-left: 40px;
  }

  .rank-num {
    transform: translateX(-45%);
    font-size: clamp(90px, 24vw, 150px);
  }
}

@media (max-width: 380px) {
  .rank-wrap {
    padding-left: 34px;
  }

  .rank-num {
    transform: translateX(-40%);
    bottom: -16px;
  }
}
</style>

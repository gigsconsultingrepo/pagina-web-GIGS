<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import empresa from '@/assets/img/empresas.png'
import chatbots from '@/assets/img/chatbots.png'
import nube from '@/assets/img/nube.png'
import portafolio from '@/assets/img/portafolio.png'

import fabricaSoftware from '@/assets/img/services/fabrica-software.png'
import transformacionDigital from '@/assets/img/services/transformacion-digital.png'
import taas from '@/assets/img/services/taas.png'

const messages = {
  es: {
    head: { top: '4', category: 'SERVICIOS', today: 'GIGS CONSULTING' },
    items: [
      { title: 'Empresas', desc: 'Webs corporativas funcionales y escalables.' },
      { title: 'Chatbots', desc: 'Asistentes virtuales inteligentes 24/7.' },
      { title: 'Soluciones en la nube', desc: 'Migración y gestión segura desde cualquier dispositivo.' },
      { title: 'Portafolios', desc: 'Diseños visuales para mostrar tu trabajo profesional.' }
    ],
    showcase: {
      title: 'Nuestros Servicios',
      subtitle:
        'En GIGS unimos innovación y tecnología para ofrecer soluciones que transforman la manera en que las empresas trabajan, comunican y crecen'
    },
    showcaseItems: [
      { title: 'Fábrica de Software', to: '/servicios/fabrica-software' },
      { title: 'Transformación Digital', to: '/servicios/transformación-digital' },
      { title: 'TaaS (Talent as a Service)', to: '/servicios/taas' }
    ],
    cta: { more: 'Ver Más', all: 'Ver Todos' }
  },
  en: {
    head: { top: '4', category: 'SERVICES', today: 'GIGS CONSULTING' },
    items: [
      { title: 'Companies', desc: 'Corporate websites: functional and scalable.' },
      { title: 'Chatbots', desc: 'Smart virtual assistants 24/7.' },
      { title: 'Cloud Solutions', desc: 'Secure migration & management from any device.' },
      { title: 'Portfolios', desc: 'Visual designs to showcase your work.' }
    ],
    showcase: {
      title: 'Our Services',
      subtitle:
        'At GIGS we combine innovation and technology to deliver solutions that transform how companies work, communicate, and grow'
    },
    showcaseItems: [
      { title: 'Software Factory', to: '/services/software-factory' },
      { title: 'Digital Transformation', to: '/services/digital-transformation' },
      { title: 'TaaS (Talent as a Service)', to: '/services/taas' }
    ],
    cta: { more: 'Learn More', all: 'View All' }
  }
}

const { t, tm } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages
})

const icons = [empresa, chatbots, nube, portafolio]

const showcaseImgs = [fabricaSoftware, transformacionDigital, taas]

const router = useRouter()
const goCard = (i) => {
  const list = tm('showcaseItems')
  router.push(list?.[i]?.to || '/servicios')
}
const goAll = () => router.push('/servicios')
</script>

<template>
  <section class="services-top">
    <v-container class="py-8 py-md-12">
      <div class="info-head">
        <h2 class="info-title">{{ t('showcase.title') }}</h2>
        <p class="info-sub">{{ t('showcase.subtitle') }}</p>
      </div>

      <v-row class="g-8 g-md-12" align="stretch" justify="center">
        <v-col v-for="(it, i) in tm('showcaseItems')" :key="'info-' + i" cols="12" sm="6" md="4"
          class="d-flex justify-center">
          <article class="info-card" :style="{ backgroundImage: `url(${showcaseImgs[i]})` }">
            <div class="info-content">
              <h3 class="info-name">{{ it.title }}</h3>
              <button class="info-pill" type="button" @click="goCard(i)">
                {{ t('cta.more') }}
              </button>
            </div>
          </article>
        </v-col>
      </v-row>

      <div class="info-bottom">
        <button class="info-primary" type="button" @click="goAll">
          {{ t('cta.all') }}
        </button>
      </div>

      <div class="title-wrap d-flex align-start ga-4 mb-8 mb-md-12">
        <span class="t-big">{{ t('head.top') }}</span>
        <div class="t-side">
          <div class="t-cat">{{ t('head.category') }}</div>
          <div class="t-today">{{ t('head.today') }}</div>
        </div>
      </div>

      <v-row class="g-6" align="stretch">
        <v-col v-for="(it, i) in tm('items')" :key="`svc-${i}`" cols="12" sm="6" md="3" class="d-flex">
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
  font-size: clamp(3rem, 12vw, 9.375rem);
  color: var(--vt-c-text-light-1);
}

.t-side {
  margin-top: .6rem;
}

.t-cat,
.t-today {
  font-weight: 800;
  letter-spacing: .35em;
  font-size: clamp(0.75rem, 1.8vw, 1.25rem);
  opacity: .8;
}

.rank-wrap {
  position: relative;
  width: 100%;
  padding-left: clamp(18px, 5vw, 50px);
}

.rank-num {
  position: absolute;
  left: 0;
  bottom: -18px;
  transform: translateX(-10%);
  z-index: 0;
  font-weight: 900;
  line-height: .8;
  font-size: clamp(6.875rem, 16vw, 13.75rem);
  color: transparent;
  text-stroke: 6px var(--vt-c-indigo);
  text-shadow: 0 0 10px rgba(15, 72, 201, .25), 0 0 22px rgba(15, 72, 201, .25), 0 6px 18px rgba(0, 0, 0, .15);
  pointer-events: none;
}

.rank-num:hover {
  -webkit-text-stroke: 6px var(--vt-c-indigo);
}

.rank-card {
  position: relative;
  z-index: 1;
  width: 100%;
  background: var(--vt-c-white);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 18px 16px 20px;
  overflow: visible;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

.rank-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--color-border), var(--vt-c-indigo) 25%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, .12);
}

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

.svc-title {
  margin: 0 0 6px;
  font-weight: 800;
  font-size: clamp(1rem, 2.2vw, 1.125rem);
  color: var(--vt-c-text-light-1);
}

.svc-desc {
  margin: 0;
  opacity: .85;
  font-size: var(--text-sm);
  line-height: 1.35;
  min-height: 2.7em;
}

@media (max-width:600px) {
  .rank-wrap {
    padding-left: 40px;
  }

  .rank-num {
    transform: translateX(-45%);
    font-size: clamp(90px, 24vw, 150px);
  }
}

@media (max-width:380px) {
  .rank-wrap {
    padding-left: 34px;
  }

  .rank-num {
    transform: translateX(-40%);
    bottom: -16px;
  }
}

.info-head {
  text-align: center;
  max-width: 980px;
  margin: 48px auto 24px;
}

.info-title {
  margin: 0 0 10px;
  font-weight: 900;
  font-size: clamp(1.75rem, 4.5vw, 2.5rem);
}

.info-sub {
  margin: 0 auto;
  max-width: 70ch;
  font-size: var(--text-base);
  opacity: .9;
  line-height: 1.45;
}

.info-card {
  width: min(360px, 100%);
  height: 400px;
  background-size: cover;
  border-radius: 16px;
  background-position: center;
  box-shadow: 0 8px 22px rgba(0, 0, 0, .12);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;
}

.info-content {
  background: var(--vt-c-white);
  padding-bottom: 1em;
  padding-left: 1em;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

.info-name {
  margin: .5em;
  font-weight: 700;
  text-align: center;
  font-size: var(--text-lg);
}

.info-pill {
  border-radius: 50px;
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
  font-size: var(--text-sm);
  cursor: pointer;
}

.info-bottom {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.info-primary {
  padding: 12px 24px;
  border-radius: 999px;
  border: 0;
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
  font-weight: 800;
  font-size: var(--text-lg);
  box-shadow: 0 6px 18px rgba(0, 0, 0, .15);
}
</style>

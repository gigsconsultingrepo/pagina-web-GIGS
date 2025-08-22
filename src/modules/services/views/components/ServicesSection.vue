<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import fabricaSoftware from '@/assets/img/services/fabrica-software.png'
import gestionBaseDatos from '@/assets/img/services/gestion-bd.png'
import mantenimiento from '@/assets/img/services/mantenimiento.png'
import mesaAyuda from '@/assets/img/services/mesa-ayuda.png'
import taas from '@/assets/img/services/taas.png'
import transformacionDigital from '@/assets/img/services/transformacion-digital.png'

const messages = {
  es: {
    showcase: {
      title: 'Nuestros Servicios',
      subtitle:
        'En GIGS unimos innovación y tecnología para ofrecer soluciones que transforman la manera en que las empresas trabajan, comunican y crecen'
    },
    showcaseItems: [
      { title: 'TaaS (Talent as a Service)', to: '/servicios/taas' },
      { title: 'Transformación Digital', to: '/servicios/transformación-digital' },
      { title: 'Mesa de Ayuda/Servicio', to: '/servicios/mesa-ayuda' },
      { title: 'Gestión de Base de Datos', to: '/servicios/gestion-base-datos' },
      { title: 'Mantenimiento y Soporte a Aplicaciones', to: '/servicios/mantenimiento-aplicaciones' },
      { title: 'Fábrica de Software', to: '/servicios/fábrica-software' },
    ],
    cta: { more: 'Ver Más', all: 'Ver Todos' }
  },
  en: {
    showcase: {
      title: 'Our Services',
      subtitle:
        'At GIGS we combine innovation and technology to deliver solutions that transform how companies work, communicate, and grow'
    },
    showcaseItems: [
      { title: 'TaaS (Talent as a Service)', to: '/servicios/taas' },
      { title: 'Digital Transformation', to: '/servicios/transformación-digital' },
      { title: 'Help Desk / Service Desk', to: '/servicios/mesa-ayuda' },
      { title: 'Database Management', to: '/servicios/gestión-base-datos' },
      { title: 'Application Maintenance & Support', to: '/servicios/mantenimiento-aplicaciones' },
      { title: 'Software Factory', to: '/servicios/fábrica-software' },
    ],
    cta: { more: 'Learn More', all: 'View All' }
  }
}
const { t, tm, locale } = useI18n({ useScope: 'local', inheritLocale: true, messages })

const router = useRouter()
const goCard = (baseIndex) => {
  const list = tm('showcaseItems')
  router.push(list?.[baseIndex]?.to || '/servicios')
}
const goAll = () => router.push('/servicios')

const showcaseImgs = [taas, transformacionDigital, mesaAyuda, gestionBaseDatos, mantenimiento, fabricaSoftware]

const viewport = ref(null)
const track = ref(null)

const autoplay = true
const intervalMs = 4200
const pauseOnHover = true

const perView = ref(3)
const isHover = ref(false)
const current = ref(0)         
const transitioning = ref(false)

const baseItems = computed(() => {
  const list = tm('showcaseItems') || []
  return list.map((it, i) => ({
    ...it,
    img: showcaseImgs[i % showcaseImgs.length],
  }))
})

const extendedItems = computed(() => {
  const n = Math.min(perView.value, baseItems.value.length || 1)
  if (!baseItems.value.length) return []
  const head = baseItems.value.slice(0, n)
  const tail = baseItems.value.slice(-n)
  return [...tail, ...baseItems.value, ...head]
})

const gapPx = ref(16)
const cardWidthPx = ref(0)
const stepPx = ref(0)

const measure = () => {
  const vp = viewport.value
  const tr = track.value
  if (!vp || !tr) return
  const gap = parseFloat(getComputedStyle(tr).gap || '0') || 0
  gapPx.value = gap
  const per = Math.max(perView.value, 1)
  const card = (vp.clientWidth - gap * (per - 1)) / per
  cardWidthPx.value = card
  stepPx.value = card + gap
}

const resetToRealStart = () => {
  const n = Math.min(perView.value, baseItems.value.length || 1)
  current.value = n
  transitioning.value = false
}

const mapToBase = (idx) => {
  const n = Math.min(perView.value, baseItems.value.length || 1)
  const len = baseItems.value.length || 1
  let bi = (idx - n) % len
  if (bi < 0) bi += len
  return bi
}

const next = () => { if (extendedItems.value.length) { transitioning.value = true; current.value += 1 } }
const prev = () => { if (extendedItems.value.length) { transitioning.value = true; current.value -= 1 } }

const onTransitionEnd = () => {
  const n = Math.min(perView.value, baseItems.value.length || 1)
  const realLen = baseItems.value.length
  if (!realLen) return
  if (current.value >= realLen + n) { transitioning.value = false; current.value = n }
  else if (current.value < n) { transitioning.value = false; current.value = realLen + n - 1 }
}

let timer = null
const startAutoplay = () => {
  if (!autoplay || !baseItems.value.length) return
  stopAutoplay()
  timer = setInterval(() => { if (!(pauseOnHover && isHover.value)) next() }, intervalMs)
}
const stopAutoplay = () => { if (timer) { clearInterval(timer); timer = null } }

const translateStyle = computed(() => {
  const x = current.value * stepPx.value
  return {
    transform: `translateX(-${x}px)`,
    transition: transitioning.value ? 'transform 420ms ease' : 'none'
  }
})

const calcPerView = () => {
  const w = window.innerWidth
  perView.value = w < 640 ? 1 : w < 1024 ? 2 : 3
}

const onResize = () => {
  const prevPV = perView.value
  calcPerView()
  measure()
  if (prevPV !== perView.value) resetToRealStart()
  startAutoplay()
}

onMounted(() => {
  calcPerView()
  resetToRealStart()
  startAutoplay()
  measure()
  window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  stopAutoplay()
})

watch(locale, () => {
  resetToRealStart()
  measure()
  startAutoplay()
})
watch(baseItems, () => {
  resetToRealStart()
  measure()
  startAutoplay()
})
</script>

<template>
  <section class="services-top">
    <v-container class="py-8 py-md-12">
      <div class="info-head">
        <h2 class="info-title">{{ t('showcase.title') }}</h2>
        <p class="info-sub">{{ t('showcase.subtitle') }}</p>
      </div>

      <div class="carousel" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div ref="viewport" class="viewport">
          <div ref="track" class="track" :style="translateStyle" @transitionend="onTransitionEnd">
            <article v-for="(it, idx) in extendedItems" :key="'card-' + idx" class="info-card"
              :style="{ backgroundImage: `url(${it.img})` }">
              <div class="info-content">
                <h3 class="info-name">{{ it.title }}</h3>
                <button class="info-pill" type="button" @click="goCard(mapToBase(idx))">
                  {{ t('cta.more') }}
                </button>
              </div>
            </article>
          </div>
        </div>

        <button class="nav-btn left" type="button" aria-label="Anterior" @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </button>
        <button class="nav-btn right" type="button" aria-label="Siguiente" @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>

      <div class="info-bottom">
        <button class="info-primary" type="button" @click="goAll">
          {{ t('cta.all') }}
        </button>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.services-top {
  background: var(--color-background);
  color: var(--color-text);
}

.info-head {
  text-align: center;
  max-width: 980px;
  margin: 48px auto 24px;
}

.info-title {
  margin: 0 0 10px;
  font-weight: 900;
  font-size: clamp(28px, 4.5vw, 40px);
}

.info-sub {
  margin: 0 auto;
  max-width: 70ch;
  font-size: 16px;
  opacity: .9;
  line-height: 1.45;
}

.carousel {
  position: relative;
  margin-top: 16px;
}

.viewport {
  overflow: hidden;
  width: 100%;
}

.track {
  display: flex;
  align-items: stretch;
  gap: var(--gap-x, 16px);
  will-change: transform;
}

.info-card {
  flex: 0 0 auto;
  width: min(360px, 100%);
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, .12);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
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
  font-size: 18px;
}

.info-pill {
  border-radius: 50px;
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
  font-size: 13px;
  cursor: pointer;
  padding: 8px 14px;
  border: none;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(0, 0, 0, .35);
  color: var(--vt-c-white);
  border: 1px solid rgba(255, 255, 255, .2);
}

.nav-btn.left {
  left: 6px;
}

.nav-btn.right {
  right: 6px;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, .5);
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
  font-size: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, .15);
}

@media (min-width: 960px) {
  .track {
    --gap-x: 24px;
  }
}
</style>

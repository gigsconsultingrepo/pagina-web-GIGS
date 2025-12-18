<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  leftParagraphs: { type: Array, required: true },
  ctaLabel: { type: [String, Object], default: '' },
  ctaHref: { type: String, default: '#' },

  testimonialQuote: { type: [String, Object], required: true },
  testimonialAuthor: { type: [String, Object], required: true },
  testimonialAvatar: { type: String, default: '' }, // opcional
})

const pick = (val) => {
  if (typeof val === 'string') return val
  return ''
}
const leftTexts = computed(() => (props.leftParagraphs || []).map(pick))
const ctaText = computed(() => pick(props.ctaLabel))
const quote = computed(() => pick(props.testimonialQuote))
const author = computed(() => pick(props.testimonialAuthor))

const handleCtaClick = () => {
  if (props.ctaHref && props.ctaHref !== '#') {
    // Si la ruta incluye hash y query parameters, parsearlos correctamente
    if (props.ctaHref.includes('#') && props.ctaHref.includes('?')) {
      const [path, hashAndQuery] = props.ctaHref.split('#')
      const [hash, queryString] = hashAndQuery.split('?')
      const query = {}
      
      if (queryString) {
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=')
          if (key && value) {
            query[key] = decodeURIComponent(value)
          }
        })
      }
      
      router.push({
        path: path || '/servicios',
        hash: `#${hash}`,
        query: query
      })
    } else if (props.ctaHref.startsWith('#')) {
      // Si solo es un hash (ya estamos en la página de servicios)
      const [hash, queryString] = props.ctaHref.replace('#', '').split('?')
      const query = {}
      
      if (queryString) {
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=')
          if (key && value) {
            query[key] = decodeURIComponent(value)
          }
        })
      }
      
      router.push({
        path: '/servicios',
        hash: `#${hash}`,
        query: query
      })
    } else {
      // Ruta normal sin hash
      router.push(props.ctaHref)
    }
  }
}
</script>

<template>
  <section class="feature-testimonial pt-4 pb-4">
    <v-container class="py-4 py-md-5">
      <v-card class="ft-card" elevation="0">
        <v-row no-gutters justify="center">
          <v-col cols="12" md="10" lg="8" class="ft-left">
            <div class="ft-left-wrap">
              <p v-for="(p, idx) in leftTexts" :key="idx" class="ft-paragraph">
                {{ p }}
              </p>

              <div v-if="ctaText" class="ft-cta">
                <v-btn color="primary" variant="flat" @click="handleCtaClick" class="btn-primary-large">
                  {{ ctaText }}
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </section>
</template>

<style scoped>
.feature-testimonial {
  background: linear-gradient(180deg, var(--color-background-soft), var(--color-background-mute));
  color: var(--color-text);
  margin-top: 0;
}

.ft-card {
  background: none;
  border-radius: 16px;
  overflow: hidden;
}

.ft-left {
  display: grid;
  align-items: center;
  background: none;
}

.ft-left-wrap {
  width: 100%;
  padding: 16px 20px;
  text-align: center;
}

@media (min-width: 960px) {
  .ft-left-wrap {
    padding: 20px 32px;
  }
}

.ft-paragraph {
  margin: 0 0 12px 0;
  color: var(--color-text);
  font-size: 0.975rem;
  line-height: 1.75;
  text-align: left;
}

@media (min-width: 960px) {
  .ft-paragraph {
    font-size: 1rem;
  }
}

.ft-cta {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary-large {
  padding: 16px 48px !important;
  font-size: 1.125rem !important;
  font-weight: 700 !important;
  min-width: 280px !important;
  height: auto !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 959px) {
  .btn-primary-large {
    padding: 14px 36px !important;
    font-size: 1rem !important;
    min-width: 240px !important;
  }
}

</style>

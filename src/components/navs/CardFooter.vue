<script setup lang="ts">
import { computed, isRef } from 'vue'
import { useI18n } from 'vue-i18n'

type LangPair = { es: string; in: string }

const props = defineProps<{
  title: LangPair
  text: LangPair
  ctaHref?: string
}>()

let localeSource: any = null
try {
  const i18n = useI18n({ useScope: 'global' })
  localeSource = isRef((i18n as any).locale)
    ? (i18n as any).locale
    : (i18n as any).global?.locale ?? (i18n as any).locale
} catch {
  localeSource = null
}

function normalize(code: string): 'es' | 'in' {
  const c = (code || '').toLowerCase()
  if (c.startsWith('es')) return 'es'
  if (c === 'in' || c.startsWith('en')) return 'in'
  return 'es'
}

const currentLang = computed<'es' | 'in'>(() => {
  const fromI18n = localeSource
    ? (isRef(localeSource) ? localeSource.value : String(localeSource))
    : ''
  const fromDom = typeof document !== 'undefined'
    ? (document.documentElement.getAttribute('lang') || '')
    : ''
  return normalize(String(fromI18n || fromDom || 'es'))
})

const rightKicker = computed(() =>
  currentLang.value === 'es' ? 'Únete a GIGS!' : 'Join GIGS!'
)
const rightCta = computed(() =>
  currentLang.value === 'es' ? 'Contáctanos' : 'Contact us'
)

const leftTitle = computed(() => props.title[currentLang.value] ?? props.title.es)
const leftText = computed(() => props.text[currentLang.value] ?? props.text.es)
</script>

<template>
  <section class="card-footer-container">
    <div class="promo-callout">
      <div class="callout-left">
        <h3 class="callout-title">{{ leftTitle }}</h3>
        <p class="callout-text">{{ leftText }}</p>
      </div>

      <div class="callout-right">
        <p class="right-kicker">{{ rightKicker }}</p>
        <a class="cta-btn" :href="ctaHref || '#'" :aria-label="rightCta">{{ rightCta }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 0em;
}

.promo-callout {
  display: grid;
  grid-template-columns: 1fr auto;
  width: 60%;
  gap: 32px;
  align-items: center;
  padding: 32px 48px;
  background: linear-gradient(135deg, #0f2a86, #0a1f64);
  color: #fff;
  border-radius: 30px;
}

.callout-left {
  min-width: 0;
  max-width: 56ch;
}

.callout-title {
  margin: 0 0 8px;
  font-weight: 700;
  font-size: 25px;
}

.callout-text {
  margin: 0;
  line-height: 1.35;
  font-size: 18px;
  opacity: .9;
  color: #FFF;
  text-align: justify;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.callout-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: 25px;
}

.right-kicker {
  margin: 0;
  font-weight: 700;
}

.cta-btn {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  color: #0c2b7a;
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-sm, 13px);
}

@media (max-width:560px) {
  .promo-callout {
    grid-template-columns: 1fr;
  }

  .callout-right {
    align-items: flex-start;
  }
}
</style>

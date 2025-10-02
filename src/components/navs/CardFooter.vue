<script setup lang="ts">
import { computed, isRef } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PropType } from 'vue'

type LangPair = { es: string; en: string }

const props = defineProps<{
  title: LangPair | string
  text: LangPair | string
}>()

let localeSource: any = null
try {
  const i18n = useI18n({ useScope: 'global' })
  localeSource = (i18n as any).locale ?? (i18n as any).global?.locale ?? null
} catch {
  localeSource = null
}

const getRawLocale = () => {
  if (localeSource) return isRef(localeSource) ? localeSource.value : String(localeSource)
  if (typeof document !== 'undefined') {
    const d = document.documentElement.getAttribute('lang')
    if (d) return d
  }
  if (typeof navigator !== 'undefined' && (navigator as any).language) return (navigator as any).language
  return 'es'
}

const currentLang = computed(() => String(getRawLocale()).split('-')[0].toLowerCase())
const normalizedLang = computed(() => currentLang.value.startsWith('es') ? 'es' : 'en')

const leftTitle = computed(() => {
  if (!props.title) return ''
  if (typeof props.title === 'string') return props.title
  return (props.title as LangPair)[normalizedLang.value] ?? (props.title as LangPair).es ?? ''
})

const leftText = computed(() => {
  if (!props.text) return ''
  if (typeof props.text === 'string') return props.text
  return (props.text as LangPair)[normalizedLang.value] ?? (props.text as LangPair).es ?? ''
})

const rightKicker = computed(() => normalizedLang.value === 'es' ? 'Únete a GIGS!' : 'Join GIGS!')
const rightCta = computed(() => normalizedLang.value === 'es' ? 'Contáctanos' : 'Contact us')
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
        <a class="cta-btn" href="/contacto#form-contacto" :aria-label="rightCta">
          {{ rightCta }}
        </a>
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
  font-size: var(--text-3xl);
}

.callout-text {
  margin: 0;
  line-height: 1.35;
  font-size: var(--text-lg);
  opacity: .9;
  color: #FFF;
  text-align: justify;
  font-weight: 500;
}

.callout-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: var(--text-3xl);
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
  font-size: var(--text-sm);
}

@media (max-width: 959px) {
  .promo-callout {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90%;
    padding: 24px;
    gap: 20px;
  }

  .callout-left {
    text-align: center;
  }

  .callout-right {
    align-items: center;
    text-align: center;
    width: 100%;
  }
}
</style>

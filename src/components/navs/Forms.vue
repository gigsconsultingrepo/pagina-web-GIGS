<script setup lang="ts">
import { computed, isRef } from 'vue'
import { useI18n } from 'vue-i18n'

type LangPair = { es: string; in: string }

const props = withDefaults(defineProps<{
  title: LangPair
  subtitle?: LangPair
  textButton: LangPair
  loading?: boolean
  disabled?: boolean
}>(), {
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'save'): void
}>()

// ---- idioma reactivo (igual que el componente anterior) ----
let localeSource: any = null
try {
  const i18n = useI18n({ useScope: 'global' })
  localeSource = (isRef((i18n as any).locale))
    ? (i18n as any).locale
    : (i18n as any).global?.locale ?? (i18n as any).locale
} catch { /* i18n no disponible en este árbol */ }

function normalize(code: string): 'es' | 'in' {
  const c = (code || '').toLowerCase()
  if (c.startsWith('es')) return 'es'
  if (c === 'in' || c.startsWith('en')) return 'in'
  return 'es'
}

const lang = computed<'es' | 'in'>(() => {
  const fromI18n = localeSource
    ? (isRef(localeSource) ? localeSource.value : String(localeSource))
    : ''
  const fromDom = typeof document !== 'undefined'
    ? (document.documentElement.getAttribute('lang') || '')
    : ''
  return normalize(String(fromI18n || fromDom || 'es'))
})

const tTitle = computed(() => props.title[lang.value] ?? props.title.es)
const tSubtitle = computed(() => props.subtitle?.[lang.value] ?? props.subtitle?.es ?? '')
const tBtnLabel = computed(() => props.textButton[lang.value] ?? props.textButton.es)

const onSave = () => { if (!props.loading && !props.disabled) emit('save') }
</script>

<template>
  <section class="forms-container">
    <div class="form-card">
      <header class="form-head">
        <h2 class="title">{{ tTitle }}</h2>
        <p v-if="tSubtitle" class="subtitle">{{ tSubtitle }}</p>
      </header>
  
      <!-- Aquí el formulario del componente que usa este shell -->
      <div class="form-body">
        <slot />
      </div>
  
      <footer class="form-actions">
        <slot name="actions">
          <button type="button" class="primary-btn" :disabled="disabled || loading"
            :aria-busy="loading ? 'true' : 'false'" @click="onSave">
            <span v-if="!loading">{{ tBtnLabel }}</span>
            <span v-else class="spinner" aria-hidden="true"></span>
          </button>
        </slot>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.forms-container{
  display: flex;
  background: var(--color-primary-dark);
}

.form-card {
  margin: 2em auto;
  background: var(--color-background);
  width: 60%;
  color: var(--vt-c-text-light-1);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, .08);
  padding: 20px;
}

.form-head {
  text-align: center;
  margin-bottom: 14px;
}

.title {
  margin: 0 0 6px 0;
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 800;
  color: var(--vt-c-text-light-1);
}

.subtitle {
  margin: 0;
  font-size: 13px;
  opacity: .8;
  max-width: 60ch;
  margin-inline: auto;
}

.form-body {
  display: grid;
  gap: 12px;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
  font-weight: 700;
  transition: transform .12s ease, box-shadow .12s ease, opacity .12s;
}

.primary-btn:disabled {
  opacity: .7;
  cursor: not-allowed;
}

.primary-btn:not(:disabled):active {
  transform: translateY(1px);
}

.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, .55);
  border-top-color: var(--vt-c-white);
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 720px) {
  .form-card {
    padding: 28px;
    border-radius: 18px;
  }
}
</style>

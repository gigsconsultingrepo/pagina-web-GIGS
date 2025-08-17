import { createI18n } from 'vue-i18n'

const STORAGE_KEY = 'gigs-locale'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem(STORAGE_KEY) || 'es',
  fallbackLocale: 'es',
  messages: {}
})

export function setLocale(loc) {
  i18n.global.locale.value = loc
  localStorage.setItem(STORAGE_KEY, loc)
}

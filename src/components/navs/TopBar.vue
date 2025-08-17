<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// INICIO TRADUCCIONES ==================================
const messages = {
  es: {
    nav: {
      home: 'INICIO',
      about: 'ACERCA DE GIGS',
      clients: 'CLIENTES',
      challenges: 'RETOS',
      services: 'SERVICIOS',
      blog: 'BLOG',
      contact: 'CONTACTO'
    },
    lang: { toggle: 'ES/EN' }
  },
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      clients: 'CLIENTS',
      challenges: 'CHALLENGES',
      services: 'SERVICES',
      blog: 'BLOG',
      contact: 'CONTACT'
    },
    lang: { toggle: 'EN/ES' }
  }
}

// usa scope local para pasar los mensajes:
const { t } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages
})

// FIN TRADUCCIONES ==================================

const router = useRouter()
const route = useRoute()

const mobileMenuOpen = ref(false)
const activeId = ref('home')

const items = [
  { id: 'home', icon:'mdi-home', key: 'home', routeName: 'home', path: '/' },
  { id: 'about', icon:'mdi-information', key: 'about', routeName: 'about', path: '/about' },
  { id: 'clients', icon:'mdi-hand-heart', key: 'clients', routeName: 'clients', path: '/clients' },
  { id: 'challenges', icon:'mdi-puzzle-star', key: 'challenges', routeName: 'challenges', path: '/challenges' },
  { id: 'services', icon:'mdi-account-wrench', key: 'services', routeName: 'services', path: '/services' },
  { id: 'blog', icon:'mdi-post', key: 'blog', routeName: 'blog', path: '/blog' },
  { id: 'contact', icon:'mdi-human-greeting-proximity', key: 'contact', routeName: 'contact', path: '/contact' }
]

const resolveActive = (r) => {
  const byName = items.find(i => i.routeName === r.name)
  if (byName) { activeId.value = byName.id; return }
  const fp = r.fullPath || r.path || ''
  const byPath = items.find(i => i.path && fp.startsWith(i.path))
  activeId.value = byPath?.id ?? 'home'
}

const navigateTo = async (item) => {
  activeId.value = item.id
  mobileMenuOpen.value = false
  if (item.routeName && router.hasRoute(item.routeName)) await router.push({ name: item.routeName })
  else if (item.path) await router.push(item.path)
}

onMounted(() => resolveActive(route))
watch(() => route.name, () => resolveActive(route))
watch(() => route.fullPath, () => resolveActive(route))
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand" @click="navigateTo(items[0])">
        <img src="@/assets/img/logo-gigs.jpg" alt="GIGS" class="logo" />
      </div>

      <nav class="nav-links">
        <button v-for="it in items" :key="it.id" class="link" :class="{ active: activeId === it.id }"
          @click="navigateTo(it)" :aria-current="activeId === it.id ? 'page' : null">
          <v-icon size="18" class="ni">{{ it.icon }}</v-icon>
          <span class="label">{{ t('nav.' + it.key) }}</span>
        </button>
      </nav>
      
      <div class="actions">
        <button class="lang-toggle" @click="toggleLocale">
          <v-icon size="18" class="ni">mdi-translate-variant</v-icon>
          <span>{{ t('lang.toggle') }}</span>
        </button>
        <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <v-icon>{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </button>
      </div>
    </div>

    <div class="mobile-menu" v-show="mobileMenuOpen">
      <button v-for="it in items" :key="it.id" class="mobile-link" :class="{ active: activeId === it.id }"
        @click="navigateTo(it)">
        <v-icon size="18" class="ni">mdi-circle-small</v-icon>
        <span class="label">{{ t('nav.' + it.key) }}</span>
      </button>
      <div class="mobile-lang">
        <button class="lang-toggle" @click="toggleLocale">
          <span>{{ t('lang.toggle') }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--vt-c-white);
  color: var(--vt-c-text-light-1);
  border-bottom: 1px solid var(--color-border);
}

.topbar::after {
  content: "";
  display: block;
  height: 4px;
  background: var(--vt-c-indigo);
}

.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.nav-links {
  margin: 0 auto;
  display: none;
  align-items: center;
  gap: 16px;
}

.link {
  background: transparent;
  border: 0;
  padding: 8px 12px;
  border-radius: 999px;
  letter-spacing: .4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--vt-c-text-light-1);
  cursor: pointer;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color .2s ease, color .2s ease;
}

.link:hover {
  background: var(--vt-c-white-mute);
}

.link.active {
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
}

.ni {
  margin-right: 2px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--vt-c-white);
  color: var(--vt-c-text-light-1);
  font-weight: 800;
  letter-spacing: .4px;
  cursor: pointer;
}

.hamburger {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--vt-c-text-light-1);
}

.mobile-menu {
  display: none;
  background: var(--vt-c-white);
  border-bottom: 1px solid var(--color-border);
  padding: 8px;
}

.mobile-link {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  color: var(--vt-c-text-light-1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.mobile-link:hover {
  background: var(--vt-c-white-mute);
}

.mobile-link.active {
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
}

.mobile-lang {
  padding: 8px;
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 900px) {
  .nav-links {
    display: flex;
  }

  .hamburger,
  .mobile-menu {
    display: none !important;
  }
}
</style>
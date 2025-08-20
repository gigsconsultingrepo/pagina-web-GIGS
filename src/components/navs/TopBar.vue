<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLocale, i18n } from '@/i18n'

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
      contact: 'CONTACTO',
      servicesMenu: {
        softwareFactory: 'Fábrica de Software',
        taas: 'TaaS (Talent as a Service)',
        digitalTransformation: 'Transformación Digital',
        helpDesk: 'Mesa de Ayuda/Servicio',
        dbManagement: 'Gestión de Base de Datos',
        appMaintenance: 'Mantenimiento y Soporte a Aplicaciones'
      }
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
      contact: 'CONTACT',
      servicesMenu: {
        softwareFactory: 'Software Factory',
        taas: 'TaaS (Talent as a Service)',
        digitalTransformation: 'Digital Transformation',
        helpDesk: 'Help Desk / Service Desk',
        dbManagement: 'Database Management',
        appMaintenance: 'Application Maintenance & Support'
      }
    },
    lang: { toggle: 'EN/ES' }
  }
}

const { t, locale } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages
})

const toggleLocale = () => {
  const next = (i18n.global.locale.value === 'es') ? 'en' : 'es'
  setLocale(next)
  locale.value = next
}

onMounted(() => {
  locale.value = i18n.global.locale.value
})
// FIN TRADUCCIONES ==================================

const router = useRouter()
const route = useRoute()

const mobileMenuOpen = ref(false)
const activeId = ref('home')

const items = [
  { id: 'home', icon: 'mdi-home', key: 'home', routeName: 'home', path: '/' },
  { id: 'about', icon: 'mdi-information', key: 'about', routeName: 'about', path: '/about' },
  { id: 'clients', icon: 'mdi-hand-heart', key: 'clients', routeName: 'clients', path: '/clients' },
  { id: 'challenges', icon: 'mdi-puzzle-star', key: 'challenges', routeName: 'challenges', path: '/challenges' },
  { id: 'services', icon: 'mdi-account-wrench', key: 'services', routeName: 'services', path: '/services' },
  { id: 'blog', icon: 'mdi-post', key: 'blog', routeName: 'blog', path: '/blog' },
  { id: 'contact', icon: 'mdi-human-greeting-proximity', key: 'contact', routeName: 'contact', path: '/contact' }
]

const servicesChildren = [
  { id: 'software-factory', key: 'softwareFactory', path: '/services/software-factory' },
  { id: 'taas', key: 'taas', path: '/services/taas' },
  { id: 'digital-transformation', key: 'digitalTransformation', path: '/services/digital-transformation' },
  { id: 'help-desk', key: 'helpDesk', path: '/services/help-desk' },
  { id: 'db-management', key: 'dbManagement', path: '/services/db-management' },
  { id: 'app-maintenance', key: 'appMaintenance', path: '/services/app-maintenance' }
]

const isInServices = computed(() => {
  const p = route.fullPath || route.path || ''
  return p === '/services' || p.startsWith('/services/')
})

const resolveActive = (r) => {
  const fp = r.fullPath || r.path || ''
  if (fp.startsWith('/services')) { activeId.value = 'services'; return }
  const byName = items.find(i => i.routeName === r.name)
  if (byName) { activeId.value = byName.id; return }
  const byPath = items.find(i => i.path && fp.startsWith(i.path))
  activeId.value = byPath?.id ?? 'home'
}

const navigateTo = async (item) => {
  activeId.value = item.id
  mobileMenuOpen.value = false
  if (item.routeName && router.hasRoute && router.hasRoute(item.routeName)) {
    await router.push({ name: item.routeName })
  } else if (item.path) {
    await router.push(item.path)
  }
}
const navigateToService = async (child) => {
  activeId.value = 'services'
  mobileMenuOpen.value = false
  await router.push(child.path)
}

onMounted(() => resolveActive(route))
watch(() => route.name, () => resolveActive(route))
watch(() => route.fullPath, () => resolveActive(route))
watch(mobileMenuOpen, open => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

const servicesOpen = ref(false)
const servicesExpand = ref(false)
const openServices = () => { servicesOpen.value = true }
const closeServices = () => { servicesOpen.value = false }
const toggleServicesExpand = () => { servicesExpand.value = !servicesExpand.value }
watch(activeId, () => { servicesOpen.value = false })
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand" @click="navigateTo(items[0])">
        <img src="@/assets/img/logo-gigs.jpg" alt="GIGS" class="logo" />
      </div>

      <nav class="nav-links">
        <template v-for="it in items" :key="it.id">
          <button v-if="it.id !== 'services'" class="link" :class="{ active: activeId === it.id }"
            @click="navigateTo(it)" :aria-current="activeId === it.id ? 'page' : null">
            <v-icon v-if="activeId === it.id" size="18" class="ni">{{ it.icon }}</v-icon>
            <span class="label">{{ t('nav.' + it.key) }}</span>
          </button>

          <div v-else class="dropdown" @mouseenter="openServices" @mouseleave="closeServices">
            <button class="link" :class="{ active: isInServices }" aria-haspopup="menu"
              :aria-expanded="servicesOpen ? 'true' : 'false'" @click="servicesOpen = !servicesOpen"
              @keydown.enter.prevent="servicesOpen = !servicesOpen"
              @keydown.space.prevent="servicesOpen = !servicesOpen">
              <!-- Ícono sólo si estamos en services -->
              <v-icon v-if="isInServices" size="18" class="ni">mdi-account-wrench</v-icon>
              <span class="label">{{ t('nav.services') }}</span>
              <v-icon size="16" class="caret">mdi-menu-down</v-icon>
            </button>

            <ul v-show="servicesOpen" class="menu" role="menu">
              <li v-for="child in servicesChildren" :key="child.id" role="none">
                <button class="menu-item" role="menuitem" @click="navigateToService(child)">
                  {{ t('nav.servicesMenu.' + child.key) }}
                </button>
              </li>
            </ul>
          </div>
        </template>
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
  </header>

  <div class="drawer-backdrop" v-show="mobileMenuOpen" @click="mobileMenuOpen = false"></div>
  <aside class="drawer" :class="{ open: mobileMenuOpen }" @keydown.esc="mobileMenuOpen = false" tabindex="-1">
    <div class="drawer-header">
      <img src="@/assets/img/logo-gigs.jpg" alt="GIGS" class="logo small" />
      <button class="close" @click="mobileMenuOpen = false" aria-label="Close">
        <v-icon>mdi-close</v-icon>
      </button>
    </div>

    <nav class="drawer-nav">
      <template v-for="it in items" :key="it.id">
        <!-- ITEM NORMAL -->
        <button v-if="it.id !== 'services'" class="drawer-link" :class="{ active: activeId === it.id }"
          @click="navigateTo(it)">
          <!-- Ícono sólo si la vista está activa -->
          <v-icon v-if="activeId === it.id" size="18" class="ni">{{ it.icon }}</v-icon>
          <span>{{ t('nav.' + it.key) }}</span>
        </button>

        <!-- ITEM SERVICES con ACORDEÓN -->
        <div v-else class="drawer-group">
          <button class="drawer-link" :class="{ active: isInServices }" @click="toggleServicesExpand"
            aria-haspopup="true" :aria-expanded="servicesExpand ? 'true' : 'false'">
            <v-icon v-if="isInServices" size="18" class="ni">mdi-account-wrench</v-icon>
            <span>{{ t('nav.services') }}</span>
            <v-icon class="push-right">{{ servicesExpand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </button>

          <div class="drawer-sub" v-show="servicesExpand">
            <button v-for="child in servicesChildren" :key="child.id" class="drawer-sublink"
              @click="navigateToService(child)">
              {{ t('nav.servicesMenu.' + child.key) }}
            </button>
          </div>
        </div>
      </template>
    </nav>

    <div class="drawer-footer">
      <button class="lang-toggle" @click="toggleLocale">
        <v-icon size="18" class="ni">mdi-translate-variant</v-icon>
        <span>{{ t('lang.toggle') }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--vt-c-white);
  color: var(--vt-c-text-light-1);
}

.topbar::after {
  content: "";
  display: block;
  height: 4px;
}

.topbar-inner {
  max-width: 90%;
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
  display: none;
  align-items: center;
  gap: 16px;
  justify-content: right;
  width: 90%;
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

.caret {
  margin-left: 4px;
}

.dropdown {
  position: relative;
}

.menu {
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 260px;
  background: var(--vt-c-white);
  color: var(--vt-c-text-light-1);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, .12);
  padding: 8px;
  list-style: none;
  margin: 0;
}

.menu-item {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-weight: 600;
}

.menu-item:hover {
  background: var(--vt-c-white-mute);
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

@media (min-width:900px) {
  .nav-links {
    display: flex;
  }

  .hamburger,
  .mobile-menu {
    display: none !important;
  }
}

/* Drawer móvil */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .35);
  backdrop-filter: blur(2px);
  z-index: 110;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: 300px;
  max-width: 88vw;
  background: var(--vt-c-white);
  border-left: 1px solid var(--color-border);
  box-shadow: -14px 0 24px rgba(0, 0, 0, .12);
  transform: translateX(100%);
  transition: transform .25s ease;
  z-index: 120;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.drawer.open {
  transform: translateX(0);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px 10px;
}

.logo.small {
  width: 36px;
  height: 36px;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
}

.drawer-link {
  text-align: left;
  padding: 12px;
  background: transparent;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  color: var(--vt-c-text-light-1);
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.drawer-link:hover {
  background: var(--vt-c-white-mute);
}

.drawer-link.active {
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
}

.push-right {
  margin-left: auto;
}

.drawer-group {
  display: flex;
  flex-direction: column;
}

.drawer-sub {
  display: flex;
  flex-direction: column;
  padding: 4px 0 4px 8px;
  gap: 2px;
}

.drawer-sublink {
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 10px;
  font-weight: 600;
}

.drawer-sublink:hover {
  background: var(--vt-c-white-mute);
}

.drawer-footer {
  margin-top: auto;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
}

@media (min-width:900px) {

  .drawer,
  .drawer-backdrop {
    display: none !important;
  }

}

@media screen and (max-width: 900px) {
  .topbar-inner {
    justify-content: space-between !important;
  }
}
</style>
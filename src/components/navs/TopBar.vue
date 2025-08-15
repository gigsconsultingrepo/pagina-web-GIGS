<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const mobileMenuOpen = ref(false)
const activeId = ref('home')

const navigationItems = [
  { id: 'home', icon: 'mdi-home', text: 'INICIO', routeName: 'home', path: '/' },
  { id: 'about', icon: 'mdi-account-quest-ion', text: 'ACERCA DE GIGS', routeName: 'about', path: '/acerca-de-gigs' },
  { id: 'clients', icon: 'mdi-folder-star-multiple', text: 'CLIENTES', routeName: ' clients', path: '/clientes' },
  { id: 'challenges', icon: 'mdi-room-service', text: 'RETOS', routeName: 'challenges', path: '/retos' },
  { id: 'services', icon: 'mdi-account-question', text: 'SERVICIOS', routeName: 'services', path: '/servicios' },
  { id: 'blog', icon: 'mdi-account-question', text: 'BLOG', routeName: 'blog', path: '/blog' },
  { id: 'contact', icon: 'mdi-phone-plus', text: 'CONTACTO', routeName: 'contact', path: '/contacto' },
]

const resolveActiveFromRoute = (r) => {
  const byName = navigationItems.find(i => i.routeName === r.name)
  if (byName) { activeId.value = byName.id; return }
  const fullPath = r.fullPath || r.path || ''
  const byPath = navigationItems.find(i => i.path && fullPath.startsWith(i.path))
  activeId.value = byPath?.id ?? 'home'
}

const navigateTo = async (item) => {
  activeId.value = item.id
  mobileMenuOpen.value = false
  if (item.routeName && router.hasRoute(item.routeName)) {
    try { await router.push({ name: item.routeName }) } catch (err) { console.error(err) }
    return
  }
  if (item.path) {
    try { await router.push(item.path) } catch (err) { console.error(err) }
    return
  }
  console.warn(`[TopBar] No hay routeName/path configurado para: ${item.id}`)
}

const toggleMobileMenu = () => { mobileMenuOpen.value = !mobileMenuOpen.value }

const logout = async () => {
  if (router.hasRoute('login')) {
    try { await router.push({ name: 'login' }) } catch (_) { }
  } else {
    try { await router.push('/') } catch (_) { }
  }
}

onMounted(() => resolveActiveFromRoute(route))
watch(() => route.name, () => resolveActiveFromRoute(route))
watch(() => route.fullPath, () => resolveActiveFromRoute(route))
</script>

<template>
  <header class="topbar" role="navigation" aria-label="Top navigation">
    <div class="brand" @click="navigateTo(navigationItems[0])" tabindex="0">
      <img src="@/assets/img/logo-gigs.jpg" alt="GIGS Consulting Logo" class="logo" />
    </div>
    <nav class="nav-links">
      <button v-for="item in navigationItems" :key="item.id" class="link" :class="{ active: activeId === item.id }"
        @click="navigateTo(item)" :aria-current="activeId === item.id ? 'page' : null">
        <v-icon size="20">{{ item.icon }}</v-icon>
        <span class="label">{{ item.text }}</span>
      </button>
    </nav>
    <div class="actions">
      <button class="icon-btn logout" @click="logout" title="Desconectarse">
        <v-icon>mdi-logout</v-icon>
      </button>
      <button class="icon-btn hamburger" @click="toggleMobileMenu" :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu">
        <v-icon>{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </button>
    </div>
    <div id="mobile-menu" class="mobile-menu" v-show="mobileMenuOpen">
      <button v-for="item in navigationItems" :key="item.id" class="mobile-link"
        :class="{ active: activeId === item.id }" @click="navigateTo(item)">
        <v-icon size="20">{{ item.icon }}</v-icon>
        <span class="label">{{ item.text }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 14px rgba(0, 0, 0, .08);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: .75rem;
  padding: 0 .75rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: .75rem;
  cursor: pointer;
}

.logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-links {
  display: none;
  align-items: center;
  gap: .25rem;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem .75rem;
  border-radius: 999px;
  background: transparent;
  color: var(--vt-c-white-soft);
  border: none;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, transform .05s ease;
}

.link:hover {
  background: rgba(255, 255, 255, .12);
}

.link:active {
  transform: translateY(1px);
}

.link.active {
  background: var(--vt-c-white);
  color: var(--vt-c-indigo);
  font-weight: 600;
}

.link .label {
  font-size: .9rem;
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: var(--vt-c-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color .2s ease, transform .05s ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, .12);
}

.icon-btn:active {
  transform: translateY(1px);
}

.logout {
  margin-right: .25rem;
}

.hamburger {
  display: inline-flex;
}

.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--vt-c-indigo);
  border-bottom: 1px solid var(--color-border);
  padding: .5rem;
  display: grid;
  grid-auto-rows: minmax(44px, auto);
  gap: .25rem;
}

.mobile-link {
  display: inline-flex;
  align-items: center;
  gap: .75rem;
  width: 100%;
  padding: .75rem .75rem;
  background: transparent;
  color: var(--vt-c-white);
  border: none;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease;
}

.mobile-link:hover {
  background: rgba(255, 255, 255, .12);
}

.mobile-link.active {
  background: var(--vt-c-white);
  color: var(--vt-c-indigo);
}

.mobile-link.danger {
  color: #ffd9d9;
}

@media (min-width: 900px) {
  .nav-links {
    display: inline-flex;
  }

  .hamburger,
  .mobile-menu {
    display: none !important;
  }
}
</style>

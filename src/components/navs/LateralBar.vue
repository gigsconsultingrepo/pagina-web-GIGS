<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const emit = defineEmits(['toggle-collapse', 'close', 'item-select'])

const router = useRouter()
const store = useStore()

const collapsed = ref(false)
const activeItem = ref('home')

const navigationItems = [
  { id: 'home', icon: 'mdi-home', text: 'Inicio' },
  { id: 'callHistory', icon: 'mdi-history', text: 'Historial de llamadas' },
  { id: 'agents', icon: 'mdi-account-group', text: 'Agentes' },
  { id: 'newCall', icon: 'mdi-phone-plus', text: 'Nueva llamada' },
  { id: 'search', icon: 'mdi-search-web', text: 'Buscar' },
  { id: 'batchCall', icon: 'mdi-calendar-plus', text: 'Crear batch' },
]

const navigateTo = (item) => {
  activeItem.value = item.id 
  emit("item-select", item.id)
}

const toggleNavbar = () => {
  collapsed.value = !collapsed.value
  emit('toggle-collapse', collapsed.value)
}

const logout = () => {
  store.dispatch('login/logout')
  emit('close')
  router.push('/login')
}

onMounted(async () => {
  await store.dispatch('agents/getListAgents')
  await store.dispatch('newCall/getListPhoneNumbers')
  await store.dispatch('callHistory/getListCalls')
})
</script>

<template>
  <div class="navbar" :class="{ 'collapsed': collapsed }">
    <!-- Encabezado de la barra de navegación -->
    <div class="navbar-header">
      <div class="logo-container" @click="navigateTo(navigationItems[0])">
        <img src="@/assets/img/logo-gigs.jpg" alt="GICS Consulting Logo" class="logo" />
        <div class="ml-2" v-if="!collapsed">
          <p class="text-h9 text-black mb-0">Bienvenido a</p>
          <p class="text-h7 font-weight-bold mt-0 text-black">CONTROL GIA</p>
        </div>
      </div>
      <div v-if="!collapsed" class="toggler-container-close" @click="toggleNavbar">
        <v-icon color="black">mdi-chevron-left</v-icon>
      </div>
    </div>

    <div v-if="collapsed" class="toggler-container" @click="toggleNavbar">
      <v-icon color="white">mdi-menu</v-icon>
    </div>

    <nav class="navbar-items">
      <div 
        v-for="item in navigationItems" 
        :key="item.id"
        class="navbar-item"
        :class="{ 
          'active': activeItem === item.id,
          'item-collapsed': collapsed,
          'selected': activeItem === item.id 
        }"
        @click="navigateTo(item)"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="item-text" :class="{ 'hidden': collapsed }">
          {{ item.text }}
        </span>
      </div>
    </nav>

    <div class="navbar-footer">
      <div class="navbar-item logout" @click="logout">
        <v-icon>mdi-logout</v-icon>
        <span class="item-text" :class="{ 'hidden': collapsed }">
          Desconectarse
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: 230px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s;
  overflow: hidden;
  background-color: #1a3b8f;
}

.navbar.collapsed {
  width: 3.5rem;
}

.navbar-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  cursor: pointer;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 2.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.navbar-items {
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  padding-top: 1rem;
}

.navbar-items .navbar-item{
  width: 90%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #133ba0;
  margin-top: 1em;
}

.navbar-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 10px;
  color: #ddd;
  padding-left: .8rem;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-item .v-icon {
  margin-right: 0.5rem;
}

.navbar-item .item-text {
  transition: opacity 0.3s, visibility 0.3s;
}

.navbar-item .item-text.hidden {
  opacity: 0;
  visibility: hidden;
  width: 0;
}

.navbar-footer {
  width: 100%;
  padding: 0.5rem;
}

.logout {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.navbar.collapsed .navbar-item:hover .item-text {
  display: inline;
  position: absolute;
  left: 3.5rem;
  background: #f2f2f2;
  color: #333;
  padding: 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Estilo para el ítem activo */
.navbar-item.active, .navbar-item.selected {
  background-color: rgb(255, 255, 255);
  color: #0797FD;
  font-weight: bold;
}
</style>

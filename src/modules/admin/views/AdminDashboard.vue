<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const router = useRouter()

// Lista de emails que tienen permisos de admin (puedes agregar más)
const ADMIN_EMAILS = [
  'marianacubillos13@gmail.com', // Cambia este email por el del admin real
  // Agrega más emails de admin aquí si es necesario
]

const userEmail = ref('')
const isAdmin = computed(() => {
  if (!userEmail.value) return false
  return ADMIN_EMAILS.some(email => 
    userEmail.value.toLowerCase() === email.toLowerCase()
  )
})

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    userEmail.value = user?.email || ''
  })
  
  return () => unsubscribe()
})

const allTiles = [
  {
    title: 'Gestionar servicios',
    desc: 'Crear, editar y eliminar los servicios que se muestran en la web.',
    to: '/admin/servicios',
    icon: 'mdi-briefcase-outline',
    adminOnly: true
  },
  {
    title: 'Gestionar noticias',
    desc: 'Administrar las publicaciones del blog/noticias.',
    to: '/admin/noticias-lista',
    icon: 'mdi-newspaper-variant-outline',
    adminOnly: false
  }
]

// Filtrar tiles según si el usuario es admin
const tiles = computed(() => {
  return allTiles.filter(tile => !tile.adminOnly || isAdmin.value)
})

const go = (to) => router.push(to)
</script>

<template>
  <v-container class="py-10" max-width="960">
    <div class="text-center mb-8">
      <p class="text-caption" style="color: var(--vt-c-text-light-2); letter-spacing: .12em;">PANEL ADMIN</p>
      <h1 class="text-h4" style="color: var(--color-heading); margin: 6px 0 0;">Selecciona qué quieres gestionar</h1>
      <p class="text-body-2" style="color: var(--vt-c-text-light-2); margin-top: 8px;">
        <span v-if="isAdmin">Accede al administrador de servicios o al administrador de noticias.</span>
        <span v-else>Administra las publicaciones del blog/noticias.</span>
      </p>
    </div>

    <v-row class="g-4" align="stretch" justify="center">
      <v-col
        v-for="tile in tiles"
        :key="tile.to"
        cols="12"
        sm="6"
      >
        <v-card
          class="h-100"
          elevation="2"
          style="border:1px solid var(--color-border); background: var(--color-background-soft);"
          @click="go(tile.to)"
        >
          <v-card-text class="d-flex flex-column" style="gap:12px;">
            <div class="d-flex align-center" style="gap:10px;">
              <v-avatar color="primary" size="44" variant="tonal">
                <v-icon>{{ tile.icon }}</v-icon>
              </v-avatar>
              <div>
                <h2 class="text-h6 mb-1">{{ tile.title }}</h2>
                <p class="text-body-2" style="color: var(--vt-c-text-light-2); margin:0;">{{ tile.desc }}</p>
              </div>
            </div>
            <div class="d-flex align-center" style="gap:6px; color: var(--color-primary);">
              <v-icon size="18">mdi-arrow-right</v-icon>
              <span class="text-button">Ir al panel</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

const breadcrumbLabels = {
  home: 'Inicio',
  about: 'Acerca de GIGS',
  clients: 'Clientes',
  challenges: 'Retos',
  services: 'Servicios',
  blog: 'Blog',
  contact: 'Contacto',
  newsList: 'Noticias',
  newsDetail: 'Detalle',
  adminNews: 'Admin Noticias',
  notFound: 'No encontrado',
  mantenimiento: 'Mantenimiento de Aplicaciones',
  gestionbd: 'Gestión Base de Datos',
  transformacion: 'Transformación Digital',
  mesa: 'Mesa de Ayuda',
  fabrica: 'Fábrica de Software',
  taas: 'TaaS'
}

const route = useRoute()
const router = useRouter()
const db = getFirestore()

const serviceTitle = ref('')

const labelFromName = (name) => {
  switch (name) {
    case 'home': return breadcrumbLabels.home
    case 'about': return breadcrumbLabels.about
    case 'clients': return breadcrumbLabels.clients
    case 'challenges': return breadcrumbLabels.challenges
    case 'services': return breadcrumbLabels.services
    case 'blog': return breadcrumbLabels.blog
    case 'blog-detail': return null // se maneja aparte abajo
    case 'contact': return breadcrumbLabels.contact
    case 'news-list': return breadcrumbLabels.newsList
    case 'news-detail': return breadcrumbLabels.newsDetail
    case 'admin-news': return breadcrumbLabels.adminNews
    case 'NotFound': return breadcrumbLabels.notFound
    case 'mantenimiento-aplicaciones': return breadcrumbLabels.mantenimiento
    case 'gestion-base-datos': return breadcrumbLabels.gestionbd
    case 'transformación-digital': return breadcrumbLabels.transformacion
    case 'mesa-ayuda': return breadcrumbLabels.mesa
    case 'fabrica-software': return breadcrumbLabels.fabrica
    case 'taas': return breadcrumbLabels.taas
    default:
      return typeof name === 'string' ? name : ''
  }
}

const crumbs = computed(() => {
  const currentName = route.name
  const currentPath = route.path
  
  if (currentName === 'home') {
    return [{ label: breadcrumbLabels.home, to: null }]
  }
  
  const items = [{ label: breadcrumbLabels.home, to: '/' }]
  
  // Caso especial: blog detail
  if (currentName === 'blog-detail') {
    items.push({ label: breadcrumbLabels.blog, to: '/blog' })

    const articleTitle = route.params.slug || breadcrumbLabels.newsDetail
    items.push({ label: String(articleTitle), to: null })
    return items
  }

  // Caso especial: service detail
  if (currentName === 'service-detail') {
    items.push({ label: breadcrumbLabels.services, to: '/servicios' })
    const title = serviceTitle.value || route.params.slug || 'Servicio'
    items.push({ label: String(title), to: null })
    return items
  }

  // Caso normal
  const currentLabel = labelFromName(currentName)
  if (currentLabel) {
    items.push({ label: currentLabel, to: null })
  }

  // Corrección para servicios anidados
  if (currentPath && currentPath.startsWith('/servicios/')) {
    items.splice(1, 0, { label: breadcrumbLabels.services, to: '/servicios' })
  }
  
  return items
})

// Cargar el título del servicio cuando estamos en service-detail
const loadServiceTitle = async (slug) => {
  if (!slug) return
  try {
    const docRef = doc(db, 'services', slug)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      serviceTitle.value = data.title || slug
    } else {
      // Si no existe, formatear el slug como título
      serviceTitle.value = slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }
  } catch (error) {
    console.error('Error loading service title:', error)
    // Formatear el slug como título en caso de error
    serviceTitle.value = slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
}

// Observar cambios en la ruta para cargar el título del servicio
watch(
  () => [route.name, route.params.slug],
  ([routeName, slug]) => {
    if (routeName === 'service-detail' && slug) {
      loadServiceTitle(slug)
    } else {
      serviceTitle.value = ''
    }
  },
  { immediate: true }
)

const navigate = async (to) => {
  if (!to) return
  await router.push(to)
}
</script>

<template>
  <div class="breadcrumbs-wrap" :class="customClass">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li v-for="(c, idx) in crumbs" :key="idx" class="item">
          <button v-if="c.to" class="link" @click="navigate(c.to)">{{ c.label }}</button>
          <span v-else class="current" aria-current="page">{{ c.label }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped>
.breadcrumbs-wrap {
  max-width: 90%;
  margin: 0 auto;
  padding: 6px 16px 0 16px;
}

.breadcrumbs ol {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 8px 0;
  list-style: none;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.item::after {
  content: '/';
  opacity: .5;
  color: #6c757d;
}

.item:last-child::after {
  content: '';
}

.link {
  background: transparent;
  border: 0;
  padding: 2px 4px;
  color: #007bff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.link:hover { 
  text-decoration: underline; 
  color: #0056b3;
}

.current {
  padding: 2px 4px;
  font-weight: 700;
  color: #292821ff;
}
</style>

<style>
.breadcrumbs-dark .current {
  color: #f9f9f9;
}
.breadcrumbs-link .link {
  color: #f9f9f9;
}

.breadcrumbs-link .link:hover {
  color: #dfd9d9ff;
}

.breadcrumbs-link .item::after {
  color: #dfd9d9ff;
}
</style>

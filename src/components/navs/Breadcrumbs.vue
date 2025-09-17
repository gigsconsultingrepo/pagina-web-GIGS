<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    breadcrumbs: {
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
      // Servicios hijos
      mantenimiento: 'Mantenimiento de Aplicaciones',
      gestionbd: 'Gestión Base de Datos',
      transformacion: 'Transformación Digital',
      mesa: 'Mesa de Ayuda',
      fabrica: 'Fábrica de Software',
      taas: 'TaaS'
    }
  },
  en: {
    breadcrumbs: {
      home: 'Home',
      about: 'About',
      clients: 'Clients',
      challenges: 'Challenges',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      newsList: 'News',
      newsDetail: 'Detail',
      adminNews: 'News Admin',
      notFound: 'Not found',
      mantenimiento: 'Application Maintenance',
      gestionbd: 'Database Management',
      transformacion: 'Digital Transformation',
      mesa: 'Service Desk',
      fabrica: 'Software Factory',
      taas: 'TaaS'
    }
  }
}

const { t } = useI18n({ useScope: 'local', inheritLocale: true, messages })
const route = useRoute()
const router = useRouter()

const labelFromName = (name) => {
  switch (name) {
    case 'home': return t('breadcrumbs.home')
    case 'about': return t('breadcrumbs.about')
    case 'clients': return t('breadcrumbs.clients')
    case 'challenges': return t('breadcrumbs.challenges')
    case 'services': return t('breadcrumbs.services')
    case 'blog': return t('breadcrumbs.blog')
    case 'blog-detail': return t('breadcrumbs.newsDetail')
    case 'contact': return t('breadcrumbs.contact')
    case 'news-list': return t('breadcrumbs.newsList')
    case 'news-detail': return t('breadcrumbs.newsDetail')
    case 'admin-news': return t('breadcrumbs.adminNews')
    case 'NotFound': return t('breadcrumbs.notFound')
    case 'mantenimiento-aplicaciones': return t('breadcrumbs.mantenimiento')
    case 'gestion-base-datos': return t('breadcrumbs.gestionbd')
    case 'transformación-digital': return t('breadcrumbs.transformacion')
    case 'mesa-ayuda': return t('breadcrumbs.mesa')
    case 'fabrica-software': return t('breadcrumbs.fabrica')
    case 'taas': return t('breadcrumbs.taas')
    default:
      return typeof name === 'string' ? name : ''
  }
}

const buildToFromRecord = (record) => {
  // Usa record.path y sustituye :params
  let to = record.path
  if (!to || to === route.path) return null
  to = to.replace(/:([A-Za-z0-9_]+)/g, (_, p) => {
    const v = route.params?.[p]
    return v ? String(v) : _
  })
  return to
}

const crumbs = computed(() => {
  const currentName = route.name
  const currentPath = route.path
  
  // Si estamos en home, solo mostramos Home
  if (currentName === 'home') {
    return [{ label: t('breadcrumbs.home'), to: null }]
  }
  
  // Para otras páginas, siempre empezamos con Home
  const items = [{ label: t('breadcrumbs.home'), to: '/' }]
  
  // Agregamos la página actual
  const currentLabel = labelFromName(currentName)
  if (currentLabel) {
    items.push({ label: currentLabel, to: null })
  }
  
  // Si estamos en un servicio hijo, agregamos "Servicios" antes
  if (currentPath && currentPath.startsWith('/servicios/')) {
    // Insertamos "Servicios" después de Home
    items.splice(1, 0, { label: t('breadcrumbs.services'), to: '/servicios' })
  }
  
  return items
})

const navigate = async (to) => {
  if (!to) return
  await router.push(to)
}
</script>

<template>
  <div class="breadcrumbs-wrap">
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
  color: #212529;
}
</style>



<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

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
    case 'blog-detail': return null // se maneja aparte abajo
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

const crumbs = computed(() => {
  const currentName = route.name
  const currentPath = route.path
  
  if (currentName === 'home') {
    return [{ label: t('breadcrumbs.home'), to: null }]
  }
  
  const items = [{ label: t('breadcrumbs.home'), to: '/' }]
  
  // Caso especial: blog detail
  if (currentName === 'blog-detail') {
    items.push({ label: t('breadcrumbs.blog'), to: '/blog' })

    const articleTitle = route.params.slug || t('breadcrumbs.newsDetail')
    items.push({ label: String(articleTitle), to: null })
    return items
  }

  // Caso normal
  const currentLabel = labelFromName(currentName)
  if (currentLabel) {
    items.push({ label: currentLabel, to: null })
  }

  // Corrección para servicios anidados
  if (currentPath && currentPath.startsWith('/servicios/')) {
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

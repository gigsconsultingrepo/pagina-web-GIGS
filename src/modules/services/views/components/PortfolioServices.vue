<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()

const messages = {
  es: {
    portfolio: {
      title: 'Portafolio de Servicios',
      subtitle: 'Soluciones especializadas para cada necesidad tecnológica'
    },
    services: [
      {
        title: 'Fabrica de Software',
        image: '/src/assets/img/services/fabrica-software.png',
        route: '/servicios/fabrica-software',
        desc: 'Ofrecemos desarrollo a la medida con tecnología, talento y buenas prácticas, para lograr objetivos estratégicos con la mayor calidad y eficiencia posible.'
      },
      {
        title: 'TaaS (Talent as a Service)',
        image: '/src/assets/img/services/taas.png',
        route: '/servicios/taas',
        desc: 'Con nuestro servicio TaaS accedes a talento TI calificado bajo demanda, reduciendo costos y tiempos de contratación de manera eficiente y segura.'
      },
      {
        title: 'Transformación Digital',
        image: '/src/assets/img/services/transformacion-digital.png',
        route: '/servicios/transformacion-digital',
        desc: 'Diseñamos sitios web modernos, seguros y rápidos, optimizados para posicionar tu marca y convertir más visitantes en clientes de forma efectiva.'
      },
      {
        title: 'Mesa de Ayuda/Servicio',
        image: '/src/assets/img/services/mesa-ayuda.png',
        route: '/servicios/mesa-ayuda',
        desc: 'Ofrecemos soporte técnico ágil y especializado para resolver incidencias y requerimientos, mejorando la continuidad operativa y la experiencia del usuario final.'
      },
      {
        title: 'Gestión de Bases de Datos',
        image: '/src/assets/img/services/gestion-bd.png',
        route: '/servicios/gestion-base-datos',
        desc: 'Administramos y optimizamos tus bases de datos para asegurar disponibilidad, rendimiento y seguridad, facilitando decisiones basadas en información confiable.'
      },
      {
        title: 'Mantenimiento y Soporte a Aplicaciones',
        image: '/src/assets/img/services/mantenimiento.png',
        route: '/servicios/mantenimiento-aplicaciones',
        desc: 'Mantenemos tus aplicaciones actualizadas, estables y alineadas con las necesidades del negocio, corrigiendo errores y mejorando funcionalidades de forma continua.'
      }
    ],
    cta: 'Ver Más'
  },
  en: {
    portfolio: {
      title: 'Portfolio of Services',
      subtitle: 'Specialized solutions for every technological need'
    },
    services: [
      {
        title: 'Software Factory',
        image: '/src/assets/img/services/fabrica-software.png',
        route: '/servicios/fabrica-software',
        desc: 'We offer custom development with technology, talent, and best practices to achieve strategic objectives with the highest possible quality and efficiency.'
      },
      {
        title: 'TaaS (Talent as a Service)',
        image: '/src/assets/img/services/taas.png',
        route: '/servicios/taas',
        desc: 'With our TaaS service, you gain access to qualified IT talent on demand, reducing hiring costs and time efficiently and securely.'
      },
      {
        title: 'Digital Transformation',
        image: '/src/assets/img/services/transformacion-digital.png',
        route: '/servicios/transformacion-digital',
        desc: 'We design modern, secure, and fast websites, optimized to position your brand and effectively convert more visitors into customers.'
      },
      {
        title: 'Help Desk/Service',
        image: '/src/assets/img/services/mesa-ayuda.png',
        route: '/servicios/mesa-ayuda',
        desc: 'We provide agile and specialized technical support to resolve incidents and requests, enhancing operational continuity and the end-user experience.'
      },
      {
        title: 'Database Management',
        image: '/src/assets/img/services/gestion-bd.png',
        route: '/servicios/gestion-base-datos',
        desc: 'We manage and optimize your databases to ensure availability, performance, and security, enabling decisions based on reliable information.'
      },
      {
        title: 'Application Maintenance and Support',
        image: '/src/assets/img/services/mantenimiento.png',
        route: '/servicios/mantenimiento-aplicaciones',
        desc: 'We keep your applications updated, stable, and aligned with business needs, continuously fixing bugs and improving functionalities.'
      }
    ],
    cta: 'See More'
  }
}

const { t, tm, locale } = useI18n({ useScope: 'local', inheritLocale: true, messages })

const flippedSet = ref(new Set())
const isFlipped = (idx) => flippedSet.value.has(idx)
const toggleFlip = (idx) => {
  const next = new Set(flippedSet.value)
  if (next.has(idx)) next.delete(idx)
  else next.add(idx)
  flippedSet.value = next
}

const goToService = (route) => {
  router.push(route)
}
</script>

<template>
  <section class="portfolio-services">
    <v-container class="py-8 py-md-14">
      <!-- Header Section -->
      <div class="portfolio-header text-center mb-8">
        <h1 class="portfolio-title">{{ t('portfolio.title') }}</h1>
        <p class="portfolio-subtitle">{{ t('portfolio.subtitle') }}</p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div 
          v-for="(service, index) in tm('services')" 
          :key="index"
          class="service-card"
        >
          <div class="service-image-container">
            <div class="flip-card" :class="{ flipped: isFlipped(index) }">
              <div class="flip-face front">
                <img 
                  :src="service.image" 
                  :alt="service.title"
                  class="service-image"
                />
              </div>
              <div class="flip-face back">
                <div class="back-content">
                  <p>{{ service.desc }}</p>
                </div>
              </div>
            </div>
            <!-- Ícono flotante fijo en la derecha -->
            <div class="refresh-icon" @click.stop="toggleFlip(index)">
              <v-icon>mdi-rotate-3d-variant</v-icon>
            </div>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <button 
            class="service-button"
            @click="goToService(service.route)"
          >
            {{ t('cta') }}
          </button>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.portfolio-services {
  background: var(--color-background);
  color: var(--color-text);
}

.portfolio-header {
  max-width: 800px;
  margin: 0 auto 48px;
}

.portfolio-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: var(--color-heading);
  margin: 0 0 1rem;
  line-height: 1.2;
}

.portfolio-subtitle {
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 1rem;
  background: var(--color-background);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 500px;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.service-image-container {
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .5s ease;
}

.flip-card.flipped {
  transform: rotateY(180deg);
}

.flip-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
}

.flip-face.back {
  transform: rotateY(180deg);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-content {
  padding: 1rem;
  color: #fff;
  text-align: center;
  line-height: 1.45;
  font-size: 0.875rem;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.refresh-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  backdrop-filter: blur(4px);
  cursor: pointer;
  z-index: 20;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 1.25rem;
  line-height: 1.3;
  min-height: 3.25rem;
  display: flex;
  align-items: center;
}

.service-button {
  background: var(--color-primary);
  color: var(--vt-c-white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 7.5rem;
}

.service-button:hover {
  background: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .service-card {
    padding: 1.25rem;
    min-height: 450px;
  }
  
  .portfolio-header {
    padding: 0 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1025px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>

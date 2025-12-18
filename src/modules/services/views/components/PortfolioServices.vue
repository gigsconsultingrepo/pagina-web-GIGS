<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

const router = useRouter()

const portfolioData = {
  title: 'Portafolio de Servicios',
  subtitle: 'Soluciones especializadas para cada necesidad tecnológica',
  cta: 'Ver Más'
}

const services = ref([])

const flippedSet = ref(new Set())
const isFlipped = (idx) => flippedSet.value.has(idx)
const toggleFlip = (idx) => {
  const next = new Set(flippedSet.value)
  if (next.has(idx)) next.delete(idx)
  else next.add(idx)
  flippedSet.value = next
}

// Función para ir al detalle según el ID del documento
const goToService = (service) => {
  router.push(`/servicios/${service.id}`)
}

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'services'))
  services.value = querySnapshot.docs.map(doc => ({
    id: doc.id, // <-- guardamos el ID del documento
    ...doc.data()
  }))
})
</script>

<template>
  <section class="portfolio-services">
    <v-container class="py-8 py-md-14">
      <div class="portfolio-header text-center mb-8">
        <h1 class="portfolio-title">{{ portfolioData.title }}</h1>
        <p class="portfolio-subtitle">{{ portfolioData.subtitle }}</p>
      </div>

      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
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
                  <p>{{ service.summary }}</p>
                </div>
              </div>
            </div>
            <div class="refresh-icon" @click.stop="toggleFlip(index)">
              <v-icon>mdi-rotate-3d-variant</v-icon>
            </div>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <button 
            class="service-button"
            @click="goToService(service)"
          >
            {{ portfolioData.cta }}
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

<script setup>
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'

const servicesData = {
  subtitle: 'Nuestros Servicios',
  title: 'Soluciones Tecnológicas Integrales',
  description: 'Transformamos ideas en realidades digitales con servicios de desarrollo, consultoría e implementación tecnológica que impulsan el crecimiento de tu empresa.'
}
</script>

<template>
  <section class="services-wrap">
    <Breadcrumbs customClass="breadcrumbs-link" />
    <v-container class="py-8 py-md-14">
      <v-row class="services-row" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="7" lg="6" class="order-2 order-md-1 text-center text-md-start px-4">
          <div class="subtitle">{{ servicesData.subtitle }}</div>
          <h1 class="services-title">{{ servicesData.title }}</h1>
          <p class="services-desc mx-auto mx-md-0">{{ servicesData.description }}</p>
        </v-col>

        <v-col cols="12" md="5" lg="5" class="order-1 order-md-2 px-4 mb-6 mb-md-0 illustration-col">
          <div class="illustration-container">
            <div class="character">
              <div class="character-placeholder">
                <img src="@/assets/img/services/services-character.png" alt="Clientes GIGS" class="character-img" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.services-wrap {
  position: relative;
  overflow: hidden;
  color: var(--vt-c-white);
  background: var(--color-primary);
}

.subtitle {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vt-c-white);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.services-title {
  margin: 0 0 1.25rem;
  width: 20ch;
  line-height: 1.1;
  font-weight: 800;
  font-size: clamp(2rem, 6vw, 3.5rem);
  color: var(--vt-c-white);
}

.services-desc {
  margin: 0;
  max-width: 80ch;
  opacity: .9;
  font-size: 1rem;
  line-height: 1.6;
}

/* imagen pegada más a la derecha */
.illustration-col {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.character-img {
  max-width: 100%;
  height: auto;
  transform: translateX(150px);
}

@media (max-width: 959px) {
  .services-desc {
    max-width: 70ch;
  }

  .illustration-container {
    height: 19.375rem;
  }

  .services-row {
    flex-direction: column-reverse;
  }

  .illustration-col {
    justify-content: center;
  }

  .character-img {
    transform: translateX(0); /* en móvil vuelve al centro */
  }
}
</style>

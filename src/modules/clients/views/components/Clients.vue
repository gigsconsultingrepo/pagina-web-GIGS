<script setup>
import Breadcrumbs from '@/components/navs/Breadcrumbs.vue'

const clientsData = {
  subtitle: 'Nuestros Clientes',
  title: 'Empresas que confían en nosotros',
  description: 'Hemos tenido el privilegio de trabajar con empresas de diversos sectores, ayudándolas a alcanzar sus objetivos digitales y transformar sus operaciones con soluciones tecnológicas innovadoras.'
}
</script>

<template>
  <section class="clients-wrap">
  <Breadcrumbs />
    <v-container class="py-8 py-md-14">
      <v-row class="clients-row" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="7" lg="6" class="order-2 order-md-1 text-center text-md-start px-4">
          <div class="subtitle">{{ clientsData.subtitle }}</div>
          <h1 class="clients-title">{{ clientsData.title }}</h1>
          <p class="clients-desc mx-auto mx-md-0">{{ clientsData.description }}</p>
        </v-col>

        <v-col cols="12" md="5" lg="5" class="order-1 order-md-2 d-flex justify-center px-4 mb-6 mb-md-0">
          <div class="illustration-container">
            <div class="character">
              <!-- Aquí puedes colocar el placeholder o logos de clientes -->
              <div class="character-placeholder">
                <img src="@/assets/img/clients/clients-personaje1.png" alt="Clientes GIGS" class="character-img" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.clients-wrap {
  position: relative;
  overflow: hidden;
  color: var(--vt-c-text-light-1);
  background: var(--color-background-soft);
}


.subtitle {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.clients-title {
  margin: 0 0 20px;
  line-height: 1.1;
  font-weight: 800;
  font-size: clamp(32px, 6vw, 56px);
  color: var(--vt-c-text-light-1);
}

.clients-desc {
  margin: 0;
  max-width: 60ch;
  opacity: .9;
  font-size: var(--text-base);
  line-height: 1.6;
}

.character-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background: var(--vt-c-white);
}

@media (max-width: 959px) {
  .clients-desc {
    max-width: 70ch;
  }
  
  .illustration-container {
    height: 290px;
  }
  
  .character-placeholder {
    margin-top: 100px; 
    width: 150px;
    height: 150px;
  }
  
  .clients-row {
    flex-direction: column-reverse;
  }
}
</style>

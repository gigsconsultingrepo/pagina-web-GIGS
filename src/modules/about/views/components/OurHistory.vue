<script setup>
const historyData = {
  title: 'Nuestra Historia',
  description: 'Desde 2016, en Gigs Consulting ayudamos a empresas a transformar sus procesos a través de soluciones tecnológicas innovadoras. Nacimos con la visión de conectar negocios con herramientas digitales eficaces, y hoy seguimos creciendo junto a nuestros clientes, creando software útil, escalable y alineado con cada necesidad.'
}
</script>

<template>
  <section class="our-history-wrap">
    <v-container class="py-8 py-md-14">
      <v-row class="history-row" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="5" lg="5" class="order-1 order-md-1 d-flex justify-center px-4 mb-6 mb-md-0">

              <div class="diamond-icon">
                <img src="@/assets/img/about/about-logo-gigs.png" alt="Logo de GIGS" class="diamond-img" />
              </div>
        </v-col>

        <v-col cols="12" md="7" lg="6" class="order-2 order-md-2 text-center text-md-start px-4">
          <h2 class="history-title">{{ historyData.title }}</h2>
          <p class="history-desc mx-auto mx-md-0">{{ historyData.description }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.our-history-wrap {
  position: relative;
  overflow: hidden;
  color: var(--vt-c-white);
  background: var(--vt-c-indigo);
}

.diamond-img {
  width: 100%;     /* más pequeño que el contenedor */
  height: auto;   /* mantiene la proporción */
  object-fit: contain;
}

.history-title {
  margin: 0 0 20px;
  line-height: 1.1;
  font-weight: 800;
  font-size: clamp(32px, 6vw, 56px);
  color: var(--vt-c-white);
}

.history-desc {
  margin: 0;
  max-width: 60ch;
  opacity: .95;
  font-size: var(--text-base);
  line-height: 1.6;
}

@media (max-width: 959px) {
  .history-desc {
    max-width: 70ch;
  }
  
  .diamond-img {
    width: 250px;
    height: 170px;
  }
  
  .history-row {
    flex-direction: column;
  }
}
</style>

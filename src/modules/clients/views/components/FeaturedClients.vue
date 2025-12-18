<script setup>
const featuredData = {
  title: "Clientes Destacados",
  description: "Algunas de las empresas líderes que confían en nosotros",
  items: [
    {
      name: "Banco Central",
      sector: "Financiero",
      description: "Transformación digital completa de su plataforma bancaria online, mejorando la experiencia del usuario y la seguridad.",
      metrics: [
        { label: "Mejora en UX", value: "+45%" },
        { label: "Tiempo de Carga", value: "-60%" }
      ]
    },
    {
      name: "MediTech",
      sector: "Salud",
      description: "Sistema de gestión hospitalaria integral con IA para optimizar recursos y mejorar la atención al paciente.",
      metrics: [
        { label: "Eficiencia", value: "+35%" },
        { label: "Tiempo de Espera", value: "-40%" }
      ]
    },
    {
      name: "ShopMax",
      sector: "E-Commerce",
      description: "Plataforma de comercio electrónico con integración de pagos, inventario y análisis avanzado de datos.",
      metrics: [
        { label: "Ventas Online", value: "+120%" },
        { label: "Conversión", value: "+25%" }
      ]
    }
  ]
};
</script>

<template>
  <section class="featured-section">
    <v-container class="py-12 text-center">
      <h2 class="featured-title">{{ featuredData.title }}</h2>
      <p class="featured-desc">
        {{ featuredData.description }}
      </p>

      <v-row justify="center" class="mt-8">
        <v-col
          v-for="(client, index) in featuredData.items"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <div class="featured-card">
            <div class="avatar"></div>
            <h3 class="client-name">{{ client.name }}</h3>
            <p class="client-sector">Sector {{ client.sector }}</p>
            <p class="client-desc">{{ client.description }}</p>

            <div class="metrics">
              <div
                v-for="(metric, i) in client.metrics"
                :key="i"
                class="metric"
              >
                <span class="metric-label">{{ metric.label }}</span>
                <span class="metric-value">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.featured-section {
  background: #0a2a78; /* Azul de fondo */
  color: #fff;
  padding: 60px 20px;
}

.featured-title {
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 800;
  margin-bottom: 10px;
}

.featured-desc {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.featured-card {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.featured-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.avatar {
  width: 60px;
  height: 60px;
  background: #333;
  border-radius: 50%;
  margin: 0 auto 12px;
}

.client-name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 4px;
}

.client-sector {
  font-size: 0.875rem;
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 12px;
}

.client-desc {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

.metrics {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.metric {
  text-align: center;
  flex: 1;
}

.metric-label {
  display: block;
  font-size: 0.8125rem;
  opacity: 0.8;
}

.metric-value {
  font-size: 1.375rem;
  font-weight: 800;
  color: #1976d2;
}
</style>

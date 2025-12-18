<script setup>
import { ref, computed } from "vue";
const clientsData = {
  title: "Nuestros Clientes",
  description: "Una lista completa de empresas que han confiado en GIGS CONSULTING",
  filters: ["Todos", "Seguros", "E-commerce", "Finanzas", "Retail", "Educación", "Salud", "Sector Público", "Logística"]
};

const clients = [
  { name: "TechStore", sector: "E-commerce" },
  { name: "FastLog", sector: "Retail" },
  { name: "Seguros Pro", sector: "Seguros" },
  { name: "MediTech", sector: "Salud" },
  { name: "Industrias ABC", sector: "Finanzas" },
  { name: "ShopMax", sector: "Retail" },
  { name: "Academia Online", sector: "Educación" },
  { name: "Farmacia 24/7", sector: "Salud" },
  { name: "Banco Central", sector: "Finanzas" }
];

const activeFilter = ref("Todos");

const filteredClients = computed(() => {
  if (activeFilter.value === "Todos") return clients;
  return clients.filter(c => c.sector === activeFilter.value);
});
</script>

<template>
  <section class="clients-section">
    <v-container class="py-12 text-center">
      <h2 class="clients-title">{{ clientsData.title }}</h2>
      <p class="clients-desc">{{ clientsData.description }}</p>

      <div class="clients-filters">
        <button
          v-for="filter in clientsData.filters"
          :key="filter"
          :class="['filter-btn', { active: activeFilter === filter }]"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <v-row class="clients-grid" justify="center">
        <v-col
          v-for="(client, index) in filteredClients"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          class="client-card"
        >
          <div class="client-avatar"></div>
          <p class="client-name">{{ client.name }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.clients-section {
  background: var(--vt-c-white);
  color: var(--vt-c-black);
}

.clients-title {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.clients-desc {
  max-width: 75ch;
  margin: 0 auto 2.5rem;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

.clients-filters {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.375rem 0.875rem;
  border-radius: 1.25rem;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: #f5f5f5;
}

.filter-btn.active {
  background: #1976d2;
  color: #fff;
  border-color: #1976d2;
}


.clients-grid {
  margin-top: 1.25rem;
}

.client-card {
  text-align: center;
  margin-bottom: 1.875rem;
}

.client-avatar {
  width: 90px;
  height: 90px;
  background: #e0e0e0;
  border-radius: 50%;
  margin: 0 auto 10px;
}

.client-name {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>

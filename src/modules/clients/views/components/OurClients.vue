<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const messages = {
  es: {
    clients: {
      title: "Nuestros Clientes",
      description: "Una lista completa de empresas que han confiado en GIGS CONSULTING",
      filters: ["Todos", "Seguros", "E-commerce", "Finanzas", "Retail", "Educación", "Salud", "Sector Público", "Logística"]
    }
  },
  en: {
    clients: {
      title: "Our Clients",
      description: "A complete list of companies that have trusted GIGS CONSULTING",
      filters: ["All", "Insurance", "E-commerce", "Finance", "Retail", "Education", "Health", "Public Sector", "Logistics"]
    }
  }
};

const { t, locale } = useI18n({ useScope: "local", inheritLocale: true, messages });

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
  if (activeFilter.value === "Todos" || activeFilter.value === "All") return clients;
  return clients.filter(c => c.sector === activeFilter.value);
});
</script>

<template>
  <section class="clients-section">
    <v-container class="py-12 text-center">
      <h2 class="clients-title">{{ t("clients.title") }}</h2>
      <p class="clients-desc">{{ t("clients.description") }}</p>

      <div class="clients-filters">
        <button
          v-for="filter in messages[locale].clients.filters"
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
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  margin-bottom: 12px;
}

.clients-desc {
  max-width: 75ch;
  margin: 0 auto 40px;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
}

.clients-filters {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
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
  margin-top: 20px;
}

.client-card {
  text-align: center;
  margin-bottom: 30px;
}

.client-avatar {
  width: 90px;
  height: 90px;
  background: #e0e0e0;
  border-radius: 50%;
  margin: 0 auto 10px;
}

.client-name {
  font-size: 14px;
  font-weight: 500;
}
</style>

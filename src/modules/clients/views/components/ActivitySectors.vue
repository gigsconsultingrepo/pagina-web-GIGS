<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const messages = {
  es: {
    sectors: {
      title: "Sectores de Actividad",
      description: "Diversidad de industrias que confían en nuestras soluciones",
      items: [
        {
          name: "Finanzas",
          desc: "Soluciones seguras para el sector financiero",
          clients: "12 Clientes"
        },
        {
          name: "E-commerce",
          desc: "Plataformas de venta online innovadoras",
          clients: "10 Clientes"
        },
        {
          name: "Sector Público",
          desc: "Soluciones digitales para mejorar atención ciudadana",
          clients: "8 Clientes"
        },
        {
          name: "Seguros",
          desc: "Gestión de pólizas y siniestros con chatbots",
          clients: "4 Clientes"
        },
        {
          name: "Retail",
          desc: "Soluciones digitales para optimizar la experiencia de compra",
          clients: "12 Clientes"
        },
        {
          name: "Educación",
          desc: "Plataformas interactivas para instituciones educativas",
          clients: "6 Clientes"
        },
        {
          name: "Salud",
          desc: "Tecnología para mejorar la atención médica y gestión de pacientes",
          clients: "7 Clientes"
        },
        {
          name: "Logística",
          desc: "Soluciones digitales para optimizar la cadena de suministro",
          clients: "9 Clientes"
        }
      ]
    }
  },
  en: {
    sectors: {
      title: "Sectors of Activity",
      description: "A diversity of industries that trust our solutions",
      items: [
        {
          name: "Finance",
          desc: "Secure solutions for the financial sector",
          clients: "12 Clients"
        },
        {
          name: "E-commerce",
          desc: "Innovative online sales platforms",
          clients: "10 Clients"
        },
        {
          name: "Public Sector",
          desc: "Digital solutions to improve citizen service",
          clients: "8 Clients"
        },
        {
          name: "Insurance",
          desc: "Policy and claims management with chatbots",
          clients: "4 Clients"
        },
        {
          name: "Retail",
          desc: "Digital solutions to optimize the shopping experience",
          clients: "12 Clients"
        },
        {
          name: "Education",
          desc: "Interactive platforms for educational institutions",
          clients: "6 Clients"
        },
        {
          name: "Healthcare",
          desc: "Technology to improve medical care and patient management",
          clients: "7 Clients"
        },
        {
          name: "Logistics",
          desc: "Digital solutions to optimize the supply chain",
          clients: "9 Clients"
        }
      ]
    }
  }
};

const { t, locale } = useI18n({ useScope: "local", inheritLocale: true, messages });

// Array de imágenes (no cambia por idioma)
const sectorImages = [
  new URL("@/assets/img/clients/finanzas.avif", import.meta.url).href,
  new URL("@/assets/img/clients/ecommerce.webp", import.meta.url).href,
  new URL("@/assets/img/clients/sector-publico.webp", import.meta.url).href,
  new URL("@/assets/img/clients/seguros.avif", import.meta.url).href,
  new URL("@/assets/img/clients/retail.jpeg", import.meta.url).href,
  new URL("@/assets/img/clients/educacion.avif", import.meta.url).href,
  new URL("@/assets/img/clients/salud.webp", import.meta.url).href,
  new URL("@/assets/img/clients/logistica.jpeg", import.meta.url).href
];

// Combinar datos traducidos con imágenes
const sectors = computed(() => {
  const currentLocale = locale.value || 'es'; // Fallback a español si locale es undefined
  console.log('Current locale:', currentLocale);
  console.log('Messages structure:', messages[currentLocale]);
  
  const result = messages[currentLocale]?.sectors?.items?.map((item, index) => ({
    ...item,
    img: sectorImages[index]
  })) || [];
  
  console.log('Sectors result:', result);
  return result;
});

const currentIndex = ref(0);
const itemsPerView = ref(4); // Desktop: 4, Mobile: 1

const updateItemsPerView = () => {
  itemsPerView.value = window.innerWidth <= 959 ? 1 : 4;
};

onMounted(() => {
  updateItemsPerView();
  window.addEventListener("resize", updateItemsPerView);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItemsPerView);
});

const visibleSectors = computed(() => {
  const result = [];
  for (let i = 0; i < itemsPerView.value; i++) {
    result.push(sectors.value[(currentIndex.value + i) % sectors.value.length]);
  }
  return result;
});

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % sectors.value.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + sectors.value.length) % sectors.value.length;
};
</script>

<template>
  <section class="sectors-section">
    <v-container class="py-12 text-center">
      <h2 class="sectors-title">{{ t("sectors.title") }}</h2>
      <p class="sectors-desc">{{ t("sectors.description") }}</p>

      <div class="sectors-carousel">
        <!-- Flecha Izquierda -->
        <button class="arrow-btn left" @click="prev">
          <v-icon color="primary">mdi-chevron-left</v-icon>
        </button>

        <!-- Sectores visibles -->
        <v-row class="sectors-row" no-gutters>
          <v-col
            v-for="(sector, index) in visibleSectors"
            :key="index"
            cols="12"
            :md="12 / itemsPerView"
            class="sectors-col"
          >
            <div class="sector-card" :style="{ backgroundImage: `url(${sector.img})` }">
              <div class="sector-overlay">
                <h3 class="sector-name">{{ sector.name }}</h3>
                <p class="sector-desc">{{ sector.desc }}</p>
                <span class="sector-clients">{{ sector.clients }}</span>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Flecha Derecha -->
        <button class="arrow-btn right" @click="next">
          <v-icon color="primary">mdi-chevron-right</v-icon>
        </button>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.sectors-section {
  background: var(--vt-c-white);
  color: var(--vt-c-black);
}

.sectors-title {
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  margin-bottom: 12px;
}

.sectors-desc {
  max-width: 75ch;
  margin: 0 auto 40px;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
}

.sectors-carousel {
  position: relative;
  display: flex;
  align-items: center;
}

.arrow-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 28px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.arrow-btn.left {
  left: -100px;
}
.arrow-btn.right {
  right: -100px;
}

.sector-card {
  position: relative;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  height: 260px; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.3s;
  margin: 0 10px;
}

.sector-card:hover {
  transform: translateY(-5px);
}

.sector-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.80);
  z-index: 1;
}

.sector-overlay {
  position: relative;
  z-index: 2; /* Se pone arriba del overlay oscuro */
  color: #fff;
  text-align: center;
  padding: 20px;
  width: 100%;
}

.sector-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.sector-desc {
  font-size: 14px;
  margin-bottom: 6px;
}

.sector-clients {
  font-size: 13px;
  font-weight: 600;
  color: #f5f5f5;
}

@media (max-width: 959px) {
  .arrow-btn.left {
    left: -10px;
  }
  .arrow-btn.right {
    right: -10px;
  }
  .sector-card {
    width: 70%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
}
</style>

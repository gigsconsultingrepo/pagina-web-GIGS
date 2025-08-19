<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const messages = {
  es: {
    team: {
      title: "Nuestro Equipo",
      description:
        "Un equipo comprometido, creativo y experto en tecnología, trabajando juntos para impulsar el éxito de cada proyecto.",
    },
  },
  en: {
    team: {
      title: "Our Team",
      description:
        "A committed, creative and technology-expert team, working together to drive the success of each project.",
    },
  },
};

const { t } = useI18n({ useScope: "local", inheritLocale: true, messages });

// miembros
const members = [
  {
    name: "Valeria Montoya",
    role: "Directora de Innovación",
    bio: "Más de 8 años liderando proyectos tecnológicos que impulsan la transformación digital.",
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  },
  {
    name: "Andrés Cifuentes",
    role: "Gerente de Estrategia Digital",
    bio: "Experto en planeación estratégica y crecimiento empresarial en entornos ágiles.",
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  },
  {
    name: "Santiago Beltrán",
    role: "Coordinador de TI",
    bio: "Amplia trayectoria en desarrollo de software y gestión de equipos ágiles.",
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  },
  {
    name: "Mariana Duarte",
    role: "Comunicación Corporativa",
    bio: "Comunicación con experiencia en fortalecer marcas y relaciones empresariales.",
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  },
  {
    name: "Camila Torres",
    role: "UX/UI Designer",
    bio: "Diseñadora enfocada en experiencias digitales atractivas y funcionales.",
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  },
  {
    name: "Javier Rojas",
    role: "Analista de Datos",
    bio: "Especialista en analítica avanzada y visualización de datos para decisiones estratégicas.",
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  },
];

const currentIndex = ref(0);
const total = members.length;
const itemsPerView = ref(4); // Desktop: 4, Mobile: 1

// 🔹 Detecta si es mobile (≤959px) y ajusta itemsPerView
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

// 🔹 Calcular miembros visibles
const visibleMembers = computed(() => {
  const result = [];
  for (let i = 0; i < itemsPerView.value; i++) {
    result.push(members[(currentIndex.value + i) % total]);
  }
  return result;
});

// 🔹 Navegación
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % total;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + total) % total;
};
</script>

<template>
  <section class="team-section">
    <v-container class="py-12 text-center">
      <h2 class="team-title">{{ t("team.title") }}</h2>
      <p class="team-desc">{{ t("team.description") }}</p>

      <div class="team-carousel">
        <!-- Flecha Izquierda -->
        <button class="arrow-btn left" @click="prev">
          <v-icon color="primary">mdi-chevron-left</v-icon>
        </button>

        <!-- Miembros visibles -->
        <v-row class="team-row" no-gutters>
          <v-col
            v-for="(member, index) in visibleMembers"
            :key="index"
            cols="12"
            :md="12 / itemsPerView"
            class="team-col"
          >
            <div class="team-card">
              <div class="team-img">
                <img :src="member.img" :alt="member.name" />
              </div>
              <h3 class="team-name">{{ member.name }}</h3>
              <h4 class="team-role">{{ member.role }}</h4>
              <p class="team-bio">{{ member.bio }}</p>
              <div class="team-socials">
                <a href="#" target="_blank">
                  <v-icon color="primary">mdi-linkedin</v-icon>
                </a>
                <a href="#" target="_blank">
                  <v-icon color="primary">mdi-whatsapp</v-icon>
                </a>
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
.team-section {
  background: var(--vt-c-white);
  color: var(--vt-c-black);
}

.team-title {
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  margin-bottom: 12px;
}

.team-desc {
  max-width: 75ch;
  margin: 0 auto 40px;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
}

.team-carousel {
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
  left: -150px;
}
.arrow-btn.right {
  right: -150px;
}

.team-card {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  justify-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
  height: 100%;
}
.team-card:hover {
  transform: translateY(-5px);
}
.team-card img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
}

.team-name {
  font-size: 18px;
  font-weight: 700;
  margin-top: 12px;
}

.team-role {
  font-size: 16px;
  font-weight: 600;
  color: var(--vt-c-black);
  margin: 5px 0 10px;
}

.team-bio {
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;
  margin-bottom: 12px;
  max-width: 45ch;
}

.team-socials {
  display: flex;
  gap: 12px;
  margin-top: auto;
}


@media (max-width: 959px) {
  .arrow-btn.left {
    left: -20px;
  }
  .arrow-btn.right {
    right: -20px;
  }
}
</style>

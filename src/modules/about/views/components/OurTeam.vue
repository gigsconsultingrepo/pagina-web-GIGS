<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const teamData = {
  title: "Nuestro Equipo",
  description: "Un equipo comprometido, creativo y experto en tecnología, trabajando juntos para impulsar el éxito de cada proyecto.",
  members: [
    {
      name: "Valeria Montoya",
      role: "Directora de Innovación",
      bio: "Más de 8 años liderando proyectos tecnológicos que impulsan la transformación digital.",
    },
    {
      name: "Andrés Cifuentes",
      role: "Gerente de Estrategia Digital",
      bio: "Experto en planeación estratégica y crecimiento empresarial en entornos ágiles.",
    },
    {
      name: "Santiago Beltrán",
      role: "Coordinador de TI",
      bio: "Amplia trayectoria en desarrollo de software y gestión de equipos ágiles.",
    },
    {
      name: "Mariana Duarte",
      role: "Comunicación Corporativa",
      bio: "Comunicación con experiencia en fortalecer marcas y relaciones empresariales.",
    },
    {
      name: "Camila Torres",
      role: "UX/UI Designer",
      bio: "Diseñadora enfocada en experiencias digitales atractivas y funcionales.",
    },
    {
      name: "Javier Rojas",
      role: "Analista de Datos",
      bio: "Especialista en analítica avanzada y visualización de datos para decisiones estratégicas.",
    },
  ],
};

const members = computed(() =>
  teamData.members.map((m) => ({
    ...m,
    img: new URL("@/assets/img/about/box-example.jpg", import.meta.url).href,
  }))
);

const currentIndex = ref(0);
const itemsPerView = ref(4);

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

const visibleMembers = computed(() => {
  const result = [];
  for (let i = 0; i < itemsPerView.value; i++) {
    result.push(members.value[(currentIndex.value + i) % members.value.length]);
  }
  return result;
});

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % members.value.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + members.value.length) % members.value.length;
};
</script>

<template>
  <section class="team-section">
    <v-container class="py-12 text-center">
      <h2 class="team-title">{{ teamData.title }}</h2>
      <p class="team-desc">{{ teamData.description }}</p>

      <div class="team-carousel">
        <button class="arrow-btn left" @click="prev">
          <v-icon color="primary">mdi-chevron-left</v-icon>
        </button>

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
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.75rem;
}
.team-desc {
  max-width: 75ch;
  margin: 0 auto 2.5rem;
  font-size: 1rem;
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
  font-size: 1.75rem;
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
.team-card {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  justify-items: center;
  text-align: center;
  padding: 1.25rem;
  border-radius: 1rem;
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
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0.75rem;
}
.team-role {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vt-c-black);
  margin: 0.3125rem 0 0.625rem;
}
.team-bio {
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0.85;
  margin-bottom: 0.75rem;
  max-width: 45ch;
}
.team-socials {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}
@media (max-width: 959px) {
  .arrow-btn.left {
    left: -1.25rem;
  }
  .arrow-btn.right {
    right: -1.25rem;
  }
}
</style>

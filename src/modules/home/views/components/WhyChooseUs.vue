<script setup>
const sectionTitle = "Por qué elegirnos"
const items = [
  {
    title: "Innovación práctica",
    desc: "Aplicamos tecnología de forma estratégica y sencilla, asegurando que cada solución sea fácil de implementar y genere valor real desde el primer día.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1120&auto=format&fit=crop",
  },
  {
    title: "Enfoque en eficiencia",
    desc: "Optimizamos procesos para que tu negocio ahorre tiempo, reduzca costos y aumente su capacidad de respuesta sin sacrificar calidad.",
    img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1120&auto=format&fit=crop",
  },
  {
    title: "Compromiso a largo plazo",
    desc: "Acompañamos el crecimiento de tu empresa y evolucionamos contigo, asegurando mejoras continuas y resultados sostenibles.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1120&auto=format&fit=crop",
  },
]
</script>

<template>
  <section class="why-section mt-5 mb-5">
    <v-container class="py-10 py-md-14">
      <header class="text-center mb-8 mb-md-10">
        <h2 class="why-title">{{ sectionTitle }}</h2>
      </header>

      <v-row dense class="gy-8">
        <v-col v-for="(it, i) in items" :key="i" cols="12">
          <v-card class="feature-card" elevation="0">
            <v-row no-gutters class="fill-height">
              <v-col
                cols="12"
                md="5"
                :order-md="i % 2 === 0 ? 1 : 2"
                class="media-col"
              >
                <v-img
                  :src="it.img"
                  cover
                  class="feature-img"
                  :alt="it.title"
                />
              </v-col>

              <v-col
                cols="12"
                md="7"
                :order-md="i % 2 === 0 ? 2 : 1"
                class="content-col"
              >
                <div class="content-wrap">
                  <div class="title-row">
                    <span class="accent-dot" />
                    <h3 class="card-title">{{ it.title }}</h3>
                  </div>
                  <p class="card-desc">
                    {{ it.desc }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<style scoped>
.why-section {
	background: var(--color-background);
	color: var(--color-text);
}

.why-title {
	font-size: clamp(1.4rem, 1.2rem + 1vw, 2rem);
	font-weight: 700;
	color: var(--color-heading);
}

.feature-card {
	height: 320px;
	border-radius: 16px;
	overflow: hidden;
	margin: 1em 0 1em 0;
	border: 1px solid var(--color-primary-dark);
	background: var(--color-background-soft);
	transition: transform .25s, box-shadow .25s;
}

.feature-card:hover {
	box-shadow: 0 0 15px 0 #015abe52 !important;
	transform: scale(1.05) translate(0, -4px);
}

@media (max-width: 959px) {

	.feature-card {
		height: auto;
	}

	.media-col {
		height: auto;
	}

	.feature-img {
		height: 200px;
		width: 100%;
		object-fit: cover;
	}

	.content-wrap {
		padding: 16px 18px;
	}

	.feature-card:hover {
		transform: none;
		box-shadow: none !important;
	}
}

@media (min-width: 960px) {
	.feature-card {
		height: 320px;
	}

	.media-col {
		height: 100%;
	}

	.feature-img {
		height: 100%;
	}
}

.media-col {
	height: 100%;
}

.feature-img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}

.content-col {
	display: flex;
	align-items: center;
	background: var(--vt-c-white);
}

.content-wrap {
	padding: 22px;
}

.title-row {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 8px;
}

.accent-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: var(--color-primary);
	box-shadow: 0 0 0 6px var(--color-primary-soft);
}

.card-title {
	font-weight: 700;
	font-size: 1.2rem;
	color: var(--color-heading);
}

.card-desc {
	color: var(--vt-c-text-light-2);
	font-size: .95rem;
	line-height: 1.6;
}
</style>

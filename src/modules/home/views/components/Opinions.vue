<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const MESSAGES = {
	es: {
		title: 'Lo Que Opinan Nuestros Clientes',
		testimonials: [
			{
				quote:
					'Con Gigs automatizamos nuestra atención al cliente en WhatsApp. El proceso fue ágil y vimos resultados desde el primer mes.',
				author: '– Laura Méndez, Directora de Operaciones en AgroSoluciones'
			},
			{
				quote:
					'Rediseñaron nuestro sitio web con un enfoque moderno, rápido y adaptable. Tuvimos una excelente experiencia.',
				author: '– Andrés Vargas, CEO de LegalTech Bogotá'
			},
			{
				quote:
					'Nos crearon un sistema de gestión personalizado que optimizó procesos y mejoró el rendimiento del equipo.',
				author: '– Mariana Restrepo, Coordinadora de TI en EduPro Colombia'
			}
		]
	},
	en: {
		title: 'What Our Clients Say',
		testimonials: [
			{
				quote:
					'With Gigs we automated our WhatsApp customer service. Results from month one.',
				author: '– Laura Méndez, Operations Director at AgroSoluciones'
			},
			{
				quote:
					'They redesigned our website with a modern, fast, adaptable approach.',
				author: '– Andrés Vargas, CEO at LegalTech Bogotá'
			},
			{
				quote:
					'A tailored management system that optimized processes and boosted performance.',
				author: '– Mariana Restrepo, IT Coordinator at EduPro Colombia'
			}
		]
	}
}

const { t, tm, locale, mergeLocaleMessage } = useI18n({ useScope: 'local' })
mergeLocaleMessage('es', MESSAGES.es)
mergeLocaleMessage('en', MESSAGES.en)

const autoplay = true
const intervalMs = 4500
const pauseOnHover = true

const perView = ref(3)
const isHover = ref(false)
const current = ref(0)
const transitioning = ref(false)

const calcPerView = () => {
	const w = window.innerWidth
	perView.value = w < 640 ? 1 : w < 1024 ? 2 : 3
}

const baseItems = computed(() => (tm('testimonials') ?? []))
const extendedItems = computed(() => {
	const n = Math.min(perView.value, baseItems.value.length || 1)
	if (!baseItems.value.length) return []
	const head = baseItems.value.slice(0, n)
	const tail = baseItems.value.slice(-n)
	return [...tail, ...baseItems.value, ...head]
})

const resetToRealStart = () => {
	const n = Math.min(perView.value, baseItems.value.length || 1)
	current.value = n
	transitioning.value = false
}

const next = () => { if (extendedItems.value.length) { transitioning.value = true; current.value++ } }
const prev = () => { if (extendedItems.value.length) { transitioning.value = true; current.value-- } }

const onTransitionEnd = () => {
	const n = Math.min(perView.value, baseItems.value.length || 1)
	const realLen = baseItems.value.length
	if (!realLen) return
	if (current.value >= realLen + n) { transitioning.value = false; current.value = n }
	else if (current.value < n) { transitioning.value = false; current.value = realLen + n - 1 }
}

let timer = null
const startAutoplay = () => {
	if (!autoplay || !baseItems.value.length) return
	stopAutoplay()
	timer = setInterval(() => {
		if (pauseOnHover && isHover.value) return
		next()
	}, intervalMs)
}
const stopAutoplay = () => { if (timer) { clearInterval(timer); timer = null } }

const translateStyle = computed(() => {
	const pv = Math.max(perView.value, 1)
	const pct = (100 / pv) * current.value
	return {
		transform: `translateX(-${pct}%)`,
		transition: transitioning.value ? 'transform 420ms ease' : 'none'
	}
})

const onResize = () => {
	const prevPV = perView.value
	calcPerView()
	if (prevPV !== perView.value) { transitioning.value = false; resetToRealStart() }
	startAutoplay()
}

watch([() => locale.value, baseItems], () => {
	transitioning.value = false
	resetToRealStart()
	startAutoplay()
})

onMounted(() => {
	calcPerView()
	resetToRealStart()
	startAutoplay()
	window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', onResize)
	stopAutoplay()
})
</script>

<template>
	<section class="opinions-section" @mouseenter="isHover = true" @mouseleave="isHover = false">
		<div class="opinions-container">
			<h2 class="opinions-title">{{ t('title') }}</h2>

			<div class="carousel">
				<div class="viewport">
					<div class="track" :style="translateStyle" @transitionend="onTransitionEnd">
						<article v-for="(it, idx) in extendedItems" :key="idx" class="slide"
							:style="{ width: `calc(${100 / perView}% - 0.01px)` }">
							<div class="card">
								<div class="avatar"></div>
								<p class="quote">“{{ it.quote }}”</p>
								<p class="author">{{ it.author }}</p>
							</div>
						</article>
					</div>
				</div>

				<button type="button" aria-label="Anterior" class="nav-btn nav-left" @click="prev">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
						stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button type="button" aria-label="Siguiente" class="nav-btn nav-right" @click="next">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
						stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	</section>
</template>

<style scoped>
.opinions-section {
	background-color: var(--color-navy);
	color: var(--vt-c-white);
	padding: 3rem 0 4rem;
	height: 80vh;
}

.opinions-container {
	max-width: 95%;
	margin: auto auto;
	padding: 0 1.5rem;
}

.opinions-title {
	text-align: center;
	font-weight: 600;
	font-size: 1.25rem;
	line-height: 1.2;
}

@media (min-width: 640px) {
	.opinions-title {
		font-size: 1.5rem;
	}
}

@media (min-width: 1024px) {
	.opinions-title {
		font-size: 2rem;
	}
}

.carousel {
	position: relative;
	margin-top: 2.5rem;
}

.viewport {
	overflow: hidden;
	width: 85%;
	margin: 0 auto;
}

.track {
	display: flex;
	align-items: stretch;
	gap: 2rem;
}

.slide {
	flex: 0 0 auto;
}

.card {
	height: 50vh;
	background: #0E1733;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 1rem;
	padding: 1.75rem;
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.22);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.avatar {
	width: 100px;
	height: 100px;
	margin: 0 auto 1rem;
	border-radius: 50%;
	background: rgba(229, 231, 235, 0.9);
}

.quote {
	text-align: center;
	color: rgba(255, 255, 255, 0.85);
	font-size: 20px;
	line-height: 1.3;
}

.author {
	margin-top: .9rem;
	text-align: center;
	color: rgba(255, 255, 255, 0.7);
	font-size: 15px;
}

.nav-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	display: grid;
	place-items: center;
	border-radius: 50px;
	background-color: rgba(255, 255, 255, 0.10);
	border: 1px solid rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(4px);
	transition: background-color .2s ease;
	color: var(--vt-c-white);
}

.nav-btn:hover {
	background-color: rgba(255, 255, 255, 0.20);
}

.nav-left {
	left: .75rem;
}

.nav-right {
	right: .75rem;
}

@media (min-width: 640px) {
	.nav-left {
		left: .9rem
	}

	.nav-right {
		right: .9rem
	}
}

@media (max-width: 639px) {
	.track {
		gap: 1rem
	}
}
</style>

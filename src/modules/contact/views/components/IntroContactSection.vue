<script setup>
import { useI18n } from 'vue-i18n'
import contactUsImage from '@/assets/img/contact/contactUss.png'

const messages = {
	es: {
		contact: {
			title: '¿Necesitas asesoría tecnológica?',
			subtitle:
				'Estamos aquí para ayudarte. Contáctanos y conversemos sobre cómo podemos transformar tu negocio con soluciones tecnológicas innovadoras.'
		}
	},
	en: {
		contact: {
			title: 'Do you need technology consulting?',
			subtitle:
				'We are here to help. Contact us and let’s talk about how we can transform your business with innovative technology solutions.'
		}
	}
}

const { t } = useI18n({ useScope: 'local', inheritLocale: true, messages })

const props = defineProps({
	image: {
		type: String,
		default:
			contactUsImage
	},
	imageAlt: { type: String, default: 'contact illustration' }
})
</script>

<template>
	<section class="contact-hero">
		<v-container class="py-10 py-md-10 container">
			<v-card class="hero-card" elevation="0">
				<v-row no-gutters align="center">
					<v-col cols="12" md="7" class="px-5 px-md-8 py-6">
						<h1 class="hero-title">{{ t('contact.title') }}</h1>
						<p class="hero-subtitle">{{ t('contact.subtitle') }}</p>
					</v-col>

					<!-- Imagen / Ilustración -->
					<v-col cols="12" md="5" class="img-col">
						<v-img :src="image" :alt="imageAlt" class="hero-img" cover />
						<div class="shine" aria-hidden="true"></div>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</section>
</template>

<style scoped>
.contact-hero {
	background: var(--color-background);
	color: var(--color-text);
}

.hero-card {
	overflow: hidden;
}

.crumb {
	display: inline-flex;
	padding: 4px 10px;
	border-radius: 999px;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;
	color: var(--color-primary);
	background: var(--color-primary-soft);
	margin-bottom: 10px;
}

.hero-title {
	margin: 0 0 8px 0;
	font-weight: 900;
	color: var(--color-heading);
	font-size: clamp(22px, 3.8vw, 34px);
}

.hero-subtitle {
	margin: 0;
	opacity: .9;
	line-height: 1.55;
	max-width: 60ch;
	font-size: 16px;
}

.img-col {
	position: relative;
	min-height: 220px;
}

.hero-img {
	width: 100%;
	height: 100%;
	min-height: 260px;
	object-fit: cover;
	filter: saturate(1.05);
}

.shine {
	position: absolute;
	inset: 0;
	background: radial-gradient(420px 220px at 80% 30%, rgba(13, 110, 253, .18), transparent 60%);
	pointer-events: none;
	mix-blend-mode: screen;
}

@media (max-width: 959px) {
	.hero-subtitle {
		max-width: none;
	}

	.img-col {
		min-height: 200px;
	}

	.hero-img {
		min-height: 220px;
	}
}
</style>

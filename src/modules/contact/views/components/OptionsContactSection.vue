<script setup>
const contactItems = [
	{ icon: 'mdi-phone-outline', title: 'Teléfono', value: '+57 310 2885249', href: 'tel:+573102885249' },
	{ icon: 'mdi-email-outline', title: 'Correo Electrónico', value: 'info@gigs.consulting', href: 'mailto:info@gigs.consulting' },
	{ icon: 'mdi-map-marker-outline', title: 'Ubicación', value: 'CL 23 A BIS # 85 A – 25 OF 707, Bogotá', href: 'https://maps.google.com/?q=CL%2023%20A%20BIS%20%2385A-25%20OF%20707%20Bogotá' }
]
</script>

<template>
	<section class="contact-cards">
		<v-container class="py-8">
			<v-row class="g-6" justify="center" align="stretch">
				<v-col v-for="(it, i) in contactItems" :key="i" cols="12" sm="6" md="4" class="d-flex card-content">
					<a :href="it.href" target="_blank" rel="noopener" class="card-link">
						<v-card class="c-card" elevation="0">
							<div class="c-body">
								<v-icon :icon="it.icon" class="c-icon" />
								<h3 class="c-title">{{ it.title }}</h3>
								<p class="c-value">{{ it.value }}</p>
							</div>
						</v-card>
					</a>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<style scoped>
.contact-cards {
	background: var(--color-background-soft);
	color: var(--color-text);
	padding: 8% 0;
}

.card-link {
	text-decoration: none;
	width: 100%;
}

.c-card {
	width: 100%;
	border-radius: 16px;
	background: var(--vt-c-white);
	height: 250px;
	border: 1px solid var(--color-border);
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow:
		0 10px 0 rgba(10, 21, 51, .06),
		0 8px 22px rgba(0, 0, 0, .06);
	transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

.c-card:hover {
	transform: translateY(-2px);
	border-color: var(--color-border-hover);
	scale: 1.02;
	box-shadow:
		0 12px 0 rgba(10, 21, 51, .08),
		0 12px 28px rgba(0, 0, 0, .10);
}

.c-body {
	padding: 22px 20px;
	display: grid;
	place-items: center;
	text-align: center;
	gap: 10px;
	min-height: 160px;
}

.c-icon {
	color: var(--color-primary);
}

.c-title {
	margin: 0;
	font-weight: 800;
	color: var(--color-primary);
	font-size: 1.25rem;
}

.c-value {
	margin: 0;
	font-size: 1.125rem;
	color: var(--vt-c-text-light-1);
	opacity: .9;
}

@media (min-width: 960px) {
	.c-body {
		min-height: 180px;
	}
}
</style>

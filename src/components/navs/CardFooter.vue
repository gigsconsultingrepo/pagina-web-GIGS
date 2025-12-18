<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  text: string
  ctaHref?: string
}>(), {
  ctaHref: '/contacto#form-contacto'
})

const leftTitle = props.title
const leftText = props.text
const rightKicker = 'Únete a GIGS!'
const rightCta = 'Contáctanos'
</script>

<template>
  <section class="card-footer-container">
    <div class="promo-callout">
      <div class="callout-left">
        <h3 class="callout-title">{{ leftTitle }}</h3>
        <p class="callout-text">{{ leftText }}</p>
      </div>

      <div class="callout-right">
        <p class="right-kicker">{{ rightKicker }}</p>
        <a class="cta-btn" :href="ctaHref" :aria-label="rightCta">
          {{ rightCta }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 0em;
}

.promo-callout {
  display: grid;
  grid-template-columns: 1fr auto;
  width: 60%;
  gap: 32px;
  align-items: center;
  padding: 32px 48px;
  background: linear-gradient(135deg, #0f2a86, #0a1f64);
  color: #fff;
  border-radius: 30px;
}

.callout-left {
  min-width: 0;
  max-width: 56ch;
}

.callout-title {
  margin: 0 0 8px;
  font-weight: 700;
  font-size: var(--text-3xl);
}

.callout-text {
  margin: 0;
  line-height: 1.35;
  font-size: var(--text-lg);
  opacity: .9;
  color: #FFF;
  text-align: justify;
  font-weight: 500;
}

.callout-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: var(--text-3xl);
}

.right-kicker {
  margin: 0;
  font-weight: 700;
}

.cta-btn {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  color: #0c2b7a;
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-sm);
}

@media (max-width: 959px) {
  .promo-callout {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90%;
    padding: 24px;
    gap: 20px;
  }

  .callout-left {
    text-align: center;
  }

  .callout-right {
    align-items: center;
    text-align: center;
    width: 100%;
  }
}
</style>

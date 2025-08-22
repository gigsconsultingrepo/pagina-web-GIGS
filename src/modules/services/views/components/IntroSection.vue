<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  title: { type: [String, Object], required: true },
  text: { type: [String, Object], required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  reverse: { type: Boolean, default: false }
})

const { locale } = useI18n()

const pick = (val) => {
  if (typeof val === 'string') return val
  if (val && typeof val === 'object') {
    const lang = locale.value
    return val[lang] ?? val.es ?? Object.values(val)[0] ?? ''
  }
  return ''
}

const displayTitle = computed(() => pick(props.title))
const displayText = computed(() => pick(props.text))

const orderImg = computed(() => props.reverse ? 1 : 2)
const orderTxt = computed(() => props.reverse ? 2 : 1)
</script>

<template>
  <section class="service-intro">
    <v-container class="mb-0 pb-0">
      <v-card class="intro-card" elevation="0">
        <v-row no-gutters align="stretch" class="fill-height">
          <v-col cols="12" md="7" :order-md="orderTxt" class="intro-text-col">
            <div class="intro-text-wrap">
              <h1 class="intro-title">{{ displayTitle }}</h1>
              <p class="intro-text">{{ displayText }}</p>
            </div>
          </v-col>

          <v-col cols="12" md="5" :order-md="orderImg" class="intro-media-col">
            <v-img :src="image" :alt="imageAlt || displayTitle" class="intro-img" cover />
            <div class="img-fade" aria-hidden="true"></div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </section>
</template>

<style scoped>
.service-intro {
  background: var(--color-background);
  color: var(--color-text);
  margin-bottom: 0;
}

.intro-card {
  border-radius: 16px;
  overflow: hidden;
}

.intro-text-col {
  display: grid;
  place-items: center;
  background: var(--vt-c-white);
}

.intro-text-wrap {
  width: 100%;
  padding: 22px 20px;
  max-width: 720px;
}

@media (min-width:960px) {
  .intro-text-wrap {
    padding: 32px 36px;
  }
}

.intro-title {
  margin: 0 0 10px;
  color: var(--color-heading);
  font-weight: 800;
  font-size: clamp(1.4rem, 1.1rem + 1.1vw, 2rem);
}

.intro-text {
  margin: 0;
  color: var(--vt-c-text-light-2);
  font-size: 1rem;
  line-height: 1.7;
}

.intro-media-col {
  position: relative;
  height: 100%;
}

.intro-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width:959px) {
  .intro-media-col {
    height: auto;
  }

  .intro-img {
    height: 220px;
  }
}

@media (min-width:960px) {
  .intro-card {
    min-height: 300px;
  }

  .intro-media-col {
    min-height: 300px;
  }
}

.img-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .85));
  opacity: .25;
  pointer-events: none;
}
</style>

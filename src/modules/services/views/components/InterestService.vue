<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  leftParagraphs: { type: Array, required: true },
  ctaLabel: { type: [String, Object], default: '' },
  ctaHref: { type: String, default: '#' },

  testimonialQuote: { type: [String, Object], required: true },
  testimonialAuthor: { type: [String, Object], required: true },
  testimonialAvatar: { type: String, default: '' }, // opcional
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
const leftTexts = computed(() => (props.leftParagraphs || []).map(pick))
const ctaText = computed(() => pick(props.ctaLabel))
const quote = computed(() => pick(props.testimonialQuote))
const author = computed(() => pick(props.testimonialAuthor))
</script>

<template>
  <section class="feature-testimonial pt-8 pb-8">
    <v-container class="py-6 py-md-8">
      <v-card class="ft-card" elevation="0">
        <v-row no-gutters>
          <v-col cols="12" md="7" class="ft-left">
            <div class="ft-left-wrap">
              <p v-for="(p, idx) in leftTexts" :key="idx" class="ft-paragraph">
                {{ p }}
              </p>

              <div v-if="ctaText" class="ft-cta">
                <v-btn color="primary" variant="flat" :to="ctaHref" class="btn-primary">
                  {{ ctaText }}
                </v-btn>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5" class="ft-right">
            <div class="ft-quote">
              <p class="quote-text">“{{ quote }}”</p>

              <div class="author-row">
                <div class="avatar" :style="testimonialAvatar ? `background-image:url(${testimonialAvatar})` : ''">
                </div>
                <span class="author">{{ author }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </section>
</template>

<style scoped>
.feature-testimonial {
  background: linear-gradient(180deg, var(--color-background-soft), var(--color-background-mute));
  color: var(--color-text);
  margin-top: 0;
}

.ft-card {
  background: none;
  border-radius: 16px;
  overflow: hidden;
}

.ft-left {
  display: grid;
  align-items: center;
  background: none;
}

.ft-left-wrap {
  width: 100%;
  padding: 22px 20px;
}

@media (min-width: 960px) {
  .ft-left-wrap {
    padding: 28px 32px;
  }
}

.ft-paragraph {
  margin: 0 0 12px 0;
  color: var(--color-text);
  font-size: 0.975rem;
  line-height: 1.75;
}

.ft-cta {
  margin-top: 10px;
}

.ft-right {
  border-left: 1px solid var(--color-border);
  display: grid;
  align-items: center;
}

.ft-quote {
  padding: 22px 20px;
}

@media (min-width: 960px) {
  .ft-quote {
    padding: 28px;
  }
}

.quote-text {
  margin: 0 0 18px 0;
  font-style: italic;
  color: var(--vt-c-text-light-2);
  line-height: 1.75;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: #d9d9d9 center/cover no-repeat;
  flex: 0 0 auto;
}

.author {
  font-size: .82rem;
  font-weight: 800;
  letter-spacing: .4px;
  color: var(--color-text);
  text-transform: uppercase;
}

@media (max-width: 959px) {
  .ft-right {
    border-left: none;
    border-top: 1px solid var(--color-border);
  }
}
</style>

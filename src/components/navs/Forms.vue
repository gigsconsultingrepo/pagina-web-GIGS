<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  textButton: string
  loading?: boolean
  disabled?: boolean
}>(), {
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'save'): void
}>()

const tTitle = props.title
const tSubtitle = props.subtitle ?? ''
const tBtnLabel = props.textButton

const onSave = () => { if (!props.loading && !props.disabled) emit('save') }
</script>

<template>
  <section class="forms-container">
    <div class="form-card">
      <header class="form-head">
        <h2 class="title">{{ tTitle }}</h2>
        <p v-if="tSubtitle" class="subtitle">{{ tSubtitle }}</p>
      </header>
  
      <!-- Aquí el formulario del componente que usa este shell -->
      <div class="form-body">
        <slot />
      </div>
  
      <footer class="form-actions">
        <slot name="actions">
          <button type="button" class="primary-btn" :disabled="disabled || loading"
            :aria-busy="loading ? 'true' : 'false'" @click="onSave">
            <span v-if="!loading">{{ tBtnLabel }}</span>
            <span v-else class="spinner" aria-hidden="true"></span>
          </button>
        </slot>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.forms-container{
  display: flex;
  background: var(--color-primary-dark);
}

.form-card {
  margin: 2em auto;
  background: var(--color-background);
  width: 60%;
  color: var(--vt-c-text-light-1);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, .08);
  padding: 20px;
}

.form-head {
  text-align: center;
  margin-bottom: 0.875rem;
}

.title {
  margin: 0 0 0.375rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vt-c-text-light-1);
}

.subtitle {
  margin: 0;
  font-size: 0.875rem;
  opacity: .8;
  max-width: 60ch;
  margin-inline: auto;
}

.form-body {
  display: grid;
  gap: 0.75rem;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 0.875rem;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: var(--vt-c-indigo);
  color: var(--vt-c-white);
  font-weight: 700;
  font-size: 1rem;
  transition: transform .12s ease, box-shadow .12s ease, opacity .12s;
}

.primary-btn:disabled {
  opacity: .7;
  cursor: not-allowed;
}

.primary-btn:not(:disabled):active {
  transform: translateY(1px);
}

.spinner {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, .55);
  border-top-color: var(--vt-c-white);
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 720px) {
  .form-card {
    padding: 1.75rem;
    border-radius: 1.125rem;
  }
}
</style>

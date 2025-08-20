<script setup lang="ts">
import { ref } from 'vue'
import Forms from '../../../../components/navs/Forms.vue'

const title = {
  es: 'Compartimos el riesgo y compartimos el éxito!',
  in: 'We share the risk and the success!'
}
const subtitle = {
  es: 'No importa qué tan grande o pequeño sea tu reto, tenemos la experiencia y la creatividad para resolverlo.',
  in: 'No matter how big or small your challenge is, we have the experience and creativity to solve it.'
}
const textButton = { es: 'Enviar Reto', in: 'Submit Challenge' }

const loading = ref(false)

const onSave = async () => {
  loading.value = true
  try {
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Forms :title="title" :subtitle="subtitle" :textButton="textButton" :loading="loading" @save="onSave">
    <form class="grid" @submit.prevent="onSave">
    </form>
  </Forms>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

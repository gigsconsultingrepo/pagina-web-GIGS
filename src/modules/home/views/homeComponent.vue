<script setup>
import { ref } from 'vue'

const isLoading = ref(true)

//Aqui vemos como se usa el cambio de valor en una variable ref
setTimeout(() => {
  isLoading.value = false
}, 1000);
</script>

<template>
  <v-overlay :model-value="isLoading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
  </v-overlay>

  <div class="pa-4 about-component">
    HOLA INICIO
  </div>
</template>

<style scoped>
</style>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000);
</script>

<template>
  <v-overlay :model-value="isLoading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
  </v-overlay>

  <div class="pa-4 home-component">
    HOLA INICIO
  </div>
</template>

<style scoped>
.home-component {
  background-color: #f5f5f5;
  height: 100%;
}

.expand-icon {
  position: absolute;
  top: 4px;
  right: 8px;
  cursor: pointer;
  z-index: 1;
}

.position-relative {
  position: relative;
}
</style>

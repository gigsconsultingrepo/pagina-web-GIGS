<script setup>
import { RouterView } from 'vue-router'
import TopBar from '@/components/navs/TopBar.vue'
</script>

<template>
  <v-app>
    <TopBar />
    <main class="app-content">
      <RouterView />
    </main>
  </v-app>
</template>

<style>
.app-content {
  min-height: calc(100vh - 64px);
  background: #fff;
}

.content-all-layout {
  padding: 20px;
}

.loading-overlay {
  display: flex; align-items: center; justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100vh; width: 100vw;
}
</style>

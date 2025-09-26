<script setup>
import { RouterView } from 'vue-router'
import TopBar from '@/components/navs/TopBar.vue'
import Footer from '@/components/navs/Footer.vue'
import AccessibilityBar from '@/components/navs/AccessibilityBar.vue'
</script>

<template>
  <v-app>
    <TopBar />
    <main class="app-content">
      <RouterView />
    </main>
    <Footer />
    <!-- Barra de accesibilidad -->
    <AccessibilityBar />
  </v-app>
</template>

<style>
:root {
  --topbar-h: 64px;
}

.app-content {
  background: #fff;
  padding-top: var(--topbar-h);
}

.content-all-layout {
  padding: 20px;
}

.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100vh;
  width: 100vw;
}
</style>

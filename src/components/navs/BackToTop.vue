<template>
  <button
    v-show="isVisible"
    class="back-to-top"
    @click="scrollToTop"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const isVisible = ref(false)

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility)
})

onUnmounted(() => {
  window.removeEventListener("scroll", toggleVisibility)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.85;
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
  z-index: 1000;
}

.back-to-top:hover {
  opacity: 1;
  transform: translateY(-4px);
}

.icon {
  width: 28px;
  height: 28px;
}
</style>

<template>
  <button
    v-show="isVisible"
    class="back-to-top"
    @click="scrollToTop"
  >
    <img :src="backToTopIcon" alt="Subir" class="icon-img" />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import backToTopIcon from "@/assets/icons/up-arrow.png" // aquí va tu imagen

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

.icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}
</style>

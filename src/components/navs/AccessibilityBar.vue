<template>
  <div class="accessibility-bar" role="toolbar" aria-label="Controles de accesibilidad">
    <button @click="toggleContrast" :aria-pressed="isHighContrast" :title="isHighContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'">
      <img :src="contrastIcon" alt="Contraste" />
    </button>
    <button @click="increaseFont" title="Aumentar letra">
      <img :src="plusIcon" alt="Aumentar letra" />
    </button>
    <button @click="decreaseFont" title="Disminuir letra">
      <img :src="minusIcon" alt="Disminuir letra" />
    </button>
    <button @click="reset" title="Restaurar ajustes">
      <img :src="resetIcon" alt="Restaurar" />
    </button>
    <div id="gigs-a11y-announcer" class="visually-hidden" aria-live="polite"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import contrastIcon from '@/assets/icons/contrast.png'
import plusIcon from '@/assets/icons/plus.png'
import minusIcon from '@/assets/icons/minus.png'
import resetIcon from '@/assets/icons/reset.png'

const fontSize = ref(16)
const isHighContrast = ref(false)

onMounted(() => {
  applySettings()
})

function applySettings() {
  document.documentElement.style.fontSize = fontSize.value + 'px'
  if (isHighContrast.value) {
    document.documentElement.classList.add('high-contrast')
  } else {
    document.documentElement.classList.remove('high-contrast')
  }
}

function increaseFont() {
  if (fontSize.value < 20) fontSize.value += 1
  applySettings()
  announce('Aumentado tamaño de letra')
}

function decreaseFont() {
  if (fontSize.value > 14) fontSize.value -= 1
  applySettings()
  announce('Disminuido tamaño de letra')
}

function reset() {
  fontSize.value = 16
  isHighContrast.value = false
  applySettings()
  announce('Accesibilidad restaurada')
}

function toggleContrast() {
  isHighContrast.value = !isHighContrast.value
  applySettings()
  announce(isHighContrast.value ? 'Alto contraste activado' : 'Alto contraste desactivado')
}

function announce(text) {
  const el = document.getElementById('gigs-a11y-announcer')
  if (el) el.textContent = text
}
</script>

<style scoped>
.accessibility-bar {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: .5rem;
  background: rgba(0,0,0,.85);
  padding: .6rem .4rem;
  border-radius: .5rem 0 0 .5rem;
  box-shadow: 0 6px 16px rgba(0,0,0,.4);
  z-index: 9999;
  backdrop-filter: blur(4px);
}
.accessibility-bar button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: .45rem;
  border: 1px solid rgba(255,255,255,.2);
  background: transparent;
  cursor: pointer;
}
.accessibility-bar button:focus {
  outline: 3px solid #fff;
  outline-offset: 2px;
}
.accessibility-bar img {
  width: 20px;
  height: 20px;
}
.visually-hidden {
  position: absolute!important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px,1px,1px,1px);
  white-space: nowrap;
}
</style>

<style>
.high-contrast {
  background-color: #111 !important;
  color: #f5f5f5 !important;
}
.high-contrast a {
  color: #4da3ff !important;
}
.high-contrast button {
  background-color: #333 !important;
  color: #fff !important;
  border: 1px solid #666 !important;
}
</style>

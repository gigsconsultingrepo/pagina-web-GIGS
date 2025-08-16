<script setup>
//Imports que se usan con mas frecuencia
import { ref, watch, onMounted } from 'vue'

//Variable reactiva, si queremos que no sea reactiva quitamos el 'ref'
const nameTitle = ref('Acerca de Gigs Consulting')

//Desde el script para manipular estas variable lo hacemos desde .value => nameTitle.value = .....

</script>

<template>
  <div class="about-component">

    <h1>Page {{ nameTitle }}</h1>

  </div>
</template>

<style scoped>
.about-component {
  background-color: red;
}
</style>

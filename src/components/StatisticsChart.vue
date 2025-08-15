<script setup>
import { ref, watch, defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  chartData: Object,
  chartOptions: Object
});

const chartData = ref(props.chartData);
const chartOptions = ref(props.chartOptions);

// Actualizar datos del gráfico si las props cambian
watch(() => props.chartData, (newData) => {
  chartData.value = newData;
});

watch(() => props.chartOptions, (newOptions) => {
  chartOptions.value = newOptions;
});
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

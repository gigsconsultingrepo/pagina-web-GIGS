<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  callInformation: Object,
});

const formatDate = (timestamp) => {
  if (!timestamp) return 'Fecha no disponible';
  return new Date(timestamp).toLocaleString();
};

const formatDuration = (ms) => {
  if (!ms) return '0s';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
};

const setNameStatusCall = (status) => {
  switch (status) {
    case 'registered':
      return 'La llamada ha sido registrada en el sistema';
    case 'in_progress':
      return 'La llamada está actualmente en curso.';
    case 'ended':
      return 'La llamada ha finalizado';
    case 'ongoing':
      return 'En Curso';

    default:
      return 'Sin información';
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Agent ID copiado al portapapeles.');
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
};
</script>

<template>
  <v-card class="pa-4 card-container" color="#E3F2FD" elevation="4">
    <v-card-title class="text-blue-darken-3 d-flex justify-space-between">
      <span>Llamada ID: {{ callInformation.call_id }}</span>
      <span>
        Estado de la llamada:
        {{ setNameStatusCall(callInformation.call_status) }}
      </span>
    </v-card-title>
    <v-card-subtitle>
      Tipo de llamada: {{ callInformation.call_type }}
      <p>Sentimiento: {{ callInformation.call_analysis?.user_sentiment }}</p>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <p><strong>Fecha de llamada:</strong> {{ formatDate(callInformation.start_timestamp) }}</p>
          <p><strong>Duración:</strong> {{ formatDuration(callInformation.duration_ms) }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p><strong>Número de llamada saliente:</strong> {{ callInformation.from_number }}</p>
          <p><strong>Número destinatario:</strong> {{ callInformation.to_number }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p><strong>Razón de desconexión:</strong> {{ callInformation.disconnection_reason || 'No disponible' }}</p>
          <p>
            <strong>Agente: </strong> 
            <span @click="copyToClipboard(callInformation.agent_id)" style="cursor: pointer; ">
              {{ callInformation.agent?.agent_name || 'No asignado' }} ({{ callInformation.agent_id }})
            </span>
          </p>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <p><strong>Histórico:</strong></p>
      <p>
        {{ callInformation.call_analysis?.call_summary || 'No hay historial disponible' }}
      </p>
    </v-card-text>
    
    <v-expansion-panels>
      <v-expansion-panel title="Transcripción de la llamada">
        <v-expansion-panel-text>
          <div v-if="callInformation.transcript_object?.length">
            <div v-for="(item, index) in callInformation.transcript_object" :key="index">
              <p><strong>{{ item.role }}:</strong> {{ item.content }}</p>
            </div>
          </div>
          <p v-else>No hay transcripción disponible</p>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Audio de la llamada">
        <v-expansion-panel-text>
          <audio v-if="callInformation.recording_url" controls>
            <source :src="callInformation.recording_url" type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
          <p v-else>No hay grabación disponible.</p>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel title="Datos más específicos">
        <v-expansion-panel-text>
          <ul>
            <li v-for="(value, key) in callInformation.call_analysis?.custom_analysis_data" :key="key">
              <strong>{{ key }}:</strong> {{ value || 'Sin información registrada' }}
            </li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<style scoped>
.card-container {
  max-height: 75vh;
  overflow: auto;
}

.text-blue-darken-3 {
  color: #0D47A1;
}

.transcription-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.transcription-entry {
  background: #f1f1f1;
  padding: 8px;
  border-radius: 5px;
}
</style>

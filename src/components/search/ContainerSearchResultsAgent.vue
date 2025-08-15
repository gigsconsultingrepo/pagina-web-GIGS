<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Definir las props que recibe el componente
const props = defineProps({
  agentData: {
    type: Object,
    required: true
  }
});

// Variables reactivas para almacenar la información del agente
// const agentId = ref(props.agentData.agent_id);
const agentName = ref(props.agentData.agent_name);
// const language = ref(props.agentData.language);
const avatarUrl = ref(props.agentData.voice.avatar_url);
const voiceName = ref(props.agentData.voice.voice_name);
const previewAudioUrl = ref(props.agentData.voice.preview_audio_url);

// Estado del audio
const audioRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const audioDuration = ref(0);
const audioProgress = ref(0);

// Formatear el tiempo en minutos y segundos
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Configurar el reproductor de audio al montar el componente
onMounted(() => {
  audioRef.value = new Audio(previewAudioUrl.value);

  audioRef.value.addEventListener('loadedmetadata', () => {
    audioDuration.value = audioRef.value.duration;
  });

  audioRef.value.addEventListener('timeupdate', () => {
    currentTime.value = audioRef.value.currentTime;
    audioProgress.value = audioRef.value.currentTime;
  });
});

// Limpiar eventos al desmontar el componente
onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.removeEventListener('loadedmetadata', () => {});
    audioRef.value.removeEventListener('timeupdate', () => {});
  }
});

// Reproducir o pausar el audio
const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause();
    } else {
      audioRef.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

// Buscar en el audio
const seekAudio = (value) => {
  if (audioRef.value) {
    audioRef.value.currentTime = value;
  }
};
</script>

<template>
  <v-card class="neumorphic-card" elevation="5">
    <div class="card-content">
      <!-- Avatar + texto -->
      <div class="info-section">
        <v-avatar size="40" rounded>
          <v-img :src="avatarUrl" cover />
        </v-avatar>
        <div class="text-info">
          <p class="agent-name">{{ agentName }} -
            <span class="voice-name">{{ voiceName }}</span>
          </p>
        </div>
      </div>

      <!-- Slider + tiempos -->
      <div class="slider-section">
        <span class="time-text">{{ formatTime(currentTime) }}</span>
        <v-slider
          v-model="audioProgress"
          :max="audioDuration"
          @change="seekAudio"
          hide-details
          class="custom-slider"
        />
        <span class="time-text">{{ formatTime(audioDuration) }}</span>
      </div>

      <!-- Controles -->
      <div class="controls-section">
        <v-icon size="14" class="control-icon">mdi-skip-previous</v-icon>
        <v-btn icon @click="togglePlay" class="play-btn">
          <v-icon size="28" color="#1a3b8f">
            {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
          </v-icon>
        </v-btn>
        <v-icon size="24" class="control-icon">mdi-skip-next</v-icon>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.neumorphic-card {
  width: 30%;
  height: 25%;
  border-radius: 10px;
  background: linear-gradient(135deg, #0797fdca, #1a3b8f);
  color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text-info {
  display: flex;
  flex-direction: column;
  color: white !important;
}

.agent-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.voice-name {
  font-size: 12px;
  opacity: 0.9;
  margin: 0;
}

.slider-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-slider {
  flex-grow: 1;
  --v-slider-track-color: white;
  --v-slider-thumb-color: white;
}

.time-text {
  font-size: 11px;
  min-width: 30px;
}

.controls-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: -.9em;
}

.control-icon {
  color: white;
}

.play-btn {
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
}
</style>

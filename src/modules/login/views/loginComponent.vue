<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const doLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    const redirect = new URLSearchParams(window.location.search).get('redirect') || '/admin/noticias';
    window.location.href = redirect;
  } catch (e) {
    error.value = 'Credenciales inválidas';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="py-12" max-width="480">
    <v-card class="pa-6" style="background: var(--color-background-soft); border:1px solid var(--color-border);">
      <h1 class="text-h6 mb-4" style="color: var(--color-heading);">Iniciar sesión</h1>

      <v-text-field v-model="email" label="Email" type="email" variant="outlined" density="comfortable" class="mb-3" />
      <v-text-field v-model="password" label="Contraseña" type="password" variant="outlined" density="comfortable"
        class="mb-4" />

      <v-btn :loading="loading" block class="btn-primary" @click="doLogin"
        :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }">
        Entrar
      </v-btn>

      <v-alert v-if="error" type="error" variant="tonal" class="mt-3">{{ error }}</v-alert>
    </v-card>
  </v-container>
</template>

<style scoped>
.btn-primary:hover {
  transform: scale(1.02);
  background: var(--color-navy) !important;
  color: var(--color-primary-soft) !important;
}
</style>

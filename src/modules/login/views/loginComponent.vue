<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '@/firebase';

const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');
const showForgotPassword = ref(false);
const emailForReset = ref('');
const showPassword = ref(false);

const getErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'No existe una cuenta con este correo electrónico.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-email': 'El correo electrónico no es válido.',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Por favor, intenta más tarde.',
    'auth/email-not-verified': 'Por favor, verifica tu correo electrónico antes de iniciar sesión.',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
  };
  return errorMessages[errorCode] || 'Error al iniciar sesión. Por favor, intenta de nuevo.';
};

const doLogin = async () => {
  error.value = '';
  success.value = '';
  loading.value = true;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    
    // Verificar si el correo está verificado
    if (!user.emailVerified) {
      // Enviar correo de verificación si no está verificado
      await sendEmailVerification(user);
      error.value = 'Tu correo electrónico no está verificado. Hemos enviado un nuevo correo de verificación. Por favor, revisa tu bandeja de entrada.';
      await signOut(auth); // Cerrar sesión hasta que verifique el correo
      return;
    }
    
    // Obtener la ruta de redirección del query parameter o usar /admin por defecto
    const redirect = (route.query.redirect && typeof route.query.redirect === 'string') 
      ? route.query.redirect 
      : '/admin';
    await router.push(redirect);
  } catch (e) {
    console.error('Error al iniciar sesión:', e);
    error.value = getErrorMessage(e.code);
  } finally {
    loading.value = false;
  }
};

const handleForgotPassword = async () => {
  if (!emailForReset.value) {
    error.value = 'Por favor, ingresa tu correo electrónico.';
    return;
  }
  
  error.value = '';
  success.value = '';
  loading.value = true;
  
  try {
    await sendPasswordResetEmail(auth, emailForReset.value);
    success.value = 'Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.';
    showForgotPassword.value = false;
    emailForReset.value = '';
  } catch (e) {
    console.error('Error al enviar correo de recuperación:', e);
    error.value = getErrorMessage(e.code);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="py-12" max-width="480">
    <v-card class="pa-6" style="background: var(--color-background-soft); border:1px solid var(--color-border);">
      <h1 class="text-h6 mb-4" style="color: var(--color-heading);">Iniciar sesión</h1>

      <div v-if="!showForgotPassword">
        <v-text-field 
          v-model="email" 
          label="Email" 
          type="email" 
          variant="outlined" 
          density="comfortable" 
          class="mb-3"
          prepend-inner-icon="mdi-email"
        />
        <v-text-field 
          v-model="password" 
          label="Contraseña" 
          :type="showPassword ? 'text' : 'password'"
          variant="outlined" 
          density="comfortable"
          class="mb-4"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          @keyup.enter="doLogin"
        />

        <v-btn 
          :loading="loading" 
          block 
          class="btn-primary" 
          @click="doLogin"
          :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }"
        >
          Entrar
        </v-btn>

        <div class="text-center mt-3">
          <v-btn 
            variant="text" 
            size="small" 
            @click="showForgotPassword = true"
            style="color: var(--color-primary);"
          >
            ¿Olvidaste tu contraseña?
          </v-btn>
        </div>
      </div>

      <div v-else>
        <h2 class="text-subtitle-1 mb-4" style="color: var(--color-heading);">Recuperar contraseña</h2>
        <p class="text-body-2 mb-4" style="color: var(--vt-c-text-light-2);">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        
        <v-text-field 
          v-model="emailForReset" 
          label="Email" 
          type="email" 
          variant="outlined" 
          density="comfortable" 
          class="mb-4"
          prepend-inner-icon="mdi-email"
        />

        <v-btn 
          :loading="loading" 
          block 
          class="btn-primary" 
          @click="handleForgotPassword"
          :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }"
        >
          Enviar correo de recuperación
        </v-btn>

        <div class="text-center mt-3">
          <v-btn 
            variant="text" 
            size="small" 
            @click="showForgotPassword = false; emailForReset = ''"
            style="color: var(--color-primary);"
          >
            Volver al inicio de sesión
          </v-btn>
        </div>
      </div>

      <v-alert v-if="error" type="error" variant="tonal" class="mt-3">{{ error }}</v-alert>
      <v-alert v-if="success" type="success" variant="tonal" class="mt-3">{{ success }}</v-alert>
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

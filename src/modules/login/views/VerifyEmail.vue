<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const success = ref('');
const user = ref(null);
const checking = ref(true);

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    checking.value = false;
    
    if (!currentUser) {
      router.push('/iniciar-sesion');
    } else if (currentUser.emailVerified) {
      // Si ya está verificado, redirigir al admin
      router.push('/admin');
    }
  });
  
  return () => unsubscribe();
});

const resendVerification = async () => {
  if (!user.value) return;
  
  error.value = '';
  success.value = '';
  loading.value = true;
  
  try {
    await sendEmailVerification(user.value);
    success.value = 'Se ha enviado un nuevo correo de verificación. Por favor, revisa tu bandeja de entrada.';
  } catch (e) {
    console.error('Error al reenviar correo de verificación:', e);
    error.value = 'Error al enviar el correo de verificación. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

const checkVerification = async () => {
  if (!user.value) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    // Recargar el usuario para verificar el estado actualizado
    await user.value.reload();
    
    if (user.value.emailVerified) {
      success.value = '¡Correo verificado exitosamente! Redirigiendo...';
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } else {
      error.value = 'El correo aún no ha sido verificado. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación.';
    }
  } catch (e) {
    console.error('Error al verificar estado:', e);
    error.value = 'Error al verificar el estado. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

const goToLogin = async () => {
  if (user.value) {
    await signOut(auth);
  }
  router.push('/iniciar-sesion');
};
</script>

<template>
  <v-container class="py-12" max-width="600">
    <v-card class="pa-6" style="background: var(--color-background-soft); border:1px solid var(--color-border);">
      <div v-if="checking" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-4" style="color: var(--vt-c-text-light-2);">Verificando estado...</p>
      </div>

      <div v-else-if="user && !user.emailVerified">
        <div class="text-center mb-6">
          <v-icon size="64" color="warning" class="mb-4">mdi-email-alert</v-icon>
          <h1 class="text-h5 mb-2" style="color: var(--color-heading);">Verifica tu correo electrónico</h1>
          <p class="text-body-1" style="color: var(--vt-c-text-light-2);">
            Hemos enviado un correo de verificación a <strong>{{ user.email }}</strong>
          </p>
        </div>

        <v-alert type="info" variant="tonal" class="mb-4">
          <p class="mb-2"><strong>Pasos a seguir:</strong></p>
          <ol style="margin-left: 20px; padding-left: 0;">
            <li>Revisa tu bandeja de entrada (y la carpeta de spam)</li>
            <li>Haz clic en el enlace de verificación del correo</li>
            <li>Vuelve aquí y haz clic en "Verificar correo"</li>
          </ol>
        </v-alert>

        <div class="d-flex flex-column gap-3">
          <v-btn 
            :loading="loading" 
            block 
            class="btn-primary" 
            @click="checkVerification"
            :style="{ background: 'var(--color-primary)', color: 'var(--vt-c-white)' }"
          >
            <v-icon start>mdi-email-check</v-icon>
            Ya verifiqué mi correo
          </v-btn>

          <v-btn 
            :loading="loading" 
            block 
            variant="outlined"
            @click="resendVerification"
            style="border-color: var(--color-primary); color: var(--color-primary);"
          >
            <v-icon start>mdi-email-send</v-icon>
            Reenviar correo de verificación
          </v-btn>

          <v-btn 
            variant="text" 
            @click="goToLogin"
            style="color: var(--vt-c-text-light-2);"
          >
            Volver al inicio de sesión
          </v-btn>
        </div>

        <v-alert v-if="error" type="error" variant="tonal" class="mt-4">{{ error }}</v-alert>
        <v-alert v-if="success" type="success" variant="tonal" class="mt-4">{{ success }}</v-alert>
      </div>
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


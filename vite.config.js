import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vuetify': ['vuetify']
        }
      }
    },
  },
  server: { 
    host: true,   // ⬅ permitir acceso por red
    port: 5174,   // ⬅ fija el puerto para evitar conflicto
    proxy: { 
      '/api': 'http://localhost:8787' 
    } 
  }
})

# GIGS Consulting - Sitio Web Corporativo

Sitio web corporativo de GIGS Consulting con panel de administración completo para gestionar servicios y noticias.

## 🚀 Características

- ✅ Panel de administración con autenticación Firebase
- ✅ Gestión de servicios (CRUD completo)
- ✅ Gestión de noticias/blog (CRUD completo)
- ✅ Subida de imágenes a Cloudinary
- ✅ Formularios de contacto con validación
- ✅ Diseño responsive y moderno
- ✅ Verificación de correo electrónico
- ✅ Recuperación de contraseña
- ✅ Sistema de permisos (Admin/Usuario regular)

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Cuenta de Firebase (Firestore + Authentication)
- Cuenta de Cloudinary
- Cuenta de EmailJS (para formularios de contacto)

## 🛠️ Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone [url-del-repositorio]
   cd GigsConsulting
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   - Copiar `.env.example` a `.env`
   - Completar con tus credenciales reales
   ```bash
   cp .env.example .env
   ```

4. **Configurar Firebase**:
   - Seguir las instrucciones en [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Habilitar Authentication (Email/Password)
   - Configurar Firestore

5. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

6. **Iniciar servidor backend** (en otra terminal):
   ```bash
   npm run dev:api
   ```

7. **Abrir en el navegador**:
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:8787

## 📚 Documentación

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**: Configuración completa de Firebase Authentication
- **[ADMIN_CONFIG.md](./ADMIN_CONFIG.md)**: Cómo configurar administradores
- **[GUIA_ENTREGA_PROYECTO.md](./GUIA_ENTREGA_PROYECTO.md)**: Guía completa de despliegue y entrega

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (frontend)
npm run dev:api      # Inicia servidor backend (Cloudinary)

# Producción
npm run build        # Construye el proyecto para producción
npm run preview      # Previsualiza el build de producción

# Linting
npm run lint         # Ejecuta el linter (si está configurado)
```

## 🔐 Configuración de Administradores

Para configurar qué usuarios tienen permisos de administrador completo, edita:

- `src/modules/admin/views/AdminDashboard.vue` (línea ~10)
- `src/router/index.js` (línea ~148)

Ver [ADMIN_CONFIG.md](./ADMIN_CONFIG.md) para más detalles.

## 🌐 Despliegue

Para desplegar el proyecto en producción, consulta la [GUIA_ENTREGA_PROYECTO.md](./GUIA_ENTREGA_PROYECTO.md).

**Opciones recomendadas:**
- **Frontend**: Vercel, Netlify o hosting tradicional
- **Backend**: Railway, Render o VPS propio

## 📁 Estructura del Proyecto

```
GigsConsulting/
├── src/
│   ├── modules/          # Módulos de la aplicación
│   │   ├── admin/        # Panel de administración
│   │   ├── services/     # Gestión de servicios
│   │   ├── news/         # Gestión de noticias
│   │   ├── contact/      # Formulario de contacto
│   │   └── ...
│   ├── components/       # Componentes reutilizables
│   ├── router/           # Configuración de rutas
│   └── firebase.js       # Configuración de Firebase
├── server/               # Servidor backend (Cloudinary)
├── public/               # Archivos estáticos
└── package.json          # Dependencias
```

## ⚠️ Notas Importantes

1. **Firebase Config**: Actualmente la configuración de Firebase está hardcodeada en `src/firebase.js`. Para producción, considera moverla a variables de entorno.

2. **Backend URL**: El backend está configurado para `localhost:8787` en desarrollo. Para producción, actualiza las URLs en:
   - `src/modules/services/views/AdminServices.vue`
   - `src/modules/news/views/adminNews.vue`
   - `src/modules/news/views/newsList.vue`

3. **Seguridad**: Nunca subas archivos `.env` con credenciales reales a Git.

## 🐛 Solución de Problemas

### Error: "Cannot GET /api/media/sign"
- Asegúrate de que el servidor backend esté corriendo (`npm run dev:api`)
- Verifica que las variables de entorno de Cloudinary estén configuradas

### Error: "Invalid Signature" en Cloudinary
- Verifica que todas las variables de Cloudinary estén correctas
- Asegúrate de que el `upload_preset` esté configurado en Cloudinary

### Error de autenticación
- Verifica que Firebase Authentication esté habilitado
- Revisa que el correo esté verificado
- Consulta [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 📞 Soporte

Para más información sobre configuración y despliegue, consulta los archivos de documentación incluidos en el proyecto.

---

**Desarrollado con**: Vue.js 3, Vite, Vuetify, Firebase, Cloudinary


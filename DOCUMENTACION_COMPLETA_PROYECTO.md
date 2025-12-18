# Documentación Completa del Proyecto GIGS Consulting

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Tecnologías y Dependencias](#tecnologías-y-dependencias)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Firebase - Configuración y Uso](#firebase---configuración-y-uso)
6. [Cloudinary - Gestión de Imágenes](#cloudinary---gestión-de-imágenes)
7. [Backend - Servidor Express](#backend---servidor-express)
8. [Frontend - Vue.js 3](#frontend---vuejs-3)
9. [Sistema de Módulos](#sistema-de-módulos)
10. [Autenticación y Autorización](#autenticación-y-autorización)
11. [Formularios y Envío de Emails](#formularios-y-envío-de-emails)
12. [Variables de Entorno](#variables-de-entorno)
13. [Flujos Principales](#flujos-principales)
14. [Guías de Desarrollo](#guías-de-desarrollo)
15. [Troubleshooting](#troubleshooting)

---

## Introducción

**GIGS Consulting** es una aplicación web corporativa desarrollada con Vue.js 3 que permite gestionar servicios, noticias/blog, y formularios de contacto. El proyecto utiliza una arquitectura modular con separación entre frontend y backend.

### Características Principales

- ✅ **Panel de Administración**: Gestión completa de servicios y noticias
- ✅ **Autenticación**: Sistema de login con Firebase Authentication
- ✅ **Gestión de Contenido**: CRUD completo para servicios y noticias
- ✅ **Subida de Imágenes**: Integración con Cloudinary para almacenamiento
- ✅ **Formularios de Contacto**: 3 tipos de formularios con envío de emails
- ✅ **Blog Público**: Visualización de noticias publicadas
- ✅ **Diseño Responsive**: Interfaz adaptativa con Vuetify

---

## Arquitectura General

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vue.js)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Vue 3   │  │ Vuetify  │  │ Vue Router│  │  Vuex    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Módulos de la Aplicación                │   │
│  │  home | services | news | contact | admin | login    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Requests (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Cloudinary   │  │  Nodemailer  │  │   CORS       │      │
│  │   Routes     │  │   Routes     │  │   Middleware │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Cloudinary  │   │  Gmail SMTP  │   │   Firebase   │
│   (Imágenes) │   │   (Emails)   │   │ (Auth + DB)  │
└──────────────┘   └──────────────┘   └──────────────┘
```

### Flujo de Datos

1. **Frontend** → Realiza peticiones HTTP al backend (Express)
2. **Backend** → Procesa peticiones y se comunica con servicios externos
3. **Firebase** → Almacena datos (Firestore) y gestiona autenticación
4. **Cloudinary** → Almacena y optimiza imágenes
5. **Gmail SMTP** → Envía emails de confirmación y notificaciones

---

## Tecnologías y Dependencias

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue.js** | 3.5.18 | Framework principal |
| **Vuetify** | 3.7.18 | Framework de UI components |
| **Vue Router** | 4.5.0 | Enrutamiento |
| **Vuex** | 4.1.0 | Gestión de estado global |
| **Axios** | 1.8.4 | Cliente HTTP |
| **Vite** | 6.2.0 | Build tool y dev server |
| **TipTap** | 3.x | Editor de texto rico (WYSIWYG) |
| **Firebase** | 12.6.0 | SDK para Auth y Firestore |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Express** | 5.1.0 | Framework web |
| **Cloudinary** | 2.7.0 | SDK para gestión de imágenes |
| **Nodemailer** | - | Envío de emails |
| **CORS** | 2.8.5 | Middleware para CORS |
| **dotenv** | 17.2.2 | Variables de entorno |

### Servicios Externos

- **Firebase**: Authentication, Firestore, Storage
- **Cloudinary**: Almacenamiento y optimización de imágenes
- **Gmail SMTP**: Envío de emails

---

## Estructura del Proyecto

### Estructura de Carpetas Completa

```
GigsConsulting/
├── public/                          # Archivos estáticos públicos
│   └── index.html                   # HTML principal
│
├── src/                             # Código fuente principal
│   ├── main.js                      # Punto de entrada de la aplicación
│   ├── App.vue                      # Componente raíz
│   ├── firebase.js                  # Configuración e inicialización de Firebase
│   ├── register-modules.js          # Sistema de registro de módulos
│   │
│   ├── assets/                       # Recursos estáticos
│   │   ├── main.css                 # Estilos principales (importa base.css)
│   │   ├── base.css                 # Variables CSS y estilos base
│   │   ├── icons/                   # Iconos personalizados
│   │   └── img/                     # Imágenes estáticas del proyecto
│   │
│   ├── components/                   # Componentes reutilizables
│   │   ├── navs/                    # Componentes de navegación
│   │   │   ├── TopBar.vue           # Barra superior con menú
│   │   │   ├── Footer.vue           # Pie de página
│   │   │   ├── Breadcrumbs.vue     # Migas de pan
│   │   │   ├── BackToTop.vue        # Botón volver arriba
│   │   │   ├── CardFooter.vue       # Card de llamada a la acción
│   │   │   └── Forms.vue            # Wrapper para formularios públicos
│   │   └── modals/                  # Modales reutilizables
│   │
│   ├── modules/                      # Módulos de la aplicación (arquitectura modular)
│   │   ├── home/                     # Módulo de inicio
│   │   │   ├── index.js             # Exportación del módulo
│   │   │   ├── Module.vue          # Componente wrapper del módulo
│   │   │   ├── router/              # Rutas específicas del módulo
│   │   │   ├── store/               # Estado Vuex del módulo
│   │   │   └── views/               # Vistas del módulo
│   │   │       ├── homeComponent.vue
│   │   │       └── components/      # Componentes específicos del módulo
│   │   │
│   │   ├── services/                # Módulo de servicios
│   │   │   ├── views/
│   │   │   │   ├── servicesComponent.vue      # Vista principal
│   │   │   │   ├── AdminServices.vue           # Panel admin (CRUD)
│   │   │   │   ├── serviceViews/
│   │   │   │   │   └── ServiceDetail.vue       # Detalle de servicio
│   │   │   │   └── components/                 # Componentes del módulo
│   │   │   │       ├── Services.vue            # Listado de servicios
│   │   │   │       ├── PortfolioServices.vue   # Portafolio con flip cards
│   │   │   │       ├── ServicesSection.vue     # Carrusel de servicios
│   │   │   │       ├── ServicesForm.vue        # Formulario de cotización
│   │   │   │       ├── IntroSection.vue        # Sección introductoria
│   │   │   │       ├── InterestService.vue      # Sección de interés
│   │   │   │       └── WorkProcess.vue         # Proceso de trabajo
│   │   │
│   │   ├── news/                     # Módulo de noticias/blog
│   │   │   ├── views/
│   │   │   │   ├── adminNews.vue     # Panel admin (crear/editar)
│   │   │   │   ├── newsList.vue     # Lista admin (gestionar)
│   │   │   │   └── newsDetail.vue   # Vista pública de noticia
│   │   │
│   │   ├── contact/                  # Módulo de contacto
│   │   │   └── views/
│   │   │       └── components/
│   │   │           └── FormContact.vue
│   │   │
│   │   ├── challenges/               # Módulo de retos
│   │   │   └── views/
│   │   │       └── components/
│   │   │           └── ChallengesForm.vue
│   │   │
│   │   ├── admin/                    # Panel de administración
│   │   │   └── views/
│   │   │       └── AdminDashboard.vue
│   │   │
│   │   ├── login/                    # Autenticación
│   │   │   └── views/
│   │   │       ├── loginComponent.vue
│   │   │       └── VerifyEmail.vue
│   │   │
│   │   ├── blog/                     # Vista pública del blog
│   │   │   └── views/
│   │   │       ├── blogComponent.vue
│   │   │       └── blogDetail.vue
│   │   │
│   │   ├── clients/                  # Módulo de clientes
│   │   ├── about/                    # Módulo sobre nosotros
│   │   └── home/                     # Módulo de inicio
│   │
│   ├── router/                       # Configuración de rutas global
│   │   └── index.js                  # Router principal con guards
│   │
│   ├── store/                        # Store Vuex global
│   │   └── index.js                  # Store principal
│   │
│   ├── services/                     # Servicios de la aplicación
│   │   ├── api-service.js            # Utilidad para URLs del API
│   │   ├── email-service.js          # Servicio de envío de emails
│   │   └── firebase-service.js      # Servicios de Firebase (lectura)
│   │
│   ├── server/                       # Backend Express
│   │   ├── index.js                  # Servidor principal
│   │   ├── cloudinary.routes.js      # Rutas de Cloudinary
│   │   └── email.routes.js           # Rutas de envío de emails
│   │
│   └── views/                        # Vistas globales
│       ├── InConstruction.vue       # Página en construcción
│       └── View404.vue               # Página 404
│
├── .env                              # Variables de entorno (backend)
├── .env.local                        # Variables de entorno (frontend)
├── vite.config.js                    # Configuración de Vite
├── package.json                      # Dependencias y scripts
└── README.md                         # Documentación básica
```

### Explicación de Carpetas Clave

#### `/src/modules/`
Cada módulo sigue una estructura estándar:
- `index.js`: Exporta el módulo completo (router, store, Module.vue)
- `Module.vue`: Componente wrapper que contiene el router-view
- `router/index.js`: Rutas específicas del módulo
- `store/index.js`: Estado Vuex del módulo (opcional)
- `views/`: Vistas y componentes del módulo

#### `/src/services/`
Servicios reutilizables:
- `api-service.js`: Centraliza la construcción de URLs del backend
- `email-service.js`: Funciones para enviar emails desde formularios
- `firebase-service.js`: Funciones para leer datos de Firestore

#### `/src/server/`
Backend Express:
- `index.js`: Configuración del servidor y middleware
- `cloudinary.routes.js`: Endpoints para firmas de Cloudinary
- `email.routes.js`: Endpoints para envío de emails

---

## Firebase - Configuración y Uso

### Configuración Inicial

**Archivo**: `src/firebase.js`

```javascript
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Firebase Authentication

#### Funcionalidades Implementadas

1. **Login con Email/Password**
   - Ubicación: `src/modules/login/views/loginComponent.vue`
   - Método: `signInWithEmailAndPassword()`

2. **Registro de Usuarios**
   - Ubicación: `src/modules/login/views/loginComponent.vue`
   - Método: `createUserWithEmailAndPassword()`

3. **Verificación de Email**
   - Ubicación: `src/modules/login/views/VerifyEmail.vue`
   - Método: `sendEmailVerification()`

4. **Recuperación de Contraseña**
   - Método: `sendPasswordResetEmail()`

5. **Logout**
   - Método: `signOut()`

#### Persistencia de Sesión

```javascript
setPersistence(auth, browserLocalPersistence);
```

Esto mantiene la sesión del usuario incluso después de cerrar el navegador.

#### Guards de Autenticación

**Archivo**: `src/router/index.js`

```javascript
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next('/iniciar-sesion');
    } else {
      next();
    }
  });
});
```

### Firestore Database

#### Colecciones Principales

1. **`services`** - Servicios ofrecidos
   ```javascript
   {
     id: "fabrica-software",
     title: "Fábrica de Software",
     summary: "Resumen del servicio",
     description: "Descripción completa",
     image: "https://cloudinary.com/...",
     image_id: "services/fabrica-software",
     order: 1
   }
   ```

2. **`news`** - Noticias/Blog
   ```javascript
   {
     id: "noticia-slug",
     title: "Título de la noticia",
     slug: "noticia-slug",
     excerpt: "Resumen corto",
     content: "<p>Contenido HTML...</p>",
     coverUrl: "https://cloudinary.com/...",
     img_one: "https://cloudinary.com/...",
     img_one_id: "news/noticia-slug-1",
     img_two: "https://cloudinary.com/...",
     img_two_id: "news/noticia-slug-2",
     author: "usuario@email.com",
     status: "published" | "draft",
     tags: ["Tecnología", "Desarrollo"],
     publishedAt: Timestamp,
     createdAt: Timestamp,
     updatedAt: Timestamp
   }
   ```

#### Operaciones CRUD

**Crear Documento**:
```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';

await addDoc(collection(db, 'services'), {
  title: "Nuevo Servicio",
  createdAt: serverTimestamp()
});
```

**Leer Documentos**:
```javascript
import { collection, getDocs } from 'firebase/firestore';

const querySnapshot = await getDocs(collection(db, 'services'));
const services = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

**Actualizar Documento**:
```javascript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

await updateDoc(doc(db, 'services', serviceId), {
  title: "Título Actualizado",
  updatedAt: serverTimestamp()
});
```

**Eliminar Documento**:
```javascript
import { doc, deleteDoc } from 'firebase/firestore';

await deleteDoc(doc(db, 'services', serviceId));
```

#### Filtrado y Consultas

**Filtrar por Status** (Noticias):
```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

const q = query(
  collection(db, 'news'),
  where('status', '==', 'published')
);
const snapshot = await getDocs(q);
```

**Ordenar por Fecha**:
```javascript
import { orderBy } from 'firebase/firestore';

const q = query(
  collection(db, 'news'),
  where('status', '==', 'published'),
  orderBy('publishedAt', 'desc')
);
```

**Nota**: Para usar `orderBy` con `where`, necesitas crear un índice compuesto en Firebase Console.

#### Permisos de Usuario

**Sistema de Autorización**:
- Ubicación: `src/modules/news/views/newsList.vue`
- Lógica: Solo el autor puede ver/editar/eliminar sus propias noticias

```javascript
import { auth } from '@/firebase';

const isOwner = computed(() => {
  const user = auth.currentUser;
  return user && item.author === user.email;
});
```

---

## Cloudinary - Gestión de Imágenes

### Configuración

**Backend**: `src/server/index.js`

```javascript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

### Flujo de Subida de Imágenes

#### 1. Frontend Solicita Firma

**Archivo**: `src/modules/services/views/AdminServices.vue`

```javascript
const signUpload = async ({ folder, publicId }) => {
  const { data } = await axios.post(getApiUrl('/api/media/sign'), {
    folder,
    public_id: publicId
  });
  return data;
};
```

#### 2. Backend Genera Firma

**Archivo**: `src/server/cloudinary.routes.js`

```javascript
router.post('/media/sign', (req, res) => {
  const { folder, public_id } = req.body;
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      public_id,
      timestamp
    },
    process.env.CLOUDINARY_API_SECRET
  );
  
  res.json({
    signature,
    timestamp,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY
  });
});
```

#### 3. Frontend Sube Imagen Directamente a Cloudinary

```javascript
const uploadToCloudinarySigned = async (file, publicId) => {
  const { signature, timestamp, cloud_name, api_key } = await signUpload({
    folder: 'services',
    publicId
  });
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', api_key);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', 'services');
  formData.append('public_id', publicId);
  
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    formData
  );
  
  return {
    url: response.data.secure_url,
    id: response.data.public_id
  };
};
```

### Estructura de Carpetas en Cloudinary

- `services/`: Imágenes de servicios
- `news/`: Imágenes de noticias (coverUrl, img_one, img_two)

### Optimización Automática

Cloudinary optimiza automáticamente las imágenes usando transformaciones en la URL:

```javascript
// Ejemplo: Redimensionar a 800px de ancho
const optimizedUrl = url.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
```

**Parámetros comunes**:
- `f_auto`: Formato automático (WebP si es compatible)
- `q_auto`: Calidad automática
- `w_800`: Ancho de 800px
- `h_600`: Alto de 600px
- `c_fill`: Recortar y rellenar

### Resoluciones Recomendadas

| Tipo | Resolución | Aspecto | Peso Máximo |
|------|------------|---------|-------------|
| **Noticia - Portada** | 1920x1080px | 16:9 | 500 KB |
| **Noticia - Apoyo** | 1200x800px | 3:2 | 400 KB |
| **Servicio - Principal** | 1920x1080px | 16:9 | 500 KB |

---

## Backend - Servidor Express

### Estructura del Servidor

**Archivo**: `src/server/index.js`

```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Cargar variables de entorno
dotenv.config();

// Configurar Cloudinary
cloudinary.config({...});

// Crear app Express
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", cloudinaryRoutes);
app.use("/api", emailRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
```

### Endpoints Disponibles

#### 1. Cloudinary - Generar Firma

**POST** `/api/media/sign`

**Request Body**:
```json
{
  "folder": "services",
  "public_id": "fabrica-software"
}
```

**Response**:
```json
{
  "signature": "abc123...",
  "timestamp": 1234567890,
  "cloud_name": "tu-cloud-name",
  "api_key": "tu-api-key"
}
```

#### 2. Email - Enviar Email

**POST** `/api/email/send`

**Request Body**:
```json
{
  "formType": "contact",
  "data": {
    "fullName": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "1234567890",
    "subject": "Consulta",
    "message": "Mensaje del usuario"
  },
  "sendConfirmation": true
}
```

**Response**:
```json
{
  "success": true,
  "message": "Emails enviados correctamente"
}
```

**Tipos de Formulario**:
- `contact`: Formulario de contacto
- `services`: Formulario de cotización de servicios
- `challenge`: Formulario de retos

### Configuración de Email

**Archivo**: `src/server/email.routes.js`

El sistema usa **Gmail SMTP** como proveedor principal:

```javascript
const createTransporter = () => {
  // Prioridad 1: Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }
  
  // Prioridad 2: SendGrid (fallback)
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
};
```

**Flujo de Envío**:
1. Recibe datos del formulario
2. Envía email interno a `INTERNAL_EMAIL`
3. Envía email de confirmación al usuario (si `sendConfirmation: true`)

---

## Frontend - Vue.js 3

### Configuración Principal

**Archivo**: `src/main.js`

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createVuetify } from "vuetify";

// Importar estilos
import "./assets/main.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

// Crear app
const app = createApp(App);

// Usar plugins
app.use(store);
app.use(router);
app.use(vuetify);

// Registrar módulos
registerModules({...}, { app, router, store });

// Montar app
app.mount("#app");
```

### Sistema de Rutas

**Archivo**: `src/router/index.js`

#### Rutas Públicas

- `/` - Home
- `/servicios` - Lista de servicios
- `/servicios/:slug` - Detalle de servicio
- `/blog` - Lista de noticias públicas
- `/blog/:slug` - Detalle de noticia
- `/contacto` - Formulario de contacto
- `/acerca-de-gigs` - Sobre nosotros
- `/clientes` - Clientes
- `/retos` - Retos

#### Rutas Protegidas (Requieren Auth)

- `/admin` - Dashboard de administración
- `/admin/servicios` - Gestión de servicios
- `/admin/noticias` - Crear/editar noticia
- `/admin/noticias-lista` - Lista de noticias (solo propias)
- `/verificar-correo` - Verificación de email

#### Scroll Behavior

El router tiene lógica especial para hacer scroll automático al formulario:

```javascript
scrollBehavior(to, from, savedPosition) {
  if (to.hash && to.query.scrollToForm === 'true') {
    // Lógica de scroll con reintentos
  }
}
```

### Gestión de Estado (Vuex)

**Archivo**: `src/store/index.js`

Cada módulo puede tener su propio store:

```javascript
export default createStore({
  modules: {
    news: news.store,
    services: services.store,
    // ...
  },
  state: {
    modulesList: []
  }
});
```

### Componentes Reutilizables

#### TopBar (`src/components/navs/TopBar.vue`)

- Barra de navegación superior
- Menú responsive
- Indicador de autenticación
- Dropdown de usuario

#### Forms (`src/components/navs/Forms.vue`)

Wrapper para formularios públicos:
- Título y subtítulo
- Botón de envío
- Estado de carga
- Validación visual

#### CardFooter (`src/components/navs/CardFooter.vue`)

Card de llamada a la acción:
- Título y texto
- Botón de contacto
- Acepta prop `ctaHref` para personalizar destino

---

## Sistema de Módulos

### Arquitectura Modular

Cada módulo sigue esta estructura:

```
module/
├── index.js          # Exporta: router, store, Module.vue
├── Module.vue        # Wrapper con router-view
├── router/
│   └── index.js      # Rutas del módulo
├── store/
│   └── index.js      # Estado Vuex (opcional)
└── views/            # Vistas y componentes
```

### Registro de Módulos

**Archivo**: `src/register-modules.js`

```javascript
export const registerModules = (modules, { app, router, store }) => {
  Object.keys(modules).forEach(moduleKey => {
    const module = modules[moduleKey];
    
    // Registrar rutas
    if (module.router) {
      router.addRoute(module.router);
    }
    
    // Registrar store
    if (module.store) {
      store.registerModule(moduleKey, module.store);
    }
  });
};
```

### Ejemplo de Módulo

**Archivo**: `src/modules/services/index.js`

```javascript
import Module from './Module.vue';
import router from './router';
import store from './store';

export default {
  Module,
  router,
  store
};
```

---

## Autenticación y Autorización

### Flujo de Autenticación

1. Usuario ingresa credenciales en `/iniciar-sesion`
2. Firebase Authentication valida credenciales
3. Si es exitoso, se guarda la sesión (browserLocalPersistence)
4. Router guard redirige según autenticación
5. Usuario puede acceder a rutas protegidas

### Sistema de Permisos

**Archivo**: `src/router/index.js`

```javascript
const ADMIN_EMAILS = [
  'admin@gigsconsulting.com',
  'otro-admin@email.com'
];

const isAdmin = (email) => {
  return ADMIN_EMAILS.includes(email);
};
```

**Uso en Guards**:
```javascript
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      next('/iniciar-sesion');
    } else if (to.meta.requiresAdmin && !isAdmin(user?.email)) {
      next('/admin');
    } else {
      next();
    }
  });
});
```

### Permisos por Usuario

**Noticias**: Solo el autor puede ver/editar/eliminar sus propias noticias.

**Archivo**: `src/modules/news/views/newsList.vue`

```javascript
const filteredNews = computed(() => {
  const user = auth.currentUser;
  if (!user) return [];
  
  return news.value.filter(item => item.author === user.email);
});
```

---

## Formularios y Envío de Emails

### Tipos de Formularios

#### 1. Formulario de Contacto

**Ubicación**: `src/modules/contact/views/components/FormContact.vue`

**Campos**:
- Nombre completo
- Empresa
- Email
- Teléfono
- Asunto
- Mensaje

**Servicio**: `sendContactEmail()` en `src/services/email-service.js`

#### 2. Formulario de Servicios

**Ubicación**: `src/modules/services/views/components/ServicesForm.vue`

**Campos**:
- Nombre completo
- Empresa
- Email
- Teléfono
- Tipo de proyecto
- Descripción del proyecto
- Presupuesto
- Timeline

**Servicio**: `sendServicesEmail()` en `src/services/email-service.js`

#### 3. Formulario de Retos

**Ubicación**: `src/modules/challenges/views/components/ChallengesForm.vue`

**Campos**:
- Nombre completo
- Empresa
- Email
- Teléfono
- Título del reto
- Descripción
- Presupuesto
- Timeline

**Servicio**: `sendChallengeEmail()` en `src/services/email-service.js`

### Flujo de Envío

1. Usuario completa formulario
2. Frontend valida datos
3. Frontend llama a `email-service.js`
4. `email-service.js` hace POST a `/api/email/send`
5. Backend procesa y envía:
   - Email interno a `INTERNAL_EMAIL`
   - Email de confirmación al usuario (opcional)

### Servicio de Email

**Archivo**: `src/services/email-service.js`

```javascript
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '' : 'http://localhost:8787');

export const sendEmail = async (formType, data, sendConfirmation = true) => {
  const response = await axios.post(`${API_URL}/api/email/send`, {
    formType,
    data,
    sendConfirmation
  });
  return response.data;
};

export const sendContactEmail = (data) => {
  return sendEmail('contact', data);
};

export const sendServicesEmail = (data) => {
  return sendEmail('services', data);
};

export const sendChallengeEmail = (data) => {
  return sendEmail('challenge', data);
};
```

---

## Variables de Entorno

### Frontend (`.env.local`)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id

# API URL (producción)
VITE_API_URL=https://tu-backend.com
```

**Nota**: Variables de frontend deben tener prefijo `VITE_` para ser accesibles.

### Backend (`.env`)

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CLOUDINARY_UPLOAD_PRESET=tu_upload_preset

# Server
PORT=8787

# Email - Gmail SMTP (Prioridad 1)
GMAIL_USER=bot.gigsconsulting@gmail.com
GMAIL_APP_PASSWORD=tu_app_password

# Email - SendGrid (Prioridad 2 - Fallback)
# SENDGRID_API_KEY=tu_sendgrid_key

# Email Configuration
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
```

### Acceso a Variables

**Frontend**:
```javascript
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
```

**Backend**:
```javascript
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
```

---

## Flujos Principales

### 1. Flujo de Crear Servicio

```
1. Usuario accede a /admin/servicios
2. Click en "Crear Servicio"
3. Completa formulario:
   - Título
   - Resumen
   - Descripción
   - Sube imagen
4. Al subir imagen:
   a. Frontend solicita firma a /api/media/sign
   b. Backend genera firma con Cloudinary
   c. Frontend sube imagen directamente a Cloudinary
   d. Recibe URL y public_id
5. Al guardar:
   a. Guarda datos en Firestore (colección 'services')
   b. Incluye URL de imagen y public_id
6. Muestra mensaje de éxito
```

### 2. Flujo de Crear Noticia

```
1. Usuario accede a /admin/noticias
2. Completa formulario:
   - Título (genera slug automático)
   - Resumen
   - Contenido (editor TipTap)
   - Sube imagen de portada
   - Sube imágenes de apoyo (opcional)
3. Al subir imágenes:
   - Mismo proceso que servicios
   - Carpeta: 'news'
4. Al guardar:
   - Guarda en Firestore (colección 'news')
   - Incluye author: currentUser.email
   - Status: 'draft' o 'published'
5. Noticia visible en /blog si status='published'
```

### 3. Flujo de Envío de Formulario

```
1. Usuario completa formulario público
2. Frontend valida datos
3. Frontend llama a email-service.js
4. email-service.js hace POST a /api/email/send
5. Backend:
   a. Crea transporter (Gmail o SendGrid)
   b. Formatea email interno
   c. Envía email interno a INTERNAL_EMAIL
   d. Si sendConfirmation=true, envía confirmación al usuario
6. Frontend muestra mensaje de éxito
7. Formulario se resetea
```

### 4. Flujo de Autenticación

```
1. Usuario accede a /iniciar-sesion
2. Ingresa email y contraseña
3. Firebase Authentication valida
4. Si es exitoso:
   a. Sesión se guarda (browserLocalPersistence)
   b. Router guard verifica autenticación
   c. Redirige a ruta solicitada o /admin
5. Si requiere verificación:
   a. Redirige a /verificar-correo
   b. Usuario verifica email
   c. Puede acceder a rutas protegidas
```

---

## Guías de Desarrollo

### Agregar un Nuevo Módulo

1. **Crear estructura de carpetas**:
   ```
   src/modules/nuevo-modulo/
   ├── index.js
   ├── Module.vue
   ├── router/
   │   └── index.js
   ├── store/
   │   └── index.js
   └── views/
       └── nuevoModuloComponent.vue
   ```

2. **Crear `index.js`**:
   ```javascript
   import Module from './Module.vue';
   import router from './router';
   import store from './store';
   
   export default {
     Module,
     router,
     store
   };
   ```

3. **Crear `Module.vue`**:
   ```vue
   <template>
     <router-view />
   </template>
   ```

4. **Crear `router/index.js`**:
   ```javascript
   export default [
     {
       path: '/nuevo-modulo',
       name: 'nuevo-modulo',
       component: () => import('../views/nuevoModuloComponent.vue')
     }
   ];
   ```

5. **Registrar en `src/main.js`**:
   ```javascript
   import nuevoModulo from '@/modules/nuevo-modulo';
   
   registerModules({
     // ... otros módulos
     nuevoModulo: nuevoModulo
   }, { app, router, store });
   ```

6. **Registrar store en `src/store/index.js`** (opcional):
   ```javascript
   import nuevoModulo from '@/modules/nuevo-modulo';
   
   export default createStore({
     modules: {
       // ... otros módulos
       nuevoModulo: nuevoModulo.store
     }
   });
   ```

### Agregar una Nueva Ruta Protegida

1. **En el router del módulo**:
   ```javascript
   {
     path: '/admin/nueva-ruta',
     name: 'nueva-ruta',
     component: () => import('../views/NuevaRuta.vue'),
     meta: { requiresAuth: true }
   }
   ```

2. **Si requiere permisos de admin**:
   ```javascript
   meta: { 
     requiresAuth: true,
     requiresAdmin: true 
   }
   ```

### Agregar un Nuevo Formulario

1. **Crear componente**:
   ```vue
   <template>
     <Forms 
       title="Título del Formulario"
       subtitle="Subtítulo"
       text-button="Enviar"
       :loading="loading"
       @save="onSave"
     >
       <!-- Campos del formulario -->
     </Forms>
   </template>
   ```

2. **Agregar función en `email-service.js`**:
   ```javascript
   export const sendNuevoFormEmail = (data) => {
     return sendEmail('nuevo-form', data);
   };
   ```

3. **Agregar tipo en `email.routes.js`**:
   ```javascript
   const formatInternalEmail = (formType, data) => {
     switch (formType) {
       case 'nuevo-form':
         return {
           subject: 'Nuevo Formulario',
           html: `...`
         };
     }
   };
   ```

### Subir Imagen a Cloudinary

```javascript
import { getApiUrl } from '@/services/api-service';
import axios from 'axios';

const signUpload = async ({ folder, publicId }) => {
  const { data } = await axios.post(getApiUrl('/api/media/sign'), {
    folder,
    public_id: publicId
  });
  return data;
};

const uploadToCloudinarySigned = async (file, publicId) => {
  const { signature, timestamp, cloud_name, api_key } = await signUpload({
    folder: 'tu-carpeta',
    publicId
  });
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', api_key);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', 'tu-carpeta');
  formData.append('public_id', publicId);
  
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    formData
  );
  
  return {
    url: response.data.secure_url,
    id: response.data.public_id
  };
};
```

---

## Troubleshooting

### Problemas Comunes

#### 1. Error: "Failed to resolve import"

**Causa**: Ruta de importación incorrecta.

**Solución**: Usar alias `@/` para rutas absolutas:
```javascript
// ❌ Incorrecto
import Component from '../../../components/Component.vue';

// ✅ Correcto
import Component from '@/components/Component.vue';
```

#### 2. Error: "Firebase: Missing or insufficient permissions"

**Causa**: Reglas de Firestore no permiten la operación.

**Solución**: Revisar reglas en Firebase Console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /services/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### 3. Error: "Cloudinary signature invalid"

**Causa**: Variables de entorno de Cloudinary incorrectas.

**Solución**: Verificar `.env`:
```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

#### 4. Error: "Email sending failed"

**Causa**: Credenciales de Gmail incorrectas o App Password no configurado.

**Solución**:
1. Verificar `GMAIL_USER` y `GMAIL_APP_PASSWORD` en `.env`
2. Asegurarse de usar App Password (no contraseña normal)
3. Verificar que "Less secure app access" esté habilitado (si aplica)

#### 5. Error: "Module not found"

**Causa**: Módulo no registrado en `main.js`.

**Solución**: Agregar módulo a `registerModules()` en `src/main.js`.

#### 6. Variables de entorno no funcionan

**Causa**: 
- Frontend: Variable no tiene prefijo `VITE_`
- Backend: `.env` no está en la raíz o no se carga correctamente

**Solución**:
- Frontend: Usar `VITE_` prefix
- Backend: Verificar que `dotenv.config()` se ejecute al inicio

#### 7. Imágenes no se muestran

**Causa**: URL de Cloudinary incorrecta o imagen eliminada.

**Solución**:
- Verificar que `public_id` se guarde correctamente en Firestore
- Verificar que la URL sea `https://` (secure_url)

#### 8. Router guard no funciona

**Causa**: `onAuthStateChanged` es asíncrono.

**Solución**: Asegurarse de esperar la respuesta:
```javascript
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    // Lógica aquí
    next();
  });
});
```

---

## Scripts Disponibles

```bash
# Desarrollo (inicia frontend y backend)
npm run dev

# Solo frontend
npm run dev:web

# Solo backend
npm run dev:api

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## Recursos Adicionales

### Documentación Externa

- [Vue.js 3](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Firebase](https://firebase.google.com/docs)
- [Cloudinary](https://cloudinary.com/documentation)
- [Vite](https://vitejs.dev/)

### Documentos del Proyecto

- `FIREBASE_SETUP.md` - Configuración de Firebase
- `EMAIL_SETUP.md` - Configuración de emails
- `ENV_SETUP.md` - Variables de entorno
- `GUIA_DESPLIEGUE_COMPLETO.md` - Guía de despliegue
- `ADMIN_CONFIG.md` - Configuración de administradores

---

## Contacto y Soporte

Para preguntas o problemas:
1. Revisar esta documentación
2. Revisar los documentos específicos mencionados
3. Verificar la configuración de variables de entorno
4. Revisar la consola del navegador y del servidor para errores

---

**Última actualización**: 2025
**Versión del proyecto**: 1.0.0


# Configuración de Variables de Entorno

Este proyecto usa **dos archivos `.env` separados** por seguridad y mejores prácticas.

## 📁 Estructura de Archivos .env

### 1. `.env` - Variables del Backend (Node.js/Express)
Este archivo contiene las variables que solo el servidor backend necesita:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=dfou0ptpc
CLOUDINARY_API_KEY=244411945684221
CLOUDINARY_API_SECRET=otM6LBBUL9HbC5Pb8GDKalO80kU
CLOUDINARY_UPLOAD_PRESET=gigs_upload

# Servidor
PORT=8787

# Email (Gmail SMTP)
GMAIL_USER=bot.gigsconsulting@gmail.com
GMAIL_APP_PASSWORD=qxpb ktab xfku wkob
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
```

**¿Dónde se usa?**
- `src/server/index.js` - Lee este archivo con `dotenv.config()`
- Variables accesibles en `process.env.*`

### 2. `.env.local` - Variables del Frontend (Vite)
Este archivo contiene las variables que el frontend necesita (con prefijo `VITE_`):

```env
# Firebase (Frontend)
VITE_FIREBASE_API_KEY=AIzaSyBa5ZLb5bsBpHisvXWFpcr7GnyHyv1PVzw
VITE_FIREBASE_AUTH_DOMAIN=gigs-web-c2967.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gigs-web-c2967
VITE_FIREBASE_STORAGE_BUCKET=gigs-web-c2967.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=382239120624
VITE_FIREBASE_APP_ID=1:382239120624:web:f6723ca13ad0e7ace4f635
VITE_FIREBASE_MEASUREMENT_ID=G-RX6HX9G74L
```

**¿Dónde se usa?**
- `src/firebase.js` - Lee estas variables con `import.meta.env.VITE_*`
- Vite expone solo variables con prefijo `VITE_` al cliente
- Variables accesibles en `import.meta.env.VITE_*`

## ✅ ¿Por qué mantenerlos separados?

### Ventajas de la separación:

1. **Seguridad** 🔒
   - Las variables del backend (Cloudinary, Gmail) **nunca** se exponen al cliente
   - Solo las variables con `VITE_` se incluyen en el bundle del frontend
   - Reduce el riesgo de exponer credenciales sensibles

2. **Claridad** 📋
   - Fácil distinguir qué variables son para frontend y cuáles para backend
   - Mejor organización y mantenimiento

3. **Mejores prácticas** ⭐
   - Separación de responsabilidades
   - Más fácil de desplegar en diferentes plataformas
   - Cada entorno (frontend/backend) tiene sus propias variables

4. **Despliegue** 🚀
   - En producción, puedes configurar variables del backend en el servidor
   - Variables del frontend se configuran en la plataforma de hosting (Vercel, Netlify, etc.)

## ⚠️ Formato del `.env.local`

**IMPORTANTE:** Asegúrate de que cada variable esté en una línea separada:

```env
# ✅ CORRECTO
VITE_FIREBASE_API_KEY=AIzaSyBa5ZLb5bsBpHisvXWFpcr7GnyHyv1PVzw
VITE_FIREBASE_AUTH_DOMAIN=gigs-web-c2967.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gigs-web-c2967

# ❌ INCORRECTO (todo en una línea)
VITE_FIREBASE_API_KEY=...VITE_FIREBASE_AUTH_DOMAIN=...VITE_FIREBASE_PROJECT_ID=...
```

## 🔧 Cómo funciona

### Backend (`.env`):
```javascript
// src/server/index.js
import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // Lee .env

// Usar variables
const port = process.env.PORT; // ✅ Funciona
```

### Frontend (`.env.local`):
```javascript
// src/firebase.js
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY; // ✅ Funciona
const secret = import.meta.env.CLOUDINARY_SECRET; // ❌ No funciona (sin VITE_)
```

## 📝 Checklist

- [x] `.env` configurado para backend
- [x] `.env.local` configurado para frontend
- [x] Todas las variables de Firebase tienen prefijo `VITE_`
- [x] Variables del backend NO tienen prefijo `VITE_`
- [x] Ambos archivos están en `.gitignore`

## 🚨 Nota de Seguridad

**NUNCA** subas estos archivos a Git:
- ✅ `.env` está en `.gitignore`
- ✅ `.env.local` está en `.gitignore`
- ✅ Crea un `.env.example` con valores de ejemplo (sin credenciales reales)


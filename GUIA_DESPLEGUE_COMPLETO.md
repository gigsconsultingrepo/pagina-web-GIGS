# 🚀 Guía Completa de Despliegue - Frontend y Backend

Esta guía te lleva paso a paso para desplegar TODO el proyecto a producción.

---

## 📋 Resumen

Tu proyecto tiene 2 partes:
1. **Frontend** (Vue.js) → Vercel/Netlify (recomendado)
2. **Backend** (Express) → Railway/Render (necesitas desplegarlo)

---

## 🎯 Plan de Acción

### Paso 1: Desplegar Backend (15-20 min)
### Paso 2: Configurar Frontend con URL del Backend (5 min)
### Paso 3: Desplegar Frontend (5 min)

**Total: ~30 minutos**

---

## 🔧 PASO 1: Desplegar Backend en Railway

### 1.1. Crear cuenta y proyecto

1. Ve a https://railway.app
2. Click en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio de GitHub (si no está en GitHub, súbelo primero)

### 1.2. Configurar el servicio

Railway detectará automáticamente Node.js. Si no:

1. Click en el servicio creado
2. Ve a "Settings"
3. En "Build Command" deja vacío (o `npm install`)
4. En "Start Command" pon:
   ```
   node src/server/index.js
   ```

### 1.3. Configurar variables de entorno

En Railway → Variables, agrega TODAS estas:

```env
PORT=8787
NODE_ENV=production

# Cloudinary
CLOUDINARY_CLOUD_NAME=dfou0ptpc
CLOUDINARY_API_KEY=244411945684221
CLOUDINARY_API_SECRET=otM6LBBUL9HbC5Pb8GDKalO80kU
CLOUDINARY_UPLOAD_PRESET=gigs_upload

# Gmail SMTP
GMAIL_USER=bot.gigsconsulting@gmail.com
GMAIL_APP_PASSWORD=qxpb ktab xfku wkob
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
```

### 1.4. Obtener URL del backend

1. Railway desplegará automáticamente
2. Ve a "Settings" → "Domains"
3. Railway te dará una URL como: `https://tu-proyecto.up.railway.app`
4. **Copia esta URL** - la necesitarás en el siguiente paso

### 1.5. Probar el backend

Abre en el navegador:
```
https://tu-proyecto.up.railway.app/api/media/diag
```

Deberías ver información de Cloudinary. Si funciona, el backend está listo.

---

## 🎨 PASO 2: Configurar Frontend con URL del Backend

### 2.1. Crear archivo de producción

Crea un archivo `.env.production` en la raíz del proyecto:

```env
# URL del backend en producción (reemplaza con tu URL de Railway)
VITE_API_URL=https://tu-proyecto.up.railway.app
```

**IMPORTANTE:** Reemplaza `https://tu-proyecto.up.railway.app` con la URL real que te dio Railway.

### 2.2. Verificar que no hay URLs hardcodeadas

Ya actualicé estos archivos para usar el servicio centralizado:
- ✅ `src/services/api-service.js` (nuevo)
- ✅ `src/modules/news/views/adminNews.vue`
- ✅ `src/modules/services/views/AdminServices.vue`
- ✅ `src/modules/news/views/newsList.vue`
- ✅ `src/services/email-service.js`

---

## 📤 PASO 3: Construir y Desplegar Frontend

### 3.1. Construir el proyecto

```bash
npm run build
```

Esto creará la carpeta `dist/` con todos los archivos optimizados.

### 3.2. Verificar que se construyó correctamente

Asegúrate de que existe:
- `dist/index.html`
- `dist/assets/` (con archivos JS y CSS)

### 3.3. Desplegar Frontend

**Opción A: Vercel (Recomendado)**
1. Ir a https://vercel.com
2. Conectar repositorio Git
3. Configurar build: `npm run build`, Output: `dist`
4. Agregar variables de entorno (VITE_*)
5. Desplegar

**Opción B: Netlify**
1. Ir a https://netlify.com
2. Conectar repositorio Git
3. Configurar: Build command: `npm run build`, Publish: `dist`
4. Agregar variables de entorno
5. Desplegar

### 3.4. Verificar el despliegue

1. Visita tu URL de producción
2. Abre la consola del navegador (F12)
3. Verifica que no hay errores
4. Prueba un formulario (Contacto, Servicios, Retos)
5. Verifica que los emails se envían correctamente

---

## ✅ Checklist Final

### Backend
- [ ] Backend desplegado en Railway
- [ ] Variables de entorno configuradas
- [ ] URL del backend obtenida
- [ ] Backend responde a `/api/media/diag`
- [ ] CORS configurado correctamente

### Frontend
- [ ] Variables de entorno configuradas en plataforma (VITE_*)
- [ ] Proyecto construido (`npm run build`)
- [ ] Desplegado a Vercel/Netlify
- [ ] Sitio carga correctamente
- [ ] Formularios funcionan
- [ ] Imágenes se suben correctamente

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"

**Solución:**
1. Verifica que `VITE_API_URL` esté correcta en `.env.production`
2. Verifica que el backend esté corriendo en Railway
3. Revisa CORS en el backend

### Error: "CORS policy"

**Solución:**
El backend ya está configurado para permitir requests desde Firebase. Si persiste:
1. Verifica que la URL en `allowedOrigins` sea correcta
2. Asegúrate de que el backend se haya desplegado con los últimos cambios

### Los formularios no envían emails

**Solución:**
1. Verifica que las variables de Gmail estén en Railway
2. Revisa los logs de Railway para ver errores
3. Verifica que `GMAIL_APP_PASSWORD` sea correcta

### Las imágenes no se suben

**Solución:**
1. Verifica variables de Cloudinary en Railway
2. Prueba el endpoint `/api/media/diag` directamente
3. Revisa logs de Railway

---

## 📝 Comandos Rápidos

```bash
# Construir frontend
npm run build

# Desplegar frontend
# Desplegar a Vercel/Netlify usando su integración con Git

# Ver logs de Railway (desde Railway dashboard)
# O desde CLI:
railway logs
```

---

## 🔄 Actualizaciones Futuras

### Actualizar Backend:
1. Haz cambios en el código
2. Push a GitHub
3. Railway desplegará automáticamente

### Actualizar Frontend:
```bash
npm run build
# Luego subir carpeta dist/ a Vercel/Netlify o usar su integración con Git
```

---

## 💡 Tips

1. **Railway te da $5 crédito/mes gratis** - suficiente para empezar
2. **El backend se actualiza automáticamente** cuando haces push a GitHub
3. **Puedes ver logs en tiempo real** en Railway dashboard
4. **Vercel/Netlify son gratis** para proyectos pequeños

---

**¿Listo para desplegar?** Sigue los pasos en orden y en 30 minutos tendrás todo funcionando en producción. 🚀

Si tienes dudas en algún paso, avísame y te ayudo.


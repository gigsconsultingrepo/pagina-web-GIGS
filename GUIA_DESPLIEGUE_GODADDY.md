# Guía de Despliegue en GoDaddy

Esta guía te explica cómo desplegar tu proyecto GIGS Consulting en un dominio de GoDaddy.

## 📋 Opciones de Despliegue en GoDaddy

Tienes **3 opciones principales** dependiendo de tu plan de GoDaddy:

### Opción 1: Solo Dominio (Recomendado para empezar) ⭐
**Usar GoDaddy solo para el dominio y desplegar en servicios gratuitos**
- ✅ **Gratis** para hosting (Vercel + Railway)
- ✅ **Fácil** de configurar
- ✅ **Mejor rendimiento** (CDN global)
- ⚠️ **GoDaddy solo proporciona el dominio** (DNS management)

### Opción 2: Hosting Compartido (cPanel)
**Para frontend estático (solo HTML/CSS/JS compilado)**
- ✅ Usa el hosting que ya pagaste en GoDaddy
- ⚠️ Solo frontend (backend necesita otro servicio)
- ⚠️ Menos flexible

### Opción 3: VPS de GoDaddy (Recomendado para control total) 🖥️
**Para frontend + backend Node.js completo**
- ✅ **Control total** del servidor
- ✅ **Todo en un lugar** (frontend + backend)
- ✅ **Más económico** a largo plazo (si ya tienes VPS)
- ⚠️ Requiere conocimientos técnicos (SSH, Nginx, PM2)
- ⚠️ Tú eres responsable del mantenimiento

---

## 🎯 Opción 1: Solo Dominio + Servicios Gratuitos

Esta opción usa **GoDaddy solo para el dominio** (gestión DNS) y despliega el hosting en servicios gratuitos.

### ¿Qué proporciona GoDaddy?
- **Solo el dominio**: Gestión de DNS para apuntar a otros servicios
- **No proporciona hosting**: Todo el hosting (frontend + backend) va en servicios gratuitos

### Ventajas:
- ✅ **Gratis** para hosting (Vercel/Netlify + Railway)
- ✅ **Más fácil** de configurar
- ✅ **Mejor rendimiento** (CDN global)
- ✅ **SSL automático**
- ✅ **Escalable** sin límites
- ✅ **Sin mantenimiento** del servidor

### Desventajas:
- ⚠️ Dependes de servicios externos (Vercel, Railway)
- ⚠️ Límites en planes gratuitos (suficientes para la mayoría de proyectos)
- ⚠️ Si ya pagaste hosting en GoDaddy, no lo estás usando

### ¿Cuándo usar esta opción?
- ✅ Proyectos nuevos o pequeños
- ✅ Quieres empezar gratis
- ✅ No tienes conocimientos de servidores
- ✅ Prefieres que otros gestionen el hosting

### Pasos:

#### 1. Desplegar Frontend en Vercel (Gratis)

1. **Crear cuenta en Vercel**: https://vercel.com
2. **Conectar repositorio Git** (GitHub, GitLab, Bitbucket)
   - Si no tienes repositorio, créalo en GitHub primero
3. **Importar proyecto**:
   - Click en "Add New Project"
   - Selecciona tu repositorio
4. **Configurar build**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Agregar variables de entorno** (Environment Variables):
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
   VITE_API_URL=https://tu-backend.railway.app
   ```
   **IMPORTANTE**: Agrega `VITE_API_URL` con la URL de tu backend (Railway, Render, etc.)
6. **Desplegar**: Click en "Deploy"
7. **Obtener URL**: Te dará una URL como `tu-proyecto.vercel.app`

#### 2. Desplegar Backend en Railway (Gratis)

1. **Crear cuenta en Railway**: https://railway.app
2. **Conectar repositorio Git**
3. **Crear nuevo proyecto**:
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Selecciona tu repositorio
4. **Configurar servicio**:
   - Railway detectará automáticamente Node.js
   - **Root Directory**: Dejar vacío (o `src/server` si tienes estructura especial)
   - **Start Command**: `node src/server/index.js`
5. **Agregar variables de entorno**:
   ```
   CLOUDINARY_CLOUD_NAME=dfou0ptpc
   CLOUDINARY_API_KEY=244411945684221
   CLOUDINARY_API_SECRET=otM6LBBUL9HbC5Pb8GDKalO80kU
   CLOUDINARY_UPLOAD_PRESET=gigs_upload
   PORT=8787
   GMAIL_USER=bot.gigsconsulting@gmail.com
   GMAIL_APP_PASSWORD=qxpb ktab xfku wkob
   INTERNAL_EMAIL=bot.gigsconsulting@gmail.com
   EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
   ```
6. **Obtener URL del backend**: Railway te dará una URL como `tu-backend.railway.app`

#### 3. Actualizar URLs en el Código

**Buscar y reemplazar** `localhost:8787` por la URL de Railway:

**Archivos a actualizar:**
- `src/services/api-service.js`
- Cualquier otro archivo que use `localhost:8787`

**Ejemplo:**
```javascript
// Antes
const API_URL = 'http://localhost:8787'

// Después
const API_URL = 'https://tu-backend.railway.app'
```

#### 4. Configurar Dominio en GoDaddy

1. **Ir a tu cuenta de GoDaddy**
2. **DNS Management**:
   - Ir a "My Products" → Tu dominio → "DNS"
3. **Agregar registros DNS**:

   **Para el frontend (Vercel):**
   ```
   Tipo: CNAME
   Nombre: @ (o www)
   Valor: cname.vercel-dns.com
   TTL: 600
   ```

   **O si Vercel te da una IP específica:**
   ```
   Tipo: A
   Nombre: @
   Valor: [IP que te da Vercel]
   TTL: 600
   ```

4. **En Vercel**:
   - Ir a tu proyecto → Settings → Domains
   - Agregar tu dominio: `tudominio.com` y `www.tudominio.com`
   - Vercel te dará instrucciones específicas de DNS

#### 5. Configurar CORS en el Backend

Actualizar `src/server/index.js` para permitir tu dominio:

```javascript
import cors from 'cors'

app.use(cors({
  origin: [
    'https://tudominio.com',
    'https://www.tudominio.com',
    'https://tu-proyecto.vercel.app' // Para desarrollo
  ],
  credentials: true
}))
```

#### 6. Configurar Firebase

1. **Ir a Firebase Console** → Authentication → Settings
2. **Agregar dominios autorizados**:
   - `tudominio.com`
   - `www.tudominio.com`

---

## 🏠 Opción 2: Hosting Compartido (cPanel)

Si tienes hosting compartido de GoDaddy con cPanel, puedes desplegar solo el frontend aquí.

### Limitaciones:
- ⚠️ **Solo frontend estático** (no Node.js)
- ⚠️ El backend debe estar en otro servicio (Railway, Render, etc.)

### Pasos:

#### 1. Construir el Proyecto

```bash
npm run build
```

Esto creará la carpeta `dist/` con los archivos estáticos.

#### 2. Subir Archivos vía FTP

1. **Obtener credenciales FTP** de GoDaddy:
   - Ir a cPanel → "FTP Accounts"
   - O usar File Manager en cPanel

2. **Conectar con cliente FTP** (FileZilla, WinSCP, etc.):
   ```
   Host: ftp.tudominio.com (o la IP que te da GoDaddy)
   Usuario: tu_usuario_ftp
   Contraseña: tu_contraseña_ftp
   Puerto: 21 (o 22 para SFTP)
   ```

3. **Subir carpeta `dist/`**:
   - Conectar al servidor
   - Navegar a `public_html/` (o la carpeta raíz de tu dominio)
   - Subir **todo el contenido** de la carpeta `dist/` (no la carpeta misma)

#### 3. Configurar Variables de Entorno

**Problema**: En hosting compartido no puedes usar `.env.local` directamente.

**Solución**: Las variables `VITE_*` se compilan en el build. Asegúrate de tenerlas configuradas antes de hacer `npm run build`:

```bash
# En tu máquina local, antes de hacer build
export VITE_FIREBASE_API_KEY=tu_api_key
export VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
# ... etc

npm run build
```

O crea un script de build que lea las variables.

#### 4. Configurar Backend en Otro Servicio

El backend debe estar en Railway, Render, o similar (ver Opción 1, paso 2).

#### 5. Configurar .htaccess para SPA

Crear archivo `.htaccess` en `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Esto permite que Vue Router funcione correctamente.

---

## 🖥️ Opción 3: VPS de GoDaddy (Control Total)

Si tienes un **VPS (Virtual Private Server) de GoDaddy**, puedes desplegar frontend y backend completo en tu propio servidor.

### ¿Qué proporciona GoDaddy?
- **Servidor completo**: Control total del VPS
- **Todo en un lugar**: Frontend + Backend en el mismo servidor
- **Sin dependencias externas**: No dependes de Vercel/Railway

### Ventajas:
- ✅ **Control total** del servidor y configuración
- ✅ **Todo en un lugar** (frontend + backend juntos)
- ✅ **Más económico a largo plazo** (si ya pagaste el VPS)
- ✅ **Sin límites** de servicios gratuitos
- ✅ **Privacidad total** (tus datos en tu servidor)
- ✅ **Personalizable** (puedes instalar lo que necesites)

### Desventajas:
- ⚠️ **Requiere conocimientos técnicos** (SSH, Linux, Nginx, PM2)
- ⚠️ **Tú eres responsable** del mantenimiento y seguridad
- ⚠️ **Más tiempo** de configuración inicial
- ⚠️ **Debes gestionar** actualizaciones y backups

### ¿Cuándo usar esta opción?
- ✅ Ya tienes un VPS de GoDaddy pagado
- ✅ Tienes conocimientos de servidores Linux
- ✅ Quieres control total y privacidad
- ✅ Proyecto grande que necesita recursos dedicados
- ✅ Necesitas configuraciones específicas del servidor

### Pasos:

#### 1. Conectar por SSH

```bash
ssh usuario@tu-servidor-ip
```

#### 2. Instalar Node.js (si no está instalado)

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

#### 3. Clonar Repositorio

```bash
cd /var/www  # o donde quieras el proyecto
git clone tu-repositorio-url
cd GigsConsulting
npm install
```

#### 4. Configurar Variables de Entorno

```bash
# Crear .env para backend
nano .env
```

Pegar:
```
CLOUDINARY_CLOUD_NAME=dfou0ptpc
CLOUDINARY_API_KEY=244411945684221
CLOUDINARY_API_SECRET=otM6LBBUL9HbC5Pb8GDKalO80kU
CLOUDINARY_UPLOAD_PRESET=gigs_upload
PORT=8787
GMAIL_USER=bot.gigsconsulting@gmail.com
GMAIL_APP_PASSWORD=qxpb ktab xfku wkob
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
```

```bash
# Crear .env.local para frontend
nano .env.local
```

Pegar:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

#### 5. Construir Frontend

```bash
npm run build
```

#### 6. Configurar Nginx (Recomendado)

Instalar Nginx:
```bash
sudo apt-get update
sudo apt-get install nginx
```

Configurar Nginx para frontend:
```bash
sudo nano /etc/nginx/sites-available/tudominio.com
```

Pegar:
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    root /var/www/GigsConsulting/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy para API
    location /api {
        proxy_pass http://localhost:8787;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilitar sitio:
```bash
sudo ln -s /etc/nginx/sites-available/tudominio.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Configurar PM2 para Backend

Instalar PM2:
```bash
sudo npm install -g pm2
```

Iniciar backend:
```bash
cd /var/www/GigsConsulting
pm2 start src/server/index.js --name "gigs-backend"
pm2 save
pm2 startup  # Para iniciar automáticamente al reiniciar
```

#### 8. Configurar SSL (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

---

## 🔧 Configuración Post-Despliegue

### 1. Actualizar URLs del Backend

Buscar en el código todas las referencias a `localhost:8787` y reemplazarlas por tu URL de producción.

**Archivos a revisar:**
- `src/services/api-service.js`
- Cualquier otro archivo que use la API

### 2. Configurar Firebase

1. Ir a Firebase Console → Authentication → Settings
2. Agregar tu dominio a "Authorized domains":
   - `tudominio.com`
   - `www.tudominio.com`

### 3. Configurar CORS

Asegúrate de que el backend permita tu dominio:

```javascript
// src/server/index.js
app.use(cors({
  origin: [
    'https://tudominio.com',
    'https://www.tudominio.com'
  ],
  credentials: true
}))
```

---

## 📝 Checklist Final

- [ ] Frontend desplegado (Vercel/Netlify o hosting)
- [ ] Backend desplegado (Railway/Render o VPS)
- [ ] Variables de entorno configuradas
- [ ] URLs actualizadas (sin localhost)
- [ ] Dominio configurado en GoDaddy DNS
- [ ] SSL/HTTPS configurado
- [ ] Firebase dominios autorizados
- [ ] CORS configurado
- [ ] Probar formularios y funcionalidades

---

## 🆘 Solución de Problemas

### Error: "Cannot GET /ruta"
- **Solución**: Configurar `.htaccess` (Opción 2) o Nginx rewrite (Opción 3)

### Error: CORS bloqueado
- **Solución**: Verificar configuración de CORS en backend

### Variables de entorno no funcionan
- **Solución**: Verificar que las variables `VITE_*` estén configuradas antes del build

### Backend no responde
- **Solución**: Verificar que el servidor esté corriendo (PM2, Railway, etc.)

---

## 💡 ¿Cuál Opción Elegir?

### Opción 1: Solo Dominio + Servicios Gratuitos
**Elige esta si:**
- ✅ Quieres empezar **gratis** y fácil
- ✅ No tienes conocimientos de servidores
- ✅ Prefieres que otros gestionen el hosting
- ✅ Proyecto pequeño o mediano
- ⚠️ **GoDaddy solo te da el dominio** (DNS), todo lo demás es gratis en Vercel/Railway

### Opción 2: Hosting Compartido (cPanel)
**Elige esta si:**
- ✅ Ya pagaste hosting compartido en GoDaddy
- ✅ Solo necesitas desplegar frontend estático
- ✅ Backend lo puedes poner en Railway/Render (gratis)
- ⚠️ Limitado a frontend estático

### Opción 3: VPS de GoDaddy
**Elige esta si:**
- ✅ **Ya tienes un VPS pagado** en GoDaddy
- ✅ Tienes conocimientos de Linux y servidores
- ✅ Quieres **control total** y todo en un lugar
- ✅ Proyecto grande o necesitas configuraciones específicas
- ✅ Quieres **aprovechar al máximo** lo que pagaste en GoDaddy
- ⚠️ Requiere más trabajo técnico

## 🎯 Recomendación Final

**Si ya pagaste un VPS en GoDaddy:**
→ **Usa la Opción 3** para aprovechar lo que pagaste y tener control total

**Si solo tienes el dominio:**
→ **Usa la Opción 1** para empezar gratis y fácil

**Si tienes hosting compartido:**
→ **Usa la Opción 2** para frontend + Opción 1 para backend (Railway gratis)


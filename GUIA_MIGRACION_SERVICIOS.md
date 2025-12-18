# 🔄 Guía de Migración: Firebase y Cloudinary

Esta guía explica cómo migrar Firebase y Cloudinary a otra cuenta/correo.

---

## 📊 Resumen de Complejidad

| Servicio | Complejidad | Tiempo Estimado | Datos a Migrar |
|----------|-------------|-----------------|----------------|
| **Gmail SMTP** | ⭐ Fácil | 5-10 min | Ninguno (solo cambiar variables) |
| **Cloudinary** | ⭐⭐ Media | 2-4 horas | Imágenes y carpetas |
| **Firebase** | ⭐⭐⭐ Compleja | 4-8 horas | Base de datos completa |

---

## 📧 1. MIGRACIÓN DE GMAIL SMTP

### ✅ Fácil - 5-10 minutos

**Solo cambiar variables en `.env`:**

```env
# Cambiar estas 3 líneas:
GMAIL_USER=nuevo-email@ejemplo.com
GMAIL_APP_PASSWORD=nueva_app_password
INTERNAL_EMAIL=nuevo-email@ejemplo.com
```

**Pasos:**
1. Generar App Password en nueva cuenta Gmail (2-3 min)
2. Actualizar `.env` (1 min)
3. Reiniciar servidor (30 seg)
4. Probar (1-2 min)

**Total: ~5-10 minutos**

---

## 🖼️ 2. MIGRACIÓN DE CLOUDINARY

### ⚠️ Media - 2-4 horas

### Opción A: Migración Manual (Recomendada para pocas imágenes)

**Tiempo:** 2-3 horas

**Pasos:**

1. **Crear nueva cuenta Cloudinary** (5 min)
   - Ir a https://cloudinary.com
   - Crear cuenta con nuevo correo
   - Obtener nuevas credenciales:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`

2. **Crear Upload Preset** (5 min)
   - En Cloudinary Dashboard → Settings → Upload
   - Crear nuevo preset (ej: `gigs_upload_v2`)
   - Configurar igual que el anterior

3. **Descargar imágenes de cuenta antigua** (30-60 min)
   - Usar Cloudinary Admin API o Dashboard
   - Descargar todas las imágenes
   - Organizar por carpetas (`blog/`, `services/`)

4. **Subir imágenes a nueva cuenta** (1-2 horas)
   - Subir manteniendo estructura de carpetas
   - Verificar que todas se subieron correctamente

5. **Actualizar variables en `.env`** (1 min)
   ```env
   CLOUDINARY_CLOUD_NAME=nuevo_cloud_name
   CLOUDINARY_API_KEY=nueva_api_key
   CLOUDINARY_API_SECRET=nuevo_secret
   CLOUDINARY_UPLOAD_PRESET=gigs_upload_v2
   ```

6. **Actualizar URLs en Firebase** (30-60 min)
   - Las imágenes en Firebase tienen URLs de la cuenta antigua
   - Necesitas actualizar todas las referencias
   - Script de migración (ver abajo)

### Opción B: Script de Migración Automática

**Tiempo:** 1-2 horas (más rápido pero requiere código)

**Script de ejemplo:**

```javascript
// migrate-cloudinary.js
const cloudinary = require('cloudinary').v2;

// Configurar cuenta antigua
cloudinary.config({
  cloud_name: 'cuenta_antigua',
  api_key: 'key_antigua',
  api_secret: 'secret_antigua'
});

// Configurar cuenta nueva
const newCloudinary = require('cloudinary').v2;
newCloudinary.config({
  cloud_name: 'cuenta_nueva',
  api_key: 'key_nueva',
  api_secret: 'secret_nueva'
});

// Función para migrar una imagen
async function migrateImage(publicId) {
  // 1. Obtener URL de imagen antigua
  const oldUrl = cloudinary.url(publicId);
  
  // 2. Descargar imagen
  const response = await fetch(oldUrl);
  const buffer = await response.buffer();
  
  // 3. Subir a cuenta nueva
  const result = await newCloudinary.uploader.upload(buffer, {
    public_id: publicId,
    folder: publicId.includes('/') ? publicId.split('/')[0] : undefined
  });
  
  return result.secure_url;
}

// Migrar todas las imágenes
async function migrateAll() {
  // Obtener lista de todas las imágenes
  const { resources } = await cloudinary.search()
    .expression('resource_type:image')
    .max_results(500)
    .execute();
  
  for (const resource of resources) {
    console.log(`Migrando: ${resource.public_id}`);
    await migrateImage(resource.public_id);
  }
}
```

### ⚠️ Consideraciones Importantes:

- **URLs en Firebase:** Necesitas actualizar todas las URLs de imágenes en Firestore
- **Carpetas:** Mantener estructura (`blog/`, `services/`)
- **Public IDs:** Mantener los mismos `public_id` para facilitar migración
- **Costo:** Cloudinary tiene límite gratuito, verificar que no excedas

---

## 🔥 3. MIGRACIÓN DE FIREBASE

### ⚠️ Compleja - 4-8 horas

### Paso 1: Crear Nuevo Proyecto Firebase (10 min)

1. Ir a https://console.firebase.google.com
2. Crear nuevo proyecto con nuevo correo
3. Configurar:
   - Nombre del proyecto
   - Región
   - Plan (Blaze si necesitas funciones)

### Paso 2: Configurar Nuevo Proyecto (15 min)

1. **Habilitar servicios:**
   - Authentication
   - Firestore Database
   - Storage (si se usa)

2. **Configurar Firestore:**
   - Crear base de datos
   - Configurar reglas de seguridad (copiar del proyecto anterior)

3. **Configurar Authentication:**
   - Habilitar proveedores (Email/Password, etc.)
   - Configurar dominios autorizados

### Paso 3: Exportar Datos del Proyecto Antiguo (30-60 min)

**Opción A: Firebase Console (Manual)**
- Ir a Firestore → Exportar datos
- Descargar backup completo

**Opción B: Firebase CLI (Recomendado)**
```bash
# Instalar Firebase CLI
# Ya no se necesita Firebase CLI para hosting

# Login
firebase login

# Exportar Firestore
firebase firestore:export gs://bucket-name/backup

# Exportar Storage (si se usa)
gsutil -m cp -r gs://proyecto-antiguo.appspot.com gs://bucket-backup/
```

### Paso 4: Importar Datos al Nuevo Proyecto (1-2 horas)

**Firestore:**
```bash
# Importar Firestore
firebase firestore:import gs://bucket-name/backup --project=nuevo-proyecto-id
```

**Storage (si se usa):**
```bash
# Copiar archivos
gsutil -m cp -r gs://bucket-backup gs://nuevo-proyecto.appspot.com/
```

### Paso 5: Actualizar Credenciales en el Código (5 min)

**Archivo: `src/firebase.js`**

```javascript
const firebaseConfig = {
  apiKey: "NUEVA_API_KEY",
  authDomain: "nuevo-proyecto.firebaseapp.com",
  projectId: "nuevo-proyecto-id",
  storageBucket: "nuevo-proyecto.appspot.com",
  messagingSenderId: "NUEVO_SENDER_ID",
  appId: "NUEVO_APP_ID"
};
```

**Archivo: `.env` (si usas variables de entorno)**

```env
VITE_FIREBASE_API_KEY=nueva_api_key
VITE_FIREBASE_AUTH_DOMAIN=nuevo-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nuevo-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=nuevo-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=nuevo_sender_id
VITE_FIREBASE_APP_ID=nuevo_app_id
```

### Paso 6: Actualizar URLs de Cloudinary en Firebase (1-2 horas)

**Problema:** Las imágenes en Firestore tienen URLs de Cloudinary antigua

**Solución:** Script de actualización

```javascript
// update-cloudinary-urls.js
import { db } from './firebase.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Mapeo de URLs antiguas a nuevas
const urlMapping = {
  'https://res.cloudinary.com/cuenta-antigua/': 'https://res.cloudinary.com/cuenta-nueva/'
};

async function updateUrls() {
  // Obtener todas las noticias
  const newsRef = collection(db, 'news');
  const snapshot = await getDocs(newsRef);
  
  snapshot.forEach(async (docSnap) => {
    const data = docSnap.data();
    const updates = {};
    
    // Actualizar img_one
    if (data.img_one && data.img_one.includes('cuenta-antigua')) {
      updates.img_one = data.img_one.replace('cuenta-antigua', 'cuenta-nueva');
    }
    
    // Actualizar img_two
    if (data.img_two && data.img_two.includes('cuenta-antigua')) {
      updates.img_two = data.img_two.replace('cuenta-antigua', 'cuenta-nueva');
    }
    
    // Actualizar coverUrl
    if (data.coverUrl && data.coverUrl.includes('cuenta-antigua')) {
      updates.coverUrl = data.coverUrl.replace('cuenta-antigua', 'cuenta-nueva');
    }
    
    if (Object.keys(updates).length > 0) {
      await updateDoc(doc(db, 'news', docSnap.id), updates);
      console.log(`Actualizado: ${docSnap.id}`);
    }
  });
}
```

### Paso 7: Migrar Usuarios de Authentication (30-60 min)

**Opción A: Exportar/Importar (Firebase CLI)**
```bash
# Exportar usuarios
firebase auth:export users.json --project=proyecto-antiguo

# Importar usuarios
firebase auth:import users.json --project=nuevo-proyecto
```

**Opción B: Manual**
- Los usuarios tendrán que registrarse de nuevo
- O migrar manualmente desde Firebase Console

### Paso 8: Verificación y Pruebas (1-2 horas)

1. Verificar que todos los datos se importaron
2. Probar autenticación
3. Probar lectura/escritura de datos
4. Verificar que las imágenes se cargan correctamente
5. Probar formularios y funcionalidades

---

## 📋 Checklist Completo de Migración

### Gmail SMTP
- [ ] Nueva App Password generada
- [ ] Variables actualizadas en `.env`
- [ ] Servidor reiniciado
- [ ] Formularios probados

### Cloudinary
- [ ] Nueva cuenta creada
- [ ] Nuevo Upload Preset creado
- [ ] Imágenes descargadas de cuenta antigua
- [ ] Imágenes subidas a cuenta nueva
- [ ] Variables actualizadas en `.env`
- [ ] URLs actualizadas en Firebase (si aplica)

### Firebase
- [ ] Nuevo proyecto creado
- [ ] Servicios configurados (Auth, Firestore, Storage)
- [ ] Reglas de seguridad configuradas
- [ ] Datos exportados del proyecto antiguo
- [ ] Datos importados al proyecto nuevo
- [ ] Credenciales actualizadas en código
- [ ] URLs de Cloudinary actualizadas en Firestore
- [ ] Usuarios migrados (o plan para re-registro)
- [ ] Pruebas completadas

---

## ⏱️ Tiempo Total Estimado

| Escenario | Tiempo |
|-----------|--------|
| **Solo Gmail** | 5-10 min |
| **Gmail + Cloudinary** | 2-4 horas |
| **Gmail + Cloudinary + Firebase** | 6-12 horas |
| **Todo + Pruebas exhaustivas** | 1-2 días |

---

## 💡 Recomendaciones

1. **Hacer backup completo** antes de migrar
2. **Migrar en horario de bajo tráfico** (noche/fin de semana)
3. **Mantener cuenta antigua activa** durante período de transición
4. **Probar en ambiente de desarrollo** primero
5. **Documentar todos los cambios** realizados
6. **Comunicar a usuarios** si habrá downtime

---

## 🚨 Riesgos y Consideraciones

### Cloudinary
- ⚠️ URLs rotas si no se actualizan en Firebase
- ⚠️ Costos si excedes límite gratuito
- ⚠️ Tiempo de migración depende de cantidad de imágenes

### Firebase
- ⚠️ Downtime durante migración
- ⚠️ Usuarios pueden perder sesión
- ⚠️ URLs de imágenes pueden romperse
- ⚠️ Reglas de seguridad deben reconfigurarse

---

## 📞 Soporte

Si necesitas ayuda durante la migración:
1. Revisar logs del servidor
2. Verificar credenciales en `.env`
3. Probar endpoints individualmente
4. Consultar documentación oficial:
   - [Firebase Migration](https://firebase.google.com/docs/firestore/manage-data/export-import)
   - [Cloudinary Migration](https://cloudinary.com/documentation/admin_api)

---

**¿Preguntas?** Esta guía cubre los pasos principales. La complejidad real depende del volumen de datos que tengas.


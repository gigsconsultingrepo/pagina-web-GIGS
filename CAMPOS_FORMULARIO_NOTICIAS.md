# 📋 ANÁLISIS COMPLETO: CAMPOS DEL FORMULARIO Y BASE DE DATOS

## 🔍 RESUMEN EJECUTIVO

### Archivos analizados:
1. **`src/modules/news/views/adminNews.vue`** - Formulario de creación
2. **`src/modules/news/views/newsList.vue`** - Formulario de edición
3. **`src/modules/blog/views/blogComponent.vue`** - Vista de lista (usa campos)
4. **`src/modules/blog/views/blogDetail.vue`** - Vista de detalle (usa campos)

---

## 📝 CAMPOS DEL FORMULARIO DE CREACIÓN (`adminNews.vue`)

### Ubicación: `src/modules/news/views/adminNews.vue` (líneas 79-115)

| # | Campo | Tipo | Componente | Línea | Requerido | Observaciones |
|---|-------|------|------------|-------|-----------|---------------|
| 1 | **Título** | `String` | `v-text-field` | 82 | ❓ No validado | Campo: `title` |
| 2 | **Slug (URL)** | `String` | `v-text-field` | 83 | ❓ No validado | Campo: `slug` |
| 3 | **Estado** | `String` | `v-select` | 85-92 | ✅ Sí | Valores: `'draft'` o `'published'` |
| 4 | **Subir imagen** | `File` | `v-file-input` | 98-101 | ❌ No | Se sube a Cloudinary, guarda URL en `image` |
| 5 | **Contenido** | `String` | `v-textarea` | 105 | ❓ No validado | Campo: `content` (HTML) |

### ⚠️ PROBLEMA DETECTADO:
El formulario de creación **NO incluye** campos que el blog necesita:
- ❌ `excerpt` (resumen corto)
- ❌ `tags` (categorías)
- ❌ `author` (autor - se asigna automáticamente)
- ❌ `publishedAt` (fecha de publicación - se genera automáticamente)
- ❌ `img_one`, `img_two`, `coverUrl` (múltiples imágenes)

---

## ✏️ CAMPOS DEL FORMULARIO DE EDICIÓN (`newsList.vue`)

### Ubicación: `src/modules/news/views/newsList.vue` (líneas 292-317)

| # | Campo | Tipo | Componente | Línea | Requerido | Observaciones |
|---|-------|------|------------|-------|-----------|---------------|
| 1 | **Título** | `String` | `v-text-field` | 298 | ✅ Sí | Validación: requerido |
| 2 | **Slug** | `String` | `v-text-field` | 299-300 | ✅ Sí | Validación: formato `[a-z0-9-]+` |
| 3 | **Resumen** | `String` | `v-textarea` | 301 | ❌ No | Campo: `excerpt` |
| 4 | **Tags** | `String` | `v-text-field` | 302 | ❌ No | Separadas por coma, se convierte a Array |
| 5 | **Estado** | `String` | `v-select` | 303-306 | ✅ Sí | Valores: `'published'` o `'draft'` |

### ✅ El formulario de edición SÍ incluye campos que faltan en creación:
- ✅ `excerpt` (resumen)
- ✅ `tags` (array de strings)

---

## 💾 CAMPOS QUE SE GUARDAN EN LA BASE DE DATOS

### Al CREAR una noticia (`adminNews.vue` líneas 53-74):

```javascript
{
  title: string,           // ✅ Se guarda
  content: string,         // ✅ Se guarda (HTML)
  image: string,           // ✅ Se guarda (URL de Cloudinary)
  slug: string,            // ✅ Se guarda
  status: string,          // ✅ Se guarda ('draft' o 'published')
  createdAt: Timestamp,    // ✅ Se genera automáticamente
  updatedAt: Timestamp     // ✅ Se genera automáticamente
}
```

### Al EDITAR una noticia (`newsList.vue` líneas 103-129):

```javascript
{
  title: string,           // ✅ Se actualiza
  slug: string,            // ✅ Se actualiza
  excerpt: string,         // ✅ Se actualiza
  tags: Array<string>,     // ✅ Se actualiza (convierte CSV a Array)
  status: string,          // ✅ Se actualiza
  updatedAt: Timestamp     // ✅ Se genera automáticamente
}
```

---

## 📊 CAMPOS QUE USA EL BLOG PARA MOSTRAR

### Vista de LISTA (`blogComponent.vue`):
```javascript
post.title          // ✅ Usado (línea 164)
post.slug           // ✅ Usado (línea 178)
post.excerpt        // ✅ Usado (línea 173)
post.content        // ✅ Usado (línea 104 - para búsqueda)
post.tags           // ✅ Usado (líneas 106, 161)
post.status         // ✅ Usado (línea 26 - filtro)
post.publishedAt    // ✅ Usado (líneas 27, 167)
post.author         // ✅ Usado (línea 167)
post.img_one        // ✅ Usado (línea 157)
post.coverUrl       // ✅ Usado (línea 157 - fallback)
```

### Vista de DETALLE (`blogDetail.vue`):
```javascript
post.title          // ✅ Usado (línea 125)
post.slug           // ✅ Usado (línea 56 - búsqueda)
post.content        // ✅ Usado (línea 91, 133 - HTML sanitizado)
post.tags           // ✅ Usado (línea 122)
post.status         // ✅ Usado (líneas 46, 62, 74 - filtro)
post.publishedAt    // ✅ Usado (línea 128)
post.author         // ✅ Usado (línea 128)
post.img_one        // ✅ Usado (línea 117)
post.coverUrl       // ✅ Usado (línea 117 - fallback)
post.img_two        // ✅ Usado (línea 135)
```

---

## ⚠️ DISCREPANCIAS CRÍTICAS

### 1. Campos faltantes en el formulario de creación:

| Campo | Necesario para Blog | Se guarda en creación? | Se guarda en edición? |
|-------|---------------------|------------------------|----------------------|
| `excerpt` | ✅ Sí (lista) | ❌ NO | ✅ Sí |
| `tags` | ✅ Sí (filtros) | ❌ NO | ✅ Sí |
| `author` | ✅ Sí (mostrar) | ❌ NO | ❌ NO |
| `publishedAt` | ✅ Sí (ordenar) | ❌ NO | ❌ NO |
| `img_one` | ✅ Sí (portada) | ❌ NO (solo `image`) | ❌ NO |
| `img_two` | ✅ Sí (detalle) | ❌ NO | ❌ NO |
| `coverUrl` | ✅ Sí (fallback) | ❌ NO | ❌ NO |

### 2. Campos guardados que no coinciden con BD esperada:

| Campo en adminNews.vue | Campo esperado en BD | Estado |
|------------------------|---------------------|--------|
| `image` | `img_one`, `coverUrl` | ⚠️ Discrepancia |
| - | `img_two` | ❌ No existe |
| - | `excerpt` | ❌ No existe |
| - | `tags` | ❌ No existe |
| - | `author` | ❌ No existe |
| - | `publishedAt` | ❌ No existe |

---

## 📋 ESTRUCTURA COMPLETA DE LA BASE DE DATOS

### Colección: `news`

```javascript
{
  // ===== CAMPOS DE IDENTIFICACIÓN =====
  id: string,              // Auto-generado por Firestore
  
  // ===== CAMPOS DE TEXTO (requeridos) =====
  title: string,           // ✅ Título del artículo
  slug: string,            // ✅ URL amigable (único)
  excerpt: string,         // ⚠️ Resumen corto (falta en creación)
  content: string,         // ✅ Contenido completo (HTML)
  
  // ===== CAMPOS DE CATEGORIZACIÓN =====
  tags: Array<string>,     // ⚠️ Categorías/tags (falta en creación)
  status: string,          // ✅ 'published' | 'draft'
  
  // ===== CAMPOS DE IMÁGENES =====
  img_one: string,         // ⚠️ URL imagen portada (falta en creación)
  img_two: string,         // ⚠️ URL imagen apoyo (falta en creación)
  coverUrl: string,        // ⚠️ URL portada (duplicado) (falta en creación)
  image: string,           // ⚠️ Usado en adminNews.vue pero no coincide
  
  // ===== CAMPOS DE METADATOS =====
  author: string,          // ⚠️ Email del autor (falta en creación)
  publishedAt: Timestamp,  // ⚠️ Fecha de publicación (falta en creación)
  createdAt: Timestamp,    // ✅ Fecha de creación
  updatedAt: Timestamp,    // ✅ Fecha de última actualización
  
  // ===== CAMPOS OPCIONALES DE CLOUDINARY =====
  img_one_id: string,      // public_id de Cloudinary (opcional)
  img_two_id: string,      // public_id de Cloudinary (opcional)
}
```

---

## ✅ LISTA COMPLETA DE CAMPOS REQUERIDOS

### Campos que DEBE tener el formulario de creación:

1. ✅ **title** - Título (ya existe)
2. ✅ **slug** - Slug/URL (ya existe)
3. ⚠️ **excerpt** - Resumen corto (FALTA)
4. ✅ **content** - Contenido HTML (ya existe)
5. ⚠️ **tags** - Tags separadas por coma (FALTA)
6. ✅ **status** - Estado (ya existe)
7. ⚠️ **img_one** - Imagen portada (existe como `image`, pero debería ser `img_one` + `coverUrl`)
8. ⚠️ **img_two** - Imagen de apoyo (FALTA)
9. ⚠️ **author** - Se asigna automáticamente (debería agregarse)
10. ⚠️ **publishedAt** - Se genera automáticamente al publicar (FALTA)

---

## 🔧 RECOMENDACIONES

### 1. Actualizar `adminNews.vue` para incluir:
- Campo `excerpt` (resumen)
- Campo `tags` (separadas por coma)
- Campo `img_two` (imagen de apoyo)
- Cambiar `image` a `img_one` y agregar `coverUrl`
- Agregar `author` automáticamente desde `auth.currentUser.email`
- Agregar `publishedAt` cuando `status === 'published'`

### 2. Estructura de datos recomendada al guardar:

```javascript
{
  title: string,
  slug: string,
  excerpt: string,              // ← AGREGAR
  content: string,
  tags: Array<string>,          // ← AGREGAR
  status: 'published' | 'draft',
  author: string,               // ← AGREGAR (auth.currentUser?.email)
  publishedAt: Timestamp,       // ← AGREGAR (solo si status === 'published')
  img_one: string,              // ← CAMBIAR de 'image' a 'img_one'
  img_two: string,              // ← AGREGAR
  coverUrl: string,             // ← AGREGAR (duplicado de img_one)
  img_one_id: string,           // ← AGREGAR (public_id de Cloudinary)
  img_two_id: string,           // ← AGREGAR (public_id de Cloudinary)
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

---

## 📝 RESUMEN FINAL

### Campos del formulario actual:
- ✅ `title` (texto)
- ✅ `slug` (texto)
- ✅ `status` (select)
- ✅ `image` (file input)
- ✅ `content` (textarea)

### Campos que FALTAN en el formulario:
- ❌ `excerpt` (resumen)
- ❌ `tags` (categorías)
- ❌ `img_two` (imagen de apoyo)

### Campos que se generan automáticamente pero NO se están agregando:
- ❌ `author` (debería ser `auth.currentUser?.email`)
- ❌ `publishedAt` (debería ser `serverTimestamp()` cuando `status === 'published'`)

### Campos que NO coinciden con la estructura del blog:
- ⚠️ `image` (debería ser `img_one` + `coverUrl`)


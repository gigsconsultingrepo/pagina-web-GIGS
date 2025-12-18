# 🆕 Guía para Crear un Nuevo Repositorio en GitHub

## Pasos para Subir el Proyecto a un Repositorio Nuevo

### Paso 1: Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Click en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Completa el formulario:
   - **Repository name**: `GigsConsulting` (o el nombre que prefieras)
   - **Description**: "Sitio web corporativo de GIGS Consulting - Vue.js 3 + Firebase + Cloudinary"
   - **Visibility**: 
     - ✅ **Private** (recomendado si contiene información sensible)
     - ⚪ Public (si quieres que sea público)
   - ⚠️ **NO marques** "Initialize this repository with a README"
   - ⚠️ **NO marques** "Add .gitignore" (ya tienes uno)
   - ⚠️ **NO marques** "Choose a license"
4. Click en **"Create repository"**

### Paso 2: Preparar el Repositorio Local

#### Opción A: Si quieres mantener el historial de Git actual

```bash
# 1. Cambiar el remoto al nuevo repositorio
git remote set-url origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git

# 2. Verificar que se cambió correctamente
git remote -v
```

#### Opción B: Si quieres empezar desde cero (sin historial)

```bash
# 1. Eliminar el remoto actual
git remote remove origin

# 2. Agregar el nuevo remoto
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git

# 3. Verificar
git remote -v
```

### Paso 3: Asegurarse de que .env NO se Suba

**IMPORTANTE**: Verifica que `.env` esté en `.gitignore`:

```bash
# Verificar que .env está siendo ignorado
git check-ignore .env

# Si no muestra nada, verifica tu .gitignore
# Debe contener la línea: .env
```

Si `.env` ya estaba siendo rastreado, elimínalo del índice:

```bash
git rm --cached .env
```

### Paso 4: Agregar y Hacer Commit de los Archivos

```bash
# 1. Agregar todos los archivos (excepto los ignorados)
git add .

# 2. Verificar qué se va a subir (opcional)
git status

# 3. Hacer commit
git commit -m "Initial commit: Proyecto GIGS Consulting completo

- Frontend: Vue.js 3 + Vuetify + Vue Router + Vuex
- Backend: Express.js con Cloudinary y Nodemailer
- Firebase: Authentication + Firestore
- Sistema de módulos completo
- Panel de administración
- Formularios de contacto
- Gestión de servicios y noticias
- Documentación completa"
```

### Paso 5: Subir a GitHub

#### Si es la primera vez (rama main/master):

```bash
# Cambiar a rama main (si estás en otra rama)
git branch -M main

# Subir código
git push -u origin main
```

#### Si quieres subir a otra rama (ej: dev):

```bash
# Subir a la rama actual
git push -u origin dev

# O crear y subir una nueva rama main
git checkout -b main
git push -u origin main
```

### Paso 6: Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Verifica que todos los archivos estén ahí
3. **IMPORTANTE**: Verifica que `.env` y `.env.local` NO estén en el repositorio

## Comandos Completos (Copia y Pega)

Reemplaza `TU_USUARIO` y `NOMBRE_REPOSITORIO` con tus datos:

```bash
# 1. Cambiar remoto
git remote set-url origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git

# 2. Verificar remoto
git remote -v

# 3. Asegurar que .env no se suba
git rm --cached .env 2>$null

# 4. Agregar archivos
git add .

# 5. Commit
git commit -m "Initial commit: Proyecto GIGS Consulting completo"

# 6. Cambiar a main (opcional)
git branch -M main

# 7. Subir
git push -u origin main
```

## Solución de Problemas

### Error: "Repository not found"

- Verifica que el nombre del repositorio sea correcto
- Verifica que tengas permisos para escribir en el repositorio
- Asegúrate de estar autenticado en GitHub

### Error: "Authentication failed"

Necesitas autenticarte. Opciones:

**Opción 1: Personal Access Token (Recomendado)**

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click en "Generate new token (classic)"
3. Dale un nombre (ej: "GigsConsulting")
4. Selecciona el scope `repo` (todos los permisos)
5. Click en "Generate token"
6. **Copia el token** (solo se muestra una vez)
7. Cuando Git te pida contraseña, usa el token en lugar de tu contraseña

**Opción 2: Configurar SSH**

```bash
# 1. Generar clave SSH (si no tienes)
ssh-keygen -t ed25519 -C "tu-email@example.com"

# 2. Copiar la clave pública
cat ~/.ssh/id_ed25519.pub

# 3. Agregar a GitHub: Settings → SSH and GPG keys → New SSH key

# 4. Cambiar remoto a SSH
git remote set-url origin git@github.com:TU_USUARIO/NOMBRE_REPOSITORIO.git
```

### Error: "Updates were rejected"

Si el repositorio en GitHub tiene contenido inicial:

```bash
# Traer cambios del remoto
git pull origin main --allow-unrelated-histories

# Resolver conflictos si los hay, luego:
git add .
git commit -m "Merge con repositorio remoto"
git push origin main
```

### Verificar que archivos sensibles NO se suban

```bash
# Ver qué archivos .env hay
ls -la | findstr ".env"

# Verificar que están en .gitignore
git check-ignore .env .env.local

# Ver qué se va a subir
git ls-files | findstr ".env"
# No debe mostrar nada
```

## Archivos que NO se Subirán (Gracias a .gitignore)

✅ `node_modules/` - Dependencias de npm
✅ `.env` y `.env.local` - Variables de entorno (información sensible)
✅ `dist/` - Archivos compilados
✅ `.firebase/` - Archivos de Firebase Hosting
✅ Archivos del editor (`.vscode/`, `.idea/`)

## Después de Subir

1. **Crear archivo `.env.example`** (opcional pero recomendado):
   ```bash
   # Copiar .env como ejemplo (sin valores reales)
   cp .env .env.example
   # Editar .env.example y reemplazar valores reales con placeholders
   git add .env.example
   git commit -m "Agregar .env.example como plantilla"
   git push origin main
   ```

2. **Agregar README.md** (si quieres mejorarlo):
   - El proyecto ya tiene README.md
   - Puedes mejorarlo con badges, screenshots, etc.

3. **Configurar GitHub Pages** (si quieres):
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / folder: / (root)

---

**Nota Final**: Recuerda que los archivos `.env` y `.env.local` contienen información sensible (API keys, contraseñas de Gmail, etc.) y NO deben subirse nunca a GitHub. Tu `.gitignore` ya los excluye, pero siempre verifica antes de hacer push.


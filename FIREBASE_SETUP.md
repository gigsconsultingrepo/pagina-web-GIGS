# Configuración de Firebase Authentication

Este documento explica los pasos necesarios para configurar Firebase Authentication con todas las funcionalidades implementadas.

## Funcionalidades Implementadas

✅ **Inicio de sesión con email y contraseña**
✅ **Verificación de correo electrónico**
✅ **Recuperación de contraseña (Olvidé mi contraseña)**
✅ **Cerrar sesión**
✅ **Protección de rutas admin con verificación de correo**

## Pasos de Configuración en Firebase Console

### 1. Habilitar Authentication en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **gigs-web-c2967**
3. En el menú lateral, haz clic en **Authentication** (Autenticación)
4. Si es la primera vez, haz clic en **Comenzar** (Get Started)

### 2. Habilitar Método de Autenticación: Email/Password

1. En la pestaña **Sign-in method** (Métodos de inicio de sesión)
2. Haz clic en **Email/Password**
3. **Habilita** el primer toggle (Email/Password)
4. **Habilita** el segundo toggle (Email link - opcional, pero recomendado)
5. Haz clic en **Guardar** (Save)

### 3. Configurar Plantillas de Email (Opcional pero Recomendado)

1. En Authentication, ve a la pestaña **Templates** (Plantillas)
2. Configura las siguientes plantillas:

#### a) Email de Verificación
- **Subject (Asunto)**: "Verifica tu correo electrónico"
- **Body (Cuerpo)**: Puedes personalizar el mensaje, pero debe incluir el enlace `{{link}}`
- Ejemplo:
  ```
  Hola,
  
  Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:
  {{link}}
  
  Si no solicitaste esta verificación, puedes ignorar este correo.
  
  Saludos,
  Equipo GIGS
  ```

#### b) Email de Restablecimiento de Contraseña
- **Subject (Asunto)**: "Restablece tu contraseña"
- **Body (Cuerpo)**: Debe incluir el enlace `{{link}}`
- Ejemplo:
  ```
  Hola,
  
  Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:
  {{link}}
  
  Este enlace expirará en 1 hora.
  
  Si no solicitaste este cambio, puedes ignorar este correo.
  
  Saludos,
  Equipo GIGS
  ```

### 4. Configurar Dominios Autorizados

1. En Authentication, ve a **Settings** (Configuración)
2. Desplázate hasta **Authorized domains** (Dominios autorizados)
3. Asegúrate de que estos dominios estén incluidos:
   - `localhost` (ya debería estar)
   - `gigs-web-c2967.firebaseapp.com` (dominio de Firebase Auth)
   - Tu dominio de producción (cuando lo tengas)

### 5. Configurar Acción de URL Personalizada (Opcional)

Si quieres personalizar las URLs de redirección después de verificar el correo o restablecer la contraseña:

1. En **Settings** → **Action URL configuration**
2. Puedes configurar URLs personalizadas, pero por defecto Firebase redirige a tu aplicación

**Nota**: El código actual maneja las redirecciones automáticamente, así que esto es opcional.

### 6. Crear Usuario de Prueba (Opcional)

1. En Authentication, ve a la pestaña **Users** (Usuarios)
2. Haz clic en **Add user** (Agregar usuario)
3. Ingresa un email y contraseña
4. **IMPORTANTE**: Después de crear el usuario, haz clic en el usuario y luego en **Send email verification** para enviar el correo de verificación

## Configuración de Variables de Entorno

Asegúrate de que tu archivo `.env` (si lo usas) tenga las siguientes variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyBa5ZLb5bsBpHisvXWFpcr7GnyHyv1PVzw
VITE_FIREBASE_AUTH_DOMAIN=gigs-web-c2967.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gigs-web-c2967
VITE_FIREBASE_STORAGE_BUCKET=gigs-web-c2967.appspot.com
```

**Nota**: Estas variables ya están configuradas en `src/firebase.js`, así que no es necesario un archivo `.env` a menos que quieras cambiar la configuración.

## Flujo de Autenticación

### 1. Inicio de Sesión
- Usuario ingresa email y contraseña
- Si el correo no está verificado, se envía un correo de verificación y se redirige a `/verificar-correo`
- Si el correo está verificado, se permite el acceso al panel admin

### 2. Verificación de Correo
- Si el usuario intenta iniciar sesión sin verificar su correo, se redirige a `/verificar-correo`
- El usuario puede reenviar el correo de verificación
- Después de hacer clic en el enlace del correo, debe volver a la página y hacer clic en "Ya verifiqué mi correo"

### 3. Recuperación de Contraseña
- El usuario hace clic en "¿Olvidaste tu contraseña?"
- Ingresa su email
- Recibe un correo con un enlace para restablecer la contraseña
- Después de restablecer, puede iniciar sesión normalmente

### 4. Cerrar Sesión
- El usuario puede cerrar sesión desde el menú en el TopBar (icono de usuario)
- También puede cerrar sesión desde cualquier página admin

## Rutas Protegidas

Las siguientes rutas requieren autenticación y correo verificado:
- `/admin` - Dashboard principal
- `/admin/servicios` - Gestión de servicios
- `/admin/noticias` - Crear/editar noticias
- `/admin/noticias-lista` - Lista de noticias

La ruta `/verificar-correo` requiere autenticación pero NO requiere correo verificado (es donde se verifica).

## Pruebas Recomendadas

1. ✅ Crear un nuevo usuario y verificar que reciba el correo de verificación
2. ✅ Intentar acceder a `/admin` sin verificar el correo (debe redirigir a verificación)
3. ✅ Verificar el correo y acceder al panel admin
4. ✅ Probar "Olvidé mi contraseña" y verificar que funcione
5. ✅ Probar cerrar sesión y verificar que no se pueda acceder a rutas admin
6. ✅ Intentar acceder directamente a `/admin` sin estar autenticado (debe redirigir a login)

## Solución de Problemas

### El correo de verificación no llega
- Revisa la carpeta de spam
- Verifica que el método Email/Password esté habilitado
- Verifica que las plantillas de email estén configuradas
- Revisa los logs de Firebase Console en Authentication → Users

### Error "auth/email-already-in-use"
- El email ya está registrado. Usa "Olvidé mi contraseña" o inicia sesión directamente

### Error "auth/weak-password"
- La contraseña debe tener al menos 6 caracteres

### No se puede acceder a rutas admin después de verificar
- Limpia la caché del navegador
- Verifica que el correo esté realmente verificado en Firebase Console → Users

## Notas Importantes

⚠️ **Seguridad**: Asegúrate de que solo usuarios autorizados tengan acceso al panel admin. Considera implementar reglas de Firestore para proteger los datos.

⚠️ **Producción**: Cuando despliegues a producción, actualiza los dominios autorizados en Firebase Console.

⚠️ **Emails**: Los emails de Firebase pueden tardar unos minutos en llegar. Si no llegan, verifica la configuración de plantillas.


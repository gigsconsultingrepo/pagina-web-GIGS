# Configuración de Administradores

Este documento explica cómo configurar qué usuarios tienen permisos de administrador completo.

## Configuración Actual

Los permisos de administrador se configuran mediante una lista de emails en dos archivos:

1. **`src/modules/admin/views/AdminDashboard.vue`** - Controla qué opciones se muestran en el dashboard
2. **`src/router/index.js`** - Protege las rutas de administración

## Cómo Cambiar el Email del Admin

### Opción 1: Cambiar en ambos archivos manualmente

1. Abre `src/modules/admin/views/AdminDashboard.vue`
2. Busca la constante `ADMIN_EMAILS` (alrededor de la línea 8)
3. Cambia el email en el array:
   ```javascript
   const ADMIN_EMAILS = [
     'tu-email@ejemplo.com', // Cambia este email por el del admin real
   ]
   ```

4. Abre `src/router/index.js`
5. Busca la constante `ADMIN_EMAILS` (alrededor de la línea 148)
6. Cambia el email en el array de la misma forma:
   ```javascript
   const ADMIN_EMAILS = [
     'tu-email@ejemplo.com', // Debe ser el mismo email que en AdminDashboard.vue
   ]
   ```

### Opción 2: Agregar múltiples admins

Puedes agregar múltiples emails separados por comas:

```javascript
const ADMIN_EMAILS = [
  'admin1@ejemplo.com',
  'admin2@ejemplo.com',
  'superadmin@ejemplo.com'
]
```

## Permisos

### Usuario Admin (email en ADMIN_EMAILS)
- ✅ Puede ver "Gestionar servicios" en el dashboard
- ✅ Puede acceder a `/admin/servicios`
- ✅ Puede ver "Gestionar noticias" en el dashboard
- ✅ Puede acceder a `/admin/noticias` y `/admin/noticias-lista`

### Usuario Regular (email NO en ADMIN_EMAILS)
- ❌ NO puede ver "Gestionar servicios" en el dashboard
- ❌ NO puede acceder a `/admin/servicios` (será redirigido al dashboard)
- ✅ Puede ver "Gestionar noticias" en el dashboard
- ✅ Puede acceder a `/admin/noticias` y `/admin/noticias-lista`

## Notas Importantes

⚠️ **Seguridad**: Los emails se comparan de forma case-insensitive (no importa mayúsculas/minúsculas).

⚠️ **Sincronización**: Asegúrate de que la lista `ADMIN_EMAILS` sea idéntica en ambos archivos (`AdminDashboard.vue` y `router/index.js`).

⚠️ **Email Verificado**: El usuario debe tener su correo verificado en Firebase para acceder a cualquier ruta admin.

## Ejemplo de Uso

Si quieres que `mariana@gigsconsulting.com` sea el admin:

1. En `AdminDashboard.vue`:
   ```javascript
   const ADMIN_EMAILS = ['mariana@gigsconsulting.com']
   ```

2. En `router/index.js`:
   ```javascript
   const ADMIN_EMAILS = ['mariana@gigsconsulting.com']
   ```

Después de hacer estos cambios, reinicia el servidor de desarrollo para que los cambios surtan efecto.


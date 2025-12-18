# 📧 Configuración del Sistema de Email

Este proyecto usa **Nodemailer** con diferentes proveedores de email gratuitos para enviar emails desde los formularios. El sistema reemplaza EmailJS y es completamente gratuito.

## 🎯 Opciones de Proveedores Gratuitos

### Opción 1: Gmail SMTP (⭐ Recomendado)
- **Límite:** 500 emails/día (gratis)
- **Ventajas:**
  - Ya tienes cuenta Gmail
  - No requiere registro adicional
  - Funciona sin verificar dominio
  - Muy confiable
- **Desventajas:**
  - Requiere App Password (configuración adicional)
  - Límite diario de 500 emails

### Opción 2: SendGrid
- **Límite:** 100 emails/día gratis
- **Ventajas:**
  - Muy confiable
  - Buen dashboard
- **Desventajas:**
  - Límite diario más bajo
  - Requiere registro

---

## 🚀 Configuración Rápida con Gmail (Recomendado)

### Paso 1: Generar App Password de Gmail

### Paso 1: Generar App Password

1. Ve a tu cuenta de Google: https://myaccount.google.com
2. Activa la **Verificación en 2 pasos** (requerido)
3. Ve a **Seguridad** → **Contraseñas de aplicaciones**
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña generada (16 caracteres)

### Paso 2: Configurar variables de entorno

Agrega estas variables a tu archivo `.env` (backend):

```env
# Gmail SMTP
GMAIL_USER=bot.gigsconsulting@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Email de destino para notificaciones internas
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com

# Email desde el cual se envían (opcional)
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
```

### Paso 3: Reiniciar el servidor

```bash
npm run dev:api
```

¡Listo! Los formularios ahora enviarán emails a través de Gmail.

---

## 🔧 Configuración con SendGrid (Alternativa)

### Paso 1: Crear cuenta en SendGrid

1. Ve a https://sendgrid.com
2. Crea una cuenta gratuita
3. Verifica tu email
4. Ve a **Settings** → **API Keys**
5. Crea una nueva API Key con permisos de "Mail Send"
6. Copia la API Key

### Paso 2: Configurar variables de entorno

```env
# SendGrid API Key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx

# Email de destino para notificaciones internas
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com

# Email desde el cual se envían
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>
```

---

## 📝 Variables de Entorno Completas

Agrega estas variables a tu archivo `.env` en la raíz del proyecto:

```env
# ===== EMAIL CONFIGURATION =====
# Elige UNA de estas opciones:

# Opción 1: Gmail SMTP (Recomendado)
GMAIL_USER=bot.gigsconsulting@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Opción 2: SendGrid (Alternativa)
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx

# Email de destino para notificaciones internas
INTERNAL_EMAIL=bot.gigsconsulting@gmail.com

# Email desde el cual se envían (opcional)
EMAIL_FROM="GIGS Consulting" <bot.gigsconsulting@gmail.com>

# ===== OTRAS CONFIGURACIONES =====
# URL del backend (para producción, cambiar localhost:8787)
VITE_API_URL=http://localhost:8787
```

---

## 🧪 Probar el Sistema

### 1. Iniciar el servidor backend

```bash
npm run dev:api
```

Deberías ver:
```
Servidor en http://localhost:8787
```

### 2. Probar desde el frontend

1. Inicia el frontend: `npm run dev`
2. Ve a cualquier formulario (Contacto, Servicios, Retos)
3. Completa y envía el formulario
4. Verifica que recibas:
   - Email interno en `INTERNAL_EMAIL`
   - Email de confirmación al usuario

### 3. Verificar logs

Si hay errores, revisa la consola del servidor backend para ver mensajes de error detallados.

---

## 🔍 Solución de Problemas

### Error: "No hay configuración de email"

**Solución:** Asegúrate de tener al menos una de estas variables configuradas:
- `GMAIL_USER` y `GMAIL_APP_PASSWORD`
- `SENDGRID_API_KEY`

### Error: "Authentication failed" (Gmail)

**Solución:**
1. Verifica que la verificación en 2 pasos esté activada
2. Usa la App Password correcta (no tu contraseña normal)
3. Asegúrate de que no haya espacios extra en la App Password
4. Regenera la App Password si es necesario

### Error: "Invalid API Key" (SendGrid)

**Solución:**
1. Verifica que copiaste la API Key completa
2. Asegúrate de que no haya espacios al inicio/final
3. Regenera la API Key si es necesario

### Emails van a spam

**Solución:**
1. Agrega el email remitente a contactos
2. Revisa la configuración SPF/DKIM en tu dominio (si tienes dominio propio)
3. Usa un email profesional como remitente

---

## 📊 Comparación de Proveedores

| Proveedor | Límite Gratis | Configuración | Deliverability | Recomendado |
|-----------|---------------|---------------|----------------|-------------|
| **Gmail** | 500/día | ⭐⭐ Media | ⭐⭐ Buena | ✅ Sí |
| **SendGrid** | 100/día | ⭐⭐ Media | ⭐⭐⭐ Excelente | ⚠️ Límite bajo |

---

## 🎯 Recomendación Final

**Usa Gmail SMTP** porque:
- ✅ 500 emails/día es suficiente para la mayoría de proyectos
- ✅ No requiere registro adicional
- ✅ Funciona sin verificar dominio
- ✅ Muy confiable
- ✅ Ya tienes la cuenta

---

## 📚 Recursos Adicionales

- [Documentación de Nodemailer](https://nodemailer.com/about/)
- [Guía de App Passwords de Google](https://support.google.com/accounts/answer/185833)
- [Documentación de SendGrid](https://docs.sendgrid.com/)

---

## ✅ Checklist de Configuración

- [ ] App Password de Gmail generada
- [ ] Variables de entorno configuradas en `.env`
- [ ] `GMAIL_USER` y `GMAIL_APP_PASSWORD` configurados
- [ ] `INTERNAL_EMAIL` configurado
- [ ] Servidor backend reiniciado
- [ ] Formulario probado y funcionando
- [ ] Emails recibidos correctamente

---

**¿Necesitas ayuda?** Revisa los logs del servidor backend para mensajes de error detallados.


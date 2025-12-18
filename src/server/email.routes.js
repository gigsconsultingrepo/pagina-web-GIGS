// src/server/email.routes.js
import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

// Configuración del transporter
// Opción 1: Gmail SMTP (gratis - 500 emails/día)
// Opción 2: SendGrid (gratis - 100 emails/día)

const createTransporter = () => {
  // PRIORIDAD 1: Si tienes GMAIL_USER y GMAIL_APP_PASSWORD, usar Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }
  
  // PRIORIDAD 2: Si tienes SENDGRID_API_KEY, usar SendGrid
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
  
  throw new Error('No hay configuración de email. Configura GMAIL_USER/GMAIL_APP_PASSWORD o SENDGRID_API_KEY');
};

// Email de destino para notificaciones internas
const INTERNAL_EMAIL = process.env.INTERNAL_EMAIL || 'bot.gigsconsulting@gmail.com';

// Función para formatear el email interno según el tipo de formulario
const formatInternalEmail = (formType, data) => {
  let subject = '';
  let html = '';
  
  switch (formType) {
    case 'Contacto':
      subject = `Nuevo mensaje de contacto - ${data.name || 'Sin nombre'}`;
      html = `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name || 'No proporcionado'}</p>
        <p><strong>Empresa:</strong> ${data.company || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${data.email || 'No proporcionado'}</p>
        <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${data.subject || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Puedes responder directamente a: ${data.email || 'N/A'}</small></p>
      `;
      break;
      
    case 'Servicios':
      subject = `Nueva solicitud de cotización - ${data.name || 'Sin nombre'}`;
      html = `
        <h2>Nueva solicitud de cotización de servicios</h2>
        <p><strong>Nombre:</strong> ${data.name || 'No proporcionado'}</p>
        <p><strong>Empresa:</strong> ${data.company || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${data.email || 'No proporcionado'}</p>
        <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
        <p><strong>Tipo de Proyecto:</strong> ${data.projectType || 'No especificado'}</p>
        <p><strong>Presupuesto Estimado:</strong> ${data.budget || 'No especificado'}</p>
        <p><strong>Timeline Deseado:</strong> ${data.timeline || 'No especificado'}</p>
        <p><strong>Descripción del Proyecto:</strong></p>
        <p>${(data.projectDesc || '').replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Puedes responder directamente a: ${data.email || 'N/A'}</small></p>
      `;
      break;
      
    case 'Reto':
      subject = `Nuevo reto recibido - ${data.name || 'Sin nombre'}`;
      html = `
        <h2>Nuevo reto recibido</h2>
        <p><strong>Nombre:</strong> ${data.name || 'No proporcionado'}</p>
        <p><strong>Empresa:</strong> ${data.company || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${data.email || 'No proporcionado'}</p>
        <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
        <p><strong>Título del Reto:</strong> ${data.title || 'No proporcionado'}</p>
        <p><strong>Presupuesto Estimado:</strong> ${data.budget || 'No especificado'}</p>
        <p><strong>Timeline Deseado:</strong> ${data.timeline || 'No especificado'}</p>
        <p><strong>Descripción Detallada:</strong></p>
        <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Puedes responder directamente a: ${data.email || 'N/A'}</small></p>
      `;
      break;
      
    default:
      subject = `Nuevo formulario - ${data.name || 'Sin nombre'}`;
      html = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
  
  return { subject, html };
};

// Función para formatear el email de confirmación al usuario
const formatConfirmationEmail = (formType, data) => {
  let subject = '';
  let html = '';
  
  switch (formType) {
    case 'Contacto':
      subject = 'Gracias por contactarnos - GIGS Consulting';
      html = `
        <h2>¡Hola ${data.name}!</h2>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <p><strong>Resumen de tu mensaje:</strong></p>
        <ul>
          <li><strong>Asunto:</strong> ${data.subject || 'No especificado'}</li>
          <li><strong>Mensaje:</strong> ${(data.message || '').substring(0, 200)}${data.message?.length > 200 ? '...' : ''}</li>
        </ul>
        <p>Si tienes alguna pregunta urgente, no dudes en contactarnos directamente.</p>
        <hr>
        <p><small>Este es un correo automático, por favor no respondas a este mensaje.</small></p>
        <p><small>GIGS Consulting</small></p>
      `;
      break;
      
    case 'Servicios':
      subject = 'Solicitud de cotización recibida - GIGS Consulting';
      html = `
        <h2>¡Hola ${data.name}!</h2>
        <p>Hemos recibido tu solicitud de cotización. Nuestro equipo la está revisando y te contactaremos pronto con una propuesta personalizada.</p>
        <p><strong>Detalles de tu solicitud:</strong></p>
        <ul>
          <li><strong>Tipo de Proyecto:</strong> ${data.projectType || 'No especificado'}</li>
          <li><strong>Presupuesto Estimado:</strong> ${data.budget || 'No especificado'}</li>
          <li><strong>Timeline Deseado:</strong> ${data.timeline || 'No especificado'}</li>
        </ul>
        <p>Mientras tanto, si tienes alguna pregunta, no dudes en contactarnos.</p>
        <hr>
        <p><small>Este es un correo automático, por favor no respondas a este mensaje.</small></p>
        <p><small>GIGS Consulting</small></p>
      `;
      break;
      
    case 'Reto':
      subject = 'Tu reto ha sido recibido - GIGS Consulting';
      html = `
        <h2>¡Hola ${data.name}!</h2>
        <p>Hemos recibido tu reto y estamos emocionados de trabajar contigo. Nuestro equipo lo está analizando y te contactaremos pronto.</p>
        <p><strong>Resumen de tu reto:</strong></p>
        <ul>
          <li><strong>Título:</strong> ${data.title || 'No especificado'}</li>
          <li><strong>Presupuesto Estimado:</strong> ${data.budget || 'No especificado'}</li>
          <li><strong>Timeline Deseado:</strong> ${data.timeline || 'No especificado'}</li>
        </ul>
        <p>¡Gracias por confiar en nosotros!</p>
        <hr>
        <p><small>Este es un correo automático, por favor no respondas a este mensaje.</small></p>
        <p><small>GIGS Consulting</small></p>
      `;
      break;
      
    default:
      subject = 'Gracias por contactarnos - GIGS Consulting';
      html = `<p>Hemos recibido tu mensaje y te contactaremos pronto.</p>`;
  }
  
  return { subject, html };
};

// Endpoint para enviar emails
router.post("/email/send", async (req, res) => {
  try {
    const { formType, data, sendConfirmation = true } = req.body;
    
    if (!formType || !data) {
      return res.status(400).json({
        error: "Se requiere formType y data"
      });
    }
    
    const transporter = createTransporter();
    
    // Email interno a GIGS
    const internalEmail = formatInternalEmail(formType, data);
    
    // Determinar email remitente
    let fromEmail = process.env.EMAIL_FROM;
    
    // Si estamos usando Gmail, usar el email de Gmail como remitente
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      if (!fromEmail || !fromEmail.includes(process.env.GMAIL_USER)) {
        fromEmail = `"GIGS Consulting" <${process.env.GMAIL_USER}>`;
      }
    }
    // Si estamos usando SendGrid, usar el email configurado o el INTERNAL_EMAIL
    else if (process.env.SENDGRID_API_KEY) {
      fromEmail = fromEmail || `"GIGS Consulting" <${INTERNAL_EMAIL}>`;
    }
    // Fallback: usar INTERNAL_EMAIL
    else {
      fromEmail = fromEmail || `"GIGS Consulting" <${INTERNAL_EMAIL}>`;
    }
    
    await transporter.sendMail({
      from: fromEmail,
      to: INTERNAL_EMAIL,
      replyTo: data.email || INTERNAL_EMAIL,
      subject: internalEmail.subject,
      html: internalEmail.html
    });
    
    // Email de confirmación al usuario (si está habilitado)
    if (sendConfirmation && data.email) {
      const confirmationEmail = formatConfirmationEmail(formType, data);
      
      await transporter.sendMail({
        from: fromEmail,
        to: data.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html
      });
    }
    
    res.json({
      success: true,
      message: "Emails enviados correctamente"
    });
    
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({
      error: "Error al enviar email",
      message: error.message
    });
  }
});

export default router;


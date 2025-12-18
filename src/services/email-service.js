// src/services/email-service.js
import axios from 'axios'

// En desarrollo, usar el proxy de Vite. En producción, usar VITE_API_URL o la URL completa
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:8787')

/**
 * Envía un email a través del backend
 * @param {string} formType - Tipo de formulario: 'Contacto', 'Servicios', 'Reto'
 * @param {object} data - Datos del formulario
 * @param {boolean} sendConfirmation - Si se envía email de confirmación al usuario (default: true)
 * @returns {Promise<object>}
 */
export const sendEmail = async (formType, data, sendConfirmation = true) => {
  try {
    const response = await axios.post(`${API_URL}/api/email/send`, {
      formType,
      data,
      sendConfirmation
    })
    return response.data
  } catch (error) {
    console.error('Error al enviar email:', error)
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Error al enviar el formulario. Por favor, intenta de nuevo.'
    )
  }
}

/**
 * Envía email de contacto
 */
export const sendContactEmail = async (formData) => {
  return sendEmail('Contacto', {
    name: formData.fullName,
    company: formData.company,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    message: formData.message
  })
}

/**
 * Envía email de servicios
 */
export const sendServicesEmail = async (formData) => {
  return sendEmail('Servicios', {
    name: formData.fullName,
    company: formData.company,
    email: formData.email,
    phone: formData.phone,
    projectType: formData.projectType,
    projectDesc: formData.projectDesc,
    budget: formData.budget,
    timeline: formData.timeline
  })
}

/**
 * Envía email de reto
 */
export const sendChallengeEmail = async (formData) => {
  return sendEmail('Reto', {
    name: formData.fullName,
    company: formData.company,
    email: formData.email,
    phone: formData.phone,
    title: formData.challengeTitle,
    message: formData.description,
    budget: formData.budget,
    timeline: formData.timeline
  })
}


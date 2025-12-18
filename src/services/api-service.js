// src/services/api-service.js
/**
 * Servicio centralizado para la URL del backend API
 * En desarrollo: usa el proxy de Vite (vacío)
 * En producción: usa VITE_API_URL o la URL configurada
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:8787')

/**
 * Construye la URL completa para un endpoint del API
 * @param {string} endpoint - Endpoint del API (ej: '/api/media/sign')
 * @returns {string} URL completa
 */
export const getApiUrl = (endpoint) => {
  // Si endpoint ya incluye el dominio completo, retornarlo tal cual
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint
  }
  
  // Asegurar que el endpoint empiece con /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  return `${API_BASE_URL}${cleanEndpoint}`
}


/**
 * ==============================================
 * UTILIDADES DE FORMATEO
 * Funciones puras para formateo de datos
 * 
 * Principios aplicados:
 * - Pure Functions: Sin efectos secundarios
 * - Single Responsibility: Una función, una tarea
 * - DRY: Reutilizables en toda la aplicación
 * ==============================================
 */

/**
 * Formatea un valor numérico como moneda mexicana (MXN)
 * @param value - Valor numérico a formatear
 * @returns String formateado como moneda
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formatea distancia en kilómetros
 * @param km - Distancia en kilómetros
 * @returns String formateado con unidad
 */
export function formatDistance(km: number): string {
  if (km >= 1000) {
    return `${(km / 1000).toFixed(1).replace('.', ',')} mil km`
  }
  return `${km.toLocaleString('es-MX')} km`
}

/**
 * Formatea peso en toneladas
 * @param tons - Peso en toneladas
 * @returns String formateado con unidad
 */
export function formatWeight(tons: number): string {
  if (tons < 1) {
    return `${(tons * 1000).toFixed(0)} kg`
  }
  return `${tons.toLocaleString('es-MX', { maximumFractionDigits: 1 })} ton`
}

/**
 * Formatea una fecha en formato legible
 * @param dateString - Fecha en formato ISO
 * @returns String formateado
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/**
 * Formatea una fecha de forma relativa (hace X tiempo)
 * @param dateString - Fecha en formato ISO
 * @returns String con tiempo relativo
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'semana', seconds: 604800 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      const plural = count !== 1 ? (interval.label === 'mes' ? 'es' : 's') : ''
      return `hace ${count} ${interval.label}${plural}`
    }
  }

  return 'hace un momento'
}

/**
 * Formatea un número de teléfono mexicano
 * @param phone - Número de teléfono
 * @returns String formateado
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

/**
 * Genera un slug a partir de un texto
 * @param text - Texto a convertir
 * @returns Slug URL-friendly
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param text - Texto a capitalizar
 * @returns Texto capitalizado
 */
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Trunca un texto a una longitud máxima
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado con ellipsis si es necesario
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trim() + '...'
}

/**
 * Mapea tipo de vehículo a etiqueta legible
 */
export function getVehicleLabel(type: string): string {
  const labels: Record<string, string> = {
    camion_3_5: 'Camión 3.5 ton',
    camion_torton: 'Camión Tortón',
    trailer: 'Tráiler',
    rabon: 'Rabón',
    camioneta: 'Camioneta',
  }
  return labels[type] || type
}

/**
 * Mapea tipo de carrocería a etiqueta legible
 */
export function getBodyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    caja_seca: 'Caja Seca',
    plataforma: 'Plataforma',
    refrigerado: 'Refrigerado',
    tanque: 'Tanque',
    tolva: 'Tolva',
  }
  return labels[type] || type
}

/**
 * Mapea estado de flete a etiqueta y color
 */
export function getStatusInfo(status: string): { label: string; color: string } {
  const statusMap: Record<string, { label: string; color: string }> = {
    available: { label: 'Disponible', color: 'success' },
    in_progress: { label: 'En Progreso', color: 'warning' },
    completed: { label: 'Completado', color: 'muted' },
    cancelled: { label: 'Cancelado', color: 'destructive' },
  }
  return statusMap[status] || { label: status, color: 'muted' }
}

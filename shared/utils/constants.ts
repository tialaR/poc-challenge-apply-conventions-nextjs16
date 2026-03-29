/**
 * ==============================================
 * CONSTANTES GLOBALES
 * Valores constantes usados en toda la aplicación
 * 
 * Principios aplicados:
 * - KISS: Valores simples y claros
 * - DRY: Definidos una vez, usados en todas partes
 * ==============================================
 */

/**
 * Configuración de la aplicación
 */
export const APP_CONFIG = {
  name: 'Flete.com',
  description: 'El marketplace de fletes más grande de México',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://flete.com',
  defaultLocale: 'es-MX',
  currency: 'MXN',
} as const

/**
 * Configuración de paginación
 */
export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 50,
  defaultPage: 1,
} as const

/**
 * Estados de México para filtros
 */
export const MEXICAN_STATES = [
  { value: 'AGU', label: 'Aguascalientes' },
  { value: 'BCN', label: 'Baja California' },
  { value: 'BCS', label: 'Baja California Sur' },
  { value: 'CAM', label: 'Campeche' },
  { value: 'CHP', label: 'Chiapas' },
  { value: 'CHH', label: 'Chihuahua' },
  { value: 'COA', label: 'Coahuila' },
  { value: 'COL', label: 'Colima' },
  { value: 'CMX', label: 'Ciudad de México' },
  { value: 'DUR', label: 'Durango' },
  { value: 'GUA', label: 'Guanajuato' },
  { value: 'GRO', label: 'Guerrero' },
  { value: 'HID', label: 'Hidalgo' },
  { value: 'JAL', label: 'Jalisco' },
  { value: 'MEX', label: 'Estado de México' },
  { value: 'MIC', label: 'Michoacán' },
  { value: 'MOR', label: 'Morelos' },
  { value: 'NAY', label: 'Nayarit' },
  { value: 'NLE', label: 'Nuevo León' },
  { value: 'OAX', label: 'Oaxaca' },
  { value: 'PUE', label: 'Puebla' },
  { value: 'QUE', label: 'Querétaro' },
  { value: 'ROO', label: 'Quintana Roo' },
  { value: 'SLP', label: 'San Luis Potosí' },
  { value: 'SIN', label: 'Sinaloa' },
  { value: 'SON', label: 'Sonora' },
  { value: 'TAB', label: 'Tabasco' },
  { value: 'TAM', label: 'Tamaulipas' },
  { value: 'TLA', label: 'Tlaxcala' },
  { value: 'VER', label: 'Veracruz' },
  { value: 'YUC', label: 'Yucatán' },
  { value: 'ZAC', label: 'Zacatecas' },
] as const

/**
 * Tipos de vehículos disponibles
 */
export const VEHICLE_TYPES = [
  { value: 'camion_3_5', label: 'Camión 3.5 ton' },
  { value: 'camion_torton', label: 'Camión Tortón' },
  { value: 'trailer', label: 'Tráiler' },
  { value: 'rabon', label: 'Rabón' },
  { value: 'camioneta', label: 'Camioneta' },
] as const

/**
 * Tipos de carrocería disponibles
 */
export const BODY_TYPES = [
  { value: 'caja_seca', label: 'Caja Seca' },
  { value: 'plataforma', label: 'Plataforma' },
  { value: 'refrigerado', label: 'Refrigerado' },
  { value: 'tanque', label: 'Tanque' },
  { value: 'tolva', label: 'Tolva' },
] as const

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  home: '/',
  freights: '/fletes',
  freightDetail: (slug: string, id: string) => `/fletes/${slug}/${id}`,
  login: '/iniciar-sesion',
  signup: '/registro',
  profile: '/perfil',
  about: '/nosotros',
  contact: '/contacto',
  terms: '/terminos-de-uso',
  privacy: '/politica-de-privacidad',
} as const

/**
 * Claves de almacenamiento
 */
export const STORAGE_KEYS = {
  authToken: 'flete_auth_token',
  user: 'flete_user',
  preferences: 'flete_preferences',
  recentSearches: 'flete_recent_searches',
} as const

/**
 * Eventos de Analytics
 */
export const ANALYTICS_EVENTS = {
  // Autenticación
  LOGIN_START: 'login_start',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_ERROR: 'login_error',
  SIGNUP_START: 'signup_start',
  SIGNUP_SUCCESS: 'signup_success',
  SIGNUP_ERROR: 'signup_error',
  LOGOUT: 'logout',
  
  // Navegación
  PAGE_VIEW: 'page_view',
  FREIGHT_VIEW: 'freight_view',
  FREIGHT_SEARCH: 'freight_search',
  FREIGHT_FILTER: 'freight_filter',
  
  // Interacciones
  FREIGHT_INTEREST: 'freight_interest',
  FREIGHT_SHARE: 'freight_share',
  CONTACT_SUBMIT: 'contact_submit',
  PROFILE_UPDATE: 'profile_update',
} as const

/**
 * Códigos de error
 */
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const

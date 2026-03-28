/**
 * ==============================================
 * TIPOS GLOBALES COMPARTIDOS
 * Definiciones de tipos usados en toda la aplicación
 * 
 * Principios aplicados:
 * - Single Responsibility: Cada tipo tiene una responsabilidad clara
 * - Interface Segregation: Interfaces pequeñas y específicas
 * ==============================================
 */

// ==================== ENUMS ====================

/**
 * Estados de carga para operaciones asíncronas
 * Usado para controlar estados de UI durante fetching
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Estados posibles de un flete
 */
export type FreightStatus = 'available' | 'in_progress' | 'completed' | 'cancelled'

/**
 * Tipos de vehículos disponibles
 */
export type VehicleType = 
  | 'camion_3_5' 
  | 'camion_torton' 
  | 'trailer' 
  | 'rabon' 
  | 'camioneta'

/**
 * Tipos de carrocería
 */
export type BodyType = 
  | 'caja_seca' 
  | 'plataforma' 
  | 'refrigerado' 
  | 'tanque' 
  | 'tolva'

// ==================== INTERFACES ====================

/**
 * Dirección con información geográfica
 */
export interface Address {
  city: string
  state: string
  postalCode?: string
  fullAddress?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

/**
 * Información de contacto
 */
export interface ContactInfo {
  name: string
  phone: string
  email?: string
  whatsapp?: string
}

/**
 * Entidad Flete - modelo principal del negocio
 */
export interface Freight {
  id: string
  slug: string
  title: string
  description: string
  origin: Address
  destination: Address
  vehicleType: VehicleType
  bodyType: BodyType
  weight: number // en toneladas
  price: number // en MXN
  distance: number // en km
  status: FreightStatus
  publishedAt: string
  expiresAt: string
  shipper: {
    id: string
    name: string
    rating: number
    totalShipments: number
    verified: boolean
    avatar?: string
  }
  requirements?: string[]
  tags?: string[]
}

/**
 * Usuario autenticado
 */
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  role: 'shipper' | 'trucker' | 'admin'
  verified: boolean
  createdAt: string
  preferences?: UserPreferences
}

/**
 * Preferencias del usuario
 */
export interface UserPreferences {
  notifications: boolean
  newsletter: boolean
  language: 'es' | 'en'
  currency: 'MXN' | 'USD'
}

/**
 * Sesión de autenticación
 */
export interface AuthSession {
  user: User | null
  token: string | null
  expiresAt: string | null
  isAuthenticated: boolean
}

/**
 * Filtros para búsqueda de fletes
 */
export interface FreightFilters {
  originState?: string
  destinationState?: string
  vehicleType?: VehicleType
  bodyType?: BodyType
  minPrice?: number
  maxPrice?: number
  minWeight?: number
  maxWeight?: number
}

/**
 * Respuesta paginada genérica
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

/**
 * Resultado de acción del servidor
 */
export interface ActionResult<T = void> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    field?: string
  }
}

/**
 * Evento de Analytics
 */
export interface AnalyticsEvent {
  name: string
  category: string
  action: string
  label?: string
  value?: number
  metadata?: Record<string, unknown>
}

/**
 * Métricas de Web Vitals
 */
export interface WebVitalMetric {
  id: string
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

// ==================== TYPE GUARDS ====================

/**
 * Type guard para verificar si un objeto es un Freight válido
 */
export function isFreight(obj: unknown): obj is Freight {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'slug' in obj &&
    'origin' in obj &&
    'destination' in obj
  )
}

/**
 * Type guard para verificar si un usuario está autenticado
 */
export function isAuthenticated(session: AuthSession): session is AuthSession & { user: User } {
  return session.isAuthenticated && session.user !== null
}

// ==================== UTILITY TYPES ====================

/**
 * Hace opcionales todas las propiedades de un tipo
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Extrae el tipo de un array
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

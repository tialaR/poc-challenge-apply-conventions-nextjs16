/**
 * ==============================================
 * TIPOS GLOBAIS DA APLICAÇÃO
 * Define os tipos compartilhados entre módulos
 * ==============================================
 */

/* =====================
   TIPOS DE FRETE
   ===================== */

/**
 * Representa um frete disponível na plataforma
 * Contém todas as informações necessárias para exibição e negociação
 */
export interface Freight {
  id: string
  slug: string
  title: string
  description: string
  origin: Location
  destination: Location
  distance: number // em km
  price: number // em centavos
  vehicleType: VehicleType
  bodyType: BodyType
  weight: number // em kg
  status: FreightStatus
  createdAt: string
  expiresAt: string
  shipper: Shipper
}

/**
 * Localização com coordenadas e informações de endereço
 */
export interface Location {
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
  address?: string
}

/**
 * Tipos de veículos disponíveis para transporte
 */
export type VehicleType = 
  | 'truck' 
  | 'van' 
  | 'trailer' 
  | 'bitruck' 
  | 'carreta'

/**
 * Tipos de carroceria disponíveis
 */
export type BodyType = 
  | 'open' 
  | 'closed' 
  | 'refrigerated' 
  | 'tank' 
  | 'flatbed' 
  | 'sider'

/**
 * Status possíveis de um frete
 */
export type FreightStatus = 
  | 'available' 
  | 'negotiating' 
  | 'assigned' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled'

/* =====================
   TIPOS DE EMBARCADOR
   ===================== */

/**
 * Informações do embarcador (quem oferece o frete)
 */
export interface Shipper {
  id: string
  name: string
  company: string
  rating: number
  totalFreights: number
  phone?: string
  email?: string
  avatar?: string
}

/* =====================
   TIPOS DE TRANSPORTADOR
   ===================== */

/**
 * Informações do transportador (motorista/empresa)
 */
export interface Trucker {
  id: string
  name: string
  document: string // CPF ou CNPJ
  phone: string
  email: string
  avatar?: string
  rating: number
  completedTrips: number
  vehicleType: VehicleType
  bodyType: BodyType
  isVerified: boolean
  createdAt: string
}

/* =====================
   TIPOS DE FILTROS
   ===================== */

/**
 * Parâmetros de filtro para busca de fretes
 */
export interface FreightFilters {
  originState?: string
  originCity?: string
  destinationState?: string
  destinationCity?: string
  vehicleType?: VehicleType
  bodyType?: BodyType
  minPrice?: number
  maxPrice?: number
  maxDistance?: number
  radius?: number
}

/* =====================
   TIPOS DE PAGINAÇÃO
   ===================== */

/**
 * Resposta paginada genérica da API
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

/* =====================
   TIPOS DE API
   ===================== */

/**
 * Resposta padrão da API
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

/* =====================
   TIPOS DE AUTENTICAÇÃO
   ===================== */

/**
 * Sessão do usuário autenticado
 */
export interface UserSession {
  id: string
  name: string
  email: string
  role: 'shipper' | 'trucker' | 'admin'
  avatar?: string
}

/* =====================
   MAPEAMENTOS DE LABELS
   ===================== */

/**
 * Labels amigáveis para tipos de veículos
 */
export const vehicleTypeLabels: Record<VehicleType, string> = {
  truck: 'Caminhão',
  van: 'Van',
  trailer: 'Reboque',
  bitruck: 'Bitruck',
  carreta: 'Carreta',
}

/**
 * Labels amigáveis para tipos de carroceria
 */
export const bodyTypeLabels: Record<BodyType, string> = {
  open: 'Aberta',
  closed: 'Fechada',
  refrigerated: 'Refrigerada',
  tank: 'Tanque',
  flatbed: 'Prancha',
  sider: 'Sider',
}

/**
 * Labels amigáveis para status de frete
 */
export const freightStatusLabels: Record<FreightStatus, string> = {
  available: 'Disponível',
  negotiating: 'Em negociação',
  assigned: 'Atribuído',
  in_transit: 'Em trânsito',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

/**
 * Cores para status de frete (para badges)
 */
export const freightStatusColors: Record<FreightStatus, string> = {
  available: 'bg-success text-success-foreground',
  negotiating: 'bg-warning text-warning-foreground',
  assigned: 'bg-primary text-primary-foreground',
  in_transit: 'bg-accent text-accent-foreground',
  delivered: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
}

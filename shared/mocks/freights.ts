/**
 * ==============================================
 * DATOS MOCK - FLETES
 * Datos simulados para desarrollo y pruebas
 * 
 * Nota: En producción, estos datos vendrían de la API
 * ==============================================
 */

import type { Freight, User } from '@/shared/types'

/**
 * Usuario de prueba para simulación de autenticación
 */
export const mockUsers: User[] = [
  {
    id: 'usr_001',
    email: 'juan.perez@email.com',
    name: 'Juan Pérez García',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    phone: '+52 55 1234 5678',
    role: 'trucker',
    verified: true,
    createdAt: '2024-01-15T10:00:00Z',
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'es',
      currency: 'MXN',
    },
  },
  {
    id: 'usr_002',
    email: 'maria.lopez@empresa.mx',
    name: 'María López Hernández',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    phone: '+52 81 9876 5432',
    role: 'shipper',
    verified: true,
    createdAt: '2023-11-20T14:30:00Z',
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'es',
      currency: 'MXN',
    },
  },
]

/**
 * Fletes mock para desarrollo
 */
export const mockFreights: Freight[] = [
  {
    id: 'flt_001',
    slug: 'carga-general-cdmx-guadalajara',
    title: 'Carga General CDMX a Guadalajara',
    description: 'Transporte de mercancía general en cajas selladas. Se requiere vehículo con caja seca y operador con experiencia en rutas federales. Carga y descarga incluida en destino.',
    origin: {
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '06600',
      fullAddress: 'Av. Reforma 222, Col. Juárez',
      coordinates: { lat: 19.4326, lng: -99.1332 },
    },
    destination: {
      city: 'Guadalajara',
      state: 'JAL',
      postalCode: '44100',
      fullAddress: 'Av. Vallarta 3233, Col. Vallarta',
      coordinates: { lat: 20.6597, lng: -103.3496 },
    },
    vehicleType: 'camion_torton',
    bodyType: 'caja_seca',
    weight: 8.5,
    price: 18500,
    distance: 540,
    status: 'available',
    publishedAt: '2026-03-27T08:00:00Z',
    expiresAt: '2026-04-05T23:59:59Z',
    shipper: {
      id: 'shp_001',
      name: 'Transportes del Norte S.A.',
      rating: 4.8,
      totalShipments: 342,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TN',
    },
    requirements: ['Licencia Federal', 'GPS activo', 'Seguro de carga'],
    tags: ['urgente', 'carga-general'],
  },
  {
    id: 'flt_002',
    slug: 'refrigerados-monterrey-tijuana',
    title: 'Productos Refrigerados Monterrey - Tijuana',
    description: 'Transporte de productos perecederos que requieren temperatura controlada de 2-8°C. Cadena de frío certificada obligatoria. Documentación sanitaria requerida.',
    origin: {
      city: 'Monterrey',
      state: 'NLE',
      postalCode: '64000',
      fullAddress: 'Parque Industrial Santa María',
      coordinates: { lat: 25.6866, lng: -100.3161 },
    },
    destination: {
      city: 'Tijuana',
      state: 'BCN',
      postalCode: '22000',
      fullAddress: 'Central de Abastos Tijuana',
      coordinates: { lat: 32.5149, lng: -117.0382 },
    },
    vehicleType: 'trailer',
    bodyType: 'refrigerado',
    weight: 22,
    price: 85000,
    distance: 1850,
    status: 'available',
    publishedAt: '2026-03-26T14:30:00Z',
    expiresAt: '2026-04-03T23:59:59Z',
    shipper: {
      id: 'shp_002',
      name: 'Alimentos Fresh México',
      rating: 4.9,
      totalShipments: 567,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AF',
    },
    requirements: ['Unidad refrigerada', 'Termógrafo', 'Certificado SENASICA'],
    tags: ['refrigerado', 'perecederos', 'urgente'],
  },
  {
    id: 'flt_003',
    slug: 'maquinaria-queretaro-cancun',
    title: 'Maquinaria Industrial Querétaro - Cancún',
    description: 'Transporte de maquinaria pesada para construcción. Requiere plataforma con capacidad mínima de 15 toneladas y experiencia en carga sobredimensionada.',
    origin: {
      city: 'Querétaro',
      state: 'QUE',
      postalCode: '76000',
      fullAddress: 'Parque Industrial Bernardo Quintana',
      coordinates: { lat: 20.5888, lng: -100.3899 },
    },
    destination: {
      city: 'Cancún',
      state: 'ROO',
      postalCode: '77500',
      fullAddress: 'Zona Hotelera Km 12',
      coordinates: { lat: 21.1619, lng: -86.8515 },
    },
    vehicleType: 'trailer',
    bodyType: 'plataforma',
    weight: 15,
    price: 125000,
    distance: 1650,
    status: 'available',
    publishedAt: '2026-03-25T10:00:00Z',
    expiresAt: '2026-04-10T23:59:59Z',
    shipper: {
      id: 'shp_003',
      name: 'Construcciones Maya S.A.',
      rating: 4.6,
      totalShipments: 128,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CM',
    },
    requirements: ['Plataforma reforzada', 'Lonas y amarres', 'Escolta opcional'],
    tags: ['maquinaria', 'carga-pesada'],
  },
  {
    id: 'flt_004',
    slug: 'electrodomesticos-leon-merida',
    title: 'Electrodomésticos León - Mérida',
    description: 'Mudanza de electrodomésticos nuevos para tienda departamental. Carga paletizada y embalada. Se requiere cuidado especial en manejo.',
    origin: {
      city: 'León',
      state: 'GUA',
      postalCode: '37000',
      fullAddress: 'Centro de Distribución Liverpool',
      coordinates: { lat: 21.1250, lng: -101.6860 },
    },
    destination: {
      city: 'Mérida',
      state: 'YUC',
      postalCode: '97000',
      fullAddress: 'Plaza Altabrisa Local 45',
      coordinates: { lat: 20.9674, lng: -89.5926 },
    },
    vehicleType: 'trailer',
    bodyType: 'caja_seca',
    weight: 18,
    price: 95000,
    distance: 1420,
    status: 'available',
    publishedAt: '2026-03-24T16:45:00Z',
    expiresAt: '2026-04-08T23:59:59Z',
    shipper: {
      id: 'shp_004',
      name: 'Liverpool Logística',
      rating: 4.9,
      totalShipments: 892,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=LL',
    },
    requirements: ['Caja seca cerrada', 'Rampa hidráulica', 'Seguro todo riesgo'],
    tags: ['electrodomesticos', 'retail', 'paletizado'],
  },
  {
    id: 'flt_005',
    slug: 'granos-sinaloa-veracruz',
    title: 'Granos Agrícolas Sinaloa - Veracruz',
    description: 'Transporte de maíz a granel para exportación. Requiere tolva con capacidad mínima de 30 toneladas y certificado fitosanitario vigente.',
    origin: {
      city: 'Culiacán',
      state: 'SIN',
      postalCode: '80000',
      fullAddress: 'Almacenes Agrícolas del Valle',
      coordinates: { lat: 24.7994, lng: -107.3940 },
    },
    destination: {
      city: 'Veracruz',
      state: 'VER',
      postalCode: '91700',
      fullAddress: 'Puerto de Veracruz, Terminal Granelera',
      coordinates: { lat: 19.1738, lng: -96.1342 },
    },
    vehicleType: 'trailer',
    bodyType: 'tolva',
    weight: 32,
    price: 78000,
    distance: 1380,
    status: 'available',
    publishedAt: '2026-03-23T09:00:00Z',
    expiresAt: '2026-04-06T23:59:59Z',
    shipper: {
      id: 'shp_005',
      name: 'Agroindustrias del Pacífico',
      rating: 4.7,
      totalShipments: 445,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AP',
    },
    requirements: ['Tolva granelera', 'Lona impermeable', 'Cert. fitosanitario'],
    tags: ['granos', 'agricola', 'exportacion'],
  },
  {
    id: 'flt_006',
    slug: 'mudanza-corporativa-cdmx-puebla',
    title: 'Mudanza Corporativa CDMX - Puebla',
    description: 'Reubicación de oficinas corporativas. Incluye mobiliario, equipo de cómputo y archivos. Se requiere personal para carga y descarga.',
    origin: {
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '03100',
      fullAddress: 'Torre Mayor, Paseo de la Reforma',
      coordinates: { lat: 19.4270, lng: -99.1677 },
    },
    destination: {
      city: 'Puebla',
      state: 'PUE',
      postalCode: '72000',
      fullAddress: 'Angelópolis, Torre Corporativa',
      coordinates: { lat: 19.0414, lng: -98.2063 },
    },
    vehicleType: 'camion_torton',
    bodyType: 'caja_seca',
    weight: 6,
    price: 12500,
    distance: 135,
    status: 'available',
    publishedAt: '2026-03-28T07:30:00Z',
    expiresAt: '2026-04-02T23:59:59Z',
    shipper: {
      id: 'shp_006',
      name: 'Mudanzas Express Pro',
      rating: 4.5,
      totalShipments: 234,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ME',
    },
    requirements: ['Personal de carga', 'Mantas protectoras', 'Seguro de mobiliario'],
    tags: ['mudanza', 'corporativo', 'express'],
  },
  {
    id: 'flt_007',
    slug: 'quimicos-tampico-guadalajara',
    title: 'Productos Químicos Tampico - Guadalajara',
    description: 'Transporte de productos químicos no peligrosos para industria textil. Requiere tanque certificado y documentación de seguridad.',
    origin: {
      city: 'Tampico',
      state: 'TAM',
      postalCode: '89000',
      fullAddress: 'Zona Industrial Norte',
      coordinates: { lat: 22.2331, lng: -97.8610 },
    },
    destination: {
      city: 'Guadalajara',
      state: 'JAL',
      postalCode: '44940',
      fullAddress: 'Parque Industrial El Salto',
      coordinates: { lat: 20.5205, lng: -103.2764 },
    },
    vehicleType: 'trailer',
    bodyType: 'tanque',
    weight: 24,
    price: 68000,
    distance: 780,
    status: 'available',
    publishedAt: '2026-03-22T11:15:00Z',
    expiresAt: '2026-04-05T23:59:59Z',
    shipper: {
      id: 'shp_007',
      name: 'Químicos Industriales MX',
      rating: 4.8,
      totalShipments: 312,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=QI',
    },
    requirements: ['Tanque certificado', 'Hoja de seguridad', 'EPP completo'],
    tags: ['quimicos', 'industrial', 'tanque'],
  },
  {
    id: 'flt_008',
    slug: 'autopartes-chihuahua-monterrey',
    title: 'Autopartes Chihuahua - Monterrey',
    description: 'Envío de componentes automotrices para ensambladora. Carga paletizada con código de barras. Entrega just-in-time requerida.',
    origin: {
      city: 'Chihuahua',
      state: 'CHH',
      postalCode: '31000',
      fullAddress: 'Complejo Industrial Chihuahua',
      coordinates: { lat: 28.6353, lng: -106.0889 },
    },
    destination: {
      city: 'Monterrey',
      state: 'NLE',
      postalCode: '64720',
      fullAddress: 'Planta KIA Motors',
      coordinates: { lat: 25.7489, lng: -100.1156 },
    },
    vehicleType: 'trailer',
    bodyType: 'caja_seca',
    weight: 12,
    price: 42000,
    distance: 560,
    status: 'in_progress',
    publishedAt: '2026-03-21T13:00:00Z',
    expiresAt: '2026-03-30T23:59:59Z',
    shipper: {
      id: 'shp_008',
      name: 'AutoParts México',
      rating: 4.9,
      totalShipments: 678,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AM',
    },
    requirements: ['Tracking GPS', 'Entrega JIT', 'Certificado ISO'],
    tags: ['autopartes', 'automotriz', 'jit'],
  },
  {
    id: 'flt_009',
    slug: 'frutas-michoacan-cdmx',
    title: 'Frutas Frescas Michoacán - CDMX',
    description: 'Transporte de aguacate y frutas de temporada. Requiere refrigeración ligera y manejo cuidadoso. Entrega en central de abastos.',
    origin: {
      city: 'Uruapan',
      state: 'MIC',
      postalCode: '60000',
      fullAddress: 'Empacadora La Huerta',
      coordinates: { lat: 19.4173, lng: -102.0578 },
    },
    destination: {
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '09040',
      fullAddress: 'Central de Abasto CDMX',
      coordinates: { lat: 19.3728, lng: -99.0936 },
    },
    vehicleType: 'camion_torton',
    bodyType: 'refrigerado',
    weight: 10,
    price: 28000,
    distance: 380,
    status: 'available',
    publishedAt: '2026-03-27T05:00:00Z',
    expiresAt: '2026-03-31T23:59:59Z',
    shipper: {
      id: 'shp_009',
      name: 'Aguacates Premium MX',
      rating: 4.7,
      totalShipments: 521,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AP',
    },
    requirements: ['Refrigeración 10-12°C', 'Cajas ventiladas', 'Madrugada'],
    tags: ['frutas', 'perecederos', 'aguacate'],
  },
  {
    id: 'flt_010',
    slug: 'materiales-construccion-cdmx-acapulco',
    title: 'Materiales de Construcción CDMX - Acapulco',
    description: 'Envío de materiales diversos para obra en zona turística. Incluye cemento, varilla y acabados. Descarga con grúa en destino.',
    origin: {
      city: 'Ciudad de México',
      state: 'CMX',
      postalCode: '02300',
      fullAddress: 'Bodega Home Depot Azcapotzalco',
      coordinates: { lat: 19.4869, lng: -99.1857 },
    },
    destination: {
      city: 'Acapulco',
      state: 'GRO',
      postalCode: '39300',
      fullAddress: 'Desarrollo Diamante',
      coordinates: { lat: 16.8531, lng: -99.8237 },
    },
    vehicleType: 'rabon',
    bodyType: 'plataforma',
    weight: 8,
    price: 22000,
    distance: 385,
    status: 'available',
    publishedAt: '2026-03-26T08:45:00Z',
    expiresAt: '2026-04-04T23:59:59Z',
    shipper: {
      id: 'shp_010',
      name: 'Construmex Materiales',
      rating: 4.6,
      totalShipments: 289,
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CM',
    },
    requirements: ['Plataforma con grúa', 'Amarres certificados', 'Horario diurno'],
    tags: ['construccion', 'materiales', 'obra'],
  },
]

/**
 * Función para simular delay de API
 */
export function simulateApiDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Función para obtener fletes con filtros
 */
export async function getFilteredFreights(
  filters: {
    originState?: string
    destinationState?: string
    vehicleType?: string
    bodyType?: string
  },
  page: number = 1,
  pageSize: number = 6
): Promise<{
  data: Freight[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}> {
  await simulateApiDelay(300)

  let filtered = [...mockFreights]

  if (filters.originState) {
    filtered = filtered.filter(f => f.origin.state === filters.originState)
  }
  if (filters.destinationState) {
    filtered = filtered.filter(f => f.destination.state === filters.destinationState)
  }
  if (filters.vehicleType) {
    filtered = filtered.filter(f => f.vehicleType === filters.vehicleType)
  }
  if (filters.bodyType) {
    filtered = filtered.filter(f => f.bodyType === filters.bodyType)
  }

  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize)

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: pageSize,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}

/**
 * Función para obtener un flete por ID
 */
export async function getFreightById(id: string): Promise<Freight | null> {
  await simulateApiDelay(200)
  return mockFreights.find(f => f.id === id) || null
}

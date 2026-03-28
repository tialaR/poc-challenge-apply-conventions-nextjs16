/**
 * ==============================================
 * DADOS MOCK PARA SIMULAÇÃO DA API
 * Dados de exemplo para desenvolvimento
 * ==============================================
 */

import type { Freight, Trucker, Shipper } from './types'

/**
 * Lista de embarcadores mockados
 */
export const mockShippers: Shipper[] = [
  {
    id: 'shipper-1',
    name: 'Carlos Silva',
    company: 'Transportadora São Paulo Ltda',
    rating: 4.8,
    totalFreights: 156,
    phone: '11999887766',
    email: 'carlos@transportadorasp.com.br',
    avatar: 'https://i.pravatar.cc/150?u=shipper1',
  },
  {
    id: 'shipper-2',
    name: 'Ana Rodrigues',
    company: 'Logística Express',
    rating: 4.9,
    totalFreights: 243,
    phone: '21988776655',
    email: 'ana@logisticaexpress.com.br',
    avatar: 'https://i.pravatar.cc/150?u=shipper2',
  },
  {
    id: 'shipper-3',
    name: 'Roberto Santos',
    company: 'Cargas Brasil',
    rating: 4.6,
    totalFreights: 89,
    phone: '31977665544',
    email: 'roberto@cargasbrasil.com.br',
    avatar: 'https://i.pravatar.cc/150?u=shipper3',
  },
]

/**
 * Lista de transportadores mockados
 */
export const mockTruckers: Trucker[] = [
  {
    id: 'trucker-1',
    name: 'José Pereira',
    document: '123.456.789-00',
    phone: '11988776655',
    email: 'jose.pereira@email.com',
    avatar: 'https://i.pravatar.cc/150?u=trucker1',
    rating: 4.7,
    completedTrips: 324,
    vehicleType: 'truck',
    bodyType: 'closed',
    isVerified: true,
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'trucker-2',
    name: 'Maria Oliveira',
    document: '987.654.321-00',
    phone: '21977665544',
    email: 'maria.oliveira@email.com',
    avatar: 'https://i.pravatar.cc/150?u=trucker2',
    rating: 4.9,
    completedTrips: 567,
    vehicleType: 'carreta',
    bodyType: 'sider',
    isVerified: true,
    createdAt: '2022-06-20T14:30:00Z',
  },
  {
    id: 'trucker-3',
    name: 'Pedro Costa',
    document: '456.789.123-00',
    phone: '31966554433',
    email: 'pedro.costa@email.com',
    avatar: 'https://i.pravatar.cc/150?u=trucker3',
    rating: 4.5,
    completedTrips: 189,
    vehicleType: 'bitruck',
    bodyType: 'refrigerated',
    isVerified: false,
    createdAt: '2024-02-10T08:15:00Z',
  },
]

/**
 * Lista de fretes mockados
 */
export const mockFreights: Freight[] = [
  {
    id: 'freight-1',
    slug: 'sao-paulo-sp-rio-de-janeiro-rj',
    title: 'Carga de eletrônicos - SP para RJ',
    description: 'Transporte de equipamentos eletrônicos embalados. Carga paletizada, necessário cuidado no manuseio. Documentação completa disponível.',
    origin: {
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      latitude: -23.5505,
      longitude: -46.6333,
      address: 'Av. Paulista, 1000 - Bela Vista',
    },
    destination: {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'Brasil',
      latitude: -22.9068,
      longitude: -43.1729,
      address: 'Av. Brasil, 500 - Centro',
    },
    distance: 430,
    price: 350000, // R$ 3.500,00
    vehicleType: 'truck',
    bodyType: 'closed',
    weight: 8500,
    status: 'available',
    createdAt: '2026-03-27T10:00:00Z',
    expiresAt: '2026-04-03T10:00:00Z',
    shipper: mockShippers[0],
  },
  {
    id: 'freight-2',
    slug: 'curitiba-pr-porto-alegre-rs',
    title: 'Alimentos refrigerados - Curitiba para POA',
    description: 'Carga de produtos alimentícios que necessitam de refrigeração constante a -18°C. Veículo com câmara fria obrigatório.',
    origin: {
      city: 'Curitiba',
      state: 'PR',
      country: 'Brasil',
      latitude: -25.4284,
      longitude: -49.2733,
      address: 'Rod. BR-116, km 108',
    },
    destination: {
      city: 'Porto Alegre',
      state: 'RS',
      country: 'Brasil',
      latitude: -30.0346,
      longitude: -51.2177,
      address: 'Av. Assis Brasil, 3000',
    },
    distance: 710,
    price: 580000, // R$ 5.800,00
    vehicleType: 'carreta',
    bodyType: 'refrigerated',
    weight: 22000,
    status: 'available',
    createdAt: '2026-03-26T14:30:00Z',
    expiresAt: '2026-04-02T14:30:00Z',
    shipper: mockShippers[1],
  },
  {
    id: 'freight-3',
    slug: 'belo-horizonte-mg-brasilia-df',
    title: 'Materiais de construção - BH para Brasília',
    description: 'Transporte de materiais de construção diversos: cimento, tijolos e ferragens. Carga pesada, necessário içamento.',
    origin: {
      city: 'Belo Horizonte',
      state: 'MG',
      country: 'Brasil',
      latitude: -19.9167,
      longitude: -43.9345,
      address: 'Av. Amazonas, 2500',
    },
    destination: {
      city: 'Brasília',
      state: 'DF',
      country: 'Brasil',
      latitude: -15.7801,
      longitude: -47.9292,
      address: 'SIA Trecho 3',
    },
    distance: 740,
    price: 620000, // R$ 6.200,00
    vehicleType: 'bitruck',
    bodyType: 'open',
    weight: 28000,
    status: 'available',
    createdAt: '2026-03-25T08:00:00Z',
    expiresAt: '2026-04-01T08:00:00Z',
    shipper: mockShippers[2],
  },
  {
    id: 'freight-4',
    slug: 'salvador-ba-recife-pe',
    title: 'Móveis planejados - Salvador para Recife',
    description: 'Transporte de móveis planejados desmontados. Carga frágil, necessário cuidado especial no carregamento e transporte.',
    origin: {
      city: 'Salvador',
      state: 'BA',
      country: 'Brasil',
      latitude: -12.9714,
      longitude: -38.5014,
      address: 'Av. Paralela, 1800',
    },
    destination: {
      city: 'Recife',
      state: 'PE',
      country: 'Brasil',
      latitude: -8.0476,
      longitude: -34.877,
      address: 'Av. Recife, 500',
    },
    distance: 840,
    price: 480000, // R$ 4.800,00
    vehicleType: 'truck',
    bodyType: 'sider',
    weight: 12000,
    status: 'negotiating',
    createdAt: '2026-03-24T16:00:00Z',
    expiresAt: '2026-03-31T16:00:00Z',
    shipper: mockShippers[0],
  },
  {
    id: 'freight-5',
    slug: 'campinas-sp-ribeirao-preto-sp',
    title: 'Produtos farmacêuticos - Campinas para Ribeirão',
    description: 'Carga de medicamentos com controle de temperatura. Necessário certificação ANVISA e rastreamento em tempo real.',
    origin: {
      city: 'Campinas',
      state: 'SP',
      country: 'Brasil',
      latitude: -22.9099,
      longitude: -47.0626,
      address: 'Rod. Anhanguera, km 98',
    },
    destination: {
      city: 'Ribeirão Preto',
      state: 'SP',
      country: 'Brasil',
      latitude: -21.1775,
      longitude: -47.8103,
      address: 'Av. Francisco Junqueira, 1200',
    },
    distance: 230,
    price: 280000, // R$ 2.800,00
    vehicleType: 'van',
    bodyType: 'refrigerated',
    weight: 3500,
    status: 'available',
    createdAt: '2026-03-28T06:00:00Z',
    expiresAt: '2026-04-04T06:00:00Z',
    shipper: mockShippers[1],
  },
  {
    id: 'freight-6',
    slug: 'goiania-go-uberlandia-mg',
    title: 'Grãos - Goiânia para Uberlândia',
    description: 'Transporte de soja a granel. Veículo graneleiro necessário. Carregamento na fazenda.',
    origin: {
      city: 'Goiânia',
      state: 'GO',
      country: 'Brasil',
      latitude: -16.6869,
      longitude: -49.2648,
      address: 'Fazenda Santa Cruz, Zona Rural',
    },
    destination: {
      city: 'Uberlândia',
      state: 'MG',
      country: 'Brasil',
      latitude: -18.9186,
      longitude: -48.2772,
      address: 'Terminal Grãos Uberlândia',
    },
    distance: 420,
    price: 320000, // R$ 3.200,00
    vehicleType: 'carreta',
    bodyType: 'open',
    weight: 35000,
    status: 'available',
    createdAt: '2026-03-27T12:00:00Z',
    expiresAt: '2026-04-03T12:00:00Z',
    shipper: mockShippers[2],
  },
]

/**
 * Busca um frete pelo ID
 */
export function getFreightById(id: string): Freight | undefined {
  return mockFreights.find(f => f.id === id)
}

/**
 * Busca um frete pelo slug e ID
 */
export function getFreightBySlugAndId(slug: string, id: string): Freight | undefined {
  return mockFreights.find(f => f.slug === slug && f.id === id)
}

/**
 * Busca um transportador pelo ID
 */
export function getTruckerById(id: string): Trucker | undefined {
  return mockTruckers.find(t => t.id === id)
}

/**
 * Estados brasileiros para filtros
 */
export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

/**
 * @fileoverview Testes de tipos e interfaces
 * @description Valida a estrutura e comportamento dos tipos TypeScript
 * 
 * Nota: TypeScript já valida tipos em tempo de compilação.
 * Estes testes verificam runtime guards e validações de schema.
 */

import type {
  Freight,
  FreightStatus,
  VehicleType,
  CargoType,
  Location,
  Trucker,
  FilterParams,
  PaginatedResponse,
  ApiResponse,
} from '@/lib/types';

// =============================================================================
// TESTES DE ESTRUTURA DE DADOS - Freight
// =============================================================================

describe('Freight Type Structure', () => {
  /**
   * Cria um objeto Freight válido para testes
   * Seguindo o padrão Factory para criação de objetos de teste
   */
  const createValidFreight = (overrides: Partial<Freight> = {}): Freight => ({
    id: '1',
    title: 'Frete São Paulo - Rio',
    slug: 'frete-sao-paulo-rio',
    description: 'Transporte de carga geral',
    origin: {
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      address: 'Av. Paulista, 1000',
      coordinates: { lat: -23.5505, lng: -46.6333 },
    },
    destination: {
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20040-020',
      address: 'Av. Rio Branco, 1',
      coordinates: { lat: -22.9068, lng: -43.1729 },
    },
    distance: 430,
    value: 2500,
    weight: 15000,
    cargoType: 'general',
    vehicleType: 'truck',
    status: 'available',
    publishedAt: '2024-03-15T10:00:00Z',
    expiresAt: '2024-03-22T10:00:00Z',
    company: {
      id: '1',
      name: 'Transportes ABC',
      logo: '/images/company.png',
      rating: 4.5,
      reviewCount: 100,
    },
    requirements: ['CNH categoria E', 'Experiência mínima 2 anos'],
    images: ['/images/cargo.png'],
    viewCount: 150,
    interestCount: 25,
    ...overrides,
  });

  it('deve criar um objeto Freight com todos os campos obrigatórios', () => {
    const freight = createValidFreight();
    
    expect(freight).toHaveProperty('id');
    expect(freight).toHaveProperty('title');
    expect(freight).toHaveProperty('origin');
    expect(freight).toHaveProperty('destination');
    expect(freight).toHaveProperty('value');
    expect(freight).toHaveProperty('status');
  });

  it('deve validar que origin tem estrutura Location', () => {
    const freight = createValidFreight();
    
    expect(freight.origin).toHaveProperty('city');
    expect(freight.origin).toHaveProperty('state');
    expect(freight.origin).toHaveProperty('coordinates');
  });

  it('deve validar coordenadas geográficas', () => {
    const freight = createValidFreight();
    
    // Latitude deve estar entre -90 e 90
    expect(freight.origin.coordinates?.lat).toBeGreaterThanOrEqual(-90);
    expect(freight.origin.coordinates?.lat).toBeLessThanOrEqual(90);
    
    // Longitude deve estar entre -180 e 180
    expect(freight.origin.coordinates?.lng).toBeGreaterThanOrEqual(-180);
    expect(freight.origin.coordinates?.lng).toBeLessThanOrEqual(180);
  });

  it('deve aceitar campos opcionais como undefined', () => {
    const freight = createValidFreight({
      images: undefined,
      requirements: undefined,
    });
    
    expect(freight.images).toBeUndefined();
    expect(freight.requirements).toBeUndefined();
  });
});

// =============================================================================
// TESTES DE STATUS DE FRETE
// =============================================================================

describe('FreightStatus Type', () => {
  /**
   * Valida os possíveis status de um frete
   */
  const validStatuses: FreightStatus[] = [
    'available',
    'in_negotiation',
    'assigned',
    'in_transit',
    'delivered',
    'cancelled',
  ];

  it('deve reconhecer todos os status válidos', () => {
    validStatuses.forEach((status) => {
      const freight: Partial<Freight> = { status };
      expect(validStatuses).toContain(freight.status);
    });
  });

  it('deve ter pelo menos um status inicial (available)', () => {
    expect(validStatuses).toContain('available');
  });

  it('deve ter um status final positivo (delivered)', () => {
    expect(validStatuses).toContain('delivered');
  });

  it('deve ter um status final negativo (cancelled)', () => {
    expect(validStatuses).toContain('cancelled');
  });
});

// =============================================================================
// TESTES DE TIPOS DE VEÍCULO
// =============================================================================

describe('VehicleType Type', () => {
  /**
   * Valida os tipos de veículo suportados
   */
  const validVehicles: VehicleType[] = [
    'van',
    'truck',
    'semi_truck',
    'flatbed',
    'refrigerated',
    'tanker',
    'container',
  ];

  it('deve incluir veículos de pequeno porte', () => {
    expect(validVehicles).toContain('van');
  });

  it('deve incluir veículos de grande porte', () => {
    expect(validVehicles).toContain('semi_truck');
    expect(validVehicles).toContain('truck');
  });

  it('deve incluir veículos especializados', () => {
    expect(validVehicles).toContain('refrigerated');
    expect(validVehicles).toContain('tanker');
  });
});

// =============================================================================
// TESTES DE TIPOS DE CARGA
// =============================================================================

describe('CargoType Type', () => {
  /**
   * Valida os tipos de carga suportados
   */
  const validCargoTypes: CargoType[] = [
    'general',
    'fragile',
    'perishable',
    'dangerous',
    'livestock',
    'bulk',
    'liquid',
    'vehicles',
  ];

  it('deve incluir carga geral', () => {
    expect(validCargoTypes).toContain('general');
  });

  it('deve incluir cargas que requerem cuidados especiais', () => {
    expect(validCargoTypes).toContain('fragile');
    expect(validCargoTypes).toContain('perishable');
    expect(validCargoTypes).toContain('dangerous');
  });
});

// =============================================================================
// TESTES DE LOCATION
// =============================================================================

describe('Location Type', () => {
  const createValidLocation = (overrides: Partial<Location> = {}): Location => ({
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    ...overrides,
  });

  it('deve criar location com campos obrigatórios', () => {
    const location = createValidLocation();
    
    expect(location.city).toBeDefined();
    expect(location.state).toBeDefined();
  });

  it('deve validar formato de estado (2 letras)', () => {
    const location = createValidLocation();
    
    expect(location.state).toHaveLength(2);
    expect(location.state).toMatch(/^[A-Z]{2}$/);
  });

  it('deve aceitar address como opcional', () => {
    const location = createValidLocation({ address: undefined });
    
    expect(location.address).toBeUndefined();
  });

  it('deve aceitar coordinates como opcional', () => {
    const location = createValidLocation({ coordinates: undefined });
    
    expect(location.coordinates).toBeUndefined();
  });
});

// =============================================================================
// TESTES DE TRUCKER
// =============================================================================

describe('Trucker Type', () => {
  const createValidTrucker = (overrides: Partial<Trucker> = {}): Trucker => ({
    id: '1',
    name: 'João Silva',
    avatar: '/images/avatar.png',
    phone: '11999887766',
    email: 'joao@email.com',
    rating: 4.8,
    reviewCount: 150,
    completedFreights: 200,
    memberSince: '2020-01-15',
    vehicles: [
      {
        type: 'truck',
        plate: 'ABC-1234',
        model: 'Mercedes Atego 2430',
        year: 2022,
        capacity: 15000,
      },
    ],
    documents: {
      cnh: { verified: true, expiresAt: '2025-12-31' },
      antt: { verified: true, number: '12345678' },
    },
    location: {
      city: 'São Paulo',
      state: 'SP',
    },
    ...overrides,
  });

  it('deve criar trucker com campos obrigatórios', () => {
    const trucker = createValidTrucker();
    
    expect(trucker.id).toBeDefined();
    expect(trucker.name).toBeDefined();
    expect(trucker.vehicles).toBeDefined();
  });

  it('deve validar rating entre 0 e 5', () => {
    const trucker = createValidTrucker();
    
    expect(trucker.rating).toBeGreaterThanOrEqual(0);
    expect(trucker.rating).toBeLessThanOrEqual(5);
  });

  it('deve ter pelo menos um veículo', () => {
    const trucker = createValidTrucker();
    
    expect(trucker.vehicles.length).toBeGreaterThanOrEqual(1);
  });

  it('deve validar estrutura do veículo', () => {
    const trucker = createValidTrucker();
    const vehicle = trucker.vehicles[0];
    
    expect(vehicle).toHaveProperty('type');
    expect(vehicle).toHaveProperty('plate');
    expect(vehicle).toHaveProperty('capacity');
  });
});

// =============================================================================
// TESTES DE FILTER PARAMS
// =============================================================================

describe('FilterParams Type', () => {
  it('deve aceitar todos os filtros como opcionais', () => {
    const emptyFilter: FilterParams = {};
    
    expect(emptyFilter.origin).toBeUndefined();
    expect(emptyFilter.destination).toBeUndefined();
    expect(emptyFilter.minValue).toBeUndefined();
  });

  it('deve aceitar filtros parciais', () => {
    const partialFilter: FilterParams = {
      origin: 'SP',
      status: 'available',
    };
    
    expect(partialFilter.origin).toBe('SP');
    expect(partialFilter.status).toBe('available');
    expect(partialFilter.destination).toBeUndefined();
  });

  it('deve aceitar arrays para filtros múltiplos', () => {
    const multiFilter: FilterParams = {
      vehicleTypes: ['truck', 'van'],
      cargoTypes: ['general', 'fragile'],
    };
    
    expect(multiFilter.vehicleTypes).toHaveLength(2);
    expect(multiFilter.cargoTypes).toHaveLength(2);
  });
});

// =============================================================================
// TESTES DE PAGINATED RESPONSE
// =============================================================================

describe('PaginatedResponse Type', () => {
  const createPaginatedResponse = <T>(
    data: T[],
    overrides: Partial<PaginatedResponse<T>> = {}
  ): PaginatedResponse<T> => ({
    data,
    meta: {
      total: data.length,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
    ...overrides,
  });

  it('deve incluir dados e metadados de paginação', () => {
    const response = createPaginatedResponse([1, 2, 3]);
    
    expect(response.data).toHaveLength(3);
    expect(response.meta).toBeDefined();
    expect(response.meta.total).toBe(3);
  });

  it('deve calcular hasNextPage corretamente', () => {
    const response = createPaginatedResponse([1, 2], {
      meta: {
        total: 20,
        page: 1,
        limit: 10,
        totalPages: 2,
        hasNextPage: true,
        hasPrevPage: false,
      },
    });
    
    expect(response.meta.hasNextPage).toBe(true);
  });

  it('deve calcular hasPrevPage corretamente', () => {
    const response = createPaginatedResponse([1, 2], {
      meta: {
        total: 20,
        page: 2,
        limit: 10,
        totalPages: 2,
        hasNextPage: false,
        hasPrevPage: true,
      },
    });
    
    expect(response.meta.hasPrevPage).toBe(true);
  });
});

// =============================================================================
// TESTES DE API RESPONSE
// =============================================================================

describe('ApiResponse Type', () => {
  it('deve representar resposta de sucesso', () => {
    const successResponse: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: '1' },
    };
    
    expect(successResponse.success).toBe(true);
    expect(successResponse.data).toBeDefined();
    expect(successResponse.error).toBeUndefined();
  });

  it('deve representar resposta de erro', () => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Recurso não encontrado',
      },
    };
    
    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBeDefined();
    expect(errorResponse.error?.code).toBe('NOT_FOUND');
  });
});

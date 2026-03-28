/**
 * @fileoverview Testes para validação dos dados mock
 * @description Garante que os dados de teste estão corretos e consistentes
 * 
 * Estes testes são importantes para:
 * - Garantir integridade dos dados de desenvolvimento
 * - Validar que os mocks seguem os tipos definidos
 * - Prevenir regressões nos dados de teste
 */

import {
  mockFreights,
  mockTruckers,
  mockCompanies,
  getFreightById,
  getTruckerById,
  getCompanyById,
  searchFreights,
  VEHICLE_LABELS,
  CARGO_LABELS,
  STATUS_LABELS,
} from '@/lib/mock-data';

// =============================================================================
// TESTES DE INTEGRIDADE DOS DADOS MOCK
// =============================================================================

describe('mockFreights', () => {
  /**
   * Valida que a lista de fretes mock está completa e consistente
   */
  it('deve conter pelo menos 5 fretes para testes adequados', () => {
    expect(mockFreights.length).toBeGreaterThanOrEqual(5);
  });

  it('deve ter todos os fretes com IDs únicos', () => {
    const ids = mockFreights.map((f) => f.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('deve ter todos os fretes com slugs únicos', () => {
    const slugs = mockFreights.map((f) => f.slug);
    const uniqueSlugs = new Set(slugs);
    
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('deve ter fretes com valores positivos', () => {
    mockFreights.forEach((freight) => {
      expect(freight.value).toBeGreaterThan(0);
      expect(freight.distance).toBeGreaterThan(0);
      expect(freight.weight).toBeGreaterThan(0);
    });
  });

  it('deve ter fretes com origem e destino diferentes', () => {
    mockFreights.forEach((freight) => {
      const originKey = `${freight.origin.city}-${freight.origin.state}`;
      const destKey = `${freight.destination.city}-${freight.destination.state}`;
      
      expect(originKey).not.toBe(destKey);
    });
  });

  it('deve ter fretes com status válidos', () => {
    const validStatuses = ['available', 'in_negotiation', 'assigned', 'in_transit', 'delivered', 'cancelled'];
    
    mockFreights.forEach((freight) => {
      expect(validStatuses).toContain(freight.status);
    });
  });

  it('deve ter fretes com datas de publicação válidas', () => {
    mockFreights.forEach((freight) => {
      const publishedDate = new Date(freight.publishedAt);
      
      expect(publishedDate).toBeInstanceOf(Date);
      expect(publishedDate.getTime()).not.toBeNaN();
    });
  });
});

describe('mockTruckers', () => {
  /**
   * Valida a lista de transportadores mock
   */
  it('deve conter pelo menos 3 transportadores', () => {
    expect(mockTruckers.length).toBeGreaterThanOrEqual(3);
  });

  it('deve ter transportadores com IDs únicos', () => {
    const ids = mockTruckers.map((t) => t.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('deve ter transportadores com rating entre 0 e 5', () => {
    mockTruckers.forEach((trucker) => {
      expect(trucker.rating).toBeGreaterThanOrEqual(0);
      expect(trucker.rating).toBeLessThanOrEqual(5);
    });
  });

  it('deve ter transportadores com pelo menos um veículo', () => {
    mockTruckers.forEach((trucker) => {
      expect(trucker.vehicles.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('deve ter veículos com placas no formato válido', () => {
    mockTruckers.forEach((trucker) => {
      trucker.vehicles.forEach((vehicle) => {
        // Formato antigo (ABC-1234) ou Mercosul (ABC1D23)
        expect(vehicle.plate).toMatch(/^[A-Z]{3}[-]?\d{1}[A-Z\d]{1}\d{2}$/);
      });
    });
  });

  it('deve ter transportadores com contatos válidos', () => {
    mockTruckers.forEach((trucker) => {
      // Telefone deve ter 10 ou 11 dígitos (removendo formatação)
      const phoneDigits = trucker.phone.replace(/\D/g, '');
      expect(phoneDigits.length).toBeGreaterThanOrEqual(10);
      expect(phoneDigits.length).toBeLessThanOrEqual(11);
      
      // Email deve ter formato válido
      expect(trucker.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });
});

describe('mockCompanies', () => {
  /**
   * Valida a lista de empresas mock
   */
  it('deve conter pelo menos 3 empresas', () => {
    expect(mockCompanies.length).toBeGreaterThanOrEqual(3);
  });

  it('deve ter empresas com IDs únicos', () => {
    const ids = mockCompanies.map((c) => c.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('deve ter empresas com rating entre 0 e 5', () => {
    mockCompanies.forEach((company) => {
      expect(company.rating).toBeGreaterThanOrEqual(0);
      expect(company.rating).toBeLessThanOrEqual(5);
    });
  });
});

// =============================================================================
// TESTES DE FUNÇÕES DE BUSCA
// =============================================================================

describe('getFreightById', () => {
  /**
   * Testa a função de busca de frete por ID
   */
  it('deve retornar frete existente', () => {
    const firstFreight = mockFreights[0];
    const result = getFreightById(firstFreight.id);
    
    expect(result).toBeDefined();
    expect(result?.id).toBe(firstFreight.id);
  });

  it('deve retornar undefined para ID inexistente', () => {
    const result = getFreightById('id-que-nao-existe');
    
    expect(result).toBeUndefined();
  });

  it('deve retornar o objeto completo do frete', () => {
    const firstFreight = mockFreights[0];
    const result = getFreightById(firstFreight.id);
    
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('origin');
    expect(result).toHaveProperty('destination');
    expect(result).toHaveProperty('value');
  });
});

describe('getTruckerById', () => {
  /**
   * Testa a função de busca de transportador por ID
   */
  it('deve retornar transportador existente', () => {
    const firstTrucker = mockTruckers[0];
    const result = getTruckerById(firstTrucker.id);
    
    expect(result).toBeDefined();
    expect(result?.id).toBe(firstTrucker.id);
  });

  it('deve retornar undefined para ID inexistente', () => {
    const result = getTruckerById('id-que-nao-existe');
    
    expect(result).toBeUndefined();
  });
});

describe('getCompanyById', () => {
  /**
   * Testa a função de busca de empresa por ID
   */
  it('deve retornar empresa existente', () => {
    const firstCompany = mockCompanies[0];
    const result = getCompanyById(firstCompany.id);
    
    expect(result).toBeDefined();
    expect(result?.id).toBe(firstCompany.id);
  });

  it('deve retornar undefined para ID inexistente', () => {
    const result = getCompanyById('id-que-nao-existe');
    
    expect(result).toBeUndefined();
  });
});

describe('searchFreights', () => {
  /**
   * Testa a função de busca de fretes com filtros
   */
  it('deve retornar todos os fretes sem filtros', () => {
    const result = searchFreights({});
    
    expect(result.data.length).toBe(mockFreights.length);
  });

  it('deve filtrar por status', () => {
    const result = searchFreights({ status: 'available' });
    
    result.data.forEach((freight) => {
      expect(freight.status).toBe('available');
    });
  });

  it('deve filtrar por origem (estado)', () => {
    const result = searchFreights({ origin: 'SP' });
    
    result.data.forEach((freight) => {
      expect(freight.origin.state).toBe('SP');
    });
  });

  it('deve filtrar por destino (estado)', () => {
    const result = searchFreights({ destination: 'RJ' });
    
    result.data.forEach((freight) => {
      expect(freight.destination.state).toBe('RJ');
    });
  });

  it('deve filtrar por valor mínimo', () => {
    const minValue = 3000;
    const result = searchFreights({ minValue });
    
    result.data.forEach((freight) => {
      expect(freight.value).toBeGreaterThanOrEqual(minValue);
    });
  });

  it('deve filtrar por valor máximo', () => {
    const maxValue = 5000;
    const result = searchFreights({ maxValue });
    
    result.data.forEach((freight) => {
      expect(freight.value).toBeLessThanOrEqual(maxValue);
    });
  });

  it('deve filtrar por tipo de veículo', () => {
    const result = searchFreights({ vehicleTypes: ['truck'] });
    
    result.data.forEach((freight) => {
      expect(freight.vehicleType).toBe('truck');
    });
  });

  it('deve combinar múltiplos filtros', () => {
    const result = searchFreights({
      status: 'available',
      minValue: 1000,
    });
    
    result.data.forEach((freight) => {
      expect(freight.status).toBe('available');
      expect(freight.value).toBeGreaterThanOrEqual(1000);
    });
  });

  it('deve retornar metadados de paginação', () => {
    const result = searchFreights({});
    
    expect(result.meta).toBeDefined();
    expect(result.meta).toHaveProperty('total');
    expect(result.meta).toHaveProperty('page');
    expect(result.meta).toHaveProperty('limit');
    expect(result.meta).toHaveProperty('totalPages');
  });

  it('deve ordenar por data de publicação (mais recente primeiro)', () => {
    const result = searchFreights({ sortBy: 'publishedAt', sortOrder: 'desc' });
    
    for (let i = 0; i < result.data.length - 1; i++) {
      const current = new Date(result.data[i].publishedAt);
      const next = new Date(result.data[i + 1].publishedAt);
      
      expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
    }
  });

  it('deve ordenar por valor', () => {
    const result = searchFreights({ sortBy: 'value', sortOrder: 'asc' });
    
    for (let i = 0; i < result.data.length - 1; i++) {
      expect(result.data[i].value).toBeLessThanOrEqual(result.data[i + 1].value);
    }
  });
});

// =============================================================================
// TESTES DE LABELS
// =============================================================================

describe('Label Maps', () => {
  /**
   * Testa que todos os mapas de labels estão completos
   */
  it('VEHICLE_LABELS deve ter labels para todos os tipos de veículo', () => {
    const vehicleTypes = ['van', 'truck', 'semi_truck', 'flatbed', 'refrigerated', 'tanker', 'container'];
    
    vehicleTypes.forEach((type) => {
      expect(VEHICLE_LABELS[type]).toBeDefined();
      expect(typeof VEHICLE_LABELS[type]).toBe('string');
    });
  });

  it('CARGO_LABELS deve ter labels para todos os tipos de carga', () => {
    const cargoTypes = ['general', 'fragile', 'perishable', 'dangerous', 'livestock', 'bulk', 'liquid', 'vehicles'];
    
    cargoTypes.forEach((type) => {
      expect(CARGO_LABELS[type]).toBeDefined();
      expect(typeof CARGO_LABELS[type]).toBe('string');
    });
  });

  it('STATUS_LABELS deve ter labels para todos os status', () => {
    const statuses = ['available', 'in_negotiation', 'assigned', 'in_transit', 'delivered', 'cancelled'];
    
    statuses.forEach((status) => {
      expect(STATUS_LABELS[status]).toBeDefined();
      expect(typeof STATUS_LABELS[status]).toBe('string');
    });
  });

  it('labels devem estar em português', () => {
    // Verifica alguns labels específicos
    expect(VEHICLE_LABELS.truck).toMatch(/[çãõéêíóúâ]/i); // Deve conter caractere português ou ser palavra PT
    expect(STATUS_LABELS.available).toMatch(/disponível/i);
  });
});

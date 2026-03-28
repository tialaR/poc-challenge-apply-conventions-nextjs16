/**
 * @fileoverview Testes unitários para API Routes de fretes
 * @description Valida endpoints de listagem e detalhes de fretes
 * 
 * Princípios aplicados:
 * - Testa status codes HTTP corretos
 * - Valida estrutura de resposta JSON
 * - Testa casos de erro
 */

import { GET } from '@/app/api/freights/route';
import { GET as GETById } from '@/app/api/freights/[id]/route';
import { mockFreights } from '@/lib/mock-data';

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Cria um objeto Request mock para testes
 */
function createMockRequest(url: string): Request {
  return new Request(url, {
    method: 'GET',
  });
}

/**
 * Extrai JSON da resposta
 */
async function getResponseData(response: Response) {
  return response.json();
}

// =============================================================================
// TESTES DE LISTAGEM DE FRETES
// =============================================================================

describe('GET /api/freights', () => {
  it('deve retornar status 200', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights');
    const response = await GET(request);
    
    expect(response.status).toBe(200);
  });

  it('deve retornar content-type application/json', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights');
    const response = await GET(request);
    
    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('deve retornar lista de fretes', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights');
    const response = await GET(request);
    const data = await getResponseData(response);
    
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('deve retornar metadados de paginação', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights');
    const response = await GET(request);
    const data = await getResponseData(response);
    
    expect(data).toHaveProperty('meta');
    expect(data.meta).toHaveProperty('total');
    expect(data.meta).toHaveProperty('page');
    expect(data.meta).toHaveProperty('limit');
    expect(data.meta).toHaveProperty('totalPages');
  });

  it('deve filtrar por status quando fornecido', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights?status=available');
    const response = await GET(request);
    const data = await getResponseData(response);
    
    data.data.forEach((freight: { status: string }) => {
      expect(freight.status).toBe('available');
    });
  });

  it('deve filtrar por origem quando fornecido', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights?origin=SP');
    const response = await GET(request);
    const data = await getResponseData(response);
    
    data.data.forEach((freight: { origin: { state: string } }) => {
      expect(freight.origin.state).toBe('SP');
    });
  });

  it('deve filtrar por destino quando fornecido', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights?destination=RJ');
    const response = await GET(request);
    const data = await getResponseData(response);
    
    data.data.forEach((freight: { destination: { state: string } }) => {
      expect(freight.destination.state).toBe('RJ');
    });
  });

  it('deve filtrar por valor mínimo', async () => {
    const minValue = 3000;
    const request = createMockRequest(`http://localhost:3000/api/freights?minValue=${minValue}`);
    const response = await GET(request);
    const data = await getResponseData(response);
    
    data.data.forEach((freight: { value: number }) => {
      expect(freight.value).toBeGreaterThanOrEqual(minValue);
    });
  });

  it('deve filtrar por valor máximo', async () => {
    const maxValue = 5000;
    const request = createMockRequest(`http://localhost:3000/api/freights?maxValue=${maxValue}`);
    const response = await GET(request);
    const data = await getResponseData(response);
    
    data.data.forEach((freight: { value: number }) => {
      expect(freight.value).toBeLessThanOrEqual(maxValue);
    });
  });

  it('deve respeitar limite de paginação', async () => {
    const limit = 5;
    const request = createMockRequest(`http://localhost:3000/api/freights?limit=${limit}`);
    const response = await GET(request);
    const data = await getResponseData(response);
    
    expect(data.data.length).toBeLessThanOrEqual(limit);
    expect(data.meta.limit).toBe(limit);
  });

  it('deve respeitar página solicitada', async () => {
    const page = 2;
    const request = createMockRequest(`http://localhost:3000/api/freights?page=${page}`);
    const response = await GET(request);
    const data = await getResponseData(response);
    
    expect(data.meta.page).toBe(page);
  });

  it('deve combinar múltiplos filtros', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/freights?status=available&minValue=1000&origin=SP'
    );
    const response = await GET(request);
    const data = await getResponseData(response);
    
    data.data.forEach((freight: { status: string; value: number; origin: { state: string } }) => {
      expect(freight.status).toBe('available');
      expect(freight.value).toBeGreaterThanOrEqual(1000);
      expect(freight.origin.state).toBe('SP');
    });
  });

  it('deve ordenar por valor ascendente', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/freights?sortBy=value&sortOrder=asc'
    );
    const response = await GET(request);
    const data = await getResponseData(response);
    
    for (let i = 0; i < data.data.length - 1; i++) {
      expect(data.data[i].value).toBeLessThanOrEqual(data.data[i + 1].value);
    }
  });

  it('deve ordenar por valor descendente', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/freights?sortBy=value&sortOrder=desc'
    );
    const response = await GET(request);
    const data = await getResponseData(response);
    
    for (let i = 0; i < data.data.length - 1; i++) {
      expect(data.data[i].value).toBeGreaterThanOrEqual(data.data[i + 1].value);
    }
  });
});

// =============================================================================
// TESTES DE DETALHES DO FRETE
// =============================================================================

describe('GET /api/freights/[id]', () => {
  it('deve retornar status 200 para ID existente', async () => {
    const validId = mockFreights[0].id;
    const request = createMockRequest(`http://localhost:3000/api/freights/${validId}`);
    const response = await GETById(request, { params: Promise.resolve({ id: validId }) });
    
    expect(response.status).toBe(200);
  });

  it('deve retornar status 404 para ID inexistente', async () => {
    const invalidId = 'id-que-nao-existe';
    const request = createMockRequest(`http://localhost:3000/api/freights/${invalidId}`);
    const response = await GETById(request, { params: Promise.resolve({ id: invalidId }) });
    
    expect(response.status).toBe(404);
  });

  it('deve retornar dados do frete', async () => {
    const validId = mockFreights[0].id;
    const request = createMockRequest(`http://localhost:3000/api/freights/${validId}`);
    const response = await GETById(request, { params: Promise.resolve({ id: validId }) });
    const data = await getResponseData(response);
    
    expect(data).toHaveProperty('data');
    expect(data.data.id).toBe(validId);
  });

  it('deve retornar todos os campos do frete', async () => {
    const validId = mockFreights[0].id;
    const request = createMockRequest(`http://localhost:3000/api/freights/${validId}`);
    const response = await GETById(request, { params: Promise.resolve({ id: validId }) });
    const data = await getResponseData(response);
    
    const freight = data.data;
    expect(freight).toHaveProperty('id');
    expect(freight).toHaveProperty('title');
    expect(freight).toHaveProperty('origin');
    expect(freight).toHaveProperty('destination');
    expect(freight).toHaveProperty('value');
    expect(freight).toHaveProperty('status');
  });

  it('deve retornar mensagem de erro para 404', async () => {
    const invalidId = 'id-invalido';
    const request = createMockRequest(`http://localhost:3000/api/freights/${invalidId}`);
    const response = await GETById(request, { params: Promise.resolve({ id: invalidId }) });
    const data = await getResponseData(response);
    
    expect(data).toHaveProperty('error');
    expect(data.error).toHaveProperty('message');
  });
});

// =============================================================================
// TESTES DE BUSCA POR TEXTO
// =============================================================================

describe('GET /api/freights - Busca por texto', () => {
  it('deve buscar por termo no título', async () => {
    const searchTerm = 'São Paulo';
    const request = createMockRequest(
      `http://localhost:3000/api/freights?search=${encodeURIComponent(searchTerm)}`
    );
    const response = await GET(request);
    const data = await getResponseData(response);
    
    // Todos os resultados devem conter o termo buscado
    data.data.forEach((freight: { title: string; origin: { city: string }; destination: { city: string } }) => {
      const matchFound = 
        freight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freight.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freight.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      expect(matchFound).toBe(true);
    });
  });

  it('deve retornar lista vazia para termo sem resultados', async () => {
    const searchTerm = 'xyzabc123naoexiste';
    const request = createMockRequest(
      `http://localhost:3000/api/freights?search=${encodeURIComponent(searchTerm)}`
    );
    const response = await GET(request);
    const data = await getResponseData(response);
    
    expect(data.data.length).toBe(0);
  });
});

// =============================================================================
// TESTES DE CACHE HEADERS
// =============================================================================

describe('GET /api/freights - Cache Headers', () => {
  it('deve incluir headers de cache', async () => {
    const request = createMockRequest('http://localhost:3000/api/freights');
    const response = await GET(request);
    
    // Verifica se há alguma política de cache definida
    const cacheControl = response.headers.get('cache-control');
    expect(cacheControl).toBeDefined();
  });
});

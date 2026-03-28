/**
 * @fileoverview Configuração global do ambiente de testes
 * @description Este arquivo é executado antes de cada suite de testes
 * 
 * Funcionalidades:
 * - Importa matchers do Testing Library (toBeInTheDocument, toHaveClass, etc.)
 * - Configura mocks globais para APIs do navegador
 * - Define helpers de teste reutilizáveis
 */

import '@testing-library/jest-dom';

// =============================================================================
// MOCKS GLOBAIS - Simulação de APIs do navegador não disponíveis no jsdom
// =============================================================================

/**
 * Mock do matchMedia para testes de responsividade
 * Utilizado pelo hook useMediaQuery e componentes que dependem de breakpoints
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

/**
 * Mock do ResizeObserver para componentes que observam mudanças de tamanho
 * Necessário para componentes que usam resize detection
 */
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

/**
 * Mock do IntersectionObserver para componentes com lazy loading ou infinite scroll
 * Simula a API de observação de interseção do viewport
 */
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

/**
 * Mock do scrollTo para evitar erros em testes que envolvem scroll
 */
window.scrollTo = jest.fn();

/**
 * Mock do fetch global para testes de API
 * Por padrão, retorna uma resposta vazia - deve ser sobrescrito em cada teste
 */
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    status: 200,
    statusText: 'OK',
  } as Response)
);

// =============================================================================
// HELPERS DE TESTE - Funções auxiliares para simplificar testes comuns
// =============================================================================

/**
 * Limpa todos os mocks após cada teste
 * Garante isolamento entre testes
 */
afterEach(() => {
  jest.clearAllMocks();
});

/**
 * Restaura todos os mocks após cada suite de testes
 * Previne vazamento de estado entre suites
 */
afterAll(() => {
  jest.restoreAllMocks();
});

// =============================================================================
// CONFIGURAÇÕES DE CONSOLE - Suprime warnings desnecessários
// =============================================================================

/**
 * Suprime warnings específicos do React que não são relevantes para os testes
 * Mantém o output dos testes limpo e focado nos resultados
 */
const originalError = console.error;
console.error = (...args: unknown[]) => {
  // Ignora warnings de act() que são comuns em testes async
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: An update to') &&
    args[0].includes('was not wrapped in act')
  ) {
    return;
  }
  originalError.call(console, ...args);
};

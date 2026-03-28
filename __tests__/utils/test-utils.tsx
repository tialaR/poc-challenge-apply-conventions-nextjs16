/**
 * @fileoverview Utilitários de teste para componentes React
 * @description Fornece wrappers, mocks e helpers para testes de componentes
 * 
 * Princípios aplicados:
 * - DRY: Centraliza configurações comuns de teste
 * - SRP: Cada utility tem uma responsabilidade específica
 * - OCP: Extensível para novos providers sem modificar existentes
 */

import React, { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// =============================================================================
// PROVIDERS WRAPPER - Envolve componentes com contextos necessários
// =============================================================================

interface WrapperProps {
  children: ReactNode;
}

/**
 * AllTheProviders - Wrapper com todos os contextos da aplicação
 * Usado para testes que precisam de contexto completo
 */
function AllTheProviders({ children }: WrapperProps) {
  return (
    <>
      {children}
    </>
  );
}

// =============================================================================
// RENDER CUSTOMIZADO - Render com providers pré-configurados
// =============================================================================

/**
 * Opções estendidas de render que incluem configurações customizadas
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Props iniciais para os providers
   */
  providerProps?: Record<string, unknown>;
}

/**
 * Render customizado que inclui todos os providers necessários
 * @param ui - Componente a ser renderizado
 * @param options - Opções de renderização
 * @returns Resultado do render com utilitários do Testing Library
 */
function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
): RenderResult {
  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

// =============================================================================
// USER EVENT SETUP - Configuração de interações de usuário
// =============================================================================

/**
 * Setup do userEvent com configurações padrão
 * Usar em vez de userEvent direto para consistência
 */
function setupUser() {
  return userEvent.setup({
    // Delay padrão entre eventos (mais realista)
    delay: null,
    // Simular comportamento de pointer
    pointerEventsCheck: 0,
  });
}

// =============================================================================
// MOCK FACTORIES - Funções para criar dados mock consistentes
// =============================================================================

import type { Freight, Trucker, Location, Company } from '@/lib/types';

/**
 * Cria uma Location mock com valores padrão
 */
export function createMockLocation(overrides: Partial<Location> = {}): Location {
  return {
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    address: 'Av. Paulista, 1000',
    coordinates: {
      lat: -23.5505,
      lng: -46.6333,
    },
    ...overrides,
  };
}

/**
 * Cria uma Company mock com valores padrão
 */
export function createMockCompany(overrides: Partial<Company> = {}): Company {
  return {
    id: 'company-1',
    name: 'Empresa Teste LTDA',
    logo: '/images/company-logo.png',
    rating: 4.5,
    reviewCount: 100,
    ...overrides,
  };
}

/**
 * Cria um Freight mock com valores padrão
 * Útil para testes que precisam de objetos completos e válidos
 */
export function createMockFreight(overrides: Partial<Freight> = {}): Freight {
  return {
    id: 'freight-1',
    title: 'Frete Teste',
    slug: 'frete-teste',
    description: 'Descrição do frete para testes',
    origin: createMockLocation({ city: 'São Paulo', state: 'SP' }),
    destination: createMockLocation({ city: 'Rio de Janeiro', state: 'RJ' }),
    distance: 430,
    value: 2500,
    weight: 15000,
    cargoType: 'general',
    vehicleType: 'truck',
    status: 'available',
    publishedAt: '2024-03-15T10:00:00Z',
    expiresAt: '2024-03-22T10:00:00Z',
    company: createMockCompany(),
    requirements: ['CNH categoria E'],
    images: [],
    viewCount: 100,
    interestCount: 20,
    ...overrides,
  };
}

/**
 * Cria um Trucker mock com valores padrão
 */
export function createMockTrucker(overrides: Partial<Trucker> = {}): Trucker {
  return {
    id: 'trucker-1',
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
    location: createMockLocation(),
    ...overrides,
  };
}

// =============================================================================
// MOCK HANDLERS - Funções mock para handlers de eventos
// =============================================================================

/**
 * Cria um mock de função assíncrona que resolve após delay
 * Útil para simular chamadas de API
 */
export function createAsyncMock<T>(
  resolveValue: T,
  delay = 0
): jest.Mock<Promise<T>, []> {
  return jest.fn(() =>
    new Promise((resolve) => setTimeout(() => resolve(resolveValue), delay))
  );
}

/**
 * Cria um mock de função assíncrona que rejeita após delay
 * Útil para simular erros de API
 */
export function createAsyncRejectMock(
  error: Error | string,
  delay = 0
): jest.Mock<Promise<never>, []> {
  return jest.fn(() =>
    new Promise((_, reject) =>
      setTimeout(
        () => reject(typeof error === 'string' ? new Error(error) : error),
        delay
      )
    )
  );
}

// =============================================================================
// WAIT HELPERS - Funções para aguardar condições em testes
// =============================================================================

/**
 * Aguarda um número específico de milissegundos
 * Útil para aguardar animações ou debounce
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Aguarda o próximo tick do event loop
 * Útil para aguardar atualizações de estado
 */
export function nextTick(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

// =============================================================================
// SNAPSHOT HELPERS - Funções para facilitar snapshot testing
// =============================================================================

/**
 * Remove atributos dinâmicos de um snapshot para comparações estáveis
 * Útil quando IDs ou timestamps são gerados dinamicamente
 */
export function sanitizeSnapshot(html: string): string {
  return html
    .replace(/id="[^"]+"/g, 'id="[DYNAMIC]"')
    .replace(/data-testid="[^"]+"/g, '')
    .replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g, '[TIMESTAMP]');
}

// =============================================================================
// EXPORTS
// =============================================================================

// Re-exporta tudo do Testing Library para imports convenientes
export * from '@testing-library/react';

// Exporta render customizado como padrão
export { customRender as render, setupUser };

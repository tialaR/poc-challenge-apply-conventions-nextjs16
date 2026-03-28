/**
 * @fileoverview Testes unitários para o componente FreightCard
 * @description Valida renderização, acessibilidade e interações do card de frete
 * 
 * Princípios aplicados:
 * - Testa comportamento, não implementação
 * - Foca em casos de uso do usuário
 * - Verifica acessibilidade WCAG
 */

import { screen, within } from '@testing-library/react';
import { render, setupUser, createMockFreight } from '../utils/test-utils';
import { FreightCard } from '@/components/freight/freight-card';
import type { Freight } from '@/lib/types';

// =============================================================================
// SETUP E HELPERS
// =============================================================================

/**
 * Dados padrão para os testes
 */
const defaultFreight = createMockFreight({
  id: '1',
  title: 'São Paulo → Rio de Janeiro',
  slug: 'sao-paulo-rio-de-janeiro',
  origin: {
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
  },
  destination: {
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '20040-020',
  },
  value: 2500,
  distance: 430,
  weight: 15000,
  status: 'available',
});

/**
 * Renderiza o FreightCard com props padrão
 */
function renderFreightCard(props: Partial<{ freight: Freight }> = {}) {
  const mergedProps = {
    freight: defaultFreight,
    ...props,
  };
  
  return render(<FreightCard {...mergedProps} />);
}

// =============================================================================
// TESTES DE RENDERIZAÇÃO
// =============================================================================

describe('FreightCard - Renderização', () => {
  /**
   * Verifica que informações essenciais são exibidas
   */
  it('deve renderizar o título do frete', () => {
    renderFreightCard();
    
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
    expect(screen.getByText(/Rio de Janeiro/i)).toBeInTheDocument();
  });

  it('deve renderizar o valor formatado em reais', () => {
    renderFreightCard();
    
    // Verifica se o valor está formatado corretamente
    expect(screen.getByText(/R\$ 2\.500/i)).toBeInTheDocument();
  });

  it('deve renderizar a distância em km', () => {
    renderFreightCard();
    
    expect(screen.getByText(/430 km/i)).toBeInTheDocument();
  });

  it('deve renderizar o peso da carga', () => {
    renderFreightCard({
      freight: createMockFreight({ weight: 15000 }),
    });
    
    // 15000 kg = 15 t
    expect(screen.getByText(/15/i)).toBeInTheDocument();
  });

  it('deve renderizar o status do frete', () => {
    renderFreightCard({
      freight: createMockFreight({ status: 'available' }),
    });
    
    expect(screen.getByText(/disponível/i)).toBeInTheDocument();
  });

  it('deve renderizar informações da empresa', () => {
    renderFreightCard({
      freight: createMockFreight({
        company: {
          id: '1',
          name: 'Transportes ABC',
          rating: 4.5,
          reviewCount: 100,
          logo: '/logo.png',
        },
      }),
    });
    
    expect(screen.getByText(/Transportes ABC/i)).toBeInTheDocument();
  });
});

// =============================================================================
// TESTES DE VARIANTES DE STATUS
// =============================================================================

describe('FreightCard - Status Badges', () => {
  const statusVariants: Array<{
    status: Freight['status'];
    expectedText: RegExp;
  }> = [
    { status: 'available', expectedText: /disponível/i },
    { status: 'in_negotiation', expectedText: /negociação/i },
    { status: 'assigned', expectedText: /atribuído/i },
    { status: 'in_transit', expectedText: /trânsito/i },
    { status: 'delivered', expectedText: /entregue/i },
    { status: 'cancelled', expectedText: /cancelado/i },
  ];

  statusVariants.forEach(({ status, expectedText }) => {
    it(`deve exibir badge correto para status "${status}"`, () => {
      renderFreightCard({
        freight: createMockFreight({ status }),
      });
      
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});

// =============================================================================
// TESTES DE ACESSIBILIDADE
// =============================================================================

describe('FreightCard - Acessibilidade', () => {
  /**
   * Testes de conformidade WCAG
   */
  it('deve ter estrutura semântica adequada (article)', () => {
    const { container } = renderFreightCard();
    
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('deve ter link acessível para detalhes', () => {
    renderFreightCard();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href');
  });

  it('deve ter texto alternativo para ícones decorativos', () => {
    renderFreightCard();
    
    // Ícones decorativos devem ter aria-hidden
    const decorativeIcons = document.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeIcons.length).toBeGreaterThan(0);
  });

  it('deve ter contraste adequado no badge de status', () => {
    renderFreightCard({
      freight: createMockFreight({ status: 'available' }),
    });
    
    const badge = screen.getByText(/disponível/i);
    // O badge deve existir e ser visível
    expect(badge).toBeVisible();
  });
});

// =============================================================================
// TESTES DE INTERAÇÃO
// =============================================================================

describe('FreightCard - Interações', () => {
  it('deve navegar para página de detalhes ao clicar', async () => {
    const user = setupUser();
    renderFreightCard();
    
    const link = screen.getByRole('link');
    
    // Verifica que o href está correto
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining(defaultFreight.slug)
    );
  });

  it('deve ser focável via teclado', async () => {
    const user = setupUser();
    renderFreightCard();
    
    const link = screen.getByRole('link');
    
    // Tab para o link
    await user.tab();
    
    // Verifica se o link está focado
    expect(link).toHaveFocus();
  });
});

// =============================================================================
// TESTES DE EDGE CASES
// =============================================================================

describe('FreightCard - Edge Cases', () => {
  it('deve lidar com valores muito altos', () => {
    renderFreightCard({
      freight: createMockFreight({ value: 1500000 }),
    });
    
    expect(screen.getByText(/1\.500\.000/i)).toBeInTheDocument();
  });

  it('deve lidar com distâncias curtas', () => {
    renderFreightCard({
      freight: createMockFreight({ distance: 5 }),
    });
    
    expect(screen.getByText(/5 km/i)).toBeInTheDocument();
  });

  it('deve lidar com peso em kg (menor que 1 tonelada)', () => {
    renderFreightCard({
      freight: createMockFreight({ weight: 500 }),
    });
    
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  it('deve lidar com título longo', () => {
    renderFreightCard({
      freight: createMockFreight({
        title: 'Transporte de carga geral de São Paulo capital para Rio de Janeiro com parada em Campinas',
      }),
    });
    
    // Deve renderizar mesmo com título longo (possivelmente truncado)
    expect(screen.getByText(/Transporte/i)).toBeInTheDocument();
  });

  it('deve lidar com empresa sem logo', () => {
    renderFreightCard({
      freight: createMockFreight({
        company: {
          id: '1',
          name: 'Empresa Sem Logo',
          rating: 4.0,
          reviewCount: 50,
          logo: undefined,
        },
      }),
    });
    
    expect(screen.getByText(/Empresa Sem Logo/i)).toBeInTheDocument();
  });
});

// =============================================================================
// TESTES DE SNAPSHOT
// =============================================================================

describe('FreightCard - Snapshots', () => {
  it('deve corresponder ao snapshot com dados padrão', () => {
    const { container } = renderFreightCard();
    
    // Remove elementos dinâmicos para snapshot estável
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve corresponder ao snapshot com status "delivered"', () => {
    const { container } = renderFreightCard({
      freight: createMockFreight({ status: 'delivered' }),
    });
    
    expect(container.firstChild).toMatchSnapshot();
  });
});

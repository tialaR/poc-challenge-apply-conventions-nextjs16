/**
 * @fileoverview Testes unitários para o componente Header
 * @description Valida navegação, responsividade e acessibilidade do header
 * 
 * Princípios aplicados:
 * - Testa comportamento do usuário real
 * - Verifica navegação e acessibilidade
 * - Testa estados mobile e desktop
 */

import { screen, waitFor } from '@testing-library/react';
import { render, setupUser } from '../utils/test-utils';
import { Header } from '@/components/layout/header';

// =============================================================================
// MOCKS
// =============================================================================

// Mock do usePathname do Next.js
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// =============================================================================
// TESTES DE RENDERIZAÇÃO
// =============================================================================

describe('Header - Renderização', () => {
  /**
   * Verifica elementos essenciais do header
   */
  it('deve renderizar o logo da aplicação', () => {
    render(<Header />);
    
    expect(screen.getByText(/FreteX/i)).toBeInTheDocument();
  });

  it('deve renderizar links de navegação principais', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /fretes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('deve renderizar CTA de cadastro', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /cadastre-se/i })).toBeInTheDocument();
  });

  it('deve ter estrutura semântica com header e nav', () => {
    const { container } = render(<Header />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});

// =============================================================================
// TESTES DE NAVEGAÇÃO
// =============================================================================

describe('Header - Navegação', () => {
  it('deve ter links com href corretos', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /início/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /fretes/i })).toHaveAttribute('href', '/fretes');
    expect(screen.getByRole('link', { name: /sobre/i })).toHaveAttribute('href', '/sobre');
    expect(screen.getByRole('link', { name: /contato/i })).toHaveAttribute('href', '/contato');
  });

  it('deve ter logo como link para home', () => {
    render(<Header />);
    
    const logoLink = screen.getByRole('link', { name: /FreteX/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

// =============================================================================
// TESTES DE ACESSIBILIDADE
// =============================================================================

describe('Header - Acessibilidade', () => {
  it('deve ter navigation landmark', () => {
    render(<Header />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('deve ter links focáveis via teclado', async () => {
    const user = setupUser();
    render(<Header />);
    
    // Tab para navegar
    await user.tab();
    
    // Algum elemento deve estar focado
    expect(document.activeElement).not.toBe(document.body);
  });

  it('deve ter aria-label na navegação', () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });

  it('deve ter botão de menu mobile acessível', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded');
  });
});

// =============================================================================
// TESTES DE MENU MOBILE
// =============================================================================

describe('Header - Menu Mobile', () => {
  it('deve ter botão de menu mobile', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('deve abrir menu ao clicar no botão', async () => {
    const user = setupUser();
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Menu deve estar fechado inicialmente
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Clica no botão
    await user.click(menuButton);
    
    // Menu deve estar aberto
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('deve fechar menu ao clicar novamente', async () => {
    const user = setupUser();
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Abre o menu
    await user.click(menuButton);
    
    // Fecha o menu
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('deve fechar menu ao pressionar Escape', async () => {
    const user = setupUser();
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Abre o menu
    await user.click(menuButton);
    
    // Pressiona Escape
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});

// =============================================================================
// TESTES DE ESTADO ATIVO
// =============================================================================

describe('Header - Estado Ativo', () => {
  it('deve destacar link ativo baseado na rota atual', () => {
    // O usePathname está mockado para retornar '/'
    render(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /início/i });
    
    // Verifica se tem classe/atributo de estado ativo
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });
});

// =============================================================================
// TESTES DE SNAPSHOT
// =============================================================================

describe('Header - Snapshots', () => {
  it('deve corresponder ao snapshot', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

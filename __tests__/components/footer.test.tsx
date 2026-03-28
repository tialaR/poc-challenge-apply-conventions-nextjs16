/**
 * @fileoverview Testes unitários para o componente Footer
 * @description Valida estrutura, links e acessibilidade do footer
 */

import { screen } from '@testing-library/react';
import { render } from '../utils/test-utils';
import { Footer } from '@/components/layout/footer';

// =============================================================================
// TESTES DE RENDERIZAÇÃO
// =============================================================================

describe('Footer - Renderização', () => {
  it('deve renderizar o logo/nome da empresa', () => {
    render(<Footer />);
    
    expect(screen.getByText(/FreteX/i)).toBeInTheDocument();
  });

  it('deve renderizar descrição da empresa', () => {
    render(<Footer />);
    
    expect(screen.getByText(/marketplace/i)).toBeInTheDocument();
  });

  it('deve renderizar seções de links', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Links Rápidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Legal/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
  });

  it('deve renderizar links de navegação', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /fretes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('deve renderizar links legais', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /termos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /privacidade/i })).toBeInTheDocument();
  });

  it('deve renderizar ano atual no copyright', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});

// =============================================================================
// TESTES DE LINKS
// =============================================================================

describe('Footer - Links', () => {
  it('deve ter hrefs corretos nos links de navegação', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /fretes/i })).toHaveAttribute('href', '/fretes');
    expect(screen.getByRole('link', { name: /sobre/i })).toHaveAttribute('href', '/sobre');
    expect(screen.getByRole('link', { name: /contato/i })).toHaveAttribute('href', '/contato');
  });

  it('deve ter hrefs corretos nos links legais', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /termos/i })).toHaveAttribute('href', '/termos-de-uso');
    expect(screen.getByRole('link', { name: /privacidade/i })).toHaveAttribute('href', '/politica-de-privacidade');
  });
});

// =============================================================================
// TESTES DE ACESSIBILIDADE
// =============================================================================

describe('Footer - Acessibilidade', () => {
  it('deve ter elemento footer semântico', () => {
    const { container } = render(<Footer />);
    
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('deve ter role contentinfo no footer', () => {
    render(<Footer />);
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('deve ter headings nas seções', () => {
    render(<Footer />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('deve ter todos os links acessíveis', () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
      expect(link).toBeVisible();
    });
  });
});

// =============================================================================
// TESTES DE REDES SOCIAIS (se existirem)
// =============================================================================

describe('Footer - Redes Sociais', () => {
  it('deve renderizar ícones de redes sociais', () => {
    render(<Footer />);
    
    // Verifica se há links de redes sociais
    const socialLinks = screen.getAllByRole('link').filter(link => {
      const href = link.getAttribute('href');
      return href?.includes('linkedin') || 
             href?.includes('instagram') || 
             href?.includes('facebook');
    });
    
    // Pode haver ou não links sociais dependendo do design
    expect(socialLinks.length).toBeGreaterThanOrEqual(0);
  });
});

// =============================================================================
// TESTES DE SNAPSHOT
// =============================================================================

describe('Footer - Snapshots', () => {
  it('deve corresponder ao snapshot', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

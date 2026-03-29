/**
 * ==============================================
 * HEADER COMPONENT
 * Cabeçalho principal da aplicação
 * 
 * Recursos utilizados:
 * - Client Component para interatividade
 * - CSS Modules para estilos
 * - usePathname para navegação ativa
 * - Responsividade com menu mobile
 * ==============================================
 */

'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Truck, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import styles from './header.module.css'

/**
 * Links de navegação do header
 * Definidos como constante para fácil manutenção
 */
const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/fretes', label: 'Fretes' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
] as const

/**
 * Header Component
 * Renderiza o cabeçalho com navegação responsiva
 */
export function Header() {
  // Estado para controle do menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Hook para obter o pathname atual (navegação ativa)
  const pathname = usePathname()
  
  // Hook para controle de tema (dark/light mode)
  const { theme, setTheme } = useTheme()

  /**
   * Toggle do menu mobile
   * Usa useCallback para evitar re-renders desnecessários
   */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  /**
   * Fecha o menu mobile
   * Chamado ao clicar em um link
   */
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  /**
   * Toggle do tema dark/light
   */
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  /**
   * Verifica se um link está ativo
   * Considera rota exata e subrotas
   */
  const isActiveLink = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="FreteApp - Página inicial">
          <Truck className={styles.logoIcon} aria-hidden="true" />
          <span>FreteApp</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className={styles.nav} aria-label="Navegação principal">
          {navigationLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActiveLink(link.href) ? styles.navLinkActive : ''}`}
              aria-current={isActiveLink(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ações do Header */}
        <div className={styles.actions}>
          {/* Botão de toggle de tema */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Botão CTA */}
          <Button asChild className="hidden md:inline-flex">
            <Link href="/fretes">Ver Fretes</Link>
          </Button>

          {/* Botão de Menu Mobile */}
          <button
            className={styles.menuButton}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className={styles.mobileMenu}
          aria-label="Menu de navegação mobile"
        >
          {navigationLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${isActiveLink(link.href) ? styles.mobileNavLinkActive : ''}`}
              onClick={closeMobileMenu}
              aria-current={isActiveLink(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          
          {/* CTA no menu mobile */}
          <div className="pt-4 border-t border-border mt-2">
            <Button asChild className="w-full">
              <Link href="/fretes" onClick={closeMobileMenu}>
                Ver Fretes Disponíveis
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}

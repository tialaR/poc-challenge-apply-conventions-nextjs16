/**
 * ==============================================
 * FOOTER COMPONENT
 * Rodapé da aplicação
 * 
 * Recursos utilizados:
 * - Server Component (sem interatividade)
 * - CSS Modules para estilos
 * - Links de navegação e redes sociais
 * - Acessibilidade completa
 * ==============================================
 */

import Link from 'next/link'
import { Truck, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import styles from './footer.module.css'

/**
 * Links das seções do footer
 */
const footerSections = {
  plataforma: [
    { href: '/fretes', label: 'Buscar Fretes' },
    { href: '/como-funciona', label: 'Como Funciona' },
    { href: '/precos', label: 'Preços' },
    { href: '/app', label: 'Baixar App' },
  ],
  empresa: [
    { href: '/sobre', label: 'Sobre Nós' },
    { href: '/contato', label: 'Contato' },
    { href: '/carreiras', label: 'Carreiras' },
    { href: '/blog', label: 'Blog' },
  ],
  suporte: [
    { href: '/ajuda', label: 'Central de Ajuda' },
    { href: '/faq', label: 'Perguntas Frequentes' },
    { href: '/seguranca', label: 'Segurança' },
    { href: '/status', label: 'Status do Sistema' },
  ],
} as const

/**
 * Links de redes sociais
 */
const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
] as const

/**
 * Footer Component
 * Renderiza o rodapé com links e informações
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Grid principal */}
        <div className={styles.grid}>
          {/* Seção de Branding */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="FreteApp - Página inicial">
              <Truck className={styles.logoIcon} aria-hidden="true" />
              <span>FreteApp</span>
            </Link>
            <p className={styles.description}>
              Conectamos transportadores e embarcadores de forma rápida, segura e eficiente em todo o Brasil.
            </p>
            {/* Redes Sociais */}
            <nav className={styles.social} aria-label="Redes sociais">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Siga-nos no ${social.label}`}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Seção Plataforma */}
          <nav className={styles.section} aria-labelledby="footer-platform">
            <h3 id="footer-platform" className={styles.sectionTitle}>
              Plataforma
            </h3>
            {footerSections.plataforma.map(link => (
              <Link key={link.href} href={link.href} className={styles.sectionLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Seção Empresa */}
          <nav className={styles.section} aria-labelledby="footer-company">
            <h3 id="footer-company" className={styles.sectionTitle}>
              Empresa
            </h3>
            {footerSections.empresa.map(link => (
              <Link key={link.href} href={link.href} className={styles.sectionLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Seção Suporte */}
          <nav className={styles.section} aria-labelledby="footer-support">
            <h3 id="footer-support" className={styles.sectionTitle}>
              Suporte
            </h3>
            {footerSections.suporte.map(link => (
              <Link key={link.href} href={link.href} className={styles.sectionLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divisor */}
        <div className={styles.divider} role="separator" />

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} FreteApp. Todos os direitos reservados.
          </p>
          <nav className={styles.legal} aria-label="Links legais">
            <Link href="/termos-de-uso" className={styles.legalLink}>
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className={styles.legalLink}>
              Política de Privacidade
            </Link>
            <Link href="/cookies" className={styles.legalLink}>
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

/**
 * ==============================================
 * PRIVACY POLICY PAGE
 * Página de política de privacidade
 * 
 * Recursos Next.js 16 utilizados:
 * - Metadata estática
 * - Server Component
 * ==============================================
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header, Footer } from '@/components/layout'
import styles from '../termos-de-uso/page.module.css'

/**
 * Metadata para SEO
 */
export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade da plataforma FreteApp.',
}

/**
 * PrivacyPage Component
 */
export default function PrivacyPage() {
  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <article className={styles.container}>
          {/* Back link */}
          <Link href="/" className={styles.backLink}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao início
          </Link>

          {/* Content */}
          <header className={styles.header}>
            <h1 className={styles.title}>Política de Privacidade</h1>
            <p className={styles.date}>Última atualização: 28 de março de 2026</p>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>1. Informações que Coletamos</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como nome, 
                email, telefone e dados de veículos. Também coletamos informações 
                automaticamente, como dados de uso e localização.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Como Usamos suas Informações</h2>
              <p>
                Utilizamos suas informações para fornecer nossos serviços, 
                personalizar sua experiência, comunicar atualizações importantes 
                e melhorar nossa plataforma.
              </p>
            </section>

            <section className={styles.section}>
              <h2>3. Compartilhamento de Dados</h2>
              <p>
                Compartilhamos suas informações apenas quando necessário para 
                prestar nossos serviços, cumprir obrigações legais ou com seu 
                consentimento explícito.
              </p>
            </section>

            <section className={styles.section}>
              <h2>4. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais 
                para proteger suas informações contra acesso não autorizado, 
                perda ou alteração.
              </p>
            </section>

            <section className={styles.section}>
              <h2>5. Seus Direitos</h2>
              <p>
                Você tem direito de acessar, corrigir ou excluir seus dados 
                pessoais a qualquer momento. Para exercer esses direitos, 
                entre em contato conosco.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua 
                experiência de navegação e coletar dados analíticos sobre o 
                uso da plataforma.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Contato</h2>
              <p>
                Para dúvidas sobre esta política, entre em contato através do email: 
                <a href="mailto:privacidade@fleteapp.com" className={styles.link}>
                  privacidade@fleteapp.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}

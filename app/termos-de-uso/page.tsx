/**
 * ==============================================
 * TERMS OF USE PAGE
 * Página de termos de uso
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
import styles from './page.module.css'

/**
 * Metadata para SEO
 */
export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso da plataforma FreteApp.',
}

/**
 * TermsPage Component
 */
export default function TermsPage() {
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
            <h1 className={styles.title}>Termos de Uso</h1>
            <p className={styles.date}>Última atualização: 28 de março de 2026</p>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar a plataforma FreteApp, você concorda em cumprir 
                e estar vinculado a estes Termos de Uso. Se você não concordar com 
                qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Descrição do Serviço</h2>
              <p>
                O FreteApp é uma plataforma digital que conecta transportadores 
                e embarcadores, facilitando a negociação e contratação de serviços 
                de transporte de cargas em todo o Brasil.
              </p>
            </section>

            <section className={styles.section}>
              <h2>3. Cadastro e Conta</h2>
              <p>
                Para utilizar nossos serviços, você deve criar uma conta fornecendo 
                informações precisas e completas. Você é responsável por manter a 
                confidencialidade de sua senha e por todas as atividades realizadas 
                em sua conta.
              </p>
            </section>

            <section className={styles.section}>
              <h2>4. Responsabilidades do Usuário</h2>
              <p>
                Os usuários se comprometem a utilizar a plataforma de forma ética 
                e legal, não realizando atividades fraudulentas ou que violem 
                direitos de terceiros.
              </p>
            </section>

            <section className={styles.section}>
              <h2>5. Limitação de Responsabilidade</h2>
              <p>
                O FreteApp atua apenas como intermediário entre transportadores 
                e embarcadores. Não nos responsabilizamos por danos decorrentes 
                de transações realizadas através da plataforma.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Modificações</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                As alterações entrarão em vigor imediatamente após a publicação.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Contato</h2>
              <p>
                Para dúvidas sobre estes termos, entre em contato através do email: 
                <a href="mailto:juridico@freteapp.com.br" className={styles.link}>
                  juridico@freteapp.com.br
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

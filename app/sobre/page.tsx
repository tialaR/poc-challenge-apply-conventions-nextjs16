/**
 * ==============================================
 * ABOUT PAGE
 * Página institucional "Sobre Nós"
 * 
 * Recursos Next.js 16 utilizados:
 * - Metadata estática para SEO
 * - Server Component
 * ==============================================
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Target, Heart, Award, ArrowRight } from 'lucide-react'
import { Header, Footer } from '@/components/layout'
import { Button } from '@/components/ui/button'
import styles from './page.module.css'

/**
 * Metadata para SEO
 */
export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o FreteApp - A plataforma que conecta transportadores e embarcadores em todo o Brasil.',
  openGraph: {
    title: 'Sobre Nós | FreteApp',
    description: 'Conheça o FreteApp - A plataforma que conecta transportadores e embarcadores em todo o Brasil.',
  },
}

/**
 * Valores da empresa
 */
const values = [
  {
    icon: Users,
    title: 'Colaboração',
    description: 'Acreditamos que juntos somos mais fortes. Conectamos pessoas e negócios para criar oportunidades.',
  },
  {
    icon: Target,
    title: 'Eficiência',
    description: 'Buscamos sempre otimizar processos e reduzir custos para nossos usuários.',
  },
  {
    icon: Heart,
    title: 'Compromisso',
    description: 'Estamos comprometidos com a satisfação dos nossos clientes e parceiros.',
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Mantemos os mais altos padrões em tudo o que fazemos.',
  },
]

/**
 * AboutPage Component
 */
export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className={styles.main}>
        {/* Hero section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Transformando o transporte de cargas no Brasil
            </h1>
            <p className={styles.heroDescription}>
              Somos a plataforma que conecta transportadores e embarcadores, 
              simplificando a logística e criando oportunidades para todos.
            </p>
          </div>
        </section>

        {/* Mission section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.textContent}>
                <h2 className={styles.sectionTitle}>Nossa Missão</h2>
                <p className={styles.text}>
                  Nascemos com o propósito de revolucionar o setor de transporte de cargas no Brasil. 
                  Entendemos os desafios enfrentados tanto por transportadores quanto por embarcadores 
                  e criamos uma solução que beneficia ambos os lados.
                </p>
                <p className={styles.text}>
                  Nossa plataforma utiliza tecnologia de ponta para conectar quem precisa enviar 
                  com quem pode transportar, de forma rápida, segura e eficiente.
                </p>
              </div>
              <div className={styles.statsBox}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>10.000+</span>
                  <span className={styles.statLabel}>Fretes realizados</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>5.000+</span>
                  <span className={styles.statLabel}>Transportadores</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>2.000+</span>
                  <span className={styles.statLabel}>Embarcadores</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>27</span>
                  <span className={styles.statLabel}>Estados atendidos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className={styles.valuesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Nossos Valores</h2>
            <div className={styles.valuesGrid}>
              {values.map(value => (
                <div key={value.title} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Faça parte dessa transformação</h2>
            <p className={styles.ctaDescription}>
              Junte-se a milhares de transportadores e embarcadores que já confiam no FreteApp.
            </p>
            <div className={styles.ctaActions}>
              <Button size="lg" asChild>
                <Link href="/fretes">
                  Ver Fretes Disponíveis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contato">Falar Conosco</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

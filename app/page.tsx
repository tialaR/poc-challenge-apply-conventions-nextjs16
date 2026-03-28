/**
 * ==============================================
 * HOME PAGE
 * Página inicial da aplicação
 * 
 * Recursos Next.js 16 utilizados:
 * - Server Component (padrão)
 * - Metadata estática
 * - Link para navegação client-side
 * - Image otimizado
 * ==============================================
 */

import Link from 'next/link'
import { ArrowRight, Truck, Shield, Zap, Users } from 'lucide-react'
import { Header, Footer } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { mockFreights } from '@/lib/mock-data'
import { FreightCard } from '@/components/freight'
import styles from './page.module.css'

/**
 * Dados das features para a seção "Como funciona"
 */
const features = [
  {
    icon: Truck,
    title: 'Fretes em Todo Brasil',
    description: 'Milhares de fretes disponíveis diariamente em todas as regiões do país.',
  },
  {
    icon: Shield,
    title: 'Segurança Garantida',
    description: 'Transportadores e embarcadores verificados para sua tranquilidade.',
  },
  {
    icon: Zap,
    title: 'Negociação Rápida',
    description: 'Conecte-se diretamente com quem oferece ou busca frete.',
  },
  {
    icon: Users,
    title: 'Comunidade Ativa',
    description: 'Faça parte de uma rede com milhares de profissionais do transporte.',
  },
] as const

/**
 * Dados de estatísticas
 */
const stats = [
  { value: '10k+', label: 'Fretes Publicados' },
  { value: '5k+', label: 'Transportadores' },
  { value: '2k+', label: 'Embarcadores' },
  { value: '98%', label: 'Satisfação' },
] as const

/**
 * Home Page Component
 * Landing page com hero, features e fretes em destaque
 */
export default function HomePage() {
  // Pega os 3 primeiros fretes para destaque
  const featuredFreights = mockFreights.slice(0, 3)

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Encontre o Frete Ideal para Seu{' '}
              <span className={styles.heroHighlight}>Caminhão</span>
            </h1>
            <p className={styles.heroDescription}>
              Conectamos transportadores e embarcadores de forma rápida, segura e eficiente. 
              Milhares de fretes disponíveis em todo o Brasil.
            </p>
            <div className={styles.heroActions}>
              <Button asChild size="lg">
                <Link href="/fretes">
                  Ver Fretes Disponíveis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className={styles.stats}>
            {stats.map(stat => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Por que usar o FreteApp?</h2>
            <p className={styles.sectionDescription}>
              A plataforma mais completa para conectar quem transporta com quem precisa enviar.
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            {features.map(feature => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Freights Section */}
        <section className={styles.featured}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Fretes em Destaque</h2>
            <p className={styles.sectionDescription}>
              Confira alguns dos fretes disponíveis agora mesmo.
            </p>
          </div>
          
          <div className={styles.freightsGrid}>
            {featuredFreights.map((freight, index) => (
              <FreightCard 
                key={freight.id} 
                freight={freight}
                priority={index === 0}
              />
            ))}
          </div>
          
          <div className={styles.ctaCenter}>
            <Button asChild size="lg" variant="outline">
              <Link href="/fretes">
                Ver Todos os Fretes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Pronto para começar?</h2>
            <p className={styles.ctaDescription}>
              Cadastre-se gratuitamente e comece a encontrar fretes ou transportadores hoje mesmo.
            </p>
            <div className={styles.ctaActions}>
              <Button size="lg">Criar Conta Grátis</Button>
              <Button variant="outline" size="lg">Falar com Suporte</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

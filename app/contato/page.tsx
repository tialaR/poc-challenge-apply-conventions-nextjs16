/**
 * ==============================================
 * CONTACT PAGE
 * Página de contato com formulário
 * 
 * Recursos Next.js 16 utilizados:
 * - Server Actions para formulário
 * - Metadata estática
 * - Client Components para interatividade
 * ==============================================
 */

import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Header, Footer } from '@/components/layout'
import { ContactForm } from './contact-form'
import styles from './page.module.css'

/**
 * Metadata para SEO
 */
export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o FreteApp. Estamos prontos para ajudar você.',
  openGraph: {
    title: 'Contato | FreteApp',
    description: 'Entre em contato com o FreteApp. Estamos prontos para ajudar você.',
  },
}

/**
 * Informações de contato
 */
const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contato@freteapp.com.br',
    link: 'mailto:contato@freteapp.com.br',
  },
  {
    icon: Phone,
    title: 'Telefone',
    value: '(11) 4000-0000',
    link: 'tel:+551140000000',
  },
  {
    icon: MapPin,
    title: 'Endereço',
    value: 'São Paulo, SP - Brasil',
    link: null,
  },
  {
    icon: Clock,
    title: 'Horário',
    value: 'Seg - Sex, 8h às 18h',
    link: null,
  },
]

/**
 * ContactPage Component
 */
export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>Entre em Contato</h1>
            <p className={styles.description}>
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar.
              Preencha o formulário ou use um dos nossos canais de atendimento.
            </p>
          </header>

          {/* Content grid */}
          <div className={styles.grid}>
            {/* Contact form */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Envie sua mensagem</h2>
              <ContactForm />
            </div>

            {/* Contact info */}
            <aside className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Informações de contato</h2>
              
              <div className={styles.infoList}>
                {contactInfo.map(info => (
                  <div key={info.title} className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <info.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className={styles.infoContent}>
                      <span className={styles.infoTitle}>{info.title}</span>
                      {info.link ? (
                        <a href={info.link} className={styles.infoLink}>
                          {info.value}
                        </a>
                      ) : (
                        <span className={styles.infoValue}>{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ link */}
              <div className={styles.faqBox}>
                <h3 className={styles.faqTitle}>Perguntas frequentes</h3>
                <p className={styles.faqText}>
                  Antes de entrar em contato, confira se sua dúvida já foi respondida em nossa FAQ.
                </p>
                <a href="/faq" className={styles.faqLink}>
                  Ver Perguntas Frequentes
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

/**
 * ==============================================
 * FRETES LAYOUT
 * Layout compartilhado para páginas de fretes
 * 
 * Recursos Next.js 16 utilizados:
 * - Nested Layouts
 * - Metadata gerada para SEO
 * - Header/Footer compartilhados
 * ==============================================
 */

import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'

/**
 * Metadata específica para a seção de fretes
 */
export const metadata: Metadata = {
  title: 'Fretes Disponíveis',
  description: 'Encontre fretes disponíveis em todo o Brasil. Filtre por origem, destino, tipo de veículo e muito mais.',
  openGraph: {
    title: 'Fretes Disponíveis | FreteApp',
    description: 'Encontre fretes disponíveis em todo o Brasil',
  },
}

/**
 * Fretes Layout Component
 * Envolve todas as páginas da seção /fretes
 */
export default function FretesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Header global */}
      <Header />
      
      {/* Conteúdo da página de fretes */}
      <main className="min-h-screen bg-background">
        {children}
      </main>
      
      {/* Footer global */}
      <Footer />
    </>
  )
}

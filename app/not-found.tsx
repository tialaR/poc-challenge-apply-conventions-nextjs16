/**
 * ==============================================
 * GLOBAL NOT FOUND PAGE
 * Página 404 global da aplicação
 * 
 * Recursos Next.js 16 utilizados:
 * - Arquivo especial not-found.tsx na raiz do app
 * - Captura todas as rotas não encontradas
 * ==============================================
 */

import Link from 'next/link'
import { FileQuestion, Home, Search, ArrowLeft } from 'lucide-react'
import { Header, Footer } from '@/components/layout'
import { Button } from '@/components/ui/button'
import styles from './not-found.module.css'

/**
 * NotFound Component
 * Renderizado para qualquer rota não encontrada
 */
export default function NotFound() {
  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Código 404 */}
          <span className={styles.code}>404</span>

          {/* Ícone */}
          <div className={styles.iconWrapper}>
            <FileQuestion className={styles.icon} aria-hidden="true" />
          </div>

          {/* Texto */}
          <h1 className={styles.title}>Página não encontrada</h1>
          <p className={styles.description}>
            A página que você está procurando não existe ou foi movida.
            Verifique o endereço ou navegue por nosso site.
          </p>

          {/* Ações */}
          <div className={styles.actions}>
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                Ir para o Início
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/fretes">
                <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                Buscar Fretes
              </Link>
            </Button>
          </div>

          {/* Link adicional */}
          <Link href="/contato" className={styles.helpLink}>
            Precisa de ajuda? Entre em contato
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}

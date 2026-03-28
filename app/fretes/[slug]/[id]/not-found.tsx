/**
 * ==============================================
 * FREIGHT NOT FOUND PAGE
 * Página 404 específica para fretes
 * 
 * Recursos Next.js 16 utilizados:
 * - Arquivo especial not-found.tsx
 * - Chamado por notFound() no page.tsx
 * ==============================================
 */

import Link from 'next/link'
import { FileX, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import styles from './not-found.module.css'

/**
 * NotFound Component
 * Renderizado quando um frete não é encontrado
 */
export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Ícone */}
        <div className={styles.iconWrapper}>
          <FileX className={styles.icon} aria-hidden="true" />
        </div>

        {/* Texto */}
        <h2 className={styles.title}>Frete não encontrado</h2>
        <p className={styles.description}>
          O frete que você está procurando não existe ou pode ter sido removido.
          Que tal buscar outros fretes disponíveis?
        </p>

        {/* Ações */}
        <div className={styles.actions}>
          <Button asChild>
            <Link href="/fretes">
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              Buscar Fretes
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Voltar ao Início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

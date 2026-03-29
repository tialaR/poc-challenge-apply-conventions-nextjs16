/**
 * ==============================================
 * FREIGHT LIST ERROR
 * Tratamento de erros para a página de fretes
 * 
 * Recursos Next.js 16 utilizados:
 * - Error Boundary com arquivo especial error.tsx
 * - Client Component obrigatório para error boundaries
 * - Função reset para retry
 * ==============================================
 */

'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import styles from './error.module.css'

/**
 * Props do Error Component
 */
interface ErrorProps {
  /** Objeto de erro capturado */
  error: Error & { digest?: string }
  /** Função para tentar novamente */
  reset: () => void
}

/**
 * Error Component
 * Renderizado quando ocorre um erro na página de fretes
 */
export default function Error({ error, reset }: ErrorProps) {
  // Log do erro para debugging
  useEffect(() => {
    console.error('Erro na página de fretes:', error)
  }, [error])

  return (
    <div className={styles.container} role="alert">
      <div className={styles.content}>
        {/* Ícone de erro */}
        <div className={styles.iconWrapper}>
          <AlertTriangle className={styles.icon} aria-hidden="true" />
        </div>

        {/* Mensagem de erro */}
        <h2 className={styles.title}>Algo deu errado</h2>
        <p className={styles.description}>
          Não foi possível carregar a lista de fretes. 
          Por favor, tente novamente em alguns instantes.
        </p>

        {/* Detalhes do erro (apenas em dev) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className={styles.details}>
            <summary className={styles.summary}>Detalhes do erro</summary>
            <pre className={styles.errorMessage}>{error.message}</pre>
            {error.digest && (
              <p className={styles.digest}>Digest: {error.digest}</p>
            )}
          </details>
        )}

        {/* Ações */}
        <div className={styles.actions}>
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            Tentar Novamente
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Voltar ao Início</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

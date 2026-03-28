/**
 * ==============================================
 * FREIGHT LIST LOADING
 * Skeleton de loading para a página de fretes
 * 
 * Recursos Next.js 16 utilizados:
 * - Loading UI com arquivo especial loading.tsx
 * - Exibido automaticamente durante navegação
 * - Streaming com Suspense
 * ==============================================
 */

import { FreightCardSkeleton } from '@/components/freight'
import styles from './page.module.css'

/**
 * Loading Component
 * Renderizado automaticamente durante carregamento da página
 */
export default function Loading() {
  return (
    <div className={styles.container}>
      {/* Header skeleton */}
      <header className={styles.header}>
        <div 
          className="h-8 w-64 bg-muted rounded animate-pulse"
          aria-hidden="true"
        />
        <div 
          className="h-5 w-96 bg-muted rounded animate-pulse mt-2"
          aria-hidden="true"
        />
      </header>

      {/* Filters skeleton */}
      <section className={styles.filtersSection}>
        <div className={styles.filtersSkeleton} aria-hidden="true" />
      </section>

      {/* List skeleton */}
      <section className={styles.listSection}>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <FreightCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Carregando fretes...
      </div>
    </div>
  )
}

/**
 * ==============================================
 * FREIGHT DETAILS LOADING
 * Skeleton de loading para a página de detalhes
 * 
 * Recursos Next.js 16 utilizados:
 * - Loading UI automático
 * - Streaming com Suspense
 * ==============================================
 */

import styles from './page.module.css'

/**
 * Loading Component
 * Renderizado durante carregamento da página de detalhes
 */
export default function Loading() {
  return (
    <div className={styles.container}>
      {/* Breadcrumb skeleton */}
      <nav className={styles.breadcrumb}>
        <div className="h-5 w-32 bg-muted rounded animate-pulse" />
      </nav>

      {/* Grid skeleton */}
      <div className={styles.grid}>
        {/* Main column skeleton */}
        <div className={styles.mainColumn}>
          {/* Header skeleton */}
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
              <div className="h-5 w-40 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-10 w-40 bg-muted rounded animate-pulse" />
          </header>

          {/* Route section skeleton */}
          <div className={styles.section}>
            <div className="h-6 w-24 bg-muted rounded animate-pulse mb-4" />
            <div className="space-y-4">
              <div className="h-16 bg-muted rounded animate-pulse" />
              <div className="h-16 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Details section skeleton */}
          <div className={styles.section}>
            <div className="h-6 w-40 bg-muted rounded animate-pulse mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Description section skeleton */}
          <div className={styles.section}>
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <aside className={styles.sidebar}>
          {/* Shipper card skeleton */}
          <div className={styles.card}>
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 bg-muted rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Form card skeleton */}
          <div className={styles.card}>
            <div className="h-6 w-40 bg-muted rounded animate-pulse mb-4" />
            <div className="space-y-4">
              <div className="h-12 w-full bg-muted rounded animate-pulse" />
              <div className="h-24 w-full bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
            </div>
          </div>
        </aside>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Carregando detalhes do frete...
      </div>
    </div>
  )
}

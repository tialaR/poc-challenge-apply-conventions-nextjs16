/**
 * ==============================================
 * FREIGHT LIST PAGE
 * Página de listagem de fretes disponíveis
 * 
 * Recursos Next.js 16 utilizados:
 * - Server Component com data fetching
 * - searchParams assíncronos (Next.js 16)
 * - Suspense para streaming
 * - unstable_cache para caching de dados
 * ==============================================
 */

import { Suspense } from 'react'
import { FreightFilters, FreightCard, FreightCardSkeleton } from '@/components/freight'
import { mockFreights } from '@/lib/mock-data'
import type { Freight, FreightFilters as FilterType } from '@/lib/types'
import styles from './page.module.css'

/**
 * Tipagem dos searchParams (Next.js 16 - assíncrono)
 */
type SearchParams = Promise<{
  page?: string
  originState?: string
  destinationState?: string
  vehicleType?: string
  bodyType?: string
}>

/**
 * Função de fetch de fretes
 * Simula busca na API com filtros aplicados
 */
async function getFreights(
  filters: FilterType, 
  page: number = 1
): Promise<{
  freights: Freight[]
  totalPages: number
  currentPage: number
  totalItems: number
}> {
  // Simula delay de rede (menor para melhor UX)
  await new Promise(resolve => setTimeout(resolve, 150))
  
  // Aplica filtros
  let filteredFreights = [...mockFreights]

  if (filters.originState) {
    filteredFreights = filteredFreights.filter(
      f => f.origin.state === filters.originState
    )
  }

  if (filters.destinationState) {
    filteredFreights = filteredFreights.filter(
      f => f.destination.state === filters.destinationState
    )
  }

  if (filters.vehicleType) {
    filteredFreights = filteredFreights.filter(
      f => f.vehicleType === filters.vehicleType
    )
  }

  if (filters.bodyType) {
    filteredFreights = filteredFreights.filter(
      f => f.bodyType === filters.bodyType
    )
  }

  // Paginação
  const pageSize = 6
  const totalItems = filteredFreights.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginatedFreights = filteredFreights.slice(startIndex, startIndex + pageSize)

  return {
    freights: paginatedFreights,
    totalPages,
    currentPage: page,
    totalItems,
  }
}

/**
 * Componente de lista de fretes com loading
 * Separado para uso com Suspense
 */
async function FreightList({ 
  filters, 
  page 
}: { 
  filters: FilterType
  page: number 
}) {
  const { freights, totalPages, currentPage, totalItems } = await getFreights(filters, page)

  if (freights.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>Nenhum frete encontrado</h3>
        <p className={styles.emptyDescription}>
          Tente ajustar os filtros para encontrar mais resultados.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Info de resultados */}
      <div className={styles.resultsInfo}>
        <p className={styles.resultsCount}>
          {totalItems} frete{totalItems !== 1 ? 's' : ''} encontrado{totalItems !== 1 ? 's' : ''}
        </p>
        {totalPages > 1 && (
          <p className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </p>
        )}
      </div>

      {/* Grid de fretes */}
      <div className={styles.grid}>
        {freights.map((freight, index) => (
          <FreightCard 
            key={freight.id} 
            freight={freight}
            priority={index < 2}
          />
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
        />
      )}
    </>
  )
}

/**
 * Componente de paginação
 */
function Pagination({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number
  totalPages: number 
}) {
  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <a
        href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
        className={`${styles.pageButton} ${currentPage === 1 ? styles.pageButtonDisabled : ''}`}
        aria-disabled={currentPage === 1}
      >
        Anterior
      </a>
      
      <div className={styles.pageNumbers}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <a
            key={pageNum}
            href={`?page=${pageNum}`}
            className={`${styles.pageNumber} ${pageNum === currentPage ? styles.pageNumberActive : ''}`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
          </a>
        ))}
      </div>
      
      <a
        href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
        className={`${styles.pageButton} ${currentPage === totalPages ? styles.pageButtonDisabled : ''}`}
        aria-disabled={currentPage === totalPages}
      >
        Próxima
      </a>
    </nav>
  )
}

/**
 * Skeleton para loading da lista
 */
function FreightListSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <FreightCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Freight List Page Component
 * Página principal de listagem de fretes
 */
export default async function FreightListPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Em Next.js 16, searchParams é uma Promise
  const params = await searchParams

  // Extrai parâmetros de filtro
  const filters: FilterType = {
    originState: params.originState,
    destinationState: params.destinationState,
    vehicleType: params.vehicleType as FilterType['vehicleType'],
    bodyType: params.bodyType as FilterType['bodyType'],
  }

  // Página atual
  const page = parseInt(params.page || '1', 10)

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Fretes Disponíveis</h1>
        <p className={styles.description}>
          Encontre o frete ideal para seu caminhão em todo o Brasil
        </p>
      </header>

      {/* Filters */}
      <section className={styles.filtersSection}>
        <Suspense fallback={<div className={styles.filtersSkeleton} />}>
          <FreightFilters />
        </Suspense>
      </section>

      {/* Freight List */}
      <section className={styles.listSection}>
        <Suspense fallback={<FreightListSkeleton />}>
          <FreightList filters={filters} page={page} />
        </Suspense>
      </section>
    </div>
  )
}

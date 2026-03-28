/**
 * ==============================================
 * FREIGHT FILTERS COMPONENT
 * Filtros para busca de fretes
 * 
 * Recursos utilizados:
 * - Client Component para interatividade
 * - useSearchParams para sincronizar com URL
 * - useRouter para navegação programática
 * - useTransition para estados de loading
 * ==============================================
 */

'use client'

import { useCallback, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { brazilianStates } from '@/lib/mock-data'
import { vehicleTypeLabels, bodyTypeLabels } from '@/lib/types'
import type { VehicleType, BodyType } from '@/lib/types'
import styles from './freight-filters.module.css'

/**
 * FreightFilters Component
 * Renderiza os filtros de busca de fretes
 * Sincroniza estado com URL para compartilhamento
 */
export function FreightFilters() {
  // Hook para transições com loading state
  const [isPending, startTransition] = useTransition()
  
  // Hooks de navegação
  const router = useRouter()
  const searchParams = useSearchParams()

  // Valores atuais dos filtros
  const originState = searchParams.get('originState') || ''
  const destinationState = searchParams.get('destinationState') || ''
  const vehicleType = searchParams.get('vehicleType') || ''
  const bodyType = searchParams.get('bodyType') || ''

  /**
   * Atualiza um filtro específico na URL
   * Usa startTransition para não bloquear a UI
   */
  const updateFilter = useCallback((key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      
      // Reset para página 1 ao filtrar
      params.set('page', '1')
      
      router.push(`/fretes?${params.toString()}`)
    })
  }, [router, searchParams])

  /**
   * Limpa todos os filtros
   */
  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      router.push('/fretes')
    })
  }, [router])

  /**
   * Remove um filtro específico
   */
  const removeFilter = useCallback((key: string) => {
    updateFilter(key, '')
  }, [updateFilter])

  // Verifica se há filtros aplicados
  const hasFilters = originState || destinationState || vehicleType || bodyType

  // Lista de filtros aplicados para exibição
  const appliedFilters = [
    originState && { key: 'originState', label: `Origem: ${originState}` },
    destinationState && { key: 'destinationState', label: `Destino: ${destinationState}` },
    vehicleType && { key: 'vehicleType', label: `Veículo: ${vehicleTypeLabels[vehicleType as VehicleType]}` },
    bodyType && { key: 'bodyType', label: `Carroceria: ${bodyTypeLabels[bodyType as BodyType]}` },
  ].filter(Boolean) as { key: string; label: string }[]

  return (
    <div className={styles.container} role="search" aria-label="Filtros de fretes">
      {/* Header dos filtros */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Filter className="inline-block w-4 h-4 mr-2" aria-hidden="true" />
          Filtros
        </h2>
        <button
          type="button"
          className={styles.clearButton}
          onClick={clearAllFilters}
          disabled={!hasFilters || isPending}
          aria-label="Limpar todos os filtros"
        >
          Limpar filtros
        </button>
      </div>

      {/* Grid de filtros */}
      <div className={styles.grid}>
        {/* Filtro de estado de origem */}
        <div className={styles.fieldGroup}>
          <label htmlFor="originState" className={styles.label}>
            Estado de Origem
          </label>
          <select
            id="originState"
            className={styles.select}
            value={originState}
            onChange={(e) => updateFilter('originState', e.target.value)}
            disabled={isPending}
          >
            <option value="">Todos os estados</option>
            {brazilianStates.map(state => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de estado de destino */}
        <div className={styles.fieldGroup}>
          <label htmlFor="destinationState" className={styles.label}>
            Estado de Destino
          </label>
          <select
            id="destinationState"
            className={styles.select}
            value={destinationState}
            onChange={(e) => updateFilter('destinationState', e.target.value)}
            disabled={isPending}
          >
            <option value="">Todos os estados</option>
            {brazilianStates.map(state => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de tipo de veículo */}
        <div className={styles.fieldGroup}>
          <label htmlFor="vehicleType" className={styles.label}>
            Tipo de Veículo
          </label>
          <select
            id="vehicleType"
            className={styles.select}
            value={vehicleType}
            onChange={(e) => updateFilter('vehicleType', e.target.value)}
            disabled={isPending}
          >
            <option value="">Todos os veículos</option>
            {Object.entries(vehicleTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de tipo de carroceria */}
        <div className={styles.fieldGroup}>
          <label htmlFor="bodyType" className={styles.label}>
            Tipo de Carroceria
          </label>
          <select
            id="bodyType"
            className={styles.select}
            value={bodyType}
            onChange={(e) => updateFilter('bodyType', e.target.value)}
            disabled={isPending}
          >
            <option value="">Todas as carrocerias</option>
            {Object.entries(bodyTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags de filtros aplicados */}
      {appliedFilters.length > 0 && (
        <div className={styles.appliedFilters} role="list" aria-label="Filtros aplicados">
          {appliedFilters.map(filter => (
            <span key={filter.key} className={styles.filterTag} role="listitem">
              {filter.label}
              <button
                type="button"
                className={styles.removeFilter}
                onClick={() => removeFilter(filter.key)}
                aria-label={`Remover filtro ${filter.label}`}
              >
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

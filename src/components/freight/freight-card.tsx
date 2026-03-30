/**
 * ==============================================
 * FREIGHT CARD COMPONENT
 * Card para exibição de frete na listagem
 * 
 * Recursos utilizados:
 * - Server Component (sem estado)
 * - CSS Modules para estilos
 * - Formatadores para valores
 * - Link do Next.js para navegação
 * ==============================================
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Freight } from '@/lib/types'
import { 
  formatCurrency, 
  formatDistance, 
  formatWeight,
  formatRelativeTime,
  formatLocation
} from '@/shared/utils/formatter'
import { 
  vehicleTypeLabels, 
  bodyTypeLabels, 
  freightStatusLabels,
  freightStatusColors 
} from '@/lib/types'
import styles from './freight-card.module.css'

/**
 * Props do componente FreightCard
 */
interface FreightCardProps {
  /** Dados do frete a ser exibido */
  freight: Freight
  /** Prioridade de carregamento da imagem (LCP) */
  priority?: boolean
}

/**
 * FreightCard Component
 * Renderiza um card com informações resumidas do frete
 * Usado na listagem de fretes disponíveis
 */
export function FreightCard({ freight, priority = false }: FreightCardProps) {
  // Gera a URL do frete com slug e ID
  const freightUrl = `/fretes/${freight.slug}/${freight.id}`

  return (
    <Link href={freightUrl} className={styles.card}>
      {/* Header: Título e Status */}
      <div className={styles.header}>
        <h3 className={styles.title}>{freight.title}</h3>
        <span className={`${styles.badge} ${freightStatusColors[freight.status]}`}>
          {freightStatusLabels[freight.status]}
        </span>
      </div>

      {/* Rota: Origem -> Destino */}
      <div className={styles.route}>
        {/* Origem */}
        <div className={styles.location}>
          <span className={styles.city}>{freight.origin.city}</span>
          <span className={styles.state}>{freight.origin.state}</span>
        </div>

        {/* Ícone de rota */}
        <div className={styles.routeIcon} aria-hidden="true">
          <div className={styles.routeLine} />
        </div>

        {/* Destino */}
        <div className={styles.location}>
          <span className={styles.city}>{freight.destination.city}</span>
          <span className={styles.state}>{freight.destination.state}</span>
        </div>
      </div>

      {/* Grid de Detalhes */}
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Distância</span>
          <span className={styles.detailValue}>{formatDistance(freight.distance)}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Peso</span>
          <span className={styles.detailValue}>{formatWeight(freight.weight)}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Veículo</span>
          <span className={styles.detailValue}>{vehicleTypeLabels[freight.vehicleType]}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Carroceria</span>
          <span className={styles.detailValue}>{bodyTypeLabels[freight.bodyType]}</span>
        </div>
      </div>

      {/* Footer: Preço e Meta */}
      <div className={styles.footer}>
        <span className={styles.price}>{formatCurrency(freight.price)}</span>
        <div className={styles.meta}>
          {freight.shipper.avatar && (
            <Image
              src={freight.shipper.avatar}
              alt={`Avatar de ${freight.shipper.name}`}
              width={24}
              height={24}
              className={styles.avatar}
              priority={priority}
            />
          )}
          <span>{formatRelativeTime(freight.createdAt)}</span>
        </div>
      </div>
    </Link>
  )
}

/**
 * FreightCardSkeleton Component
 * Versão de loading do card de frete
 * Usado durante carregamento com Suspense
 */
export function FreightCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.header}>
        <div className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`} />
        <div className={styles.skeletonLine} style={{ width: '60px' }} />
      </div>

      <div className={styles.route}>
        <div className={styles.location}>
          <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
          <div className={styles.skeletonLine} style={{ width: '30px', height: '0.75rem' }} />
        </div>
        <div className={styles.routeIcon}>
          <div className={styles.routeLine} />
        </div>
        <div className={styles.location}>
          <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
          <div className={styles.skeletonLine} style={{ width: '30px', height: '0.75rem' }} />
        </div>
      </div>

      <div className={styles.details}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={styles.detailItem}>
            <div className={styles.skeletonLine} style={{ width: '50px', height: '0.6875rem' }} />
            <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.skeletonLine} style={{ width: '100px', height: '1.5rem' }} />
        <div className={styles.skeletonLine} style={{ width: '80px', height: '1rem' }} />
      </div>
    </div>
  )
}

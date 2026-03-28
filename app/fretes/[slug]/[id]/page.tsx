/**
 * ==============================================
 * FREIGHT DETAILS PAGE
 * Página de detalhes de um frete específico
 * 
 * Recursos Next.js 16 utilizados:
 * - Dynamic Routes com [slug] e [id]
 * - generateMetadata para SEO dinâmico
 * - params assíncronos (Next.js 16)
 * - notFound() para 404
 * - Server Component com data fetching
 * ==============================================
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { 
  ArrowLeft, 
  MapPin, 
  Truck, 
  Package, 
  Calendar,
  User,
  Star,
  Phone,
  Mail,
  Clock,
  Shield
} from 'lucide-react'
import { getFreightBySlugAndId } from '@/lib/mock-data'
import { 
  formatCurrency, 
  formatDistance, 
  formatWeight,
  formatDate,
  formatLocation,
  formatPhone,
  formatRating
} from '@/lib/formatters'
import { 
  vehicleTypeLabels, 
  bodyTypeLabels, 
  freightStatusLabels,
  freightStatusColors 
} from '@/lib/types'
import { Button } from '@/components/ui/button'
import { InterestForm } from './interest-form'
import styles from './page.module.css'

/**
 * Tipagem dos parâmetros da rota dinâmica
 * Em Next.js 16, params é uma Promise
 */
type Params = Promise<{
  slug: string
  id: string
}>

/**
 * generateMetadata - Gera metadata dinâmica para SEO
 * Chamado automaticamente pelo Next.js para cada página
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  const { slug, id } = await params
  const freight = getFreightBySlugAndId(slug, id)

  if (!freight) {
    return {
      title: 'Frete não encontrado',
    }
  }

  return {
    title: freight.title,
    description: `Frete de ${freight.origin.city} para ${freight.destination.city}. ${freight.description}`,
    openGraph: {
      title: `${freight.title} | FreteApp`,
      description: `${formatLocation(freight.origin.city, freight.origin.state)} para ${formatLocation(freight.destination.city, freight.destination.state)} - ${formatCurrency(freight.price)}`,
    },
  }
}

/**
 * FreightDetailsPage Component
 * Exibe todos os detalhes de um frete específico
 */
export default async function FreightDetailsPage({
  params,
}: {
  params: Params
}) {
  // Aguarda os params (Next.js 16)
  const { slug, id } = await params
  
  // Busca o frete pelo slug e ID
  const freight = getFreightBySlugAndId(slug, id)

  // Retorna 404 se não encontrado
  if (!freight) {
    notFound()
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb / Back navigation */}
      <nav className={styles.breadcrumb} aria-label="Navegação">
        <Link href="/fretes" className={styles.backLink}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Voltar para lista</span>
        </Link>
      </nav>

      {/* Main content grid */}
      <div className={styles.grid}>
        {/* Main info column */}
        <article className={styles.mainColumn}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <span className={`${styles.badge} ${freightStatusColors[freight.status]}`}>
                {freightStatusLabels[freight.status]}
              </span>
              <span className={styles.date}>
                <Clock className="h-4 w-4" aria-hidden="true" />
                Publicado em {formatDate(freight.createdAt)}
              </span>
            </div>
            <h1 className={styles.title}>{freight.title}</h1>
            <p className={styles.price}>{formatCurrency(freight.price)}</p>
          </header>

          {/* Route section */}
          <section className={styles.section} aria-labelledby="route-heading">
            <h2 id="route-heading" className={styles.sectionTitle}>
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Rota
            </h2>
            <div className={styles.route}>
              <div className={styles.routePoint}>
                <div className={styles.routeMarker} data-type="origin" />
                <div className={styles.routeInfo}>
                  <span className={styles.routeLabel}>Origem</span>
                  <span className={styles.routeCity}>{freight.origin.city}, {freight.origin.state}</span>
                  {freight.origin.address && (
                    <span className={styles.routeAddress}>{freight.origin.address}</span>
                  )}
                </div>
              </div>
              <div className={styles.routeLine} aria-hidden="true" />
              <div className={styles.routePoint}>
                <div className={styles.routeMarker} data-type="destination" />
                <div className={styles.routeInfo}>
                  <span className={styles.routeLabel}>Destino</span>
                  <span className={styles.routeCity}>{freight.destination.city}, {freight.destination.state}</span>
                  {freight.destination.address && (
                    <span className={styles.routeAddress}>{freight.destination.address}</span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.distance}>
              <span>Distância total:</span>
              <strong>{formatDistance(freight.distance)}</strong>
            </div>
          </section>

          {/* Cargo details section */}
          <section className={styles.section} aria-labelledby="cargo-heading">
            <h2 id="cargo-heading" className={styles.sectionTitle}>
              <Package className="h-5 w-5" aria-hidden="true" />
              Detalhes da Carga
            </h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tipo de Veículo</span>
                <span className={styles.detailValue}>{vehicleTypeLabels[freight.vehicleType]}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tipo de Carroceria</span>
                <span className={styles.detailValue}>{bodyTypeLabels[freight.bodyType]}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Peso</span>
                <span className={styles.detailValue}>{formatWeight(freight.weight)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Validade</span>
                <span className={styles.detailValue}>{formatDate(freight.expiresAt)}</span>
              </div>
            </div>
          </section>

          {/* Description section */}
          <section className={styles.section} aria-labelledby="description-heading">
            <h2 id="description-heading" className={styles.sectionTitle}>
              <Truck className="h-5 w-5" aria-hidden="true" />
              Descrição
            </h2>
            <p className={styles.description}>{freight.description}</p>
          </section>
        </article>

        {/* Sidebar column */}
        <aside className={styles.sidebar}>
          {/* Shipper card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <User className="h-5 w-5" aria-hidden="true" />
              Embarcador
            </h3>
            <div className={styles.shipperInfo}>
              {freight.shipper.avatar && (
                <Image
                  src={freight.shipper.avatar}
                  alt={`Foto de ${freight.shipper.name}`}
                  width={64}
                  height={64}
                  className={styles.shipperAvatar}
                />
              )}
              <div className={styles.shipperDetails}>
                <span className={styles.shipperName}>{freight.shipper.name}</span>
                <span className={styles.shipperCompany}>{freight.shipper.company}</span>
                <div className={styles.shipperRating}>
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>{formatRating(freight.shipper.rating)}</span>
                  <span className={styles.shipperTrips}>
                    ({freight.shipper.totalFreights} fretes)
                  </span>
                </div>
              </div>
            </div>

            {/* Verification badge */}
            <div className={styles.verification}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>Embarcador verificado</span>
            </div>

            {/* Contact buttons */}
            <div className={styles.contactButtons}>
              {freight.shipper.phone && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${freight.shipper.phone}`}>
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    {formatPhone(freight.shipper.phone)}
                  </a>
                </Button>
              )}
              {freight.shipper.email && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${freight.shipper.email}`}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                    Enviar Email
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Interest form */}
          <InterestForm freightId={freight.id} freightPrice={freight.price} />
        </aside>
      </div>
    </div>
  )
}

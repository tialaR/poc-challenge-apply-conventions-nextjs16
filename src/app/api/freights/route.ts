/**
 * ==============================================
 * API ROUTE: Listagem de Fretes
 * GET /api/freights - Lista fretes com filtros e paginação
 * 
 * Recursos Next.js 16 utilizados:
 * - Route Handlers com App Router
 * - Tipagem completa com TypeScript
 * - Simulação de delay para UX realista
 * ==============================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { mockFreights } from '@/lib/mock-data'
import type { Freight, FreightFilters, PaginatedResponse } from '@/lib/types'

/**
 * Simula latência de rede para UX mais realista
 * Em produção, remover este delay
 */
async function simulateNetworkDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * GET /api/freights
 * Lista fretes disponíveis com suporte a filtros e paginação
 * 
 * Query params:
 * - page: número da página (default: 1)
 * - pageSize: itens por página (default: 10)
 * - originState: filtrar por estado de origem
 * - destinationState: filtrar por estado de destino
 * - vehicleType: filtrar por tipo de veículo
 * - bodyType: filtrar por tipo de carroceria
 * - maxDistance: distância máxima em km
 */
export async function GET(request: NextRequest) {
  try {
    // Simula latência de rede
    await simulateNetworkDelay(300)

    // Extrai parâmetros da URL
    const { searchParams } = new URL(request.url)
    
    // Parâmetros de paginação
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
    
    // Parâmetros de filtro
    const filters: FreightFilters = {
      originState: searchParams.get('originState') || undefined,
      destinationState: searchParams.get('destinationState') || undefined,
      vehicleType: searchParams.get('vehicleType') as FreightFilters['vehicleType'],
      bodyType: searchParams.get('bodyType') as FreightFilters['bodyType'],
      maxDistance: searchParams.get('maxDistance') 
        ? parseInt(searchParams.get('maxDistance')!, 10) 
        : undefined,
    }

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

    if (filters.maxDistance) {
      filteredFreights = filteredFreights.filter(
        f => f.distance <= filters.maxDistance!
      )
    }

    // Ordena por data de criação (mais recentes primeiro)
    filteredFreights.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Calcula paginação
    const totalItems = filteredFreights.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredFreights.slice(startIndex, endIndex)

    // Monta resposta paginada
    const response: PaginatedResponse<Freight> = {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar fretes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

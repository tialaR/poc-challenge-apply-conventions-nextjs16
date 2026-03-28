/**
 * ==============================================
 * API ROUTE: Perfil do Transportador
 * GET /api/truckers/[id] - Busca dados de um transportador
 * 
 * Recursos Next.js 16 utilizados:
 * - Route Handlers dinâmicos
 * - Params assíncronos (Next.js 16)
 * - Validação de parâmetros
 * ==============================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { getTruckerById } from '@/lib/mock-data'

/**
 * Simula latência de rede
 */
async function simulateNetworkDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Tipagem dos parâmetros da rota dinâmica
 */
type Params = Promise<{ id: string }>

/**
 * GET /api/truckers/[id]
 * Retorna o perfil completo de um transportador
 * 
 * Parâmetros:
 * - id: ID único do transportador
 * 
 * Respostas:
 * - 200: Transportador encontrado
 * - 404: Transportador não encontrado
 * - 500: Erro interno
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Em Next.js 16, params deve ser awaited
    const { id } = await params

    // Simula latência de rede
    await simulateNetworkDelay(250)

    // Busca o transportador pelo ID
    const trucker = getTruckerById(id)

    // Retorna 404 se não encontrado
    if (!trucker) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TRUCKER_NOT_FOUND',
            message: 'Transportador não encontrado'
          }
        },
        { status: 404 }
      )
    }

    // Retorna o transportador encontrado
    return NextResponse.json({
      success: true,
      data: trucker,
    })
  } catch (error) {
    console.error('Erro ao buscar transportador:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erro interno do servidor'
        }
      },
      { status: 500 }
    )
  }
}

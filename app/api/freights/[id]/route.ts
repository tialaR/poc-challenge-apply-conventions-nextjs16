/**
 * ==============================================
 * API ROUTE: Detalhes do Frete
 * GET /api/freights/[id] - Busca um frete específico
 * 
 * Recursos Next.js 16 utilizados:
 * - Route Handlers dinâmicos com [id]
 * - Params assíncronos (Next.js 16)
 * - Tratamento de erros com status codes apropriados
 * ==============================================
 */

import { NextRequest, NextResponse } from 'next/server'
import { getFreightById } from '@/lib/mock-data'

/**
 * Simula latência de rede para UX mais realista
 */
async function simulateNetworkDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Tipagem dos parâmetros da rota dinâmica
 */
type Params = Promise<{ id: string }>

/**
 * GET /api/freights/[id]
 * Retorna os detalhes completos de um frete específico
 * 
 * Parâmetros:
 * - id: ID único do frete
 * 
 * Respostas:
 * - 200: Frete encontrado
 * - 404: Frete não encontrado
 * - 500: Erro interno
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Em Next.js 16, params é uma Promise e deve ser awaited
    const { id } = await params

    // Simula latência de rede
    await simulateNetworkDelay(200)

    // Busca o frete pelo ID
    const freight = getFreightById(id)

    // Retorna 404 se não encontrado
    if (!freight) {
      return NextResponse.json(
        { 
          success: false,
          error: {
            code: 'FREIGHT_NOT_FOUND',
            message: 'Frete não encontrado'
          }
        },
        { status: 404 }
      )
    }

    // Retorna o frete encontrado
    return NextResponse.json({
      success: true,
      data: freight,
    })
  } catch (error) {
    console.error('Erro ao buscar frete:', error)
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

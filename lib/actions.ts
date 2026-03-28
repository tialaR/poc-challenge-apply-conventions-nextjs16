/**
 * ==============================================
 * SERVER ACTIONS
 * Ações do servidor para mutações de dados
 * 
 * Recursos Next.js 16 utilizados:
 * - 'use server' directive
 * - Server Actions para formulários
 * - Validação com Zod
 * - Revalidação de cache
 * ==============================================
 */

'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import type { ApiResponse } from './types'

/**
 * Schema de validação para interesse em frete
 */
const interestFormSchema = z.object({
  freightId: z.string().min(1, 'ID do frete é obrigatório'),
  truckerId: z.string().min(1, 'ID do transportador é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  proposedPrice: z.number().min(100, 'Valor mínimo é R$ 1,00'),
})

/**
 * Schema de validação para contato
 */
const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

/**
 * Simula latência de rede
 */
async function simulateNetworkDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Server Action: Manifestar interesse em um frete
 * Envia uma proposta para o embarcador
 */
export async function submitFreightInterest(
  formData: FormData
): Promise<ApiResponse<{ interestId: string }>> {
  try {
    // Simula latência
    await simulateNetworkDelay(800)

    // Extrai e valida dados do formulário
    const rawData = {
      freightId: formData.get('freightId') as string,
      truckerId: formData.get('truckerId') as string,
      message: formData.get('message') as string,
      proposedPrice: parseFloat(formData.get('proposedPrice') as string) * 100,
    }

    const validatedData = interestFormSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: validatedData.error.errors[0].message,
        },
      }
    }

    // Simula criação do interesse (em produção, salvaria no banco)
    const interestId = `interest-${Date.now()}`

    // Revalida o cache da lista de fretes usando cacheLife (Next.js 16)
    revalidateTag('freights', 'max')

    return {
      success: true,
      data: { interestId },
    }
  } catch (error) {
    console.error('Erro ao enviar interesse:', error)
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao processar solicitação',
      },
    }
  }
}

/**
 * Server Action: Enviar mensagem de contato
 * Formulário de contato geral da plataforma
 */
export async function submitContactForm(
  formData: FormData
): Promise<ApiResponse<{ ticketId: string }>> {
  try {
    // Simula latência
    await simulateNetworkDelay(600)

    // Extrai e valida dados do formulário
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    const validatedData = contactFormSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: validatedData.error.errors[0].message,
        },
      }
    }

    // Simula criação do ticket (em produção, salvaria no banco)
    const ticketId = `ticket-${Date.now()}`

    return {
      success: true,
      data: { ticketId },
    }
  } catch (error) {
    console.error('Erro ao enviar contato:', error)
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao processar solicitação',
      },
    }
  }
}

/**
 * Server Action: Marcar frete como favorito
 * Toggle de favoritos do usuário
 */
export async function toggleFavoriteFreight(
  freightId: string,
  isFavorite: boolean
): Promise<ApiResponse<{ isFavorite: boolean }>> {
  try {
    // Simula latência
    await simulateNetworkDelay(300)

    // Em produção, salvaria a preferência do usuário no banco
    const newFavoriteState = !isFavorite

    return {
      success: true,
      data: { isFavorite: newFavoriteState },
    }
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error)
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao atualizar favorito',
      },
    }
  }
}

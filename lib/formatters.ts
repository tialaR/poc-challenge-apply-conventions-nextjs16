/**
 * ==============================================
 * UTILITÁRIOS DE FORMATAÇÃO
 * Funções para formatar valores de exibição
 * ==============================================
 */

/**
 * Formata um valor em centavos para moeda brasileira
 * @param cents - Valor em centavos
 * @returns String formatada em BRL (ex: "R$ 1.500,00")
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

/**
 * Formata distância em quilômetros
 * @param km - Distância em quilômetros
 * @returns String formatada (ex: "1.500 km")
 */
export function formatDistance(km: number): string {
  return new Intl.NumberFormat('pt-BR').format(km) + ' km'
}

/**
 * Formata peso em quilogramas
 * @param kg - Peso em quilogramas
 * @returns String formatada (ex: "1.500 kg" ou "1,5 t")
 */
export function formatWeight(kg: number): string {
  if (kg >= 1000) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(kg / 1000) + ' t'
  }
  return new Intl.NumberFormat('pt-BR').format(kg) + ' kg'
}

/**
 * Formata uma data para exibição
 * @param dateString - Data em formato ISO
 * @returns String formatada (ex: "28 de março de 2026")
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/**
 * Formata uma data relativa (ex: "há 2 horas")
 * @param dateString - Data em formato ISO
 * @returns String com tempo relativo
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = {
    ano: 31536000,
    mês: 2592000,
    semana: 604800,
    dia: 86400,
    hora: 3600,
    minuto: 60,
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      const plural = interval > 1 ? (unit === 'mês' ? 'meses' : unit + 's') : unit
      return `há ${interval} ${plural}`
    }
  }

  return 'agora mesmo'
}

/**
 * Formata a localização para exibição
 * @param city - Cidade
 * @param state - Estado (sigla)
 * @returns String formatada (ex: "São Paulo, SP")
 */
export function formatLocation(city: string, state: string): string {
  return `${city}, ${state}`
}

/**
 * Gera um slug a partir de um texto
 * @param text - Texto para converter em slug
 * @returns Slug formatado (ex: "sao-paulo-sp")
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Formata número de telefone brasileiro
 * @param phone - Telefone sem formatação
 * @returns Telefone formatado (ex: "(11) 99999-9999")
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

/**
 * Formata avaliação para exibição
 * @param rating - Nota de 0 a 5
 * @returns String formatada (ex: "4.5")
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

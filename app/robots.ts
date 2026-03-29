/**
 * ==============================================
 * ROBOTS.TXT
 * Configuração de robots.txt dinâmico
 * 
 * Recursos Next.js 16 utilizados:
 * - Arquivo especial robots.ts
 * - Geração automática de robots.txt
 * ==============================================
 */

import type { MetadataRoute } from 'next'

/**
 * Gera o robots.txt da aplicação
 * Define regras de crawling para bots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fleteapp.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

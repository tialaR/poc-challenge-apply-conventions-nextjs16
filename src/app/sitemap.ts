/**
 * ==============================================
 * SITEMAP
 * Geração dinâmica de sitemap.xml
 * 
 * Recursos Next.js 16 utilizados:
 * - Arquivo especial sitemap.ts
 * - Geração automática de sitemap.xml
 * - MetadataRoute.Sitemap type
 * ==============================================
 */

import type { MetadataRoute } from 'next'
import { mockFreights } from '@/lib/mock-data'

/**
 * Gera o sitemap da aplicação
 * Inclui páginas estáticas e dinâmicas
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fleteapp.com'

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/fretes`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Páginas dinâmicas de fretes
  const freightPages: MetadataRoute.Sitemap = mockFreights.map(freight => ({
    url: `${baseUrl}/fretes/${freight.slug}/${freight.id}`,
    lastModified: new Date(freight.createdAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...freightPages]
}

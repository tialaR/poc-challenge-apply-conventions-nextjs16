/**
 * ==============================================
 * ROOT LAYOUT
 * Layout raiz da aplicação Next.js 16
 * 
 * Recursos utilizados:
 * - Metadata API para SEO
 * - Google Fonts otimizadas
 * - Viewport configuration
 * - ThemeProvider para dark mode
 * ==============================================
 */

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'

/**
 * Configuração das fontes do Google
 * Geist para texto e Geist Mono para código
 */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

/**
 * Metadata para SEO
 * Configurações globais de título, descrição e OpenGraph
 */
export const metadata: Metadata = {
  title: {
    default: 'FreteApp - Marketplace de Fretes',
    template: '%s | FreteApp',
  },
  description: 'Encontre fretes disponíveis em todo o Brasil. Conectamos transportadores e embarcadores de forma rápida e segura.',
  keywords: ['frete', 'transporte', 'carga', 'caminhão', 'logística', 'transportadora'],
  authors: [{ name: 'FreteApp' }],
  creator: 'FreteApp',
  publisher: 'FreteApp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://freteapp.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://freteapp.com.br',
    siteName: 'FreteApp',
    title: 'FreteApp - Marketplace de Fretes',
    description: 'Encontre fretes disponíveis em todo o Brasil',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreteApp - Marketplace de Fretes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreteApp - Marketplace de Fretes',
    description: 'Encontre fretes disponíveis em todo o Brasil',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

/**
 * Configuração do Viewport
 * Inclui theme-color para PWA
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

/**
 * Root Layout Component
 * Envolve toda a aplicação com providers necessários
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        {/* ThemeProvider para suporte a dark mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Conteúdo principal da aplicação */}
          {children}
          
          {/* Sistema de notificações toast */}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </ThemeProvider>
        
        {/* Analytics da Vercel */}
        <Analytics />
      </body>
    </html>
  )
}

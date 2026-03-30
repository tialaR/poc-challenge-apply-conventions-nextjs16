/**
 * ==============================================
 * GLOBAL ERROR PAGE
 * Erro global para falhas no root layout
 * 
 * Recursos Next.js 16 utilizados:
 * - Arquivo especial global-error.tsx
 * - Captura erros que ocorrem no layout raiz
 * - Deve ter sua própria tag html/body
 * ==============================================
 */

'use client'

import { useEffect } from 'react'
import { AlertOctagon, RefreshCw, Home } from 'lucide-react'

/**
 * Props do Global Error
 */
interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * GlobalError Component
 * Renderizado quando ocorre erro no root layout
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  // Log do erro
  useEffect(() => {
    console.error('Erro global:', error)
  }, [error])

  return (
    <html lang="es-MX">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#fafafa',
          color: '#171717',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '400px',
          }}
        >
          {/* Ícone */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '5rem',
              height: '5rem',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              marginBottom: '1.5rem',
            }}
          >
            <AlertOctagon
              style={{ width: '2.5rem', height: '2.5rem', color: '#dc2626' }}
            />
          </div>

          {/* Texto */}
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            Ocorreu um erro grave
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: '#737373',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Algo deu muito errado e não foi possível carregar a página.
            Por favor, tente novamente ou volte mais tarde.
          </p>

          {/* Ações */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              width: '100%',
            }}
          >
            <button
              onClick={reset}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#fff',
                backgroundColor: '#2563eb',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <RefreshCw style={{ width: '1rem', height: '1rem' }} />
              Tentar Novamente
            </button>
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#171717',
                backgroundColor: '#f5f5f5',
                border: '1px solid #e5e5e5',
                borderRadius: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <Home style={{ width: '1rem', height: '1rem' }} />
              Voltar ao Início
            </a>
          </div>

          {/* Detalhes do erro em dev */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <details
              style={{
                marginTop: '2rem',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <summary
                style={{
                  fontSize: '0.875rem',
                  color: '#737373',
                  cursor: 'pointer',
                }}
              >
                Detalhes do erro
              </summary>
              <pre
                style={{
                  fontSize: '0.75rem',
                  color: '#dc2626',
                  backgroundColor: '#fef2f2',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  overflow: 'auto',
                  marginTop: '0.5rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  )
}

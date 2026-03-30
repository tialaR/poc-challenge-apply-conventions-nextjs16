/**
 * ==============================================
 * INTEREST FORM COMPONENT
 * Formulário para manifestar interesse em um frete
 * 
 * Recursos utilizados:
 * - Client Component para interatividade
 * - Server Actions para submissão
 * - useActionState para estado do formulário
 * - useFormStatus para estados de loading
 * ==============================================
 */

'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitFreightInterest } from '@/lib/actions'
import { formatCurrency } from '@/shared/utils/formatter'
import styles from './interest-form.module.css'

/**
 * Props do componente
 */
interface InterestFormProps {
  /** ID do frete */
  freightId: string
  /** Preço do frete em centavos */
  freightPrice: number
}

/**
 * Estado inicial do formulário
 */
const initialState = {
  success: false,
  error: undefined as { code: string; message: string } | undefined,
  data: undefined as { interestId: string } | undefined,
}

/**
 * Submit Button Component
 * Componente separado para usar useFormStatus
 */
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" aria-hidden="true" />
          Enviar Interesse
        </>
      )}
    </Button>
  )
}

/**
 * InterestForm Component
 * Formulário para motoristas manifestarem interesse
 */
export function InterestForm({ freightId, freightPrice }: InterestFormProps) {
  // useActionState para gerenciar estado da Server Action
  const [state, formAction] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      const result = await submitFreightInterest(formData)
      return result
    },
    initialState
  )

  // Preço sugerido (90% do valor original)
  const suggestedPrice = Math.floor(freightPrice * 0.9) / 100

  // Se enviou com sucesso, mostra mensagem de confirmação
  if (state.success) {
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={styles.successTitle}>Interesse enviado!</h3>
          <p className={styles.successDescription}>
            O embarcador receberá sua proposta e entrará em contato em breve.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Tenho Interesse</h3>
      <p className={styles.description}>
        Envie uma proposta para este frete e aguarde o contato do embarcador.
      </p>

      <form action={formAction} className={styles.form}>
        {/* Campo oculto: ID do frete */}
        <input type="hidden" name="freightId" value={freightId} />
        
        {/* Campo oculto: ID do transportador (simulado) */}
        <input type="hidden" name="truckerId" value="trucker-demo-123" />

        {/* Campo de proposta de valor */}
        <div className={styles.field}>
          <label htmlFor="proposedPrice" className={styles.label}>
            Valor proposto (R$)
          </label>
          <input
            type="number"
            id="proposedPrice"
            name="proposedPrice"
            className={styles.input}
            placeholder={suggestedPrice.toFixed(2)}
            step="0.01"
            min="1"
            required
            aria-describedby="priceHint"
          />
          <span id="priceHint" className={styles.hint}>
            Valor original: {formatCurrency(freightPrice)}
          </span>
        </div>

        {/* Campo de mensagem */}
        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            placeholder="Apresente-se e informe sua disponibilidade..."
            rows={4}
            minLength={10}
            required
            aria-describedby="messageHint"
          />
          <span id="messageHint" className={styles.hint}>
            Mínimo de 10 caracteres
          </span>
        </div>

        {/* Mensagem de erro */}
        {state.error && (
          <div className={styles.error} role="alert">
            <span>{state.error.message}</span>
          </div>
        )}

        {/* Botão de enviar */}
        <SubmitButton />
      </form>

      <p className={styles.disclaimer}>
        Ao enviar, você concorda com nossos termos de uso e política de privacidade.
      </p>
    </div>
  )
}

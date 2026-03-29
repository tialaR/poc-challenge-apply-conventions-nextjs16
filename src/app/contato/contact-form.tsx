/**
 * ==============================================
 * CONTACT FORM COMPONENT
 * Formulário de contato com Server Action
 * 
 * Recursos utilizados:
 * - Client Component para interatividade
 * - useActionState para estado do formulário
 * - Server Actions para submissão
 * ==============================================
 */

'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm } from '@/lib/actions'
import styles from './contact-form.module.css'

/**
 * Estado inicial do formulário
 */
const initialState = {
  success: false,
  error: undefined as { code: string; message: string } | undefined,
  data: undefined as { ticketId: string } | undefined,
}

/**
 * Submit Button Component
 */
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" aria-hidden="true" />
          Enviar Mensagem
        </>
      )}
    </Button>
  )
}

/**
 * ContactForm Component
 */
export function ContactForm() {
  const [state, formAction] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      const result = await submitContactForm(formData)
      return result
    },
    initialState
  )

  // Sucesso
  if (state.success && state.data) {
    return (
      <div className={styles.success} role="alert">
        <div className={styles.successIcon}>
          <CheckCircle className="h-8 w-8" aria-hidden="true" />
        </div>
        <h3 className={styles.successTitle}>Mensagem enviada!</h3>
        <p className={styles.successDescription}>
          Recebemos sua mensagem e entraremos em contato em breve.
          Seu protocolo é: <strong>{state.data.ticketId}</strong>
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className={styles.form}>
      {/* Nome */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Nome completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          placeholder="Seu nome"
          required
          minLength={2}
        />
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder="seu@email.com"
          required
        />
      </div>

      {/* Telefone */}
      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={styles.input}
          placeholder="(00) 00000-0000"
          required
          minLength={10}
        />
      </div>

      {/* Mensagem */}
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          placeholder="Como podemos ajudar?"
          rows={5}
          required
          minLength={10}
        />
      </div>

      {/* Erro */}
      {state.error && (
        <div className={styles.error} role="alert">
          {state.error.message}
        </div>
      )}

      {/* Submit */}
      <SubmitButton />
    </form>
  )
}

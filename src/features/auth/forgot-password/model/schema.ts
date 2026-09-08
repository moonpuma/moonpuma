import { z } from 'zod'
import { emailSchema } from '@/shared/lib/validation'

// AUTH.md, UC-3: форма восстановления пароля содержит только Email.
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

import { z } from 'zod'

// AUTH.md, UC-3: форма восстановления пароля содержит только Email.
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Invalid email address')),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

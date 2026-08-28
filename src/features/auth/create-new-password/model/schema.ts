import { z } from 'zod'
import { passwordSchema } from '@/shared/lib/validation'

// AUTH.md, UC-3, шаги 9-12: новый пароль валидируется по тем же правилам, что при
// регистрации (passwordSchema), плюс совпадение с подтверждением (альт. сценарий №3).
export const createNewPasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: z.string().min(1, { error: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>

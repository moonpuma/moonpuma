import { z } from 'zod'
import { emailSchema, passwordSchema } from '@/shared/lib/validation'

// Правила валидации соответствуют ТЗ (docs/AUTH.md, UC-1).

// username: разрешены только 0-9, A-Z, a-z, _, -
const usernameCharsRegex = /^[0-9a-zA-Z_-]+$/

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { error: 'Username is required' })
      .min(6, { error: 'Minimum number of characters 6' })
      .max(30, { error: 'Maximum number of characters 30' })
      .regex(usernameCharsRegex, { error: 'Username can only contain 0-9, A-Z, a-z, _, -' }),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: z.string().min(1, { error: 'Password confirmation is required' }),
    agree: z.boolean().refine((value) => value, {
      error: 'You must agree to the Terms of Service and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>

import { z } from 'zod'

export const loginByEmailSchema = z.object({
  email: z.email({ error: 'The email must match the format example@example.com' }),
  password: z.string().min(1, { error: 'Password is required' }),
})

export type LoginByEmailFormValues = z.infer<typeof loginByEmailSchema>

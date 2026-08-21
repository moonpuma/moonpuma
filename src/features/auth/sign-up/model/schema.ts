import { z } from 'zod'

// Правила валидации соответствуют ТЗ (docs/AUTH.md, UC-1).

// username: разрешены только 0-9, A-Z, a-z, _, -
const usernameCharsRegex = /^[0-9a-zA-Z_-]+$/

// password: «должен содержать» 0-9, a-z, A-Z (lookahead'ы), а «может содержать»
// спецсимволы из ТЗ. Класс символов ограничивает алфавит целиком (включая \).
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!"#$%&'()*+,./:;<=>?@[\\\]^_{|}~-]+$/

// Точный текст ошибки формата пароля берём из ТЗ (альт. сценарий №8).
const passwordFormatError = `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~`

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { error: 'Username is required' })
      .min(6, { error: 'Minimum number of characters 6' })
      .max(30, { error: 'Maximum number of characters 30' })
      .regex(usernameCharsRegex, { error: 'Username can only contain 0-9, A-Z, a-z, _, -' }),
    email: z.email({ error: 'The email must match the format example@example.com' }),
    password: z
      .string()
      .min(1, { error: 'Password is required' })
      .min(6, { error: 'Minimum number of characters 6' })
      .max(20, { error: 'Maximum number of characters 20' })
      .regex(passwordRegex, { error: passwordFormatError }),
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

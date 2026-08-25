import { z } from 'zod'

// password: «должен содержать» 0-9, a-z, A-Z (lookahead'ы), а «может содержать»
// спецсимволы из ТЗ. Класс символов ограничивает алфавит целиком (включая \).
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!"#$%&'()*+,./:;<=>?@[\\\]^_{|}~-]+$/

// Точный текст ошибки формата пароля берём из ТЗ (UC-1, альт. сценарий №8) — общий для
// регистрации и входа: оба поля Password валидируются по одним и тем же правилам (UC-2
// указывает «валидация происходит при потере фокуса полем», без отдельных правил формата).
const passwordFormatError = `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~`

// required-проверка вынесена в отдельный первый шаг .pipe(): у z.string()-чейна issue от
// .min(1) и так оказалась бы первой в списке ошибок, но пайп делает это гарантией, а не
// побочным эффектом порядка чеков — симметрично с emailSchema (см. email-schema.ts).
export const passwordSchema = z.string().min(1, { error: 'Password is required' }).pipe(
  z
    .string()
    .min(6, { error: 'Minimum number of characters 6' })
    .max(20, { error: 'Maximum number of characters 20' })
    .regex(passwordRegex, { error: passwordFormatError })
)

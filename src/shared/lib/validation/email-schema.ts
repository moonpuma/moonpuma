import { z } from 'zod'

// Текст ошибки формата — из ТЗ (docs/AUTH.md, UC-1 шаг 2.1 / UC-2 шаг 3.1), общий для всех форм с полем email.
// required-проверка идёт первым шагом .pipe(): у z.email() чек формата встроен в базовый
// парсинг и репортится раньше, чем добавленный следом .min(1) — просто дописать .min(1) после
// z.email() не даёт «Email is required» для пустой строки. Симметрично с passwordSchema.
export const emailSchema = z
  .string()
  .min(1, { error: 'Email is required' })
  .pipe(z.email({ error: 'The email must match the format example@example.com' }))

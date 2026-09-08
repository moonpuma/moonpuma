/**
 * Ищет в error-payload первое поле, для которого совпало одно из его ключевых слов, и
 * возвращает его имя. Формат error body бэкенд не гарантирует (docs/API/README.md), поэтому
 * вместо опоры на конкретную структуру просто ищем ключевые слова по всем строкам payload.
 *
 * @param fields карта "имя поля" -> ключевые слова, которые указывают на конфликт этого поля
 */
export function getConflictField<TField extends string>(
  payload: unknown,
  fields: Record<TField, string[]>,
): TField | null {
  const text = collectPayloadStrings(payload).join(' ').toLowerCase()

  for (const field of Object.keys(fields) as TField[]) {
    if (fields[field].some((keyword) => text.includes(keyword))) {
      return field
    }
  }

  return null
}

function collectPayloadStrings(payload: unknown): string[] {
  if (typeof payload === 'string') {
    return [payload]
  }

  if (Array.isArray(payload)) {
    return payload.flatMap(collectPayloadStrings)
  }

  if (payload && typeof payload === 'object') {
    return Object.values(payload).flatMap(collectPayloadStrings)
  }

  return []
}

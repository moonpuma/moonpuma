# HTTP-клиент (axios)

Общий HTTP-клиент на базе `axios` для всех обращений к backend API. Единственная точка, где
настроены `baseURL`, cookies и восстановление сессии — весь остальной код должен обращаться к
backend только через него, а не через голый `fetch`/`axios`.

Сетевые контракты (endpoint'ы, тела запросов, статусы) описаны в
[`API/README.md`](API/README.md) — этот документ про то, **как** их вызывать из кода, а не какие
они.

## Где живёт

| Путь                                       | Ответственность                                             |
| ------------------------------------------- | ------------------------------------------------------------ |
| `src/shared/api/http-client/http-client.ts` | Инстанс axios, интерцептор восстановления сессии             |
| `src/shared/api/index.ts`                   | Публичный API слоя — импортировать отсюда, а не из подпапки  |

```ts
import { httpClient, setOnSessionExpired } from '@/shared/api'
```

## Базовая конфигурация

- `baseURL` — `process.env.NEXT_PUBLIC_API_BASE_URL` (fallback `https://moonpuma.site/api/v1`).
  Пути в вызовах указываются **относительно** него: `httpClient.get('/auth/me')`, а не полный URL.
- `withCredentials: true` — браузер сам прикладывает и принимает HttpOnly-cookie
  `access_token`/`refresh_token`. Их нельзя и не нужно читать/писать вручную из JS (см.
  `API/README.md`, раздел «Базовые настройки»).
- `Content-Type: application/json` выставлен по умолчанию.

## Как делать запросы

Типизируй ответ через generic-параметр, а не `any`/приведение типа:

```ts
const { data } = await httpClient.get<{ id: string }>('/auth/me')
```

```ts
await httpClient.post('/auth/login', {
  email,
  password,
})
```

Axios сам сериализует тело в JSON и парсит JSON-ответ — руками `JSON.stringify`/`response.json()`
делать не нужно (в отличие от примеров с `fetch` в `API/README.md`, которые описывают контракт «на
бумаге», а не конкретный клиент).

## Обработка ошибок

Ошибки axios отличай через `isAxiosError`, а не `instanceof`:

```ts
import { isAxiosError } from 'axios'
import { httpClient } from '@/shared/api'

try {
  await httpClient.post('/auth/login', body)
} catch (error) {
  if (isAxiosError(error) && error.response?.status === 401) {
    // неверный email или пароль — см. API/README.md, POST /auth/login
  }
  throw error
}
```

Ветвись по `error.response.status`, как того требует `API/README.md` («Общие правила обработки
ответов») — формат error body backend не гарантирован, поэтому не полагайся на конкретную форму
`error.response.data`, пока контракт не зафиксирован.

## Автоматическое восстановление сессии

Реализовано в response-интерцепторе `httpClient` и подробно описано в `API/README.md`
(`POST /auth/refresh-token`) — при `401` он один раз обновляет токены и повторяет исходный запрос,
дедуплицируя параллельные обновления. От вызывающего кода это не требует ничего особенного — просто
вызывай `httpClient` как обычно, retry прозрачен.

Единственное, что нужно сделать самому — один раз на весь app зарегистрировать реакцию на
безвозвратную потерю сессии (истёкший `refresh_token`):

```ts
// например, в auth-провайдере из src/app/providers при монтировании
useEffect(() => {
  setOnSessionExpired(() => {
    // очистить локальное auth-состояние и редиректнуть на routes.auth.signIn()
  })

  return () => setOnSessionExpired(undefined)
}, [])
```

`shared/api` намеренно не делает этого сам (не импортирует роутер/auth-store) — по FSD нижний слой
не должен знать о верхних, см. [`CLAUDE.md`](../CLAUDE.md), раздел про Feature-Sliced Design.

## Интеграция с TanStack Query

`queryFn`/`mutationFn` вызывают `httpClient` и размещаются по правилам
[`TANSTACK_QUERY.md`](TANSTACK_QUERY.md) — рядом с сущностью или фичей, а не в `shared/api`:

```ts
// src/entities/user/api/get-current-user.ts
import { httpClient } from '@/shared/api'

export const getCurrentUser = async () => {
  const { data } = await httpClient.get<{ id: string }>('/auth/me')
  return data
}
```

## Правила

1. Все запросы к backend — только через `httpClient` из `@/shared/api`. Не создавай отдельные
   инстансы axios и не вызывай `fetch` напрямую в features/entities.
2. Пути пиши относительно `baseURL`, сверяя их с `API/README.md` — не хардкодь полный URL.
3. `shared/api/http-client` не содержит вызовов конкретных endpoint'ов — это инфраструктура.
   Конкретные `queryFn`/`mutationFn` живут в `entities/*/api` или `features/*/api`.
4. Типизируй ответы через `httpClient.get<T>()`/`post<T>()`, не `any`.
5. `setOnSessionExpired` вызывается один раз на весь app из auth-провайдера (`app`-слой), не из
   `entities`/`features`.

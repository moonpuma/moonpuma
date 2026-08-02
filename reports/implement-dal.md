# Отчёт: ветка `feat/implement-DAL`

Ветка от `dev`, добавляет базовый Data Access Layer — HTTP-клиент на axios и политику повторов
запросов в TanStack Query — плюс документацию по ним.

## Что сделано

**Зависимость.** Добавлен `axios ^1.19.0` (`package.json`, `pnpm-lock.yaml`).

**HTTP-клиент** — `src/shared/api/http-client/`:

- инстанс axios: `baseURL` из `NEXT_PUBLIC_API_BASE_URL`, `withCredentials: true` (HttpOnly-cookie
  `access_token`/`refresh_token`), `Content-Type: application/json`;
- response-интерцептор восстанавливает сессию при `401`: один раз обновляет токены через
  `POST /auth/refresh-token` и повторяет исходный запрос; параллельные `401` дедуплицируются в
  один вызов refresh общим promise;
- `onSessionExpired`/`setOnSessionExpired` — точка расширения для app-слоя: при истёкшем
  `refresh_token` клиент вызывает зарегистрированный снаружи колбэк вместо прямого импорта
  роутера/auth-store (сохраняет направление зависимостей FSD).

**Политика повторов TanStack Query** — `src/shared/api/query-client/get-query-client.ts`:

- `queries`: не повторяются при `401/403/404/429` (401/403 всё равно лечит только refresh в
  http-client, 404/429 повторами не лечатся), иначе до 3 попыток;
- `mutations`: `retry: false` — операции изменения данных (`login`/`register`/`change-password`…)
  не должны молча повторяться.

**Публичный API** — `src/shared/api/index.ts` экспортирует `httpClient`, `setOnSessionExpired`
рядом с уже существующими `getQueryClient`/`makeQueryClient`.

**Документация:**

- `docs/API/README.md` — в разделе `POST /auth/refresh-token` зафиксировано, что клиентское
  восстановление сессии уже реализовано, со ссылкой на механизм `onSessionExpired`;
- `docs/HTTP_CLIENT.md` (новый) — как вызывать backend через `httpClient`: конфигурация, типизация
  запросов, обработка ошибок (`isAxiosError`), восстановление сессии, интеграция с TanStack Query,
  правила использования;
- `docs/README.md` — добавлена строка оглавления;
- `docs/TANSTACK_QUERY.md` — убрана устаревшая пометка «HTTP-клиент ещё не добавлен».

## Что осталось не сделано

- `setOnSessionExpired` нигде не вызывается из `app`-слоя — при истёкшем `refresh_token` колбэк
  сейчас no-op.
- Конкретных `queryFn`/`mutationFn` (например, `GET /auth/me`, `POST /auth/login`) в
  `entities`/`features` пока нет — DAL это только инфраструктура под них.
- Типизированная модель ошибок API не реализована.

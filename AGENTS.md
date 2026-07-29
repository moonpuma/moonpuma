# AGENTS.md

Этот файл содержит указания для Codex (Codex.ai/code) при работе с кодом в этом репозитории.

> **Язык инструкций:** все дальнейшие инструкции в этом файле заполняй на русском языке.
> Технические термины, названия команд, путей, файлов и пакетов оставляй как есть.

## Документация (`docs/`)

В корне проекта есть папка `docs/` с проектной документацией (ТЗ, спеки фич) — это источник
истины по бизнес-логике, полям форм, правилам валидации, текстам сообщений и редиректам.
Перед реализацией соответствующего флоу сверяйся со спекой и ссылайся на конкретный use case
и шаг. Оглавление — в [`docs/README.md`](docs/README.md).

- [`docs/AUTH.md`](docs/AUTH.md) — аутентификация (UC-1 … UC-5): регистрация, вход,
  восстановление пароля, выход, OAuth. Страницы аутентификации живут в `src/app/[locale]/(auth)/`.

## Команды

Проект фиксирует точные версии движков (Node `24.16.0`, pnpm `11.4.0`) через `engines` в `package.json` + `engine-strict=true` в `.npmrc`. Используй `corepack enable`, чтобы pnpm разрешал зафиксированную версию. Всегда используй `pnpm`, а не npm/yarn.

- `pnpm dev` — запуск dev-сервера (Next.js + Turbopack) на http://localhost:3000
- `pnpm build` / `pnpm start` — продакшен-сборка / запуск
- `pnpm lint` — ESLint (`next lint`)
- `pnpm format` / `pnpm format:check` — запись / проверка Prettier
- `pnpm storybook` — dev-сервер Storybook на порту 6006
- `pnpm build-storybook` — статическая сборка Storybook

Тесты выполняются через Storybook + Vitest (`@storybook/addon-vitest`, `@vitest/browser-playwright`). Отдельного скрипта `test` верхнего уровня нет; тестами служат файлы `*.stories.tsx`, исполняемые интеграцией Vitest со Storybook. Запустить отдельную историю/тест можно через фильтр проектов Vitest (например, `pnpm vitest run --project=storybook <name>`) — после того как настроено окружение тестов Storybook.

## Архитектура

Next.js 16 (App Router, React 19) с **включённым React Compiler** (`reactCompiler: true` в `next.config.ts`, `babel-plugin-react-compiler`) — не добавляй вручную `useMemo`/`useCallback` для того, что компилятор уже мемоизирует.

### Feature-Sliced Design (FSD)

Исходный код в `src/` организован по слоям FSD: `app/`, `features/`, `entities/`, `shared/`. Зависимости направлены только вниз (верхние слои импортируют из нижних, но не наоборот). В `shared/ui/` находится переиспользуемая библиотека компонентов; основная часть текущего кода живёт там.

`src/app/` — корень Next.js App Router. Все маршруты лежат под динамическим сегментом
`src/app/[locale]/`, который обеспечивает i18n через библиотеку **next-intl**. Изначально роутинг
(`[locale]`, middleware, `Link`-обёртка) был реализован вручную на нативных механизмах Next.js;
позже перешли на next-intl ради `t.rich()` для текста со вложенными ссылками (см. `SignUpForm`),
ICU-плюрализации/форматирования и готовых server/client-хуков для переводов — сам `[locale]`-
роутинг при этом не менялся, next-intl требует ту же структуру сегментов:

- `src/shared/i18n/routing.ts` — единственный источник истины по `locales`/`defaultLocale`
  (`defineRouting({ locales: ['en', 'ru'], defaultLocale: 'en', localePrefix: 'always' })`).
  Локаль всегда присутствует в URL (`/en`, `/ru/sign-in`, …), варианта без префикса нет.
- `src/shared/i18n/navigation.ts` — `createNavigation(routing)` экспортирует локаль-осведомлённые
  `Link`/`useRouter`/`usePathname`/`redirect`/`getPathname`. **Все** внутренние ссылки и
  программная навигация в приложении идут через них (`@/shared/i18n/navigation`), а не через голые
  `next/link`/`next/navigation` — иначе переход по ссылке без локали будет перехвачен `proxy` и
  может сменить локаль на неожиданную. `usePathname()` уже возвращает путь без префикса локали.
- `src/shared/i18n/request.ts` — `getRequestConfig()`, резолвит локаль сегмента и подгружает
  `messages/<locale>.json` (динамический импорт).
- `messages/en.json`, `messages/ru.json` — словари переводов (сейчас пустые — см. заметку ниже).
- `src/proxy.ts` — `createMiddleware(routing)` из `next-intl/middleware` (default export). В
  Next.js 16 конвенция `middleware.ts` устарела в пользу `proxy.ts` — см.
  https://nextjs.org/docs/messages/middleware-to-proxy; next-intl отдаёт обычный default-экспорт,
  совместимый с обеими конвенциями.
- `next.config.ts` — обёрнут в `createNextIntlPlugin('./src/shared/i18n/request.ts')`.
- `src/app/[locale]/layout.tsx` — фактический корневой layout (`<html lang={locale}>`/`<body>` +
  шрифты, без хедера): так как `[locale]` — первый и единственный сегмент внутри `app/`, именно
  этот layout рендерит `<html>`/`<body>`, отдельного `src/app/layout.tsx` больше нет.
  Экспортирует `generateStaticParams()` (по `routing.locales`), валидирует `params.locale`
  (`hasLocale()` из `next-intl`, `notFound()` при недопустимой локали), вызывает
  `setRequestLocale(locale)` (нужно для статического рендеринга при `generateStaticParams`) и
  оборачивает `children` в `<NextIntlClientProvider>` (без явных `locale`/`messages` — при рендере
  из Server Component next-intl подставляет их сам).
- Переключатель языка в `Header` (`@/widgets/header`) читает локаль через `useLocale()` из
  `next-intl`, путь — через `usePathname()` из `@/shared/i18n/navigation`, и при смене вызывает
  `router.push(pathname, { locale })`; cookie `NEXT_LOCALE` синхронизирует сама next-intl.

> Заметка: `messages/*.json` сейчас пустые — переводы текста намеренно отложены (см. историю
> задачи), реализована только инфраструктура (роутинг, `Link`/`useRouter`, словари загружаются, но
> не используются). Когда дойдёт очередь до текста, `SignUpForm` — хороший первый кандидат:
> согласие на Terms/Privacy — фраза с двумя вложенными ссылками, ровно случай под `t.rich()`.

> Заметка (статический рендеринг): `setRequestLocale(locale)` в корневом layout не всегда
> достаточно. Если Server Component page (без `'use client'` где-либо в своей цепочке предков)
> рендерит `Link` из `@/shared/i18n/navigation` — как `privacy-policy`/`terms-of-service` через
> `LegalDocumentPage` → `BackLink` — страница «выпадает» из SSG в `ƒ` (dynamic) без своего
> собственного вызова `setRequestLocale(locale)` в этом page.tsx. У страниц, которые рендерят
> next-intl `Link`/`useTranslations`/etc. изнутри уже `'use client'`-дерева (формы аутентификации,
> `Header`), этой проблемы нет. Признак в билде: `pnpm build` печатает маршрут как `ƒ` вместо `●`.

Внутри `[locale]/` маршруты разделены на группы (URL они не меняют), и у каждой группы свой
`layout.tsx`, который рендерит хедер (`@/widgets/header`):

- `(public)` — страницы для всех: `/` (homepage), `/profile`, `/profile/[id]`, `/privacy-policy`, `/terms-of-service`. Сюда же кладём публичные статические документы (политики), на которые ссылается форма регистрации.
- `(auth)` — процесс аутентификации для **неавторизованных**: `/sign-up`, `/sign-in`, `/forgot-password`. Свой `layout.tsx` центрирует контент (`layout.module.scss`).
- `(private)` — страницы только для **авторизованных**: `/settings`. Здесь в будущем guard/редирект и Sidebar; layout пока рендерит `<Header isLoggedIn />`.

> Важно: страницы аутентификации должны лежать в `(auth)`, а **не** в `(private)` — guard в `(private)` будет редиректить неавторизованных, а форма входа нужна именно им.
> Корневого `src/app/[locale]/page.tsx` быть не должно: он резолвится в `/{locale}` так же, как `(public)/page.tsx`, и даёт конфликт маршрутов. Homepage живёт в `(public)/page.tsx`.

### Алиасы путей (`tsconfig.json`)

- `@/*` → `src/*`
- `@shared/*` → `src/shared/*`
- `@styles/*` → `src/styles/*`

### Стилизация

SCSS Modules (`*.module.scss`) на каждый компонент. Дизайн-токены живут в `src/styles/variables.scss` как CSS-переменные на `:root`, в двух уровнях: сырые примитивы палитры (цветовые шкалы вроде `--color-dark-500`) и семантические токены, которые их потребляют (`--bg-surface`, `--text-primary`). Приложение существует только в тёмной теме, поэтому слоя переключения тем нет — компоненты должны использовать семантические токены, а не примитивы. Поскольку токены — это CSS-переменные на `:root`, файлы `*.module.scss` компонентов просто ссылаются на них через `var(--token)` и вовсе не обязаны импортировать `variables.scss`. Глобальные сбросы/тема находятся в `src/app/globals.scss` (который подключает токены через `@use '../styles/variables' as *`) и импортируются один раз в `src/app/[locale]/layout.tsx`.

> Замечание: некоторые старые компоненты (например, `Button`) всё ещё используют обычные CSS Modules и форматирование с двойными кавычками/точками с запятой, появившееся до конфигурации Prettier — при правке подстраивайся под стиль окружающего файла, но новые компоненты должны следовать `.prettierrc` (без точек с запятой, одинарные кавычки, ширина печати 120) и SCSS Modules.

### Иконки (прямой импорт через SVGR)

Каждый SVG в `src/shared/ui/icons/**` импортируется напрямую как React-компонент через `@svgr/webpack` (настроено в `next.config.ts` в `turbopack.rules`). Загрузчик прогоняет SVGO и заменяет `black`/`#000` на `currentColor`, поэтому монохромные иконки наследуют цвет, а брендовые иконки (google, browser, payment…) сохраняют собственные цвета; `dimensions: false` убирает зашитые `width`/`height`, так что размер задаётся через пропсы.

`Icon` (`src/shared/ui/icon/`) — это тонкая обёртка: `import HomeIcon from '@/shared/ui/icons/common/home.svg'`, затем `<Icon icon={HomeIcon} size={24} color='var(--text-primary)' />`. `size` задаёт width/height, `color` задаёт CSS-`color` (разрешается через `currentColor`). Импортированный SVG можно также рендерить напрямую (`<HomeIcon width={24} />`), так как компоненты SVGR принимают стандартные пропсы SVG. Тип модуля `*.svg` объявлен в `src/svg.d.ts`. Чтобы добавить иконку, просто положи SVG в нужную папку `src/shared/ui/icons/<category>/` — никакой регенерации спрайта или поддержки union-типа id не требуется.

> Замечание: SVGR подключён в Turbopack (приложение), а не в Vite-пайплайн Storybook/Vitest. Если иконка должна рендериться внутри истории или браузерного теста, добавь `vite-plugin-svgr` в конфиг Vite для Storybook.

## Соглашения

- Каждый компонент `shared/ui` — это папка с самим компонентом, его `*.module.scss`, бочкой (barrel) `index.ts` и (где есть) `*.stories.tsx`.
- README и многие комментарии в коде на русском; сохраняй эту согласованность с существующими файлами.
- Если правишь SVG-конфиг Storybook — чисти кеш, иначе видишь старый результат.
- Названия папок в проекте должны быть с маленькой буквы

## Заметки на будущее

- `pnpm lint` сейчас падает (`Invalid project directory ... \lint`): в Next 16 команда
  `next lint` удалена, скрипт надо перевести на ESLint CLI (`eslint .`). Это пред-существующая
  проблема, не связанная с текущими правками.
- В `Header.module.scss` остались неиспользуемые классы от старой реализации на нативном
  `<select>` (`.languageSelector*`, `.flagIcon`, `.arrowIcon`) — сейчас язык выбирается через
  компонент `Select`. Оставлены нетронутыми (правка стилей не требовалась); можно удалить отдельно.
- ~~`tsc` показывает пред-существующую ошибку в `src/shared/ui/scroll/index.ts`
    (`ScrollProps` не экспортируется)~~ — исправлено: тип `ScrollProps` теперь экспортируется из `Scroll.tsx`.

## Замечания по код-ревью (shared / widgets)

Список замечаний по итогам анализа компонентов в `shared` и `widgets`. Отсортировано по
важности.

### Критичное

- **`Sidebar` молча отбрасывает кастомные `items`** (`src/widgets/sidebar/Sidebar.tsx`).
  Компонент принимает проп `items`, но фильтрует его по жёстко зашитым `id` из
  `primaryItems`/`secondaryItems`:
  ```ts
  const primary = items.filter((item) => primaryItems.some((p) => p.id === item.id))
  const secondary = items.filter((item) => secondaryItems.some((s) => s.id === item.id))
  ```
  Любой элемент с новым `id` не отрендерится — проп `items` фактически бесполезен для
  расширения. Если цель — разделение на 2 группы, стоит передавать `primaryItems`/
  `secondaryItems` отдельными пропами либо хранить признак группы в самом `SidebarItem`.

### Рекомендации (доступность / консистентность)

- **`Select` — клавиатура и a11y** (`src/shared/ui/select/Select.tsx`). Заявлены
  `role="listbox"`/`role="option"`, но навигации с клавиатуры нет (стрелки/Enter/Home/End),
  `<li>` кликабельны, но не фокусируемы, нет `aria-activedescendant`. Для production-компонента
  стоит добавить клавиатурное управление.
- **Текст ошибки не связан с полем** — `Input`, `Textarea`, `SearchInput`. Есть
  `aria-invalid`, но `errorText` не привязан через `aria-describedby` + `id`, поэтому
  скринридер не озвучит причину ошибки. Добавить `aria-describedby={error ? errorId : undefined}`.
- **Несогласованный alias импорта** — `Alert.tsx` и `Icon.tsx` используют `@shared/...`, а
  почти весь остальной код — `@/shared/...`. Оба алиаса валидны (`tsconfig`), но разнобой
  стоит унифицировать.
- **`Button` использует проп `title` как текст кнопки** (`src/shared/ui/button/Button.tsx`).
  `title` — нативный HTML-атрибут (тултип), переопределять его смысл неидиоматично и путает.
  Рекомендуется `children` или `label`. (Утечки в DOM нет — `title` исключается из `restProps`.)
- **Соглашение об именах папок** — начальная буква везде маленькая, но стиль смешан:
  `date-picker` (kebab-case) против `radioGroup`/`searchInput` (camelCase). По FSD обычно
  используется kebab-case (`radio-group`, `search-input`) — стоит выбрать одно соглашение.

### Мелочи

- `RadioGroup` (`src/shared/ui/radioGroup/RadioGroup.tsx`) клонирует только прямых детей через
  `Children.map` — обёртка любым `<div>` сломает проброс `name`/`checked`; на обёртке также нет
  `role="radiogroup"`.
- `Cards` (`src/shared/ui/cards/Cards.tsx`) экспортирует и `Card`, и алиас `Cards = Card`;
  заголовок истории — `Components/Card`. Двойное имя стоит убрать ради однозначности.

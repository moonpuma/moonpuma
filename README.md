Это проект на [Next.js](https://nextjs.org), созданный с помощью [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Начало работы

Сначала запустите dev-сервер:

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
# или
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

Вы можете начать редактирование страницы, изменив `app/page.tsx`. Страница автоматически обновляется по мере редактирования файла.

В этом проекте используется [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) для автоматической оптимизации и загрузки [Geist](https://vercel.com/font) — нового семейства шрифтов от Vercel.

## Подробнее

Чтобы узнать больше о Next.js, обратитесь к следующим ресурсам:

- [Документация Next.js](https://nextjs.org/docs) — возможности и API Next.js.
- [Learn Next.js](https://nextjs.org/learn) — интерактивный учебник по Next.js.

Вы также можете заглянуть в [репозиторий Next.js на GitHub](https://github.com/vercel/next.js) — отзывы и вклад приветствуются!

## Деплой на Vercel

Самый простой способ развернуть приложение Next.js — использовать [платформу Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) от создателей Next.js.

Подробности смотрите в нашей [документации по деплою Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

# Фиксация версий Node.js и пакетного менеджера

В ветке `dev` добавлены конфигурации для строгой фиксации версий Node.js и pnpm. Это обеспечивает одинаковое окружение у всех разработчиков и предотвращает проблемы из-за несовпадения версий.

## Что изменилось

- Добавлен `.nvmrc` с версией Node.js `24.16.0`
- Добавлен `.npmrc` с параметром `engine-strict=true`
- В `package.json` указаны обязательные версии движков и пакетного менеджера
- Обновлён `pnpm-workspace.yaml` с разрешёнными сборками
- Сгенерирован новый `pnpm-lock.yaml`

## Что нужно сделать для работы

### 1. Установите правильную версию Node.js (24.16.0)

Если у вас установлен **nvm** (Node Version Manager):

```bash
nvm install
nvm use
```

### 2. Установите правильную версию pnpm (11.4.0)

```bash
corepack enable
```

- После этого pnpm автоматически установит версию 11.4.0, указанную в package.json в поле packageManager.

### 3. Установите зависимости

```bash
pnpm install
```

### 4. Убедитесь, что у вас правильные версии

```bash
node --version   # должно быть v24.16.0
pnpm --version   # должно быть 11.4.0
```

### Если не удается разобраться с nvm и corepack установите глобально у себя на ПК необходимые версии node.js и pnpm, скачайте заново проект с github и в ветке dev выполните в консоли:

```bash
pnpm install
```

#### Полезные ссылки:

- https://www.nvmnode.com/guide/introduction.html
- https://nodejs.org/en/download
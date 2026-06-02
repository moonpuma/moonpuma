This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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

## Если не удается разобраться с nvm и corepack установите глобально у себя на ПК необходимые версии node.js и pnpm, скачайте заново проект с github и в ветке dev выполните в консоли:

```bash
pnpm install
```

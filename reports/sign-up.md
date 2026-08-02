# Регистрация пользователя: устройство и поток данных

Документ объясняет реализацию основного сценария регистрации из `docs/AUTH.md`, UC-1: от заполнения формы до подтверждения email и перехода на страницу входа.

## Ответственность используемых инструментов

В регистрации участвуют несколько инструментов, каждый из которых решает свою задачу:

| Инструмент      | Ответственность                                                       |
| --------------- | --------------------------------------------------------------------- |
| React Hook Form | Хранит значения полей, ошибки и состояние формы                       |
| Zod             | Описывает правила клиентской валидации                                |
| `zodResolver`   | Преобразует ошибки Zod в формат React Hook Form                       |
| TanStack Query  | Запускает асинхронные операции и отслеживает их состояние             |
| `fetch`         | Непосредственно отправляет HTTP-запрос backend                        |
| Backend         | Повторно валидирует данные, создаёт пользователя и подтверждает email |

TanStack Query не заменяет `fetch` и не управляет полями формы. Он вызывает функцию с `fetch` и сообщает React, выполняется ли операция, завершилась ли она успешно или закончилась ошибкой.

## Подключение TanStack Query

Глобальный провайдер находится в `src/app/providers/query-provider/QueryProvider.tsx`:

```tsx
export const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
```

`QueryClientProvider` передаёт экземпляр `QueryClient` всему React-дереву. Без этого провайдера хуки `useQuery` и `useMutation` не смогут работать.

Клиент создаётся в `src/shared/api/query-client/get-query-client.ts`:

```ts
export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
```

На сервере для каждого запроса создаётся отдельный `QueryClient`, чтобы состояние разных пользователей не пересекалось. В браузере используется один экземпляр, поэтому кеш сохраняется между рендерами и переходами.

`staleTime` относится к операциям получения данных через `useQuery`. Регистрация использует `useMutation`, поэтому эта настройка на неё не влияет.

### Различие `useQuery` и `useMutation`

- `useQuery` применяется для получения данных: профиля, публикаций, настроек.
- `useMutation` применяется для операций, изменяющих состояние backend: регистрации, входа, изменения профиля, удаления записи.

Регистрация создаёт пользователя, поэтому используется `useMutation`. Подтверждение email выполняется HTTP-методом `GET`, но меняет состояние пользователя на backend, поэтому на клиенте оно также оформлено как mutation и не кешируется как обычное чтение.

## Настройка формы

Форма находится в `src/app/(auth)/sign-up/_components/SignUpForm.tsx`:

```tsx
const {
  register,
  handleSubmit,
  reset,
  setError,
  clearErrors,
  formState: { errors, isValid, isSubmitting },
} = useForm<SignUpFormValues>({
  resolver: zodResolver(signUpSchema),
  mode: 'onBlur',
  defaultValues: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    agree: false,
  },
})
```

### `useForm<SignUpFormValues>()`

`useForm` создаёт состояние формы. Тип `SignUpFormValues` сообщает TypeScript, какие поля существуют и какие значения они содержат. Например, `register('unknownField')` приведёт к ошибке TypeScript.

### `resolver: zodResolver(signUpSchema)`

React Hook Form передаёт значения в Zod. `zodResolver` преобразует результат Zod в формат `errors`, понятный React Hook Form.

### `mode: 'onBlur'`

Поле проверяется после потери фокуса. Это соответствует UC-1: пользователь вводит значение, переходит к следующему полю, после чего появляется ошибка предыдущего поля.

### `defaultValues`

Начальные значения делают состояние формы предсказуемым и позволяют корректно очистить её через `reset()`.

## Что делает `register('username')`

Функцию React Hook Form `register` не следует путать с API-функцией `registerUser`.

```tsx
<Input label='Username' error={errors.username?.message} {...register('username')} />
```

Вызов `register('username')` возвращает свойства, похожие на следующие:

```ts
{
  name: 'username',
  onChange: function,
  onBlur: function,
  ref: function,
}
```

Оператор spread передаёт их компоненту `Input`. После этого React Hook Form получает введённое значение, узнаёт о потере фокуса, запускает валидацию и может сфокусировать или очистить поле.

## Zod-схема

Схема находится в `src/app/(auth)/sign-up/_components/signUpSchema.ts` и соответствует правилам UC-1.

### Username

```ts
username: z.string()
  .min(1, { error: 'Username is required' })
  .min(6, { error: 'Minimum number of characters 6' })
  .max(30, { error: 'Maximum number of characters 30' })
  .regex(usernameCharsRegex, { error: 'Username can only contain 0-9, A-Z, a-z, _, -' })
```

Regex `^[0-9a-zA-Z_-]+$` разрешает только цифры, латинские буквы, `_` и `-`. Символы `^` и `$` требуют, чтобы правилу соответствовала вся строка.

### Password

```ts
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[...]+$/
```

Проверки `(?=...)` называются positive lookahead:

- `(?=.*[0-9])` требует хотя бы одну цифру;
- `(?=.*[a-z])` требует хотя бы одну строчную латинскую букву;
- `(?=.*[A-Z])` требует хотя бы одну заглавную латинскую букву.

Последний класс символов ограничивает полный алфавит пароля. Поэтому пробелы, кириллица и символы, отсутствующие в ТЗ, не принимаются.

### Совпадение паролей

```ts
.refine((data) => data.password === data.passwordConfirmation, {
  error: 'Passwords must match',
  path: ['passwordConfirmation'],
})
```

Проверяется весь объект формы, потому что необходимо сравнить два поля. `path` указывает, что сообщение следует показать под `passwordConfirmation`.

### `z.infer`

```ts
export type SignUpFormValues = z.infer<typeof signUpSchema>
```

TypeScript-тип автоматически выводится из Zod-схемы. Это предотвращает расхождение между правилами валидации и интерфейсом формы.

## Состояние кнопки Sign Up

```tsx
<Button disabled={!isValid || isSubmitting}>{isSubmitting ? 'Signing Up...' : 'Sign Up'}</Button>
```

Кнопка отключена, пока форма невалидна или уже отправляется. Это не позволяет отправить незаполненные данные или создать два одновременных запроса двойным кликом.

Форма использует `noValidate`:

```tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
```

Встроенные сообщения браузера отключены, чтобы пользователь видел тексты из Zod, зафиксированные в ТЗ.

## Отправка формы через TanStack Query

Mutation создаётся следующим образом:

```ts
const registerMutation = useMutation({ mutationFn: registerUser })
```

`mutationFn` — обычная асинхронная функция. TanStack Query вызывает её и отслеживает результат.

При отправке создаётся объект только из полей API:

```ts
const data = {
  username: values.username,
  email: values.email,
  password: values.password,
  passwordConfirmation: values.passwordConfirmation,
}
```

`agree` не отправляется, потому что checkbox нужен для клиентской проверки и отсутствует в контракте `POST /auth/register`.

Запрос запускается через `mutateAsync`:

```ts
try {
  await registerMutation.mutateAsync(data)
  setSubmittedEmail(data.email)
} catch (error) {
  // Обработка ошибки
}
```

У TanStack Query есть два варианта запуска:

- `mutate(data)` работает через `onSuccess` и `onError`;
- `mutateAsync(data)` возвращает Promise и удобен с `await`, `try` и `catch`.

После регистрации кеш инвалидировать не требуется: пользователь ещё не авторизован, а данные текущего пользователя в Query Cache отсутствуют.

## HTTP-запрос регистрации

Запрос расположен в `src/features/auth/register-user/api/registerUser.ts`:

```ts
response = await fetch(`${apiBaseUrl}/auth/register`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
```

`NEXT_PUBLIC_API_BASE_URL` позволяет заменить адрес API через окружение. Если переменная не установлена, используется `https://moonpuma.site/api/v1`. Этот адрес доступен клиентскому JavaScript и не является секретом.

`Content-Type: application/json` сообщает backend формат тела. `JSON.stringify` преобразует JavaScript-объект в JSON. `credentials: 'include'` разрешает браузеру передавать и принимать cookies при запросах между разными origin.

Успешная регистрация возвращает `201` и пустое тело:

```ts
if (response.status === 201) {
  return
}
```

Поэтому код не вызывает `response.json()` для успешного ответа: попытка распарсить пустое тело могла бы закончиться ошибкой.

## Класс `RegisterUserError`

```ts
export class RegisterUserError extends Error {
  constructor(
    public readonly status: number | null,
    public readonly payload: unknown = null,
  ) {
    super('Unable to register user')
    this.name = 'RegisterUserError'
  }
}
```

Класс переносит из API-слоя в форму не только факт ошибки, но и HTTP-статус с телом ответа.

Обычный `fetch` не выбрасывает исключение для `400`, `409` или `500`: с точки зрения `fetch` HTTP-ответ был успешно получен. Поэтому неуспешный статус преобразуется в прикладную ошибку вручную:

```ts
throw new RegisterUserError(response.status, await readResponsePayload(response))
```

Назначение полей класса:

- `status` содержит HTTP-статус; `null` означает, что ответ не был получен, например из-за сетевой или CORS-ошибки;
- `payload` содержит неизвестное тело ответа;
- `readonly` запрещает случайно изменить сведения об уже произошедшей ошибке;
- `super(...)` создаёт стандартное поле `message` и stack trace;
- `name` делает логи понятнее;
- `instanceof RegisterUserError` позволяет отличить ожидаемую ошибку регистрации от любой другой ошибки.

Тип `unknown` используется потому, что API-документация не фиксирует структуру error body. Он заставляет проверить значение перед чтением его полей.

## Обработка конфликта email или username

Для статуса `409` форма пытается понять, какое поле упомянуто в ответе backend. `collectPayloadStrings()` рекурсивно собирает строки из текста, массива или объекта, не предполагая наличие конкретного поля `message`.

Если найден `email` или `username`, ошибка добавляется в React Hook Form:

```ts
setError('email', { message: 'User with this email is already registered' }, { shouldFocus: true })
```

`shouldFocus: true` переводит фокус на поле, которое нужно исправить. Если тело `409` невозможно распознать, показывается общая ошибка формы.

## Успешная регистрация и модальное окно

```ts
const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
```

`submittedEmail` хранит адрес успешной регистрации и одновременно управляет модальным окном:

- `null` — окно закрыто;
- строка с email — окно открыто.

После `201` вызывается `setSubmittedEmail(data.email)`. Компонент `EmailSentModal` показывает сообщение из UC-1. При закрытии выполняется:

```ts
const handleEmailSentClose = () => {
  setSubmittedEmail(null)
  reset()
}
```

Пользователь остаётся на `/sign-up`, а значения и ошибки формы очищаются.

## Переход по ссылке из письма

Backend должен сформировать клиентскую ссылку вида:

```text
/success?code=<uuid-v4>
```

Маршрут `src/app/(auth)/success/page.tsx` получает `code` через `searchParams` и передаёт только одиночное строковое значение в `EmailConfirmation`.

Компонент сначала проверяет формат UUID v4. Такая проверка не подтверждает существование или срок действия кода — это может сделать только backend. Она лишь не позволяет отправить заведомо некорректную строку.

Если формат корректен, запускается mutation:

```ts
mutate(code, {
  onError: () => router.replace('/resend-link'),
})
```

API-функция выполняет:

```ts
const query = new URLSearchParams({ code })

await fetch(`${apiBaseUrl}/auth/confirm?${query}`, {
  method: 'GET',
  credentials: 'include',
})
```

`URLSearchParams` безопасно кодирует значение для URL. До ответа пользователь видит `Confirming your email...`. После `200` отображается поздравление и ссылка `Sign In` на `/sign-in`. При отсутствии кода, неправильном UUID или ошибке backend пользователь направляется на `/resend-link`.

## Зачем при подтверждении используется `useRef`

```ts
const confirmationStarted = useRef(false)
```

Подтверждение запускается внутри `useEffect`. React в режиме разработки может повторно выполнить эффект. Поскольку confirmation code одноразовый, повторный запрос опасен: первый запрос подтвердит email, а второй может получить ошибку «код уже использован».

Флаг предотвращает повторный вызов:

```ts
if (confirmationStarted.current) {
  return
}

confirmationStarted.current = true
```

`useRef` подходит лучше `useState`, потому что изменение `.current` не запускает дополнительный рендер.

## Размещение по Feature-Sliced Design

Текущая структура разделяет инфраструктуру и бизнес-сценарии:

```text
src/app/providers/query-provider/
    Подключение QueryClientProvider к React-приложению

src/shared/api/query-client/
    Универсальное создание и конфигурация QueryClient

src/features/auth/register-user/api/
    Конкретная операция регистрации

src/features/auth/confirm-email/api/
    Конкретная операция подтверждения email
```

`query-client` следует оставить в `shared/api`, а не переносить в `features`. Он не реализует пользовательскую возможность и используется потенциально всеми фичами. Перенос, например, в `features/auth` заставил бы профиль, настройки и публикации зависеть от фичи аутентификации только ради доступа к общей инфраструктуре.

`QueryProvider` находится в `app`, потому что корневой слой собирает глобальные провайдеры. Конкретные запросы находятся в `features`, потому что описывают пользовательские действия. Направление зависимостей остаётся корректным:

```text
app → features → shared
```

## Итоговый поток

1. React Hook Form хранит поля и отслеживает `blur`.
2. Zod проверяет значения согласно UC-1.
3. `handleSubmit` вызывает `onSubmit` только для валидной формы.
4. `useMutation` запускает `registerUser`.
5. `registerUser` выполняет `POST /auth/register`.
6. Backend создаёт пользователя и отправляет письмо.
7. Форма показывает сообщение и очищается после его закрытия.
8. Пользователь открывает `/success?code=<uuid>` из письма.
9. Вторая mutation вызывает `GET /auth/confirm?code=<uuid>`.
10. После `200` отображается подтверждение и ссылка на `/sign-in`.

OAuth-кнопки остаются заглушками и в описанный сценарий не входят.

import { Icon } from '@/shared/ui/icon'
import { Checkbox } from '@/shared/ui/checkbox'
import HomeIcon from '@/shared/ui/icon/icons/common/home.svg'
import { Input } from '@/shared/ui/input'
import { LogoutAllButton } from '@/features/auth/logout-all-sessions'
import s from './page.module.scss'

export default function HomePage() {
  return (
    <div>
      <h1 className={s.title}>Homepage</h1>
      {/* Дизайн места под logout-all ещё не определён (IN-70) — временно висит прямо на главной. */}
      <LogoutAllButton />
      <span>Компоненты ниже по коду просто для теста чтобы посмотреть как отрабатывают</span>
      <Icon icon={HomeIcon} size={24} color='var(--status-danger)' />
      <Checkbox />
      <Input label={'Email'} type={'email'} />
      <Input label={'Password'} type={'password'} showPasswordToggle error={'Too long password'} />
    </div>
  )
}

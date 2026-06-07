import { Icon } from '@/shared/ui/icon'
import { Checkbox } from '@/shared/ui/checkbox'
import HomeIcon from '@/shared/ui/icon/icons/common/home.svg'
import s from './page.module.scss'

export default function HomePage() {
  return (
    <div>
      <h1 className={s.title}>Homepage</h1>
      <span>Компоненты ниже по коду просто для теста чтобы посмотреть как отрабатывают</span>
      <Icon icon={HomeIcon} size={24} className='white-icon' />
      <Checkbox />
    </div>
  )
}

import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Локаль-осведомлённые аналоги next/link и next/navigation — Link уже подставляет
// текущую локаль к href, useRouter().push/replace тоже (или переключает её через options.locale).
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)

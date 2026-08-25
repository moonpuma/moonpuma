'use client'

import { Toaster as HotToaster } from 'react-hot-toast'

// top: 80 — сдвигает тосты ниже Header (65px, см. Header.module.scss), чтобы не перекрывать
// переключатель языка/кнопки в шапке на страницах с (auth)/(public)-layout.
export const Toaster = () => (
  <HotToaster position='top-right' gutter={12} containerStyle={{ top: 80 }} toastOptions={{ duration: 5000 }} />
)

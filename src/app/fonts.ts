import { Cormorant_SC, Cormorant_Garamond, EB_Garamond } from 'next/font/google'
import localFont from 'next/font/local'

export const headerFont = localFont({
  src: '../../public/fonts/GoudyInitialen.ttf',
  display: 'swap',
  variable: '--font-header'
})
export const titleFont = Cormorant_SC({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-title'
})
export const subTitleFont = Cormorant_Garamond({
  weight: ['500','600'],
  variable: '--font-subtitle',
  subsets: ['latin'],
  style: ['normal', 'italic']
})
export const textFont = EB_Garamond({
  weight: ['400'],
  variable: '--font-text',
  subsets: ['latin'],
  style: ['normal', 'italic']
})

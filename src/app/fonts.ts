import { Cormorant, Cormorant_SC, EB_Garamond } from 'next/font/google';
import localFont from 'next/font/local';

export const headerFont = localFont({
  src: '../../public/fonts/GoudyInitialen.ttf',
  variable: '--font-header',
});
export const titleFont = Cormorant_SC({
  subsets: ['latin'],
  variable: '--font-title',
  weight: ['600'],
});
export const subTitleFont = Cormorant({
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-subtitle',
  weight: ['500', '600'],
});
export const textFont = EB_Garamond({
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-text',
  weight: ['400'],
});

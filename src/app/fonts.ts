import {
  Comfortaa,
  Cormorant,
  Cormorant_SC,
  Courier_Prime,
  EB_Garamond,
  Fira_Sans,
} from 'next/font/google';
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

export const courierFont = Courier_Prime({ weight: ['400']});

export const comfortaaFont = Comfortaa();

export const firaSansFont = Fira_Sans({ weight: '400' });

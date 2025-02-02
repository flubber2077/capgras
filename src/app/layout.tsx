import localFont from 'next/font/local'
import { Cormorant_Garamond, EB_Garamond, Cormorant_SC } from 'next/font/google'
import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

const headerFont = localFont({
  src: '../../public/fonts/GoudyInitialen.ttf',
  display: 'swap',
  variable: '--font-header'
})

export const titleFont = Cormorant_SC({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-title'
})

const subTitleFont = Cormorant_Garamond({
  weight: '400',
  variable: '--font-subtitle',
  subsets: ['latin']
})

const textFont = EB_Garamond({
  weight: ['400'],
  variable: '--font-text',
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-svh flex-col bg-paper-texture bg-repeat ${headerFont.variable} ${titleFont.variable} ${subTitleFont.variable} ${textFont.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL('https://capgrasmag.com'),
  title: {
    default: 'Capgras Mag',
    template: '%s | Capgras Mag'
  },
  authors: [{ name: 'Dylan Jordan' }, { name: 'Ellen Boyette' }],
  // description is what shows up on search engines
  description: 'Poetry Website.',
  keywords: ['poetry', 'literature', 'magazine', 'publication'],
  openGraph: {
    title: 'Capgras - Poetry Journal',
    description: 'Poetry Website.',
    url: absoluteUrl('/'),
    siteName: 'Capgras',
    images: [
      {
        url: absoluteUrl('/images/title-placeholder.png'),
        width: 4380,
        height: 1072
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }]
  }
}

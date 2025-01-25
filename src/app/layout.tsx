import localFont from 'next/font/local'
import { Cormorant_Garamond } from 'next/font/google'
import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

const headerFont = localFont({
  src: '../../public/fonts/GoudyInitialen.ttf',
  display: 'swap',
  variable: '--font-header'
})

const titleFont = Cormorant_Garamond({
  weight: '600',
  variable: '--font-title',
  subsets: ['latin']
})
const textFont = Cormorant_Garamond({
  weight: ['300', '600'],
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
        className={`flex min-h-svh flex-col bg-paper-texture bg-repeat ${headerFont.variable} ${titleFont.variable} ${textFont.variable}`}
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
  description: 'Poetry Website.',
  keywords: ['poetry', 'literature', 'magazine', 'publication'],
  openGraph: {
    title: 'Capgras - Poetry Journal',
    description: 'Poetry Website.',
    url: absoluteUrl('/'),
    siteName: 'Next.js',
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

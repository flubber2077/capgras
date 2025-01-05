import localFont from 'next/font/local'
import { Bellefair } from 'next/font/google'
import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

const myFont = localFont({
  src: '../fonts/ZallmanCaps.ttf',
  display: 'swap',
  variable: '--font-header'
})

const bellefair = Bellefair({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bellefair'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-svh flex-col bg-orange-100 bg-paper-texture bg-repeat mix-blend-multiply ${myFont.variable} ${bellefair.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL('https://outstatic.com'),
  title: {
    default: 'Capgras',
    template: '%s | Capgras'
  },
  description: 'Poetry Website.',
  keywords: ['poetry', 'literature'],
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

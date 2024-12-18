import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

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

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col bg-slate-300">{children}</body>
    </html>
  )
}

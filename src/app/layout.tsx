import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import '../styles/index.css';
import { headerFont, titleFont, subTitleFont, textFont } from './fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#fffef2',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23fbcb9d' fill-opacity='0.99' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
        className={`flex min-h-svh flex-col ${headerFont.variable} ${titleFont.variable} ${subTitleFont.variable} ${textFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://capgrasmag.com'),
  title: {
    default: 'Capgras Mag',
    template: '%s | Capgras Mag',
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
        height: 1072,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
  },
};

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { absoluteUrl } from '@/lib/utils';
import type { Metadata } from 'next';
import '../styles/index.css';
import { headerFont, subTitleFont, textFont, titleFont } from './fonts';

const backgroundStyle = calculateColors();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={backgroundStyle}
        className={`flex min-h-svh flex-col ${headerFont.variable} ${titleFont.variable} ${subTitleFont.variable} ${textFont.variable}`}
      >
        <Analytics />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

function calculateColors() {
  //                        R    G    B
  const backgroundColor = [251, 240, 255];

  const calculatedBackground = backgroundColor
    .map((num) => num.toString(16))
    .join('');

  const calculatedFill = backgroundColor
    .map((n) => n - 40)
    .map((num) => num.toString(16))
    .join('');

  return {
    backgroundColor: `#${calculatedBackground}`,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23${calculatedFill}' fill-opacity='0.99' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  };
}

// oxlint-disable-next-line sort-keys
export const metadata: Metadata = {
  metadataBase: new URL('https://capgrasmag.com'),
  title: {
    default: 'Capgras: A Literary Journal of Undiagnosable Writing',
    template: '%s | Capgras Mag',
  },
  authors: [{ name: 'Dylan Jordan' }, { name: 'Ellen Boyette' }],
  // description is what shows up on search engines
  description:
    'Capgras is a literary journal for hosting writing that engages in delusion, doubleness, misidentification, the sinister, and the precious.',
  keywords: [
    'capgras',
    'journal',
    'literary',
    'literature',
    'mag',
    'magazine',
    'poetry',
    'publication',
  ],
  openGraph: {
    description:
      'Capgras is a literary journal for hosting writing that engages in delusion, doubleness, misidentification, the sinister, and the precious',
    images: [
      {
        height: 1072,
        url: absoluteUrl('/images/Stereograph.webp'),
        width: 4380,
      },
    ],
    locale: 'en_US',
    siteName: 'Capgras',
    title: 'Capgras: A Literary Journal of Undiagnosable Writing',
    type: 'website',
    url: absoluteUrl('/'),
  },
  icons: {
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
    icon: [{ url: '/favicon/favicon-32x32.png' }],
  },
};

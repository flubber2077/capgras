import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import '../styles/index.css';
import { headerFont, titleFont, subTitleFont, textFont } from './fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hexCharacters = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ] as const;
  //                R    G    B
  const bgColor = [251, 240, 255];

  const transformNumToHex = (num: number) => {
    const [high, low] = [Math.floor(num / 16), num % 16];
    return `${hexCharacters[high]}${hexCharacters[low]}` as const;
  };

  const calculatedBackground = bgColor.map(transformNumToHex).join('');

  const calculatedFill = bgColor
    .map((n) => n - 40)
    .map(transformNumToHex)
    .join('');

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: `#${calculatedBackground}`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23${calculatedFill}' fill-opacity='0.99' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
        className={`flex min-h-svh flex-col ${headerFont.variable} ${titleFont.variable} ${subTitleFont.variable} ${textFont.variable}`}
      >
        <Analytics />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

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
    title: 'Capgras: A Literary Journal of Undiagnosable Writing',
    description:
      'Capgras is a literary journal for hosting writing that engages in delusion, doubleness, misidentification, the sinister, and the precious',
    url: absoluteUrl('/'),
    siteName: 'Capgras',
    images: [
      {
        url: absoluteUrl('/images/Stereograph.webp'),
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

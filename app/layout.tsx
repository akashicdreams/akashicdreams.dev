import type { Metadata } from 'next';
import { Rajdhani, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ServiceTransitionProvider } from '@/components/providers/service-transition-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { LoadingScreen } from '@/components/loading-screen';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { PageTransitionBar } from '@/components/ui/page-transition';

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const SITE_TITLE = 'akashic dreams | creare site-uri și aplicații în bistrița-năsăud';
const SITE_DESCRIPTION =
  'studio de software și creație din sângeorz-băi. creare site-uri, aplicații mobile, identitate vizuală, fotografie, video și social media pentru afaceri din bistrița-năsăud și cluj. o singură echipă pentru tot.';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | akashic dreams',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'creare site web bistrita',
    'creare site-uri bistrita-nasaud',
    'aplicatii mobile romania',
    'identitate vizuala bistrita',
    'social media bistrita',
    'fotografie evenimente bistrita-nasaud',
    'sangeorz-bai',
    'akashic dreams',
  ],
  metadataBase: new URL('https://akashicdreams.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://akashicdreams.dev',
    siteName: 'akashic dreams',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'akashic dreams' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${inter.variable} antialiased`}>
        {/* Local business structured data - helps google connect the studio to the area it serves */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'akashic dreams',
              description:
                'studio de software și creație: site-uri, aplicații mobile, identitate vizuală, fotografie, video și social media.',
              url: 'https://akashicdreams.dev',
              email: 'admin@akashicdreams.dev',
              telephone: '+40741963166',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'strada plopului 2h',
                addressLocality: 'sângeorz-băi',
                addressRegion: 'bistrița-năsăud',
                addressCountry: 'RO',
              },
              areaServed: [
                { '@type': 'AdministrativeArea', name: 'bistrița-năsăud' },
                { '@type': 'AdministrativeArea', name: 'cluj' },
              ],
              sameAs: [
                'https://www.linkedin.com/company/akashic-dreams/',
                'https://www.instagram.com/akashicdreams.dev/',
                'https://www.facebook.com/profile.php?id=61586506872768',
              ],
            }),
          }}
        />
        <ThemeProvider>
          <ServiceTransitionProvider>
            <CustomCursor />
            <PageTransitionBar />
            <LoadingScreen />
            <Navigation />
            <main className="pt-[88px]">{children}</main>
            <Footer />
          </ServiceTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

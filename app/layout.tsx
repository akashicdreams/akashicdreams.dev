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

export const metadata: Metadata = {
  title: {
    default: 'akashic dreams | building software and visual stories',
    template: '%s | akashic dreams',
  },
  description: 'IT and creative studio specializing in software development and visual storytelling. Building systems that ship, scale, and stay maintainable.',
  metadataBase: new URL('https://akashicdreams.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akashicdreams.dev',
    siteName: 'akashic dreams',
    title: 'akashic dreams | building software and visual stories',
    description: 'IT and creative studio specializing in software development and visual storytelling.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'akashic dreams' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'akashic dreams | building software and visual stories',
    description: 'IT and creative studio specializing in software development and visual storytelling.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${inter.variable} antialiased`}>
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

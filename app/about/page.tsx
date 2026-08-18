import { Metadata } from 'next';
import { AboutPageClient } from '@/components/about/about-page-client';

export const metadata: Metadata = {
    title: 'despre noi',
    description: 'cine suntem: un studio mic de software și creație din sângeorz-băi, bistrița-năsăud, care lucrează cu afaceri locale.',
};

export default function AboutPage() {
    return <AboutPageClient />;
}

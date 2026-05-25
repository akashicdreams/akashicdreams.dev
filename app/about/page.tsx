import { Metadata } from 'next';
import { AboutPageClient } from '@/components/about/about-page-client';

export const metadata: Metadata = {
    title: 'about us',
    description: 'the story behind akashic dreams -where code meets consciousness',
};

export default function AboutPage() {
    return <AboutPageClient />;
}

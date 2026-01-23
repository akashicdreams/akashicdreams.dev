import { Metadata } from 'next';
import { AboutUs } from '@/components/home/about-us';

export const metadata: Metadata = {
    title: 'about us',
    description: 'sound in its purest state',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <AboutUs />
        </div>
    );
}

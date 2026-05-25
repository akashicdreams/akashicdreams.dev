import type { Metadata } from 'next';
import { UnrestedPageClient } from '@/components/unrested/unrested-page-client';

export const metadata: Metadata = {
    title: 'unrested - the alarm that earns your morning',
    description:
        'No snooze. Complete mental challenges to stop the alarm. Build discipline, one morning at a time. Available on Google Play.',
    openGraph: {
        title: 'unrested - the alarm that earns your morning',
        description:
            'No snooze. Complete mental challenges to stop the alarm. Build discipline, one morning at a time.',
        url: 'https://akashicdreams.dev/unrested',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'unrested - the alarm that earns your morning',
        description: 'No snooze. Complete mental challenges to stop the alarm.',
    },
};

export default function UnrestedPage() {
    return <UnrestedPageClient />;
}

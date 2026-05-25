import type { Metadata } from 'next';
import { UnrestedPrivacyClient } from '@/components/unrested/unrested-privacy-client';

export const metadata: Metadata = {
    title: 'unrested - privacy policy',
    description:
        'Privacy policy for the Unrested alarm app. Unrested collects no personal data, requires no account, and operates 100% offline.',
    openGraph: {
        title: 'unrested - privacy policy',
        description: 'Unrested collects no personal data and operates fully offline.',
        url: 'https://akashicdreams.dev/unrested/privacy',
        type: 'website',
    },
};

export default function UnrestedPrivacyPage() {
    return <UnrestedPrivacyClient />;
}

import { Metadata } from 'next';
import { ContactPageClient } from '@/components/contact/contact-page-client';

export const metadata: Metadata = {
    title: 'contact',
    description: 'get in touch with akashic dreams.',
};

export default function ContactPage() {
    return <ContactPageClient />;
}

import { Metadata } from 'next';
import { ContactPageClient } from '@/components/contact/contact-page-client';

export const metadata: Metadata = {
    title: 'contact',
    description: 'hai să vorbim despre proiectul tău. studio de software și creație în sângeorz-băi, bistrița-năsăud.',
};

export default function ContactPage() {
    return <ContactPageClient />;
}

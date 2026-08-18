import { Metadata } from 'next';
import { services } from '@/lib/services';
import { ServicesListClient } from '@/components/services/services-list-client';

export const metadata: Metadata = {
    title: 'servicii',
    description: 'creare site-uri, aplicații mobile, identitate vizuală, fotografie, videografie și administrare social media, pentru afaceri din bistrița-năsăud și cluj.',
};

export default function ServicesPage() {
    return <ServicesListClient services={services} />;
}

import { Metadata } from 'next';
import { services } from '@/lib/services';
import { ServicesListClient } from '@/components/services/services-list-client';

export const metadata: Metadata = {
    title: 'services',
    description: 'what we offer — from software to visual storytelling',
};

export default function ServicesPage() {
    return <ServicesListClient services={services} />;
}

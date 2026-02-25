import { Metadata } from 'next';
import { getAllClientsWithPortfolio } from '@/lib/portfolio';
import { services } from '@/lib/services';
import { ClientsPageClient } from '@/components/clients/clients-page-client';

export const metadata: Metadata = {
    title: 'clients',
    description: 'the companies and individuals we work with across all our services.',
};

export default function ClientsPage() {
    const clients = getAllClientsWithPortfolio();

    const serviceMap = Object.fromEntries(
        services.map((s) => [s.slug, { title: s.title, number: s.number }])
    );

    return <ClientsPageClient clients={clients} serviceMap={serviceMap} />;
}

import { Metadata } from 'next';
import { getAllPortfolioItems } from '@/lib/portfolio';
import { services } from '@/lib/services';
import { PortfolioOverviewClient } from '@/components/portfolio/portfolio-overview-client';

export const metadata: Metadata = {
    title: 'portofoliu',
    description: 'proiectele noastre: site-uri, aplicații mobile, identitate vizuală, fotografie, video și social media.',
};

export default function PortfolioPage() {
    const portfolioByService = getAllPortfolioItems();

    return (
        <PortfolioOverviewClient
            portfolioByService={portfolioByService}
            services={services}
        />
    );
}

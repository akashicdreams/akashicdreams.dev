import { Metadata } from 'next';
import { getAllPortfolioItems } from '@/lib/portfolio';
import { services } from '@/lib/services';
import { PortfolioOverviewClient } from '@/components/portfolio/portfolio-overview-client';

export const metadata: Metadata = {
    title: 'portfolio',
    description: 'explore our work across web development, social media, mobile apps, videography, photography, and brand identity.',
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

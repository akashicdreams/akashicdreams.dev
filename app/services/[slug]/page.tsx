import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs, services } from '@/lib/services';
import { ServicePageClient } from '@/components/services/service-page-client';

interface ServicePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) return { title: 'service not found' };

    return {
        title: service.title,
        description: service.description,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const currentIndex = services.findIndex((s) => s.slug === slug);
    const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
    const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

    return (
        <ServicePageClient
            service={service}
            prevService={prevService}
            nextService={nextService}
            allServices={services}
        />
    );
}

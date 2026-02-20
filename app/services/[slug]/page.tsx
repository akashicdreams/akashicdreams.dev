import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs, services } from '@/lib/services';

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
        <div className="min-h-screen bg-[var(--bg)]" style={{ paddingTop: '6rem' }}>
            {/* Hero Image */}
            <div className="w-full aspect-[21/9] md:aspect-[3/1] relative overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-16">
                    <div className="container max-w-6xl mx-auto">
                        <span className="text-sm tracking-[0.2em] text-white/50 font-semibold block mb-4">
                            .{service.number}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold lowercase tracking-tighter">
                            {service.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 pt-24 pb-40">
                <div className="container max-w-6xl mx-auto">
                    {/* Description */}
                    <p className="text-xl md:text-2xl text-[var(--muted)] lowercase leading-relaxed mb-20 max-w-3xl">
                        {service.details}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
                        {/* Left: Features List */}
                        <div>
                            <h2 className="text-sm tracking-[0.2em] text-[var(--muted)] lowercase mb-10 font-semibold">
                                what&apos;s included
                            </h2>
                            <ul className="space-y-0">
                                {service.features.map((feature, i) => (
                                    <li
                                        key={feature}
                                        className="text-lg lowercase py-5 border-b border-[var(--border)] flex items-center gap-5"
                                    >
                                        <span className="text-sm text-[var(--muted)] font-semibold tracking-wider w-8 flex-shrink-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Price & CTA */}
                        <div className="flex flex-col gap-10">
                            <div className="border border-[var(--border)] rounded-sm p-10 md:p-12">
                                <span className="text-sm tracking-[0.2em] text-[var(--muted)] lowercase block mb-4 font-semibold">
                                    starting from
                                </span>
                                <div className="mb-6">
                                    <span className="text-6xl font-bold tracking-tight">
                                        {service.startingPrice}
                                    </span>
                                    <span className="text-xl text-[var(--muted)] ml-3 lowercase font-semibold">
                                        {service.currency}
                                    </span>
                                </div>
                                <p className="text-base text-[var(--muted)] lowercase mb-10">
                                    final pricing depends on project scope and requirements.
                                </p>
                                <Link
                                    href="/contact"
                                    className="block w-full text-center px-12 py-5 text-lg lowercase tracking-wider font-bold rounded-sm hover:opacity-80 transition-all"
                                    style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)' }}
                                >
                                    get in touch
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Prev/Next Navigation */}
                    <div className="mt-40 pt-20 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-12">
                        {prevService ? (
                            <Link
                                href={`/services/${prevService.slug}`}
                                className="group border border-[var(--border)] rounded-sm p-8 md:p-10 hover:border-[var(--fg)] transition-all"
                            >
                                <span className="text-sm text-[var(--muted)] lowercase mb-4 font-semibold tracking-wider block">
                                    ← previous service
                                </span>
                                <span className="text-2xl md:text-3xl font-bold lowercase group-hover:text-[var(--muted)] transition-colors block">
                                    {prevService.title}
                                </span>
                            </Link>
                        ) : (
                            <div />
                        )}
                        {nextService ? (
                            <Link
                                href={`/services/${nextService.slug}`}
                                className="group border border-[var(--border)] rounded-sm p-8 md:p-10 hover:border-[var(--fg)] transition-all md:text-right"
                            >
                                <span className="text-sm text-[var(--muted)] lowercase mb-4 font-semibold tracking-wider block">
                                    next service →
                                </span>
                                <span className="text-2xl md:text-3xl font-bold lowercase group-hover:text-[var(--muted)] transition-colors block">
                                    {nextService.title}
                                </span>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

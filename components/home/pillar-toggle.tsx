'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolio';
import type { Service } from '@/lib/services';
import { FocusedCarousel, CarouselItem } from '@/components/ui/focused-carousel';

interface PillarToggleProps {
    portfolioByService: Record<string, PortfolioItem[]>;
    services: Service[];
}

function portfolioItemToCarousel(item: PortfolioItem): CarouselItem {
    switch (item.type) {
        case 'website-development':
            return {
                id: item.slug,
                title: item.title,
                subtitle: item.description,
                image: item.thumbnail,
                link: item.url,
                external: true,
            };
        case 'mobile-application':
            return {
                id: item.slug,
                title: item.title,
                subtitle: item.description,
                image: item.thumbnail,
                link: item.website || item.github,
                external: true,
            };
        case 'photography':
            return {
                id: item.slug,
                title: item.title,
                subtitle: item.location,
                image: item.album?.cover,
                link: `/services/photography`,
                external: false,
            };
        case 'videography': {
            const ytMatch = item.youtubeUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
            const ytId = ytMatch?.[1];
            return {
                id: item.slug,
                title: item.title,
                subtitle: item.description,
                image: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : undefined,
                link: `/services/videography`,
                external: false,
            };
        }
        case 'social-media-management':
            return {
                id: item.slug,
                title: item.title,
                subtitle: item.description,
                link: `/services/social-media-management`,
                external: false,
            };
        case 'brand-identity':
            return {
                id: item.slug,
                title: item.title,
                subtitle: item.description,
                image: item.clientIcon || item.images?.[0],
                link: `/services/brand-identity`,
                external: false,
            };
    }
}

export function PillarToggle({ portfolioByService, services }: PillarToggleProps) {
    const activeSlugs = services
        .filter((s) => (portfolioByService[s.slug]?.length ?? 0) > 0)
        .map((s) => s.slug);

    const [activeTab, setActiveTab] = useState<string>(activeSlugs[0] || '');

    if (activeSlugs.length === 0) {
        return (
            <section className="px-6 md:px-8 pt-40 pb-40 md:pt-52 md:pb-52 relative overflow-hidden">
                <div className="container max-w-full mx-auto overflow-hidden relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center text-center mb-20"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                            our work
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                            portfolio
                        </h2>
                    </motion.div>
                    <div className="text-center py-12 text-[var(--muted)]">
                        <p className="text-xl lowercase mb-4">coming soon.</p>
                        <Link href="/services" className="text-sm underline hover:text-[var(--fg)] transition-colors lowercase">
                            explore our services →
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const activeItems = portfolioByService[activeTab] || [];
    const carouselItems = activeItems.map(portfolioItemToCarousel);

    const activeService = services.find((s) => s.slug === activeTab);
    const serviceLabel = activeService?.title || activeTab.replace(/-/g, ' ');

    return (
        <section className="px-6 md:px-8 pt-40 pb-40 md:pt-52 md:pb-52 relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)',
                }}
            />

            <div className="container max-w-full mx-auto overflow-hidden relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <span className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                        our work
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                        portfolio
                    </h2>
                </motion.div>

                <div className="flex justify-center mb-24 gap-6 md:gap-12 flex-wrap">
                    {activeSlugs.map((slug) => {
                        const svc = services.find((s) => s.slug === slug);
                        const label = svc?.title || slug.replace(/-/g, ' ');
                        return (
                            <button
                                key={slug}
                                onClick={() => setActiveTab(slug)}
                                className="relative text-lg md:text-2xl font-bold lowercase tracking-wider transition-all pb-4"
                            >
                                <span
                                    className={
                                        activeTab === slug
                                            ? 'text-[var(--fg)]'
                                            : 'text-[var(--muted)] hover:text-[var(--fg)]'
                                    }
                                >
                                    {label}
                                </span>
                                {activeTab === slug && (
                                    <motion.div
                                        layoutId="pillar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--fg)]"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <FocusedCarousel
                            items={carouselItems}
                            type={activeTab}
                            aspectRatio="video"
                            emptyMessage={`no ${serviceLabel} projects yet.`}
                        />
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mt-12"
                >
                    <Link
                        href="/portfolio"
                        className="group relative px-12 py-5 text-base lowercase tracking-wider border-2 border-[var(--fg)] rounded-sm overflow-hidden transition-all duration-500"
                    >
                        <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-500">
                            view all work
                        </span>
                        <div className="absolute inset-0 bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

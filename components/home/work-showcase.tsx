'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioItem } from '@/lib/portfolio';
import type { Service } from '@/lib/services';

interface WorkShowcaseProps {
    portfolioByService: Record<string, PortfolioItem[]>;
    services: Service[];
}

interface WorkCard {
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    /* logos and icons render contained instead of cropped */
    contain?: boolean;
    href: string;
    external: boolean;
    tag: string;
}

function itemToCard(item: PortfolioItem, tag: string): WorkCard {
    const base = { id: `${item.type}-${item.slug}`, title: item.title, tag };
    switch (item.type) {
        case 'website-development':
            return { ...base, subtitle: item.description, image: item.thumbnail, href: item.url || '/portfolio', external: !!item.url };
        case 'mobile-application':
            return { ...base, subtitle: item.description, image: item.thumbnail, href: item.website || item.github || '/portfolio', external: !!(item.website || item.github) };
        case 'photography':
            return { ...base, subtitle: item.location, image: item.album?.cover, href: '/services/photography', external: false };
        case 'videography': {
            const ytMatch = item.youtubeUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
            const ytId = ytMatch?.[1];
            return { ...base, subtitle: item.description, image: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : undefined, href: '/services/videography', external: false };
        }
        case 'social-media-management':
            return { ...base, subtitle: item.description, image: item.clientIcon, contain: true, href: '/services/social-media-management', external: false };
        case 'brand-identity':
            return { ...base, subtitle: item.description, image: item.clientIcon || item.images?.[0], contain: !item.images?.[0], href: '/services/brand-identity', external: false };
    }
}

export function WorkShowcase({ portfolioByService, services }: WorkShowcaseProps) {
    // Max two cards per service so every pillar gets representation
    const cards: WorkCard[] = [];
    for (const service of services) {
        const items = portfolioByService[service.slug] || [];
        const withImages = items
            .map((item) => itemToCard(item, service.title))
            .filter((c) => c.image)
            .slice(0, 2);
        cards.push(...withImages);
    }

    const shown = cards.slice(0, 6);

    if (shown.length === 0) return null;

    return (
        <section className="bg-[var(--surface)] text-[var(--fg)] rounded-t-[2rem] md:rounded-t-[3rem] relative z-10">
            <div className="container section-pad">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28"
                >
                    <h2 className="display-lg lowercase max-w-3xl">
                        proiectele noastre.
                    </h2>
                    <Link href="/portfolio" className="arrow-link text-lg lowercase shrink-0">
                        portofoliu <span className="arrow">→</span>
                    </Link>
                </motion.div>

                {/* Card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-20">
                    {shown.map((card, i) => {
                        const inner = (
                            <>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-deep)] border border-[var(--surface-border)]">
                                    {card.image && (
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className={
                                                card.contain
                                                    ? 'object-contain p-16 md:p-20 transition-transform duration-700 group-hover:scale-[1.04]'
                                                    : 'object-cover transition-transform duration-700 group-hover:scale-[1.04]'
                                            }
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-between gap-4 mt-6">
                                    <h3 className="text-xl md:text-2xl font-bold lowercase tracking-tight group-hover:opacity-70 transition-opacity min-w-0 truncate">
                                        {card.title}
                                    </h3>
                                    <span className="chip !border-[var(--surface-border)] !text-xs shrink-0 lowercase pointer-events-none">
                                        {card.tag}
                                    </span>
                                </div>
                            </>
                        );

                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
                            >
                                {card.external ? (
                                    <a href={card.href} target="_blank" rel="noopener noreferrer" className="group block">
                                        {inner}
                                    </a>
                                ) : (
                                    <Link href={card.href} className="group block">
                                        {inner}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mt-16 md:mt-20"
                >
                    <Link href="/portfolio" className="arrow-link text-lg lowercase">
                        vezi portofoliul complet <span className="arrow">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

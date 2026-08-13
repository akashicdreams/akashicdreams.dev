'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/lib/services';

const pillars: { label: string; blurb: string; slugs: string[] }[] = [
    {
        label: 'development',
        blurb: 'functional, fast, and optimized software.',
        slugs: ['website-development', 'mobile-application'],
    },
    {
        label: 'visual',
        blurb: 'identities, images, and films that tell a story.',
        slugs: ['brand-identity', 'photography', 'videography'],
    },
    {
        label: 'growth',
        blurb: 'consistent presence, adapted to your needs.',
        slugs: ['social-media-management'],
    },
];

export function ServicesPillars() {
    return (
        <section className="bg-[var(--surface-deep)] relative z-10">
            <div className="container section-pad">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28"
                >
                    <div className="max-w-3xl">
                        <h2 className="display-lg lowercase mb-6">
                            what can we create together?
                        </h2>
                        <p className="text-lg md:text-xl text-[var(--surface-muted)] lowercase leading-relaxed">
                            clarity, functionality, and results.
                        </p>
                    </div>
                    <Link href="/services" className="arrow-link text-lg lowercase shrink-0">
                        all services <span className="arrow">→</span>
                    </Link>
                </motion.div>

                {/* Pillar columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    {pillars.map((pillar, i) => {
                        const pillarServices = pillar.slugs
                            .map((slug) => services.find((s) => s.slug === slug))
                            .filter((s): s is NonNullable<typeof s> => !!s);

                        return (
                            <motion.div
                                key={pillar.label}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                            >
                                <h3 className="text-2xl md:text-3xl font-bold lowercase tracking-tight mb-3">
                                    {pillar.label}
                                </h3>
                                <p className="text-sm text-[var(--surface-muted)] lowercase mb-8">
                                    {pillar.blurb}
                                </p>

                                <div>
                                    {pillarServices.map((service) => (
                                        <Link
                                            key={service.slug}
                                            href={`/services/${service.slug}`}
                                            className="group flex items-baseline justify-between gap-4 py-4 border-t border-[var(--surface-border)] hover:border-[var(--fg)] transition-colors duration-400"
                                        >
                                            <span className="text-lg font-semibold lowercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                                                {service.title}
                                            </span>
                                            <span className="text-sm text-[var(--surface-muted)] lowercase whitespace-nowrap shrink-0">
                                                from {service.startingPrice} {service.currency.toLowerCase()}
                                            </span>
                                        </Link>
                                    ))}
                                    <div className="border-t border-[var(--surface-border)]" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-sm text-[var(--surface-muted)] lowercase mt-14 tracking-wide"
                >
                    all prices are estimates - final pricing depends on project scope and requirements.
                </motion.p>
            </div>
        </section>
    );
}

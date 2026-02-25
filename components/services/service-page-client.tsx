'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/lib/services';
import type { PortfolioItem } from '@/lib/portfolio';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { useServiceTransition } from '@/components/providers/service-transition-provider';

const shapes: Record<string, 'diamond' | 'circle' | 'triangle' | 'hexagon' | 'code-block'> = {
    'website-development': 'code-block',
    'social-media-management': 'hexagon',
    'mobile-application': 'diamond',
    'videography': 'triangle',
    'event-photography': 'circle',
    'brand-identity': 'hexagon',
};

interface ServicePageClientProps {
    service: Service;
    allServices: Service[];
    portfolioItems?: PortfolioItem[];
}

export function ServicePageClient({ service, allServices, portfolioItems = [] }: ServicePageClientProps) {
    const asciiShape = shapes[service.slug] || 'diamond';
    const { clearTransition } = useServiceTransition();

    useEffect(() => {
        clearTransition();
    }, [clearTransition]);

    return (
        <div className="min-h-screen bg-[var(--bg)] overflow-hidden">
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-[var(--bg)]/30" />
                </div>

                {/* Matrix rain over image */}
                <div className="absolute inset-0">
                    <MatrixRain opacity={0.06} speed={0.5} density={0.3} />
                </div>

                <FloatingParticles count={15} minSize={1} maxSize={3} />

                {/* ASCII art — centered behind content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
                    <AsciiArtFigure shape={asciiShape} rows={28} cols={32} animSpeed={2000} />
                </div>

                {/* Hero content — centered */}
                <div className="relative z-10 w-full pt-32 pb-20">
                    <div className="container max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex flex-col items-center text-center"
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-sm tracking-[0.3em] text-[var(--muted)] font-mono font-semibold mb-8"
                            >
                                .{service.number}
                            </motion.span>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8">
                                {service.title}
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-xl md:text-2xl text-[var(--muted)] lowercase max-w-xl leading-relaxed"
                            >
                                {service.description}
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ─── ABOUT ─── */}
            <section className="relative py-44 md:py-52">
                <div className="absolute inset-0 animated-gradient-bg" />
                <div className="relative z-10 flex justify-center px-8 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                        style={{ maxWidth: '56rem' }}
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                            about the service
                        </span>
                        <p className="text-2xl md:text-3xl lg:text-4xl lowercase leading-relaxed text-[var(--fg)] font-light">
                            {service.details}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ─── FEATURES ─── */}
            <section className="relative py-44 md:py-52 overflow-hidden">
                <div className="absolute inset-0">
                    <MatrixRain opacity={0.03} speed={0.4} density={0.2} />
                </div>
                <FloatingParticles count={10} minSize={1} maxSize={3} />

                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-28 md:mb-36"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
                            what&apos;s included
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                            features
                        </h2>
                    </motion.div>

                    {/* Feature cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {service.features.map((feature, i) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group relative border border-[var(--border)] rounded-sm p-8 md:p-10 hover:border-[var(--fg)] transition-all duration-500 overflow-hidden card-glow text-center"
                            >
                                {/* Background number */}
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[7rem] font-bold text-[var(--fg)] opacity-[0.03] leading-none font-mono select-none pointer-events-none">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* Content */}
                                <div className="relative z-10">
                                    <span className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold block mb-4">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-lg md:text-xl lowercase font-medium leading-snug">
                                        {feature}
                                    </span>
                                </div>

                                {/* Hover accent */}
                                <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {portfolioItems.length > 0 && (
                <>
                    <div className="section-divider" />
                    <PortfolioSection serviceSlug={service.slug} items={portfolioItems} />
                </>
            )}

            <div className="section-divider" />

            {/* ─── PRICING ─── */}
            <section className="relative py-44 md:py-52 overflow-hidden">
                <FloatingParticles count={8} minSize={1} maxSize={3} />

                {/* Decorative rotating shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.03]">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full border border-[var(--fg)] rounded-[40%]"
                    />
                </div>

                <div className="relative z-10 flex justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ width: '100%', maxWidth: '40rem' }}
                    >
                        <div className="border border-[var(--border)] rounded-sm p-12 md:p-16 text-center relative overflow-hidden card-glow">
                            <div
                                className="absolute inset-0 pointer-events-none opacity-30"
                                style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.03) 0%, transparent 60%)' }}
                            />

                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                                    starting from
                                </span>
                                <div className="mb-4">
                                    <span className="text-7xl md:text-8xl font-bold tracking-tighter">
                                        {service.startingPrice}
                                    </span>
                                </div>
                                <span className="text-lg text-[var(--muted)] lowercase font-semibold block mb-12">
                                    {service.currency}
                                </span>
                                <p className="text-sm text-[var(--muted)] lowercase mb-14" style={{ maxWidth: '24rem' }}>
                                    final pricing depends on project scope and requirements
                                </p>
                                <Link
                                    href="/contact"
                                    className="group relative inline-block px-16 py-6 text-lg lowercase tracking-wider font-bold rounded-sm overflow-hidden transition-all duration-500 border-2 border-[var(--fg)]"
                                >
                                    <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-500">
                                        get in touch
                                    </span>
                                    <div className="absolute inset-0 bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ─── OTHER SERVICES ─── */}
            <section className="relative py-44 md:py-40 overflow-hidden">
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-20"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
                            explore more
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                            other services
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allServices
                            .filter(s => s.slug !== service.slug)
                            .map((s, i) => (
                                <motion.div
                                    key={s.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                >
                                    <Link
                                        href={`/services/${s.slug}`}
                                        className="group block border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 relative"
                                    >
                                        <div className="aspect-[16/10] relative overflow-hidden bg-black">
                                            <Image
                                                src={s.image}
                                                alt={s.title}
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-8 text-center">
                                                <span className="text-xs font-mono text-white/40 tracking-wider mb-2 font-semibold">
                                                    .{s.number}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold lowercase text-white tracking-tight">
                                                    {s.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </Link>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>

            <div className="h-20" aria-hidden="true" />
        </div>
    );
}

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Service } from '@/lib/services';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';
import { useServiceTransition } from '@/components/providers/service-transition-provider';

function ServiceRow({ service, index }: { service: Service; index: number }) {
    const desktopImageRef = useRef<HTMLDivElement>(null);
    const mobileImageRef = useRef<HTMLDivElement>(null);
    const { triggerTransition } = useServiceTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = desktopImageRef.current?.offsetWidth
            ? desktopImageRef.current
            : mobileImageRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        triggerTransition(service.image, rect, `/services/${service.slug}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
        >
            <a
                href={`/services/${service.slug}`}
                onClick={handleClick}
                className="group block cursor-pointer"
            >
                <div className="py-7 md:py-10 border-t border-[var(--border)] group-hover:border-[var(--fg)] transition-colors duration-500">
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center gap-8">
                        <motion.span
                            className="text-sm font-mono text-[var(--muted)] tracking-wider font-semibold shrink-0 w-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        >
                            .{service.number}
                        </motion.span>

                        <div ref={desktopImageRef} className="w-24 h-16 rounded-sm overflow-hidden shrink-0 relative bg-black/50">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight group-hover:tracking-normal transition-all duration-500 mb-2">
                                {service.title}
                            </h2>
                            <p className="text-sm text-[var(--muted)] lowercase leading-relaxed max-w-md">
                                {service.description}
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2 shrink-0">
                            <span className="text-xs tracking-wider text-[var(--muted)] lowercase font-semibold">
                                from
                            </span>
                            <span className="text-3xl font-bold tracking-tight">
                                {service.startingPrice}
                            </span>
                            <span className="text-sm text-[var(--muted)] lowercase font-semibold">
                                {service.currency}
                            </span>
                        </div>

                        <span className="text-lg text-[var(--muted)] group-hover:text-[var(--fg)] group-hover:translate-x-2 transition-all duration-300 shrink-0">
                            →
                        </span>
                    </div>

                    {/* Mobile layout */}
                    <div className="flex md:hidden gap-4">
                        <div className="shrink-0 flex flex-col items-center gap-3">
                            <span className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold">
                                .{service.number}
                            </span>
                            <div ref={mobileImageRef} className="w-16 h-12 rounded-sm overflow-hidden relative bg-black/50">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover opacity-80"
                                />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold lowercase tracking-tight mb-2">
                                {service.title}
                            </h2>
                            <p className="text-sm text-[var(--muted)] lowercase leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs tracking-wider text-[var(--muted)] lowercase font-semibold">
                                    from
                                </span>
                                <span className="text-2xl font-bold tracking-tight">
                                    {service.startingPrice}
                                </span>
                                <span className="text-sm text-[var(--muted)] lowercase font-semibold">
                                    {service.currency}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </a>
        </motion.div>
    );
}

interface ServicesListClientProps {
    services: Service[];
}

export function ServicesListClient({ services }: ServicesListClientProps) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero area */}
            <div className="relative" style={{ paddingTop: '7rem' }}>
                <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain opacity={0.05} speed={0.5} density={0.3} />
                </div>

                <FloatingParticles count={20} minSize={1} maxSize={3} />

                <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-[0.25]">
                    <AsciiArtFigure shape="hexagon" rows={30} cols={36} animSpeed={2000} />
                </div>

                <div
                    className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    className="absolute top-40 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />

                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center pt-16 pb-48 md:pt-24 md:pb-60"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
                        >
                            what we offer
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8 text-center">
                            services
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase text-center"
                        >
                            from software to visual storytelling
                        </motion.p>
                    </motion.header>
                </div>

                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
                    style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
                />
            </div>

            {/* Services list */}
            <div className="relative z-10 animated-gradient-bg" style={{ paddingBottom: '8rem' }}>
                <div className="absolute inset-0 scan-line pointer-events-none opacity-50" />

                <div className="container max-w-5xl mx-auto px-6 relative flex flex-col gap-6 md:gap-4">
                    {services.map((service, i) => (
                        <ServiceRow key={service.slug} service={service} index={i} />
                    ))}
                    <div className="border-t border-[var(--border)]" />
                </div>
            </div>
        </div>
    );
}

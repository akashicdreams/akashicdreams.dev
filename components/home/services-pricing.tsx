'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { services, Service } from '@/lib/services';
import { FloatingParticles } from '@/components/ui/floating-particles';
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <a
                href={`/services/${service.slug}`}
                onClick={handleClick}
                className="group block cursor-pointer"
            >
                <div className="py-6 md:py-8 border-t border-[var(--border)] group-hover:border-[var(--fg)] transition-colors duration-500">
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center gap-7">
                        <motion.span
                            className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold shrink-0 w-8"
                            whileInView={{ opacity: [0, 1] }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                        >
                            .{service.number}
                        </motion.span>

                        <div ref={desktopImageRef} className="w-20 h-14 rounded-sm overflow-hidden shrink-0 relative bg-black/50">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold lowercase tracking-tight group-hover:tracking-normal transition-all duration-500">
                                {service.title}
                            </h3>
                            <p className="text-sm text-[var(--muted)] lowercase mt-1">
                                {service.description}
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2 shrink-0">
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

                        <span className="text-[var(--muted)] group-hover:text-[var(--fg)] group-hover:translate-x-1 transition-all duration-300 shrink-0">
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
                            <h3 className="text-lg font-bold lowercase tracking-tight mb-2">
                                {service.title}
                            </h3>
                            <p className="text-sm text-[var(--muted)] lowercase leading-relaxed mb-3">
                                {service.description}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs tracking-wider text-[var(--muted)] lowercase font-semibold">
                                    from
                                </span>
                                <span className="text-xl font-bold tracking-tight">
                                    {service.startingPrice}
                                </span>
                                <span className="text-sm text-[var(--muted)] lowercase font-semibold">
                                    {service.currency}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}

export function ServicesPricing() {
    return (
        <section className="px-6 md:px-8 pt-40 pb-40 md:pt-52 md:pb-52 bg-[var(--bg)] relative z-10 overflow-hidden animated-gradient-bg">
            <FloatingParticles count={15} minSize={1} maxSize={3} />

            <div
                className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, var(--bg), transparent)',
                }}
            />

            <div className="container max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col items-center text-center mb-28 md:mb-36"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
                    >
                        services & pricing
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                        what we offer
                    </h2>
                </motion.div>

                <div className="relative flex flex-col gap-6 md:gap-4">
                    {services.map((service, i) => (
                        <ServiceRow key={service.slug} service={service} index={i} />
                    ))}
                    <div className="border-t border-[var(--border)]" />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-sm text-[var(--muted)] mt-20 lowercase font-medium tracking-wide"
                >
                    all prices are estimates. final pricing depends on project scope and requirements.
                </motion.p>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, var(--bg), transparent)',
                }}
            />
        </section>
    );
}

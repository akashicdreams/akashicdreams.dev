'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/services';
import { FloatingParticles } from '@/components/ui/floating-particles';

export function ServicesPricing() {
    return (
        <section className="px-6 md:px-8 pt-40 pb-40 md:pt-52 md:pb-52 bg-[var(--bg)] relative z-10 overflow-hidden animated-gradient-bg">
            {/* Subtle particles in background */}
            <FloatingParticles count={15} minSize={1} maxSize={3} />

            {/* Top gradient fade */}
            <div
                className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, var(--bg), transparent)',
                }}
            />

            <div className="container max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col items-center text-center mb-32 md:mb-40"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
                    {services.map((service, i) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                                className="group card-glow border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all duration-500 relative overflow-hidden h-full"
                            >
                                {/* Service Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-black">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <span className="absolute top-5 left-6 text-sm tracking-[0.25em] text-white/50 font-semibold z-10 font-mono">
                                        .{service.number}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="p-9 md:p-11">
                                    <h3 className="text-2xl font-bold lowercase mb-4 tracking-tight group-hover:tracking-normal transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-base text-[var(--muted)] lowercase leading-relaxed mb-8">
                                        {service.description}
                                    </p>

                                    {/* Price */}
                                    <div className="pt-7 border-t border-[var(--border)] flex items-baseline justify-between">
                                        <div>
                                            <span className="text-xs tracking-[0.25em] text-[var(--muted)] lowercase block mb-3 font-semibold">
                                                starting from
                                            </span>
                                            <span className="text-4xl font-bold tracking-tight">
                                                {service.startingPrice}
                                            </span>
                                            <span className="text-base text-[var(--muted)] ml-2 lowercase font-semibold">
                                                {service.currency}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[var(--muted)] lowercase group-hover:text-[var(--fg)] transition-colors duration-300 font-semibold tracking-wider">
                                            details →
                                        </span>
                                    </div>
                                </div>

                                {/* Hover accent line */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-sm text-[var(--muted)] mt-24 lowercase font-medium tracking-wide"
                >
                    all prices are estimates. final pricing depends on project scope and requirements.
                </motion.p>
            </div>

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, var(--bg), transparent)',
                }}
            />
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/services';

export function ServicesPricing() {
    return (
        <section className="px-6 md:px-8 border-t border-[var(--border)] pt-36 pb-36 bg-[var(--bg)] relative z-10">
            <div className="container max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-28"
                >
                    <span className="text-base tracking-[0.3em] text-[var(--muted)] mb-6 lowercase font-semibold">
                        services & pricing
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                        what we offer
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all relative overflow-hidden h-full"
                            >
                                {/* Service Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-black">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <span className="absolute top-4 left-5 text-sm tracking-[0.2em] text-white/60 font-semibold z-10">
                                        .{service.number}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="p-8 md:p-10">
                                    <h3 className="text-2xl font-bold lowercase mb-3 tracking-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-base text-[var(--muted)] lowercase leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Price */}
                                    <div className="pt-6 border-t border-[var(--border)] flex items-baseline justify-between">
                                        <div>
                                            <span className="text-sm tracking-[0.2em] text-[var(--muted)] lowercase block mb-2 font-semibold">
                                                starting from
                                            </span>
                                            <span className="text-4xl font-bold tracking-tight">
                                                {service.startingPrice}
                                            </span>
                                            <span className="text-base text-[var(--muted)] ml-2 lowercase font-semibold">
                                                {service.currency}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[var(--muted)] lowercase group-hover:text-[var(--fg)] transition-colors font-semibold tracking-wider">
                                            details →
                                        </span>
                                    </div>
                                </div>

                                {/* Hover accent line */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-base text-[var(--muted)] mt-16 lowercase font-medium"
                >
                    all prices are estimates. final pricing depends on project scope and requirements.
                </motion.p>
            </div>
        </section>
    );
}

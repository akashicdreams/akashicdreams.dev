'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { testimonials } from '@/lib/testimonials';

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1 text-[var(--accent)]" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-[var(--border)]'}`}
                    aria-hidden="true"
                >
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
            ))}
        </div>
    );
}

function Avatar({ photo, name }: { photo?: string; name: string }) {
    if (photo) {
        return (
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[var(--border)]">
                <Image src={photo} alt={name} fill className="object-cover" sizes="48px" />
            </div>
        );
    }
    const initials = name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('');
    return (
        <div className="w-12 h-12 rounded-full shrink-0 border border-[var(--border)] flex items-center justify-center font-display font-bold lowercase text-[var(--muted)]">
            {initials}
        </div>
    );
}

export function Testimonials() {
    if (testimonials.length === 0) return null;

    return (
        <section className="bg-[var(--bg)] relative z-10">
            <div className="container section-pad">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28"
                >
                    <h2 className="display-lg lowercase max-w-3xl">
                        what clients say.
                    </h2>
                    <div className="flex items-baseline gap-2.5 text-sm text-[var(--muted)] lowercase tracking-wide shrink-0">
                        <span className="font-display text-3xl font-bold text-[var(--fg)] tabular-nums">5.0</span>
                        <span>/ 5 from our clients</span>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {testimonials.map((t, i) => (
                        <motion.figure
                            key={`${t.name}-${i}`}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col gap-8 p-8 md:p-10 border border-[var(--border)] rounded-2xl hover:border-[var(--accent)] transition-colors duration-500"
                        >
                            <Stars rating={t.rating} />
                            <blockquote className="text-base md:text-lg lowercase leading-relaxed text-[var(--fg)] flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <figcaption className="flex items-center gap-4">
                                <Avatar photo={t.photo} name={t.name} />
                                <div className="min-w-0">
                                    <div className="font-display font-bold lowercase tracking-tight truncate">
                                        {t.name}
                                    </div>
                                    <div className="text-sm text-[var(--muted)] lowercase truncate">
                                        {t.role}, {t.company}
                                    </div>
                                </div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

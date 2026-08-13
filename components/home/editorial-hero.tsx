'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { services } from '@/lib/services';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export function EditorialHero() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && theme === 'light'
        ? '/brand/logo-mark-light.svg'
        : '/brand/logo-mark-dark.svg';

    return (
        <section className="relative flex flex-col justify-center min-h-[calc(100vh-88px)] py-24 md:py-28">
            <div className="container">
                {/* Greeting */}
                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl md:text-3xl font-bold lowercase mb-10 md:mb-14"
                >
                    hello!{' '}
                    <motion.span
                        aria-hidden="true"
                        className="inline-block origin-[70%_70%]"
                        animate={{ rotate: [0, 18, -8, 14, 0] }}
                        transition={{ duration: 1.6, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                    >
                        👋
                    </motion.span>
                </motion.p>

                {/* Big editorial headline */}
                <h1 className="display-xl lowercase max-w-5xl">
                    <motion.span
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="block"
                    >
                        we are the studio of
                    </motion.span>
                    <motion.span
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="block"
                    >
                        software{' '}
                        <span className="inline-block align-baseline text-[var(--accent)]">+</span>{' '}
                        visual stories
                    </motion.span>
                    <motion.span
                        {...fadeUp}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="block"
                    >
                        dedicated to your ideas
                        {mounted && (
                            <span className="inline-block relative w-[0.8em] h-[0.8em] ml-4 align-baseline translate-y-[0.12em]">
                                <Image
                                    src={logoSrc}
                                    alt=""
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </span>
                        )}
                    </motion.span>
                </h1>

                {/* One short supporting line */}
                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.7, delay: 0.75 }}
                    className="text-lg md:text-xl text-[var(--muted)] lowercase max-w-xl mt-12 md:mt-14 leading-relaxed"
                >
                    websites, apps, brands, and the stories told around them.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="flex flex-wrap items-center gap-x-14 gap-y-8 mt-12 md:mt-16"
                >
                    <Link
                        href="/contact"
                        className="group relative font-display px-9 py-4 border border-[var(--fg)] rounded-full text-lg lowercase tracking-wide overflow-hidden transition-colors duration-400"
                    >
                        <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-400">
                            let&apos;s talk <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                        <span className="absolute inset-0 bg-[var(--fg)] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />
                    </Link>

                    <div className="flex items-baseline gap-2.5 text-sm text-[var(--muted)] lowercase tracking-wide">
                        <span className="font-display text-3xl font-bold text-[var(--fg)] tabular-nums">15+</span>
                        <span>projects delivered</span>
                    </div>
                </motion.div>

                {/* Service chips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.15 }}
                    className="mt-28 md:mt-36"
                >
                    <p className="text-xs tracking-[0.35em] text-[var(--muted)] lowercase font-semibold mb-8">
                        how can we help?
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="chip lowercase"
                            >
                                {service.title}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: 15, suffix: '+', label: 'projects delivered' },
    { value: 5, suffix: '+', label: 'happy clients' },
    { value: 6, suffix: '', label: 'service pillars' },
    { value: 100, suffix: '%', label: 'passion for craft' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || hasRun.current) return;
                hasRun.current = true;

                const duration = 1600;
                const start = performance.now();

                const tick = () => {
                    const elapsed = performance.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.round(eased * value));
                    if (progress < 1) requestAnimationFrame(tick);
                };

                requestAnimationFrame(tick);
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export function StatsCounter() {
    return (
        <section className="border-y border-[var(--border)] relative overflow-hidden">
            <div className="container max-w-5xl mx-auto px-6 py-16 md:py-20">
                {/* On mobile: 2 columns, divider between the two rows only */}
                {/* On desktop: 4 columns in a row, dividers between each */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-[var(--border)]">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center py-10 px-4"
                        >
                            <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-3 tabular-nums">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className="text-[11px] tracking-[0.28em] text-[var(--muted)] lowercase font-semibold">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

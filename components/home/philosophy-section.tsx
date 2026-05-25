'use client';

import { motion } from 'framer-motion';
import { TextScramble } from '@/components/ui/text-scramble';

const services = [
    {
        category: 'development',
        items: ['web applications', 'mobile apps', 'automation systems', 'ai integration']
    },
    {
        category: 'visual',
        items: ['photography', 'visual storytelling', 'brand identity', 'motion design']
    },
    {
        category: 'approach',
        items: ['user-first design', 'clean architecture', 'performance focus', 'continuous iteration']
    }
];

export function PhilosophySection() {
    return (
        <section className="px-4 border-t border-[var(--border)] pt-32 pb-32 bg-[var(--bg)] relative z-10">
            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-32"
                >
                    <h2 className="text-4xl md:text-6xl font-bold lowercase mb-12 tracking-tighter">
                        <TextScramble text="cinematic tech." duration={1100} />
                    </h2>

                    <div className="max-w-3xl w-full flex justify-center">
                        <p className="text-xl md:text-2xl text-[var(--muted)] leading-relaxed lowercase text-center">
                            we build software that ships, scales, and stays maintainable.
                            we capture visual stories that resonate. clean execution, no excess.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="group"
                        >
                            <h3 className="text-xl font-bold lowercase mb-8 text-center md:text-left border-b border-[var(--border)] pb-4 text-[var(--fg)]">
                                {service.category}
                            </h3>
                            <div className="space-y-4">
                                {service.items.map((item, j) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ x: 10, backgroundColor: 'var(--fg)', color: 'var(--bg)' }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="p-4 border border-[var(--border)] rounded-sm cursor-default transition-colors text-center md:text-left"
                                    >
                                        <span className="lowercase text-lg tracking-wide">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

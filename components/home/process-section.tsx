'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'we start with a conversation',
        text: "we talk about your vision, needs, and goals - making sure we're on the same wavelength before anything else.",
    },
    {
        number: '02',
        title: 'we sketch the idea',
        text: 'we explore concepts, draft the first versions, and define the visual and technical direction of the project.',
    },
    {
        number: '03',
        title: 'we build, test, optimize',
        text: 'we put the plan into action, make sure every detail is in place, and adjust wherever needed.',
    },
    {
        number: '04',
        title: 'we stay connected',
        text: 'we deliver the finished project, offer support, and help you maximize the impact of the result.',
    },
];

const values = [
    {
        number: '01',
        title: 'authentic collaboration',
        text: 'partnerships built on understanding your vision, not just deliverables.',
    },
    {
        number: '02',
        title: 'transparency and commitment',
        text: 'direct, honest, and clear at every step of the way.',
    },
    {
        number: '03',
        title: 'strategic direction',
        text: 'we focus on impact, so every project supports your growth.',
    },
    {
        number: '04',
        title: 'long-term support',
        text: "we don't stop at delivery. we stay close so your brand grows healthy.",
    },
];

export function ProcessSection() {
    return (
        <section className="bg-[var(--bg)] relative z-10">
            <div className="container section-pad">
                {/* How we work */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mb-20 md:mb-28"
                >
                    <h2 className="display-lg lowercase mb-6">
                        how we work.
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--muted)] lowercase leading-relaxed">
                        a clear process, aligned with your goals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 mb-32 md:mb-44">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
                            className="border-t border-[var(--border)] pt-8"
                        >
                            <span className="block text-sm font-mono text-[var(--accent)] tracking-wider mb-4">
                                [{step.number}]
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold lowercase tracking-tight mb-4">
                                {step.title}
                            </h3>
                            <p className="text-base md:text-lg text-[var(--muted)] lowercase leading-relaxed">
                                {step.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Why us */}
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="display-lg lowercase max-w-3xl mb-16 md:mb-20"
                >
                    why work with us?
                </motion.h2>

                <div className="flex flex-col">
                    {values.map((value, i) => (
                        <motion.div
                            key={value.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.06 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 border-t border-[var(--border)] last:border-b"
                        >
                            <span className="md:col-span-1 text-sm font-mono text-[var(--accent)] tracking-wider">
                                [{value.number}]
                            </span>
                            <h3 className="md:col-span-5 text-xl md:text-2xl font-bold lowercase tracking-tight">
                                {value.title}
                            </h3>
                            <p className="md:col-span-6 text-base md:text-lg text-[var(--muted)] lowercase leading-relaxed">
                                {value.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

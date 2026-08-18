'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'începem cu o discuție',
        text: 'vorbim despre viziunea, nevoile și obiectivele tale, ca să fim pe aceeași lungime de undă.',
    },
    {
        number: '02',
        title: 'conturăm ideea',
        text: 'explorăm concepte, schițăm primele variante și definim direcția vizuală și tehnică.',
    },
    {
        number: '03',
        title: 'construim, testăm, optimizăm',
        text: 'punem planul în aplicare, verificăm fiecare detaliu și ajustăm unde e nevoie.',
    },
    {
        number: '04',
        title: 'rămânem aproape',
        text: 'livrăm proiectul, oferim suport și te ajutăm să crești cu el mai departe.',
    },
];

export function ProcessSection() {
    return (
        <section className="bg-[var(--bg)] relative z-10">
            <div className="container section-pad">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mb-20 md:mb-28"
                >
                    <h2 className="display-lg lowercase mb-6">
                        cum lucrăm.
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--muted)] lowercase leading-relaxed">
                        un proces clar, aliniat cu obiectivele tale.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
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
            </div>
        </section>
    );
}

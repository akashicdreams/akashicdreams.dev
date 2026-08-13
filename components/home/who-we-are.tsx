'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const marqueeText = Array(8).fill("let's work together!");

export function WhoWeAre() {
    return (
        <section className="on-inverse bg-[var(--inverse-bg)] text-[var(--inverse-fg)] relative z-10 overflow-hidden">
            <div className="container section-pad">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-5"
                    >
                        <h2 className="display-lg lowercase">who are we?</h2>
                    </motion.div>

                    {/* Prose */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="lg:col-span-7 space-y-8 text-lg md:text-2xl leading-relaxed lowercase"
                    >
                        <p>
                            a small studio from sângeorz-băi, românia. clear ideas, attention
                            to detail, and the drive to build things that actually work.
                        </p>
                        <p className="text-[var(--inverse-muted)]">
                            what makes us happiest? when clients come back, or recommend
                            us further.
                        </p>

                        <div className="pt-6">
                            <Link href="/about" className="arrow-link text-lg lowercase">
                                find out more <span className="arrow">→</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Big text marquee */}
            <div className="border-t border-[var(--inverse-border)] py-8 md:py-12 overflow-hidden select-none" aria-hidden="true">
                <div className="text-marquee-track">
                    {[0, 1].map((half) => (
                        <div key={half} className="flex shrink-0">
                            {marqueeText.map((text, i) => (
                                <span
                                    key={`${half}-${i}`}
                                    className={`display-lg lowercase whitespace-nowrap px-6 md:px-10 ${i % 2 === 1 ? 'text-transparent [-webkit-text-stroke:1px_var(--inverse-fg)]' : ''}`}
                                >
                                    {text}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

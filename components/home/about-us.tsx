'use client';

import { motion } from 'framer-motion';

export function AboutUs() {
    return (
        <section className="py-24 px-4 bg-[var(--bg)]">
            <div className="container max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] mb-4 text-[var(--muted)] lowercase">
                        about us
                    </h2>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12 lowercase">
                        a laptop and a camera
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left text-[var(--muted)] leading-relaxed lowercase">
                        <p>
                            akashic dreams is a small studio where software and photography live happily together. we build digital things that make life easier
                        </p>
                        <p>
                            sometimes we’re writing code, sometimes we’re behind a camera. either way, we’re here to create things that feel simple and a bit magical.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

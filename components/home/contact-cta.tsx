'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ContactCTA() {
    return (
        <section style={{ paddingTop: '16rem', paddingBottom: '8rem' }} className="px-4 relative overflow-hidden">
            <div className="container max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 text-center flex flex-col items-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold lowercase mb-8 tracking-tighter leading-tight">
                        let's bring your <br />
                        <span className="text-[var(--muted)]">vision to life</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-[var(--muted)] mb-12 max-w-2xl mx-auto lowercase leading-relaxed text-center">
                        we're ready to collaborate on your next project
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[var(--fg)] text-xl rounded overflow-hidden transition-all"
                            style={{ color: 'var(--bg)' }}
                        >
                            <span className="relative z-10 lowercase font-bold tracking-widest">contact us</span>
                            <motion.span
                                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-full h-full border border-[var(--border)] rounded-[40%]"
                    />
                </div>
            </div>
        </section>
    );
}

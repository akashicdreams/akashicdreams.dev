'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/contact-form';

export function ContactCTA() {
    return (
        <section id="contact" className="px-6 md:px-8 border-t border-[var(--border)] pt-36 pb-36 bg-[var(--bg)] relative overflow-hidden">
            <div className="container max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-24"
                >
                    <span className="text-base tracking-[0.3em] text-[var(--muted)] mb-6 lowercase font-semibold">
                        contact
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                        let&apos;s work together
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Contact Info - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-sm tracking-[0.2em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    email
                                </h3>
                                <a
                                    href="mailto:admin@akashicdreams.dev"
                                    className="text-xl hover:opacity-70 transition-opacity"
                                >
                                    admin@akashicdreams.dev
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm tracking-[0.2em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    phone
                                </h3>
                                <a
                                    href="tel:+40741963166"
                                    className="text-xl hover:opacity-70 transition-opacity"
                                >
                                    +40 741 963 166
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm tracking-[0.2em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    social
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href="https://www.linkedin.com/company/akashic-dreams/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl hover:opacity-70 transition-opacity lowercase"
                                    >
                                        linkedin
                                    </a>
                                    <a
                                        href="https://www.instagram.com/akashicdreams.dev/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl hover:opacity-70 transition-opacity lowercase"
                                    >
                                        instagram
                                    </a>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61586506872768"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl hover:opacity-70 transition-opacity lowercase"
                                    >
                                        facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="border border-[var(--border)] rounded-sm p-10 md:p-12"
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-10">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="w-full h-full border border-[var(--border)] rounded-[40%]"
                />
            </div>
        </section>
    );
}

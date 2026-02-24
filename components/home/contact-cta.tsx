'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/contact-form';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from '@/components/ui/social-icons';

const socialLinks = [
    {
        label: 'linkedin',
        href: 'https://www.linkedin.com/company/akashic-dreams/',
        icon: LinkedInIcon,
    },
    {
        label: 'instagram',
        href: 'https://www.instagram.com/akashicdreams.dev/',
        icon: InstagramIcon,
    },
    {
        label: 'facebook',
        href: 'https://www.facebook.com/profile.php?id=61586506872768',
        icon: FacebookIcon,
    },
];

export function ContactCTA() {
    return (
        <section id="contact" className="px-6 md:px-8 pt-40 pb-40 md:pt-52 md:pb-52 bg-[var(--bg)] relative overflow-hidden">
            {/* Matrix rain background — subtle */}
            <div className="absolute inset-0">
                <MatrixRain opacity={0.04} speed={0.5} density={0.3} />
            </div>

            {/* Floating particles */}
            <FloatingParticles count={12} minSize={1} maxSize={3} />

            {/* Gradient overlays */}
            <div
                className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-[1]"
                style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }}
            />
            <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[1]"
                style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
            />

            <div className="container max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col items-center text-center mb-28 md:mb-36"
                >
                    <span className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                        contact
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                        let&apos;s work together
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-28">
                    {/* Contact Info - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="space-y-14">
                            <div>
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-5 font-semibold">
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
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-5 font-semibold">
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
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-5 font-semibold">
                                    social
                                </h3>
                                <div className="flex items-center gap-4">
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.15, y: -2 }}
                                            className="w-11 h-11 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-colors duration-300"
                                            aria-label={link.label}
                                        >
                                            <link.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>

            {/* Decorative rotating shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-[0.04]">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="w-full h-full border border-[var(--fg)] rounded-[40%]"
                />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.03]">
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -180, -360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="w-full h-full border border-[var(--fg)] rounded-[35%]"
                />
            </div>
        </section>
    );
}

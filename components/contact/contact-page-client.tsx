'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/contact-form';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';
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

function SectionDivider() {
    return <div className="section-divider" />;
}

export function ContactPageClient() {
    return (
        <div className="min-h-screen overflow-hidden">
            {/* ─── HERO ─── */}
            <section className="relative min-h-[70vh] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain opacity={0.05} speed={0.5} density={0.3} />
                </div>

                <FloatingParticles count={20} minSize={1} maxSize={4} />

                <motion.div
                    className="absolute top-[25%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-[20%] left-[15%] w-[350px] h-[350px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]">
                    <AsciiArtFigure shape="circle" rows={30} cols={35} animSpeed={1800} />
                </div>

                <div className="relative z-10 px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
                        >
                            get in touch
                        </motion.span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8">
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="block"
                            >
                                let&apos;s build
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="block"
                            >
                                something together
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase max-w-lg leading-relaxed"
                        >
                            we&apos;d love to hear about your project
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── CONTACT DETAILS + FORM ─── */}
            <section className="relative py-32 md:py-44 overflow-hidden">
                <div className="absolute inset-0 animated-gradient-bg" />

                <FloatingParticles count={10} minSize={1} maxSize={3} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.03]">
                    <motion.div
                        animate={{
                            scale: [1, 1.12, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="w-full h-full border border-[var(--fg)] rounded-[40%]"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.02]">
                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            rotate: [0, -180, -360],
                        }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="w-full h-full border border-[var(--fg)] rounded-[35%]"
                    />
                </div>

                <div className="relative z-10 container max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-20 md:mb-28"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
                            reach out
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                            how to find us
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                        email
                                    </h3>
                                    <a
                                        href="mailto:admin@akashicdreams.dev"
                                        className="text-xl hover:opacity-70 transition-opacity"
                                    >
                                        admin@akashicdreams.dev
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                        phone
                                    </h3>
                                    <a
                                        href="tel:+40741963166"
                                        className="text-xl hover:opacity-70 transition-opacity"
                                    >
                                        +40 741 963 166
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                        address
                                    </h3>
                                    <a
                                        href="https://maps.app.goo.gl/TjjrN1sErVWQexCAA"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl hover:opacity-70 transition-opacity lowercase"
                                    >
                                        plopului street, 2h, sângeorz-băi, romania
                                    </a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-5 font-semibold">
                                        social
                                    </h3>
                                    <div className="flex items-center gap-5">
                                        {socialLinks.map((link, i) => (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                                                whileHover={{ scale: 1.15, y: -2 }}
                                                className="w-11 h-11 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-colors duration-300"
                                                aria-label={link.label}
                                            >
                                                <link.icon className="w-5 h-5" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
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
            </section>

            <SectionDivider />

            {/* ─── GOOGLE MAPS ─── */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="relative z-10 container max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-12"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
                            location
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                            find us here
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full aspect-video md:aspect-21/9 rounded-lg overflow-hidden border border-(--border)"
                    >
                        <iframe
                            src="https://www.google.com/maps?q=Strada+Plopului+2H,+Sangeorz-Bai,+Bistrita-Nasaud,+Romania&output=embed"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) brightness(0.9)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="akashic dreams office location"
                        />
                    </motion.div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── RESPONSE TIME CTA ─── */}
            <section className="relative py-32 md:py-44 overflow-hidden">
                <div className="absolute inset-0">
                    <MatrixRain opacity={0.03} speed={0.4} density={0.2} />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
                    <AsciiArtFigure shape="diamond" rows={20} cols={24} animSpeed={2200} />
                </div>

                <div className="relative z-10 flex justify-center px-8 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center flex flex-col items-center"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                            what happens next
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-10">
                            we respond fast
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase max-w-lg leading-relaxed"
                        >
                            expect a reply within 24–48 hours. we&apos;ll talk through your vision, scope the work, and figure out the best way forward -no pressure, no jargon.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <div className="h-20" aria-hidden="true" />
        </div>
    );
}

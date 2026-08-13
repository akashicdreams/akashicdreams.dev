'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/contact-form';
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
        <section id="contact" className="bg-[var(--bg)] relative z-10">
            <div className="container section-pad">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mb-20 md:mb-28"
                >
                    <p className="text-xs tracking-[0.35em] text-[var(--muted)] lowercase font-semibold mb-6">
                        contact
                    </p>
                    <h2 className="display-lg lowercase">
                        have an idea? let&apos;s give it shape.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-28">
                    {/* Contact Info - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    email
                                </h3>
                                <a
                                    href="mailto:admin@akashicdreams.dev"
                                    className="arrow-link text-xl"
                                >
                                    admin@akashicdreams.dev
                                </a>
                            </div>

                            <div>
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    phone
                                </h3>
                                <a
                                    href="tel:+40741963166"
                                    className="arrow-link text-xl"
                                >
                                    +40 741 963 166
                                </a>
                            </div>

                            <div>
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    address
                                </h3>
                                <a
                                    href="https://maps.app.goo.gl/TjjrN1sErVWQexCAA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="arrow-link text-xl lowercase"
                                >
                                    plopului street, 2h, sângeorz-băi, romania
                                </a>
                            </div>

                            <div>
                                <h3 className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase mb-4 font-semibold">
                                    social
                                </h3>
                                <div className="flex items-center gap-4">
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            className="w-11 h-11 flex items-center justify-center border border-[var(--border)] rounded-full hover:border-[var(--fg)] transition-colors duration-300"
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
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

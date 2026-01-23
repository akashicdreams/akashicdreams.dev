import Link from 'next/link';

const socialLinks = [
    { label: 'linkedin', href: 'https://www.linkedin.com/company/akashic-dreams/' },
    { label: 'instagram', href: 'https://www.instagram.com/akashicdreams.dev/' },
    { label: 'facebook', href: 'https://www.facebook.com/profile.php?id=61586506872768' },
];

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] mt-32">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Contact */}
                    <div>
                        <h3 className="text-sm lowercase tracking-wider mb-4 opacity-50">contact</h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <a href="mailto:admin@akashicdreams.dev" className="hover:opacity-70">
                                    admin@akashicdreams.dev
                                </a>
                            </div>
                            <div>
                                <a href="tel:+40741963166" className="hover:opacity-70">
                                    +40 741 963 166
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm lowercase tracking-wider mb-4 opacity-50">social</h3>
                        <div className="space-y-2 text-sm">
                            {socialLinks.map((link) => (
                                <div key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-70"
                                    >
                                        {link.label}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="md:text-right">
                        <p className="text-sm opacity-50">
                            © {new Date().getFullYear()} akashic dreams
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

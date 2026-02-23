import Link from 'next/link';

const socialLinks = [
    { label: 'linkedin', href: 'https://www.linkedin.com/company/akashic-dreams/' },
    { label: 'instagram', href: 'https://www.instagram.com/akashicdreams.dev/' },
    { label: 'facebook', href: 'https://www.facebook.com/profile.php?id=61586506872768' },
];

const navLinks = [
    { label: 'services', href: '/services/website-development' },
    { label: 'software', href: '/software' },
    { label: 'photos', href: '/photos' },
    { label: 'about', href: '/about' },
    { label: 'contact', href: '/contact' },
];

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] relative overflow-hidden">
            {/* Subtle gradient top edge */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, transparent, var(--border), transparent)',
                }}
            />

            {/* Mobile footer — compact */}
            <div className="md:hidden py-10 px-6 text-center">
                <Link href="/" className="text-xl font-bold lowercase tracking-tight">
                    akashic dreams
                </Link>
                <p className="text-xs text-[var(--muted)] mt-2 lowercase">
                    building software and visual stories
                </p>

                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lowercase text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <p className="text-xs text-[var(--muted)] tracking-wider">
                        &copy; {new Date().getFullYear()} akashic dreams
                    </p>
                </div>
            </div>

            {/* Desktop footer — full */}
            <div className="container py-20 md:py-28 hidden md:block">
                <div className="grid grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link href="/" className="text-2xl font-bold lowercase tracking-tight">
                            akashic dreams
                        </Link>
                        <p className="text-sm text-[var(--muted)] mt-4 lowercase leading-relaxed max-w-xs">
                            building software and visual stories
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-xs lowercase tracking-[0.3em] mb-6 text-[var(--muted)] font-semibold">
                            navigation
                        </h3>
                        <div className="space-y-3 text-sm">
                            {navLinks.map((link) => (
                                <div key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="lowercase hover:opacity-70 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs lowercase tracking-[0.3em] mb-6 text-[var(--muted)] font-semibold">
                            contact
                        </h3>
                        <div className="space-y-3 text-sm">
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
                        <h3 className="text-xs lowercase tracking-[0.3em] mb-6 text-[var(--muted)] font-semibold">
                            social
                        </h3>
                        <div className="space-y-3 text-sm">
                            {socialLinks.map((link) => (
                                <div key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lowercase hover:opacity-70 transition-opacity"
                                    >
                                        {link.label}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--muted)] tracking-wider">
                        &copy; {new Date().getFullYear()} akashic dreams
                    </p>
                    <p className="text-xs text-[var(--muted)] tracking-wider lowercase">
                        all rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

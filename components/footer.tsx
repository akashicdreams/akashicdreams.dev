import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from '@/components/ui/social-icons';

const navLinks = [
    { label: 'services', href: '/services' },
    { label: 'portfolio', href: '/portfolio' },
    { label: 'clients', href: '/clients' },
    { label: 'about', href: '/about' },
    { label: 'contact', href: '/contact' },
];

const socialLinks = [
    { label: 'linkedin', href: 'https://www.linkedin.com/company/akashic-dreams/', icon: LinkedInIcon },
    { label: 'instagram', href: 'https://www.instagram.com/akashicdreams.dev/', icon: InstagramIcon },
    { label: 'facebook', href: 'https://www.facebook.com/profile.php?id=61586506872768', icon: FacebookIcon },
];

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] relative overflow-hidden">
            <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
            />

            <div className="container px-6 pt-14 pb-8 md:pt-16 md:pb-10">
                {/* Top row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-12">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 relative flex-shrink-0">
                                <Image
                                    src="/brand/logo-mark-dark.svg"
                                    alt="akashic dreams"
                                    fill
                                    className="object-contain footer-logo-dark"
                                />
                                <Image
                                    src="/brand/logo-mark-light.svg"
                                    alt="akashic dreams"
                                    fill
                                    className="object-contain footer-logo-light"
                                />
                            </div>
                            <span className="text-sm font-bold lowercase tracking-widest group-hover:opacity-70 transition-opacity">
                                akashic dreams
                            </span>
                        </Link>
                        <p className="text-xs text-[var(--muted)] lowercase tracking-wider leading-relaxed max-w-[220px]">
                            software & visual studio<br />
                            sângeorz-băi, romania
                        </p>
                    </div>

                    {/* Nav */}
                    <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-[0.2em] font-semibold"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Social */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="w-9 h-9 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-colors duration-300"
                            >
                                <link.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom row */}
                <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-[var(--muted)] tracking-wider lowercase">
                        &copy; {new Date().getFullYear()} akashic dreams. all rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="mailto:admin@akashicdreams.dev"
                            className="text-[11px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider"
                        >
                            admin@akashicdreams.dev
                        </a>
                        <Link
                            href="/privacy"
                            className="text-[11px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider"
                        >
                            privacy policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'services', href: '/services' },
    { label: 'portfolio', href: '/portfolio' },
    { label: 'clients', href: '/clients' },
    { label: 'about', href: '/about' },
    { label: 'unrested', href: '/unrested' },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Transparent over the top of the page, frosted once scrolling
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const logoSrc = mounted && theme === 'light'
        ? '/brand/logo-mark-light.svg'
        : '/brand/logo-mark-dark.svg';

    const solid = scrolled || isOpen;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
                solid ? 'nav-solid' : 'bg-transparent'
            }`}
        >
            {/* Desktop: logo left / links centered / contact right */}
            <div className="container grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-[88px] gap-6">
                <Link href="/" className="flex items-center gap-3 justify-self-start group" aria-label="akashic dreams - home">
                    <div className="relative w-10 h-10 shrink-0">
                        {mounted ? (
                            <Image
                                src={logoSrc}
                                alt="akashic dreams"
                                fill
                                className="object-contain"
                                priority
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10" />
                        )}
                    </div>
                    <span className="hidden sm:block font-display text-sm font-bold lowercase tracking-widest group-hover:opacity-70 transition-opacity">
                        akashic dreams
                    </span>
                </Link>

                {/* Centered links */}
                <div className="hidden md:flex items-center justify-center gap-10 lg:gap-12">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-display text-base lowercase tracking-wide transition-colors duration-300 hover:!opacity-100 ${
                                    isActive
                                        ? 'text-[var(--fg)] font-semibold'
                                        : 'text-[var(--muted)] hover:text-[var(--fg)]'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: theme toggle + contact CTA */}
                <div className="hidden md:flex items-center justify-self-end gap-6">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="group relative font-display px-7 py-2.5 border border-[var(--fg)] rounded-full text-base lowercase tracking-wide overflow-hidden transition-colors duration-400"
                    >
                        <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-400">
                            let&apos;s talk
                        </span>
                        <span className="absolute inset-0 bg-[var(--fg)] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />
                    </Link>
                </div>

                {/* Mobile: theme toggle + burger */}
                <div className="flex items-center justify-self-end gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 -mr-2 text-[var(--fg)]"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current origin-center transition-transform"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-0.5 bg-current transition-opacity"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current origin-center transition-transform"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                className="overflow-hidden md:hidden bg-[var(--bg)] border-b border-[var(--border)]"
            >
                <div className="container pt-8 pb-12 flex flex-col gap-6">
                    {[...navItems, { label: 'contact', href: '/contact' }].map((item, i) => {
                        const isActive = pathname === item.href;
                        return (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -12 }}
                                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                                transition={{ duration: 0.3, delay: isOpen ? i * 0.06 : 0 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-4 group ${isActive ? 'text-[var(--fg)]' : 'text-[var(--muted)]'}`}
                                >
                                    <span className="text-[10px] font-mono tracking-wider text-[var(--muted)] font-semibold w-5">
                                        0{i + 1}
                                    </span>
                                    <span className="text-3xl font-bold lowercase tracking-tight group-hover:text-[var(--fg)] transition-colors">
                                        {item.label}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.nav>
    );
}

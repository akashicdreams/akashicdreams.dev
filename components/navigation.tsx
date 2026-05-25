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
    { label: 'contact', href: '/contact' },
    { label: 'unrested', href: '/unrested' },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const logoSrc = mounted && theme === 'light'
        ? '/brand/logo-mark-light.svg'
        : '/brand/logo-mark-dark.svg';

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md md:fixed"
        >
            <div className="container flex items-center justify-between h-20 gap-4">
                <Link href="/" className="flex items-center flex-shrink-0">
                    <div className="w-10 h-10 relative">
                        {mounted ? (
                            <Image
                                src={logoSrc}
                                alt="Akashic Dreams"
                                width={40}
                                height={40}
                                className="object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 bg-[var(--border)]" />
                        )}
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm lowercase tracking-wide py-2"
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--fg)]"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <ThemeToggle />
                </div>

                {/* Mobile Burger & Theme */}
                <div className="flex items-center gap-4 md:hidden">
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
                <div className="container pt-8 pb-10 flex flex-col gap-5">
                    {navItems.map((item, i) => {
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
                                    <span className="text-2xl font-bold lowercase tracking-tight group-hover:text-[var(--fg)] transition-colors">
                                        {item.label}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {/* Contact nudge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: isOpen ? 0.38 : 0 }}
                        className="mt-4 pt-6 border-t border-[var(--border)]"
                    >
                        <a
                            href="mailto:admin@akashicdreams.dev"
                            className="text-xs tracking-[0.25em] text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase font-semibold"
                        >
                            admin@akashicdreams.dev →
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </motion.nav>
    );
}

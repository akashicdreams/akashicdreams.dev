'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'work', href: '/' },
    { label: 'software', href: '/software' },
    { label: 'photos', href: '/photos' },
    { label: 'blog', href: '/blog' },
    { label: 'contact', href: '/contact' },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && theme === 'light'
        ? '/brand/logo-mark-light.svg'
        : '/brand/logo-mark-dark.svg';

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md"
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
                                    // Fallback to text if image not found
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 bg-[var(--border)]" />
                        )}
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-8 overflow-visible flex-shrink-0 no-scrollbar pr-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm lowercase tracking-wide whitespace-nowrap py-2"
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
            </div>
        </motion.nav>
    );
}

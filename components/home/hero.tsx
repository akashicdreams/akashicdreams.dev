'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SoftwareProject } from '@/lib/software';
import { PhotoAlbum } from '@/lib/photos';

interface HeroProps {
    projects: SoftwareProject[];
    albums: PhotoAlbum[];
}

export function Hero({ projects, albums }: HeroProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const rotateX = useTransform(y, [-0.5, 0.5], [2, -2]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-2, 2]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const logoSrc = mounted && theme === 'light'
        ? '/brand/logo-mark-light.svg'
        : '/brand/logo-mark-dark.svg';

    return (
        <section className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex-1 flex items-center justify-center relative overflow-hidden"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 gradient-radial pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center z-10 px-4"
                    style={{ rotateX, rotateY, transformPerspective: 1000 }}
                >
                    {/* Breathing logo */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [1, 0.8, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-32 h-32 mx-auto mb-12 relative"
                    >
                        {mounted ? (
                            <Image
                                src={logoSrc}
                                alt="Akashic Dreams"
                                width={128}
                                height={128}
                                className="object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-32 h-32 bg-[var(--border)] rounded-full" />
                        )}
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold lowercase mb-6 tracking-tight">
                        building software <br />and visual stories
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--muted)] mb-12 lowercase">
                        akashic dreams
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/software"
                            className="px-6 py-3 text-sm lowercase tracking-wider border border-[var(--fg)] rounded-sm hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all"
                        >
                            view software
                        </Link>
                        <Link
                            href="/photos"
                            className="px-6 py-3 text-sm lowercase tracking-wider border border-[var(--fg)] rounded-sm hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all"
                        >
                            view photos
                        </Link>
                        <Link
                            href="/blog"
                            className="px-6 py-3 text-sm lowercase tracking-wider border border-[var(--fg)] rounded-sm hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all"
                        >
                            read blog
                        </Link>
                    </div>
                </motion.div>


            </div>
        </section>
    );
}

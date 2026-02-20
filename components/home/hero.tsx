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

const bubbles = [
    { size: 220, x: '-15%', y: '55%', delay: 0, duration: 6 },
    { size: 160, x: '60%', y: '65%', delay: 1.2, duration: 7 },
    { size: 120, x: '90%', y: '40%', delay: 0.6, duration: 5.5 },
    { size: 180, x: '30%', y: '80%', delay: 1.8, duration: 6.5 },
    { size: 100, x: '100%', y: '75%', delay: 2.4, duration: 5 },
    { size: 80, x: '-5%', y: '30%', delay: 0.9, duration: 6.2 },
    { size: 140, x: '75%', y: '90%', delay: 1.5, duration: 5.8 },
];

export function Hero({ projects, albums }: HeroProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);

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

    const isLight = mounted && theme === 'light';

    return (
        <section className="min-h-screen flex flex-col">
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex-1 flex items-center relative overflow-hidden"
            >
                <div className="absolute inset-0 gradient-radial pointer-events-none" />

                <div className="container z-10 flex flex-col lg:flex-row items-center lg:items-center gap-16 lg:gap-8 py-20 lg:py-0">
                    {/* left — text + cta */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tight leading-[0.95]">
                            akashic
                            <br />
                            dreams
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--muted)] mt-6 mb-10 lowercase font-medium max-w-md">
                            building software and visual stories
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/software"
                                className="px-10 py-5 text-base lowercase tracking-wider border-2 border-[var(--fg)] rounded-sm hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all"
                            >
                                software
                            </Link>
                            <Link
                                href="/photos"
                                className="px-10 py-5 text-base lowercase tracking-wider border-2 border-[var(--fg)] rounded-sm hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all"
                            >
                                photos
                            </Link>
                        </div>
                    </motion.div>

                    {/* right — logo + bubbles */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="flex-1 flex items-center justify-center relative"
                        style={{ rotateX, rotateY, transformPerspective: 1000 }}
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
                            {/* breathing logo */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.08, 1],
                                    opacity: [1, 0.85, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-full h-full relative z-10"
                            >
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
                                    <div className="w-full h-full bg-[var(--border)] rounded-full" />
                                )}
                            </motion.div>

                            {/* decorative gradient bubbles */}
                            {bubbles.map((bubble, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full pointer-events-none"
                                    style={{
                                        width: bubble.size,
                                        height: bubble.size,
                                        left: bubble.x,
                                        top: bubble.y,
                                        background: isLight
                                            ? `radial-gradient(circle at 30% 30%, rgba(0,0,0,0.35), rgba(0,0,0,0.08))`
                                            : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0.08))`,
                                        border: isLight
                                            ? '1px solid rgba(0,0,0,0.15)'
                                            : '1px solid rgba(255,255,255,0.15)',
                                    }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{
                                        opacity: [0.6, 1, 0.6],
                                        scale: [1, 1.1, 1],
                                        y: [0, -14, 0],
                                    }}
                                    transition={{
                                        duration: bubble.duration,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: bubble.delay,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

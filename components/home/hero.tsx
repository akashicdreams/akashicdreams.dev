'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);
  return isMobile;
}

const bubbles = [
    { size: 280, x: '-18%', y: '50%', delay: 0, duration: 7 },
    { size: 200, x: '55%', y: '60%', delay: 1.2, duration: 8 },
    { size: 150, x: '88%', y: '35%', delay: 0.6, duration: 6.5 },
    { size: 220, x: '25%', y: '78%', delay: 1.8, duration: 7.5 },
    { size: 120, x: '105%', y: '70%', delay: 2.4, duration: 6 },
    { size: 100, x: '-8%', y: '25%', delay: 0.9, duration: 7.2 },
    { size: 170, x: '72%', y: '88%', delay: 1.5, duration: 6.8 },
    { size: 90, x: '40%', y: '15%', delay: 3, duration: 5.5 },
    { size: 60, x: '15%', y: '40%', delay: 2, duration: 8 },
    { size: 130, x: '85%', y: '15%', delay: 0.3, duration: 7 },
];

const glowOrbs = [
    { size: 500, x: '10%', y: '20%', delay: 0, duration: 10 },
    { size: 600, x: '70%', y: '60%', delay: 2, duration: 12 },
    { size: 400, x: '50%', y: '80%', delay: 4, duration: 8 },
];

export function Hero() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isMobile = useIsMobile();
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
        <section className="min-h-screen flex flex-col relative">
            {/* Matrix rain background - disabled on mobile for performance */}
            {!isMobile && (
                <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain opacity={0.07} speed={0.8} density={0.4} />
                </div>
            )}

            {/* Ambient glow orbs - disabled on mobile for performance */}
            {!isMobile && glowOrbs.map((orb, i) => (
                <motion.div
                    key={`glow-${i}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                        background: isLight
                            ? `radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)`
                            : `radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)`,
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: orb.delay,
                    }}
                />
            ))}

            {/* Floating particles - reduced count on mobile */}
            <FloatingParticles count={isMobile ? 8 : 30} minSize={1} maxSize={isMobile ? 2 : 4} />

            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none" />

            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex-1 flex items-start md:items-center relative overflow-hidden"
            >
                <div className="absolute inset-0 gradient-radial pointer-events-none" />

                <div className="container z-10 flex flex-col lg:flex-row items-center lg:items-center gap-20 lg:gap-12 pt-16 pb-24 lg:py-0">
                    {/* left — text + cta */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
                        >
                            software & visual studio
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold lowercase tracking-tight leading-[0.9]">
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="block"
                            >
                                akashic
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="block"
                            >
                                dreams
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-lg md:text-xl text-[var(--muted)] mt-8 mb-14 lowercase font-medium max-w-lg leading-relaxed"
                        >
                            building software and visual stories
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="flex flex-wrap gap-5"
                        >
                            <Link
                                href="/services"
                                className="group relative px-12 py-5 text-base lowercase tracking-wider border-2 border-[var(--fg)] rounded-sm overflow-hidden transition-all duration-500"
                            >
                                <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-500">
                                    services
                                </span>
                                <div className="absolute inset-0 bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>
                            <Link
                                href="/portfolio"
                                className="group relative px-12 py-5 text-base lowercase tracking-wider border-2 border-[var(--fg)] rounded-sm overflow-hidden transition-all duration-500"
                            >
                                <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-500">
                                    portfolio
                                </span>
                                <div className="absolute inset-0 bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* right — logo + bubbles */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex-1 flex items-center justify-center relative"
                        style={!isMobile ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
                    >
                        <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] lg:w-[32rem] lg:h-[32rem]">
                            {/* Outer ring - disabled on mobile */}
                            {!isMobile && (
                                <motion.div
                                    className="absolute inset-[-20px] rounded-full border pointer-events-none"
                                    style={{
                                        borderColor: isLight
                                            ? 'rgba(0,0,0,0.06)'
                                            : 'rgba(255,255,255,0.06)',
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                />
                            )}

                            {/* Inner ring - disabled on mobile */}
                            {!isMobile && (
                                <motion.div
                                    className="absolute inset-[-50px] rounded-full border pointer-events-none"
                                    style={{
                                        borderColor: isLight
                                            ? 'rgba(0,0,0,0.03)'
                                            : 'rgba(255,255,255,0.03)',
                                    }}
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                                />
                            )}

                            {/* Breathing logo - disabled on mobile */}
                            <motion.div
                                animate={!isMobile ? {
                                    scale: [1, 1.06, 1],
                                    opacity: [1, 0.88, 1],
                                } : {}}
                                transition={!isMobile ? {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                } : {}}
                                className="w-full h-full relative z-10"
                            >
                                {mounted ? (
                                    <Image
                                        src={logoSrc}
                                        alt="akashic dreams"
                                        fill
                                        className="object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]"
                                        priority
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[var(--border)] rounded-full" />
                                )}
                            </motion.div>

                            {/* Decorative gradient bubbles - disabled on mobile (backdrop-filter is expensive) */}
                            {!isMobile && bubbles.map((bubble, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full pointer-events-none"
                                    style={{
                                        width: bubble.size,
                                        height: bubble.size,
                                        left: bubble.x,
                                        top: bubble.y,
                                        background: isLight
                                            ? `radial-gradient(circle at 30% 30%, rgba(0,0,0,0.3), rgba(0,0,0,0.05))`
                                            : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0.05))`,
                                        border: isLight
                                            ? '1px solid rgba(0,0,0,0.1)'
                                            : '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(2px)',
                                    }}
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [1, 1.15, 1],
                                        y: [0, -20, 0],
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

            {/* Scroll indicator - no bounce animation on mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <span className="text-xs tracking-[0.3em] text-[var(--muted)] lowercase">scroll</span>
                <motion.div
                    animate={!isMobile ? { y: [0, 8, 0] } : {}}
                    transition={!isMobile ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
                    className="w-[1px] h-8 bg-gradient-to-b from-[var(--muted)] to-transparent"
                />
            </motion.div>
        </section>
    );
}

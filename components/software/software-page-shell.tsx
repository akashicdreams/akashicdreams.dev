'use client';

import { motion } from 'framer-motion';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';

export function SoftwarePageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero area with visual effects */}
            <div className="relative" style={{ paddingTop: '7rem' }}>
                {/* Matrix rain — fills the hero area */}
                <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain opacity={0.05} speed={0.6} density={0.35} />
                </div>

                {/* Ambient gradient orbs */}
                <div
                    className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    className="absolute top-40 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />

                <FloatingParticles count={20} minSize={1} maxSize={3} />

                {/* ASCII art figure — positioned behind the header */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-[0.35]">
                    <AsciiArtFigure shape="diamond" rows={35} cols={40} animSpeed={1800} />
                </div>

                {/* Header */}
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center pt-16 pb-48 md:pt-24 md:pb-60"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
                        >
                            our projects
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8 text-center">
                            software
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase text-center"
                        >
                            systems that ship, scale, and stay maintainable
                        </motion.p>
                    </motion.header>
                </div>

                {/* Gradient fade into content */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
                    style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
                />
            </div>

            {/* Content area */}
            <div className="relative z-10 animated-gradient-bg" style={{ paddingBottom: '8rem' }}>
                {/* Scan line */}
                <div className="absolute inset-0 scan-line pointer-events-none opacity-50" />

                <div className="container max-w-7xl mx-auto px-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

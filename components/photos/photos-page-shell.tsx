'use client';

import { motion } from 'framer-motion';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';

export function PhotosPageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero area with visual effects */}
            <div className="relative" style={{ paddingTop: '7rem' }}>
                {/* Ambient gradient orbs */}
                <motion.div
                    className="absolute top-10 right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-60 left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />

                <FloatingParticles count={18} minSize={1} maxSize={4} />

                {/* ASCII art figure — circle shape for the lens theme */}
                <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-[0.3]">
                    <AsciiArtFigure shape="circle" rows={30} cols={35} animSpeed={2200} />
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
                            visual stories
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8 text-center">
                            photos
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase text-center"
                        >
                            life captured through the lens
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
            <div className="relative z-10" style={{ paddingBottom: '8rem' }}>
                <div className="container max-w-7xl mx-auto px-6">
                    {children}
                </div>
            </div>

            {/* Decorative rotating ring at the bottom */}
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.03]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full border border-[var(--fg)] rounded-full"
                />
            </div>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/lib/services';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';

interface ServicesListClientProps {
    services: Service[];
}

export function ServicesListClient({ services }: ServicesListClientProps) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero area */}
            <div className="relative" style={{ paddingTop: '7rem' }}>
                <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain opacity={0.05} speed={0.5} density={0.3} />
                </div>

                <FloatingParticles count={20} minSize={1} maxSize={3} />

                {/* ASCII art behind header */}
                <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-[0.25]">
                    <AsciiArtFigure shape="hexagon" rows={30} cols={36} animSpeed={2000} />
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
                            what we offer
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8 text-center">
                            services
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase text-center"
                        >
                            from software to visual storytelling
                        </motion.p>
                    </motion.header>
                </div>

                {/* Gradient fade into content */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
                    style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
                />
            </div>

            {/* Services grid */}
            <div className="relative z-10 animated-gradient-bg" style={{ paddingBottom: '8rem' }}>
                <div className="absolute inset-0 scan-line pointer-events-none opacity-50" />

                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="group block card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 relative"
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden bg-black">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <span className="absolute top-5 left-6 text-xs font-mono text-white/40 tracking-wider font-semibold z-10">
                                            .{service.number}
                                        </span>
                                    </div>

                                    <div className="p-8 md:p-10">
                                        <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight mb-3 group-hover:tracking-normal transition-all duration-300">
                                            {service.title}
                                        </h2>
                                        <p className="text-sm text-[var(--muted)] lowercase leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                        <div className="flex items-baseline justify-between pt-6 border-t border-[var(--border)]">
                                            <div>
                                                <span className="text-xs tracking-wider text-[var(--muted)] lowercase font-semibold block mb-1">
                                                    from
                                                </span>
                                                <span className="text-3xl font-bold tracking-tight">
                                                    {service.startingPrice}
                                                </span>
                                                <span className="text-sm text-[var(--muted)] ml-2 lowercase font-semibold">
                                                    {service.currency}
                                                </span>
                                            </div>
                                            <span className="text-sm text-[var(--muted)] lowercase group-hover:text-[var(--fg)] transition-colors duration-300 font-semibold tracking-wider">
                                                view details →
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

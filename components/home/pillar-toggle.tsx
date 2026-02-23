'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoftwareProject } from '@/lib/software';
import { PhotoAlbum } from '@/lib/photos';
import { FocusedCarousel, CarouselItem } from '@/components/ui/focused-carousel';

interface PillarToggleProps {
    projects: SoftwareProject[];
    albums: PhotoAlbum[];
}

export function PillarToggle({ projects, albums }: PillarToggleProps) {
    const [activeTab, setActiveTab] = useState<'software' | 'photos'>('software');

    const softwareItems: CarouselItem[] = projects.map(p => ({
        id: p.slug,
        title: p.title,
        subtitle: p.summary,
        image: p.thumbnail,
        link: p.demo || p.github,
        external: true
    }));

    const photoItems: CarouselItem[] = albums.map(a => ({
        id: a.slug,
        title: a.title,
        subtitle: a.location,
        image: a.cover,
        link: `/photos/${a.slug}`,
        external: false
    }));

    return (
        <section className="px-6 md:px-8 pt-40 pb-40 md:pt-52 md:pb-52 relative overflow-hidden">
            {/* Background gradient accent */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)',
                }}
            />

            <div className="container max-w-full mx-auto overflow-hidden relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <span className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                        our work
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                        portfolio
                    </h2>
                </motion.div>

                {/* Toggle */}
                <div className="flex justify-center mb-24 gap-12 md:gap-20">
                    {(['software', 'photos'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="relative text-2xl md:text-3xl font-bold lowercase tracking-wider transition-all pb-4"
                        >
                            <span
                                className={
                                    activeTab === tab
                                        ? 'text-[var(--fg)]'
                                        : 'text-[var(--muted)] hover:text-[var(--fg)]'
                                }
                            >
                                {tab}
                            </span>
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="pillar-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--fg)]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'software' ? (
                        <motion.div
                            key="software"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <FocusedCarousel
                                items={softwareItems}
                                type="software"
                                aspectRatio="video"
                                emptyMessage="No software projects found. Add markdown files to content/software/"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="photos"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <FocusedCarousel
                                items={photoItems}
                                type="photos"
                                aspectRatio="square"
                                emptyMessage="No photo albums found. Add folders to public/photos/"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

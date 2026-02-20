'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SoftwareProject } from '@/lib/software';
import { PhotoAlbum } from '@/lib/photos';
import { FocusedCarousel, CarouselItem } from '@/components/ui/focused-carousel';

interface PillarToggleProps {
    projects: SoftwareProject[];
    albums: PhotoAlbum[];
}

export function PillarToggle({ projects, albums }: PillarToggleProps) {
    const [activeTab, setActiveTab] = useState<'software' | 'photos'>('software');

    // Convert data to Carousel Items
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
        <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }} className="px-6 md:px-8 border-t border-[var(--border)]">
            <div className="container max-w-full mx-auto overflow-hidden">
                {/* Toggle */}
                <div className="flex justify-center mb-20 gap-16">
                    <button
                        onClick={() => setActiveTab('software')}
                        className={`text-2xl md:text-3xl font-bold lowercase tracking-wider transition-all pb-3 border-b-4 ${activeTab === 'software'
                            ? 'border-[var(--fg)] text-[var(--fg)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--border)]'
                            }`}
                    >
                        software
                    </button>
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`text-2xl md:text-3xl font-bold lowercase tracking-wider transition-all pb-3 border-b-4 ${activeTab === 'photos'
                            ? 'border-[var(--fg)] text-[var(--fg)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--border)]'
                            }`}
                    >
                        photos
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'software' ? (
                        <motion.div
                            key="software"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
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

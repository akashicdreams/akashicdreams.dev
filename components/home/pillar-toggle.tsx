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
        link: p.github,
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
        <section style={{ paddingTop: '6rem', paddingBottom: '6rem' }} className="px-4">
            <div className="container max-w-full mx-auto overflow-hidden">
                {/* Toggle */}
                <div className="flex justify-center mb-12 gap-12">
                    <button
                        onClick={() => setActiveTab('software')}
                        className={`text-lg lowercase tracking-widest transition-all pb-2 border-b-2 ${activeTab === 'software'
                            ? 'border-[var(--fg)] text-[var(--fg)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]'
                            }`}
                    >
                        software
                    </button>
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`text-lg lowercase tracking-widest transition-all pb-2 border-b-2 ${activeTab === 'photos'
                            ? 'border-[var(--fg)] text-[var(--fg)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]'
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

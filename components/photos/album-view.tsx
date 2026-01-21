'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoAlbum } from '@/lib/photos';

interface AlbumViewProps {
    album: PhotoAlbum;
}

export function AlbumView({ album }: AlbumViewProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % album.images.length);
        }
    };

    const prevImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + album.images.length) % album.images.length);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;

            switch (e.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, nextImage, prevImage]); // Added dependencies

    return (
        <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/photos" className="text-sm text-[var(--muted)] hover:opacity-70 mb-4 inline-block">
                        ← back to albums
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold lowercase mb-4">{album.title}</h1>
                    <div className="flex gap-4 text-sm text-[var(--muted)]">
                        {album.location && <span>{album.location}</span>}
                        {album.date && <span>•</span>}
                        {album.date && <span>{album.date}</span>}
                    </div>
                    {album.description && (
                        <p className="text-lg text-[var(--muted)] mt-4">{album.description}</p>
                    )}
                </div>

                {/* Masonry grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {album.images.map((image, index) => (
                        <motion.div
                            key={image}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="break-inside-avoid"
                        >
                            <button
                                onClick={() => openLightbox(index)}
                                className="block w-full border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all group"
                            >
                                <div className="relative aspect-auto">
                                    <Image
                                        src={image}
                                        alt={`${album.title} - Photo ${index + 1}`}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {lightboxIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[var(--bg)]/98 z-50 flex items-center justify-center p-4"
                            onClick={closeLightbox}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 z-[60] w-12 h-12 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Navigation */}
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Image */}
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-full max-h-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={album.images[lightboxIndex]}
                                    alt={`${album.title} - Photo ${lightboxIndex + 1}`}
                                    width={1920}
                                    height={1080}
                                    className="max-w-full max-h-[90vh] object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </motion.div>

                            {/* Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-[var(--muted)]">
                                {lightboxIndex + 1} / {album.images.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

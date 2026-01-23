'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface CarouselItem {
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    link?: string;
    external?: boolean;
}

interface FocusedCarouselProps {
    items: CarouselItem[];
    emptyMessage?: string;
    type: 'software' | 'photos';
    aspectRatio?: 'video' | 'square';
}

export function FocusedCarousel({ items, emptyMessage = "No items found.", type, aspectRatio = 'video' }: FocusedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index when items change (e.g. switching tabs)
    useEffect(() => {
        setCurrentIndex(0);
    }, [items]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-24 text-[var(--muted)]">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    // Get visible items indices (cyclic)
    const getIndex = (offset: number) => {
        return (currentIndex + offset + items.length) % items.length;
    };

    const prevIndex = getIndex(-1);
    const nextIndex = getIndex(1);
    const currentItem = items[currentIndex];

    const aspectClass = aspectRatio === 'video' ? 'aspect-video' : 'aspect-square';

    return (
        <div className="relative w-full py-12 overflow-hidden select-none">
            {/* Main Container */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center -mx-[50%] md:mx-0">

                {/* Navigation Buttons - Absolute positioned */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 md:left-12 z-20 p-4 rounded-full border border-[var(--border)] hover:border-[var(--fg)] hover:scale-110 transition-all backdrop-blur-sm bg-[var(--bg)]/50"
                    aria-label="Previous"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-4 md:right-12 z-20 p-4 rounded-full border border-[var(--border)] hover:border-[var(--fg)] hover:scale-110 transition-all backdrop-blur-sm bg-[var(--bg)]/50"
                    aria-label="Next"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Carousel Items */}
                <div className="relative w-full max-w-5xl mx-auto h-full flex items-center justify-center">
                    <AnimatePresence mode='popLayout'>
                        {items.length > 1 && (
                            <>
                                {/* Previous Item (Left) */}
                                <motion.div
                                    key={`prev-${items[prevIndex].id}`}
                                    className={`absolute left-[5%] md:left-[0%] w-[250px] md:w-[300px] ${aspectClass} opacity-40 scale-75 blur-[1px] z-0 hidden md:block cursor-pointer`}
                                    onClick={handlePrev}
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 0.4 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {items[prevIndex].image && (
                                        <Image
                                            src={items[prevIndex].image!}
                                            fill
                                            alt=""
                                            className="object-cover rounded-sm"
                                        />
                                    )}
                                </motion.div>

                                {/* Next Item (Right) */}
                                <motion.div
                                    key={`next-${items[nextIndex].id}`}
                                    className={`absolute right-[5%] md:right-[0%] w-[250px] md:w-[300px] ${aspectClass} opacity-40 scale-75 blur-[1px] z-0 hidden md:block cursor-pointer`}
                                    onClick={handleNext}
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 0.4 }}
                                    exit={{ x: 100, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {items[nextIndex].image && (
                                        <Image
                                            src={items[nextIndex].image!}
                                            fill
                                            alt=""
                                            className="object-cover rounded-sm"
                                        />
                                    )}
                                </motion.div>
                            </>
                        )}

                        {/* Main Item (Center) */}
                        <motion.div
                            key={currentItem.id}
                            className={`relative z-10 w-[300px] md:w-[500px] ${aspectClass} rounded-sm`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                href={currentItem.link || '#'}
                                target={currentItem.external ? "_blank" : undefined}
                                className="block w-full h-full relative group"
                            >
                                <div className="w-full h-full relative overflow-hidden rounded-sm border border-[var(--border)] group-hover:border-[var(--fg)] transition-colors shadow-2xl">
                                    {currentItem.image ? (
                                        <Image
                                            src={currentItem.image}
                                            alt={currentItem.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[var(--muted)]/10 flex items-center justify-center">
                                            <span className="text-[var(--muted)]">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Title & Details Below */}
            <motion.div
                key={currentItem.id + "-details"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`flex flex-col items-center text-center px-4 ${type === 'photos' ? 'mt-12' : 'mt-8'}`}
            >
                <h3 className="text-3xl md:text-5xl font-bold mb-4 lowercase tracking-tight">{currentItem.title}</h3>
                {currentItem.subtitle && (
                    <p className="text-sm md:text-base text-[var(--muted)] max-w-xl w-full lowercase leading-relaxed text-center">
                        {currentItem.subtitle}
                    </p>
                )}
            </motion.div>
        </div>
    );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { EventPhotographyProject } from '@/lib/portfolio';

interface PhotoAlbumShowcaseProps {
  items: EventPhotographyProject[];
}

function Lightbox({
  images,
  title,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[];
  title: string;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[var(--bg)]/98 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all bg-[var(--bg)]"
        style={{ zIndex: 10000 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all bg-[var(--bg)]"
        style={{ zIndex: 10000 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[var(--border)] rounded-sm hover:border-[var(--fg)] transition-all bg-[var(--bg)]"
        style={{ zIndex: 10000 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${title} - ${index + 1}`}
          width={1920}
          height={1080}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-[var(--muted)]" style={{ zIndex: 10000 }}>
        {index + 1} / {images.length}
      </div>
    </motion.div>,
    document.body
  );
}

function InlineAlbumViewer({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  const previewImages = images.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {previewImages.map((image, i) => (
          <button
            key={image}
            onClick={() => setLightboxIndex(i)}
            className="block w-full border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all group aspect-square relative"
          >
            <Image
              src={image}
              alt={`${title} - ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {i === previewImages.length - 1 && images.length > previewImages.length && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  +{images.length - previewImages.length}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            title={title}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function PhotoAlbumShowcase({ items }: PhotoAlbumShowcaseProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-16">
      {items.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 p-8 md:p-10"
        >
          <h3 className="text-2xl font-bold mb-2 lowercase tracking-tight">
            {project.title.toLowerCase()}
          </h3>
          <div className="flex gap-4 text-sm text-[var(--muted)] mb-6">
            {project.location && <span className="lowercase">{project.location}</span>}
            {project.location && project.date && <span>·</span>}
            {project.date && <span>{project.date}</span>}
          </div>
          {project.description && (
            <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed lowercase">
              {project.description.toLowerCase()}
            </p>
          )}

          {project.album && project.album.images.length > 0 && (
            <InlineAlbumViewer images={project.album.images} title={project.title} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

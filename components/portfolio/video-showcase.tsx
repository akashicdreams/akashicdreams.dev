'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { VideographyProject } from '@/lib/portfolio';

interface VideoShowcaseProps {
  items: VideographyProject[];
}

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function VideoThumbnail({ videoId, title, onPlay }: { videoId: string; title: string; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black cursor-pointer group/play"
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover opacity-80 group-hover/play:opacity-100 transition-opacity"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover/play:scale-110 transition-transform shadow-lg">
          <svg className="w-10 h-10 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export function VideoShowcase({ items }: VideoShowcaseProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
      {items.map((project, index) => {
        const videoId = extractYoutubeId(project.youtubeUrl);
        return (
          <VideoCard key={project.slug} project={project} videoId={videoId} index={index} />
        );
      })}
    </div>
  );
}

function VideoCard({ project, videoId, index }: { project: VideographyProject; videoId: string | null; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 relative"
    >
      <div className="aspect-video bg-black relative overflow-hidden">
        {videoId ? (
          isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <VideoThumbnail
              videoId={videoId}
              title={project.title}
              onPlay={() => setIsPlaying(true)}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
            <span className="text-sm lowercase">video unavailable</span>
          </div>
        )}
      </div>

      <div className="p-8 md:p-10">
        {(project.clientIcon || project.clientName) && (
          <div className="flex items-center gap-3 mb-3">
            {project.clientIcon && (
              <div className="flex-shrink-0 w-8 h-8 relative border border-[var(--border)] rounded-sm overflow-hidden bg-white">
                <Image
                  src={project.clientIcon}
                  alt={project.clientName || project.title}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
            )}
            {project.clientName && (
              <span className="text-xs tracking-[0.3em] text-[var(--muted)] font-mono font-semibold">
                {project.clientName.toLowerCase()}
              </span>
            )}
          </div>
        )}
        <h3 className="text-2xl font-bold mb-3 lowercase tracking-tight">
          {project.title.toLowerCase()}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed lowercase">
          {project.description.toLowerCase()}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
}

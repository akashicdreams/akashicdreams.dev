'use client';

import { motion } from 'framer-motion';
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

export function VideoShowcase({ items }: VideoShowcaseProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
      {items.map((project, index) => {
        const videoId = extractYoutubeId(project.youtubeUrl);

        return (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 relative"
          >
            <div className="aspect-video bg-black relative overflow-hidden">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
                  <span className="text-sm lowercase">video unavailable</span>
                </div>
              )}
            </div>

            <div className="p-8 md:p-10">
              {project.clientName && (
                <span className="text-xs tracking-[0.3em] text-[var(--muted)] font-mono font-semibold block mb-3">
                  {project.clientName.toLowerCase()}
                </span>
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
      })}
    </div>
  );
}

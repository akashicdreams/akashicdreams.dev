'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { WebsiteProject } from '@/lib/portfolio';

interface WebsiteShowcaseProps {
  items: WebsiteProject[];
}

export function WebsiteShowcase({ items }: WebsiteShowcaseProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
      {items.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="group card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 cursor-pointer relative"
          onClick={() => {
            if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
          }}
        >
          {project.thumbnail && (
            <div className="aspect-video bg-[var(--border)] relative overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
            </div>
          )}

          <div className="p-8 md:p-10">
            {project.clientName && (
              <span className="text-xs tracking-[0.3em] text-[var(--muted)] font-mono font-semibold block mb-3">
                {project.clientName.toLowerCase()}
              </span>
            )}
            <h3 className="text-2xl font-bold mb-3 lowercase tracking-tight group-hover:tracking-normal transition-all duration-300">
              {project.title.toLowerCase()}
            </h3>
            <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed lowercase">
              {project.description.toLowerCase()}
            </p>

            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-4 py-2 border border-[var(--border)] rounded-sm lowercase font-medium text-[var(--muted)] group-hover:border-[var(--fg)] group-hover:text-[var(--fg)] transition-all duration-300"
                  >
                    {tech.toLowerCase()}
                  </span>
                ))}
              </div>
            )}

            {project.url && (
              <div className="pt-6 border-t border-[var(--border)]">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider hover:text-[var(--fg)] text-[var(--muted)] transition-colors lowercase font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  visit website →
                </a>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
      ))}
    </div>
  );
}

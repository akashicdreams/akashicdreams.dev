'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { BrandIdentityProject } from '@/lib/portfolio';

interface BrandShowcaseProps {
  items: BrandIdentityProject[];
}

export function BrandShowcase({ items }: BrandShowcaseProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((project, index) => {
        const designImage = project.images?.[0];

        return (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500"
          >
            {designImage && (
              <Image
                src={designImage}
                alt={`${project.clientName || project.title} brand design`}
                width={800}
                height={0}
                className="w-full h-auto object-contain"
              />
            )}

            <div className="p-4 flex items-center gap-3">
              {project.clientIcon && (
                <div className="flex-shrink-0 w-8 h-8 relative border border-[var(--border)] rounded-sm overflow-hidden bg-white">
                  <Image
                    src={project.clientIcon}
                    alt={`${project.clientName || project.title} icon`}
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
              )}
              {project.clientName && (
                <span className="text-sm font-semibold lowercase tracking-tight">
                  {project.clientName.toLowerCase()}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

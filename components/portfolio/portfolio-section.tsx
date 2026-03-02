'use client';

import { motion } from 'framer-motion';
import type { PortfolioItem } from '@/lib/portfolio';
import { WebsiteShowcase } from './website-showcase';
import { SocialMediaShowcase } from './social-media-showcase';
import { MobileAppShowcase } from './mobile-app-showcase';
import { VideoShowcase } from './video-showcase';
import { PhotoAlbumShowcase } from './photo-album-showcase';
import { BrandShowcase } from './brand-showcase';
import type { WebsiteProject, SocialMediaProject, MobileAppProject, VideographyProject, PhotographyProject, BrandIdentityProject } from '@/lib/portfolio';

interface PortfolioSectionProps {
  serviceSlug: string;
  items: PortfolioItem[];
}

export function PortfolioSection({ serviceSlug, items }: PortfolioSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative py-44 md:py-52 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-28 md:mb-36"
        >
          <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
            our work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
            portfolio
          </h2>
        </motion.div>

        <ShowcaseRouter serviceSlug={serviceSlug} items={items} />
      </div>
    </section>
  );
}

function ShowcaseRouter({ serviceSlug, items }: PortfolioSectionProps) {
  switch (serviceSlug) {
    case 'website-development':
      return <WebsiteShowcase items={items as WebsiteProject[]} />;
    case 'social-media-management':
      return <SocialMediaShowcase items={items as SocialMediaProject[]} />;
    case 'mobile-application':
      return <MobileAppShowcase items={items as MobileAppProject[]} />;
    case 'videography':
      return <VideoShowcase items={items as VideographyProject[]} />;
    case 'photography':
      return <PhotoAlbumShowcase items={items as PhotographyProject[]} />;
    case 'brand-identity':
      return <BrandShowcase items={items as BrandIdentityProject[]} />;
    default:
      return null;
  }
}

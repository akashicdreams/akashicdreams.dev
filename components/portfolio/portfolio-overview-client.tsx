'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';
import { TextScramble } from '@/components/ui/text-scramble';
import type { PortfolioItem, SocialMediaProject, BrandIdentityProject } from '@/lib/portfolio';
import type { Service } from '@/lib/services';

interface PortfolioOverviewClientProps {
  portfolioByService: Record<string, PortfolioItem[]>;
  services: Service[];
}

const platformColors: Record<string, string> = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  tiktok: '#69C9D0',
};

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'facebook':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    default:
      return null;
  }
}

function ClientTag({ icon, name }: { icon?: string; name?: string }) {
  if (!name) return null;
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <div className="flex-shrink-0 w-6 h-6 relative border border-[var(--border)] rounded-sm overflow-hidden bg-white">
          <Image src={icon} alt={name} fill className="object-contain p-0.5" />
        </div>
      )}
      <span className="text-xs font-semibold lowercase tracking-tight text-[var(--muted)]">
        {name.toLowerCase()}
      </span>
    </div>
  );
}

function getCardLink(item: PortfolioItem): string | undefined {
  switch (item.type) {
    case 'website-development':
      return item.url;
    case 'mobile-application':
      return item.website || item.github;
    case 'photography':
      return `/services/photography`;
    case 'videography':
      return `/services/videography`;
    default:
      return undefined;
  }
}

function getItemThumbnail(item: PortfolioItem): string | undefined {
  switch (item.type) {
    case 'website-development':
    case 'mobile-application':
      return item.thumbnail;
    case 'photography':
      return item.album?.cover;
    case 'videography': {
      const match = item.youtubeUrl?.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
      );
      return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : undefined;
    }
    default:
      return undefined;
  }
}

function SocialMediaCard({ item, index }: { item: SocialMediaProject; index: number }) {
  const platformEntries = Object.entries(item.platforms).filter(([, url]) => url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500"
    >
      {/* Client header */}
      <div className="p-6 md:p-8 border-b border-[var(--border)]">
        <div className="flex items-center gap-4">
          {item.clientIcon && (
            <div className="flex-shrink-0 w-12 h-12 relative border border-[var(--border)] rounded-sm overflow-hidden bg-white">
              <Image src={item.clientIcon} alt={item.clientName || ''} fill className="object-contain p-1" />
            </div>
          )}
          <h3 className="text-lg md:text-xl font-bold lowercase tracking-tight">
            {(item.clientName || item.title).toLowerCase()}
          </h3>
        </div>
      </div>

      {/* Platform tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {platformEntries.map(([platform, url]) => (
          <motion.a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ backgroundColor: platformColors[platform] }}
            className="group/tile relative flex items-center gap-4 px-6 md:px-8 py-6 transition-all duration-500 border-b sm:border-r border-[var(--border)] last:border-b-0 sm:last:border-r-0 sm:odd:border-r sm:even:border-r-0"
            style={{ backgroundColor: `${platformColors[platform]}15` }}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center text-white transition-transform duration-300 group-hover/tile:scale-110"
              style={{ backgroundColor: platformColors[platform] }}
            >
              <PlatformIcon platform={platform} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-base font-bold lowercase tracking-tight block">
                {platform}
              </span>
              <span className="text-xs text-[var(--muted)] lowercase tracking-wider">
                view profile →
              </span>
            </div>
            <svg
              className="w-5 h-5 text-[var(--muted)] group-hover/tile:text-[var(--fg)] group-hover/tile:translate-x-1 transition-all duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

function BrandIdentityCard({ item, index }: { item: BrandIdentityProject; index: number }) {
  const designImage = item.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-400"
    >
      {designImage && (
        <Image
          src={designImage}
          alt={`${item.clientName || item.title} brand design`}
          width={800}
          height={0}
          className="w-full h-auto object-contain"
        />
      )}
      <div className="p-4">
        <ClientTag icon={item.clientIcon} name={item.clientName} />
      </div>
    </motion.div>
  );
}

function StandardCard({ item, index }: { item: PortfolioItem; index: number }) {
  const thumbnail = getItemThumbnail(item);
  const link = getCardLink(item);
  const isExternal = link && !link.startsWith('/');

  const inner = (
    <>
      {thumbnail && (
        <div className="aspect-[16/10] relative overflow-hidden bg-[var(--border)]">
          <Image
            src={thumbnail}
            alt={item.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-50" />
        </div>
      )}
      <div className="p-4">
        <ClientTag icon={item.clientIcon} name={item.clientName} />
        <h4 className="text-sm font-bold lowercase tracking-tight truncate mt-1.5">
          {item.title.toLowerCase()}
        </h4>
        {item.description && (
          <p className="text-xs text-[var(--muted)] mt-1 lowercase line-clamp-2 leading-relaxed">
            {item.description.toLowerCase()}
          </p>
        )}
      </div>
    </>
  );

  const cls = "group block border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-400";

  const wrapper = link ? (
    isExternal ? (
      <a href={link} target="_blank" rel="noopener noreferrer" className={`${cls} cursor-pointer`}>{inner}</a>
    ) : (
      <Link href={link} className={`${cls} cursor-pointer`}>{inner}</Link>
    )
  ) : (
    <div className={cls}>{inner}</div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      {wrapper}
    </motion.div>
  );
}

function ServiceGrid({ serviceSlug, items }: { serviceSlug: string; items: PortfolioItem[] }) {
  if (serviceSlug === 'social-media-management') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <SocialMediaCard key={item.slug} item={item as SocialMediaProject} index={i} />
        ))}
      </div>
    );
  }

  if (serviceSlug === 'brand-identity') {
    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {items.map((item, i) => (
          <BrandIdentityCard key={item.slug} item={item as BrandIdentityProject} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {items.map((item, i) => (
        <StandardCard key={item.slug} item={item} index={i} />
      ))}
    </div>
  );
}

export function PortfolioOverviewClient({ portfolioByService, services }: PortfolioOverviewClientProps) {
  const servicesWithPortfolio = services.filter((s) => portfolioByService[s.slug]?.length > 0);
  const hasAnyPortfolio = servicesWithPortfolio.length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero */}
      <div className="relative" style={{ paddingTop: '7rem' }}>
        <div className="absolute inset-0 overflow-hidden">
          <MatrixRain opacity={0.05} speed={0.5} density={0.3} />
        </div>
        <FloatingParticles count={20} minSize={1} maxSize={3} />

        <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-[0.25]">
          <AsciiArtFigure shape="diamond" rows={30} cols={36} animSpeed={2000} />
        </div>

        <div
          className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center pt-16 pb-36 md:pt-24 md:pb-44"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
            >
              portofoliu
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8 text-center">
              <TextScramble text="portfolio" duration={900} delay={300} />
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-[var(--muted)] lowercase text-center"
            >
              proiecte din toate serviciile noastre
            </motion.p>
          </motion.header>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
          style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
        />
      </div>

      {/* Portfolio sections per service */}
      <div className="relative z-10">
        {hasAnyPortfolio ? (
          servicesWithPortfolio.map((service, sectionIndex) => {
            const items = portfolioByService[service.slug];

            return (
              <section key={service.slug} className="relative py-20 md:py-28">
                {sectionIndex % 2 === 1 && (
                  <div className="absolute inset-0 animated-gradient-bg opacity-50" />
                )}

                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-3"
                  >
                    <div>
                      <span className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold block mb-2">
                        .{service.number}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-bold lowercase tracking-tighter">
                        {service.title}
                      </h2>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider font-semibold"
                    >
                      view all & details →
                    </Link>
                  </motion.div>

                  <ServiceGrid serviceSlug={service.slug} items={items} />
                </div>

                <div className="section-divider" />
              </section>
            );
          })
        ) : (
          <div className="container max-w-7xl mx-auto px-6 py-28">
            <div className="text-center">
              <p className="text-xl text-[var(--muted)] lowercase mb-4">portofoliul vine în curând.</p>
              <p className="text-sm text-[var(--muted)]">
                revino mai târziu sau{' '}
                <Link href="/services" className="underline hover:text-[var(--fg)] transition-colors">
                  vezi serviciile noastre
                </Link>
              </p>
            </div>
          </div>
        )}

        {hasAnyPortfolio && services.length > servicesWithPortfolio.length && (
          <section className="relative py-16 md:py-20">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center mb-10"
              >
                <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-4">
                  în curând
                </span>
                <h2 className="text-2xl md:text-4xl font-bold lowercase tracking-tighter">
                  alte servicii
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services
                  .filter((s) => !portfolioByService[s.slug]?.length)
                  .map((s, i) => (
                    <motion.div
                      key={s.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                      <Link
                        href={`/services/${s.slug}`}
                        className="group block border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 relative"
                      >
                        <div className="aspect-[16/10] relative overflow-hidden bg-black">
                          <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                            <span className="text-xs font-mono text-white/40 tracking-wider mb-2 font-semibold">
                              .{s.number}
                            </span>
                            <h3 className="text-lg font-bold lowercase text-white tracking-tight">
                              {s.title}
                            </h3>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="h-20" aria-hidden="true" />
    </div>
  );
}

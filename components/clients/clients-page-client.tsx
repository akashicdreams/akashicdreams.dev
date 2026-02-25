'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';
import type { ClientWithPortfolio } from '@/lib/portfolio';

interface ClientsPageClientProps {
  clients: ClientWithPortfolio[];
  serviceMap: Record<string, { title: string; number: string }>;
}

function ServiceBadge({ serviceSlug, serviceTitle }: { serviceSlug: string; serviceTitle: string }) {
  return (
    <Link
      href={`/services/${serviceSlug}`}
      className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-sm text-xs lowercase tracking-wider font-medium text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)] transition-all duration-300"
    >
      {serviceTitle}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </Link>
  );
}

export function ClientsPageClient({ clients, serviceMap }: ClientsPageClientProps) {
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
            className="flex flex-col items-center pt-16 pb-48 md:pt-24 md:pb-60"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
            >
              who we work with
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8 text-center">
              clients
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-[var(--muted)] lowercase text-center"
            >
              companies and projects we&apos;ve partnered with
            </motion.p>
          </motion.header>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
          style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
        />
      </div>

      {/* Client Cards */}
      <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {clients.map((client, index) => (
            <motion.div
              key={client.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 p-8 md:p-10 relative"
            >
              <div className="flex items-center gap-5 mb-6">
                {client.icon && (
                  <div className="flex-shrink-0 w-16 h-16 relative border border-[var(--border)] rounded-sm overflow-hidden bg-white">
                    <Image
                      src={client.icon}
                      alt={client.name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight">
                    {client.name.toLowerCase()}
                  </h2>
                  <span className="text-xs text-[var(--muted)] font-mono tracking-wider mt-1 block">
                    {client.services.length} {client.services.length === 1 ? 'service' : 'services'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {client.services.map((svc) => (
                  <ServiceBadge
                    key={svc.serviceSlug}
                    serviceSlug={svc.serviceSlug}
                    serviceTitle={svc.serviceTitle}
                  />
                ))}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-[var(--muted)] lowercase mb-4">no clients yet.</p>
            <p className="text-sm text-[var(--muted)]">
              check back later or{' '}
              <Link href="/services" className="underline hover:text-[var(--fg)] transition-colors">
                explore our services
              </Link>
            </p>
          </div>
        )}
      </div>

      <div className="h-20" aria-hidden="true" />
    </div>
  );
}

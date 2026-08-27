'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { ClientWithPortfolio } from '@/lib/portfolio';

interface WorkShowcaseProps {
    clients: ClientWithPortfolio[];
}

/**
 * Showcase image if the client has one, otherwise a deliberate logo tile
 * so a client without artwork yet still reads as intentional, not broken.
 */
function ClientVisual({ client }: { client: ClientWithPortfolio }) {
    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-deep)] border border-[var(--surface-border)]">
            {client.showcase ? (
                <Image
                    src={client.showcase}
                    alt={`lucrări pentru ${client.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            ) : (
                client.icon && (
                    <div className="absolute inset-0 flex items-center justify-center p-16 md:p-20">
                        <div className="relative w-full h-full">
                            <Image
                                src={client.icon}
                                alt={client.name}
                                fill
                                className="object-contain opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
                                sizes="(max-width: 768px) 60vw, 30vw"
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

function ClientCard({ client, index }: { client: ClientWithPortfolio; index: number }) {
    const serviceTitles = client.services.map((s) => s.serviceTitle);

    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.12 }}
            className="group"
        >
            <Link href={`/clients#${client.slug}`} className="block">
                <ClientVisual client={client} />
            </Link>

            <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-bold lowercase tracking-tight min-w-0 truncate">
                        {client.name}
                    </h3>
                    {client.website && (
                        <a
                            href={client.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="arrow-link text-sm lowercase shrink-0"
                        >
                            vezi site-ul <span className="arrow">→</span>
                        </a>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {serviceTitles.map((title) => (
                        <span
                            key={title}
                            className="chip !border-[var(--surface-border)] !text-xs !py-1.5 !px-3 lowercase pointer-events-none"
                        >
                            {title}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

export function WorkShowcase({ clients }: WorkShowcaseProps) {
    if (clients.length === 0) return null;

    return (
        <section className="bg-[var(--surface)] text-[var(--fg)] rounded-t-[2rem] md:rounded-t-[3rem] relative z-10">
            <div className="container section-pad">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28"
                >
                    <div className="max-w-3xl">
                        <h2 className="display-lg lowercase mb-6">
                            clienții noștri.
                        </h2>
                        <p className="text-lg md:text-xl text-[var(--surface-muted)] lowercase leading-relaxed">
                            afaceri pentru care facem tot: site, brand, poze și social media.
                        </p>
                    </div>
                    <Link href="/portfolio" className="arrow-link text-lg lowercase shrink-0">
                        portofoliu <span className="arrow">→</span>
                    </Link>
                </motion.div>

                {/* Client grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-20">
                    {clients.map((client, i) => (
                        <ClientCard key={client.slug} client={client} index={i} />
                    ))}
                </div>

                {/* Bottom link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mt-16 md:mt-20"
                >
                    <Link href="/portfolio" className="arrow-link text-lg lowercase">
                        vezi portofoliul complet <span className="arrow">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

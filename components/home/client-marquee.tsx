'use client';

import Image from 'next/image';

const clients = [
    { name: 'beear cars wash', icon: '/clients/beear-cars-wash/icon.png' },
    { name: 'farmacia farmilla', icon: '/clients/farmacia-farmilla/icon.png' },
    { name: 'g&a fashion import', icon: '/clients/g&a-fashion-import/icon.png' },
    { name: 'acces spre succes', icon: '/clients/acces-spre-succes/icon.png' },
];

// Triple so the loop never shows a gap regardless of viewport width
const items = [...clients, ...clients, ...clients];

function LogoItem({ client }: { client: { name: string; icon: string } }) {
    return (
        <div className="flex items-center gap-3 mx-10 md:mx-14 shrink-0 group opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div className="w-8 h-8 relative flex-shrink-0">
                <Image
                    src={client.icon}
                    alt={client.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <span className="text-sm font-semibold lowercase tracking-widest whitespace-nowrap text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors duration-500">
                {client.name}
            </span>
        </div>
    );
}

export function ClientMarquee() {
    return (
        <section className="border-y border-[var(--border)] py-7 overflow-hidden relative">
            {/* Fade edges */}
            <div
                className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
            />
            <div
                className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
            />

            {/* Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-0">
                clienții noștri
            </div>

            <div className="flex marquee-track">
                {items.map((client, i) => (
                    <LogoItem key={`${client.name}-${i}`} client={client} />
                ))}
            </div>
        </section>
    );
}

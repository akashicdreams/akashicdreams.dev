'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    size: number;
    x: string;
    y: string;
    delay: number;
    duration: number;
    driftX: number;
    driftY: number;
    opacityRange: [number, number, number];
}

interface FloatingParticlesProps {
    count?: number;
    minSize?: number;
    maxSize?: number;
    className?: string;
}

function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function generateParticles(count: number, minSize: number, maxSize: number): Particle[] {
    return Array.from({ length: count }, (_, i) => {
        const r = (offset: number) => seededRandom(i * 7 + offset);
        return {
            id: i,
            size: minSize + r(1) * (maxSize - minSize),
            x: `${r(2) * 100}%`,
            y: `${r(3) * 100}%`,
            delay: r(4) * 5,
            duration: 4 + r(5) * 8,
            driftX: (r(6) - 0.5) * 40,
            driftY: (r(7) - 0.5) * 40,
            opacityRange: [
                0.1 + r(8) * 0.2,
                0.3 + r(9) * 0.4,
                0.1 + r(10) * 0.2,
            ] as [number, number, number],
        };
    });
}

export function FloatingParticles({
    count = 20,
    minSize = 2,
    maxSize = 6,
    className = '',
}: FloatingParticlesProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(generateParticles(count, minSize, maxSize));
    }, [count, minSize, maxSize]);

    if (particles.length === 0) return null;

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[var(--fg)]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.x,
                        top: p.y,
                    }}
                    animate={{
                        x: [0, p.driftX, 0],
                        y: [0, p.driftY, 0],
                        opacity: p.opacityRange,
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
}

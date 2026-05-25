'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
    children: React.ReactNode;
    strength?: number;
    radius?: number;
    className?: string;
}

export function MagneticWrapper({
    children,
    strength = 0.28,
    radius = 90,
    className,
}: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { damping: 18, stiffness: 280 });
    const springY = useSpring(y, { damping: 18, stiffness: 280 });

    useEffect(() => {
        setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    const onMouseMove = (e: React.MouseEvent) => {
        if (isMobile || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
            x.set(dx * strength);
            y.set(dy * strength);
        }
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (isMobile) return <div className={className}>{children}</div>;

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

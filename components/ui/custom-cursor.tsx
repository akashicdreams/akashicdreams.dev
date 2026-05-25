'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    // Dot follows tightly
    const dotX = useSpring(mouseX, { damping: 12, stiffness: 500, mass: 0.3 });
    const dotY = useSpring(mouseY, { damping: 12, stiffness: 500, mass: 0.3 });

    // Ring lags softly behind
    const ringX = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.5 });
    const ringY = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.5 });

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const onOver = (e: MouseEvent) => {
            const el = e.target as Element;
            setIsHovering(!!el.closest('a, button, [role="button"], label, input, textarea, select'));
        };

        document.documentElement.classList.add('has-custom-cursor');
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);

        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
        };
    }, [isMobile, mouseX, mouseY]);

    if (!mounted || isMobile) return null;

    return (
        <>
            {/* Small dot -snappy, mix-blend inverts on light elements */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-[var(--fg)]"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    mixBlendMode: 'difference',
                }}
                animate={{ width: isHovering ? 8 : 6, height: isHovering ? 8 : 6 }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer ring -laggy, expands on hover */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-[var(--fg)]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: 0.45,
                }}
                animate={{
                    width: isHovering ? 48 : 30,
                    height: isHovering ? 48 : 30,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            />
        </>
    );
}

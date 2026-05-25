'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransitionBar() {
    const pathname = usePathname();
    const prevPath = useRef(pathname);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (pathname === prevPath.current) return;
        prevPath.current = pathname;
        setActive(true);
        const t = setTimeout(() => setActive(false), 700);
        return () => clearTimeout(t);
    }, [pathname]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    key="bar"
                    className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--fg)] z-[99997] origin-left"
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            )}
        </AnimatePresence>
    );
}

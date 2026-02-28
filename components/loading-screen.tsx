'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (document.readyState === 'complete') {
            const timer = setTimeout(() => setIsLoading(false), 300);
            return () => clearTimeout(timer);
        }

        const handleLoad = () => {
            setTimeout(() => setIsLoading(false), 300);
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-10000 flex flex-col items-center justify-center"
                    style={{ background: 'var(--bg)' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex flex-col items-center gap-8"
                    >
                        <span className="text-2xl md:text-3xl font-bold lowercase tracking-tighter">
                            akashic dreams
                        </span>

                        <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: 'var(--fg)' }}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

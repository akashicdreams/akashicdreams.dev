'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'idle' | 'zooming' | 'holding' | 'fading';

interface TransitionData {
    imageSrc: string;
    imageRect: DOMRect;
    targetHref: string;
}

interface ServiceTransitionContextValue {
    triggerTransition: (src: string, rect: DOMRect, href: string) => void;
    clearTransition: () => void;
}

const ServiceTransitionContext = createContext<ServiceTransitionContextValue>({
    triggerTransition: () => {},
    clearTransition: () => {},
});

export function useServiceTransition() {
    return useContext(ServiceTransitionContext);
}

export function ServiceTransitionProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [phase, setPhase] = useState<Phase>('idle');
    const [data, setData] = useState<TransitionData | null>(null);

    const triggerTransition = useCallback(
        (src: string, rect: DOMRect, href: string) => {
            setData({ imageSrc: src, imageRect: rect, targetHref: href });
            setPhase('zooming');
        },
        [],
    );

    const clearTransition = useCallback(() => {
        if (phase === 'holding' || phase === 'zooming') {
            setPhase('fading');
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 'zooming' && data) {
            const navTimer = setTimeout(() => {
                router.push(data.targetHref);
            }, 300);

            const holdTimer = setTimeout(() => {
                setPhase('holding');
            }, 550);

            return () => {
                clearTimeout(navTimer);
                clearTimeout(holdTimer);
            };
        }
    }, [phase, data, router]);

    useEffect(() => {
        if (phase === 'fading') {
            const timer = setTimeout(() => {
                setPhase('idle');
                setData(null);
            }, 450);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <ServiceTransitionContext.Provider value={{ triggerTransition, clearTransition }}>
            {children}
            <AnimatePresence>
                {phase !== 'idle' && data && (
                    <TransitionOverlay
                        data={data}
                        phase={phase}
                    />
                )}
            </AnimatePresence>
        </ServiceTransitionContext.Provider>
    );
}

function TransitionOverlay({
    data,
    phase,
}: {
    data: TransitionData;
    phase: Phase;
}) {
    const { imageRect } = data;

    return (
        <motion.div
            key="service-transition-overlay"
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'fading' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'fading' ? 0.4 : 0.15 }}
        >
            {/* Dark backdrop that fades in during zoom */}
            <motion.div
                className="absolute inset-0 bg-[var(--bg)]"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: phase === 'zooming' || phase === 'holding' ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* The image that zooms from thumbnail to fullscreen */}
            <motion.div
                className="absolute overflow-hidden"
                initial={{
                    top: imageRect.top,
                    left: imageRect.left,
                    width: imageRect.width,
                    height: imageRect.height,
                    borderRadius: 2,
                }}
                animate={{
                    top: 0,
                    left: 0,
                    width: '100vw' as unknown as number,
                    height: '100vh' as unknown as number,
                    borderRadius: 0,
                }}
                transition={{
                    duration: 0.55,
                    ease: [0.4, 0, 0.2, 1],
                }}
            >
                {/* Using a plain img here to avoid Next/Image layout complexity during animation */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={data.imageSrc}
                    alt=""
                    className="w-full h-full object-cover"
                />

                {/* Gradient overlay matching service detail hero */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    style={{
                        background:
                            'linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 70%, transparent) 50%, color-mix(in srgb, var(--bg) 30%, transparent) 100%)',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

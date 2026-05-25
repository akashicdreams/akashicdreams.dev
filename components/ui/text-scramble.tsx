'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-\\/[]{}=+*^?#@$%&_░▒▓';

function buildFrame(target: string, progress: number): string {
    const revealed = Math.ceil(progress * target.length);
    return target
        .split('')
        .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealed) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
}

interface TextScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    once?: boolean;
}

export function TextScramble({
    text,
    className,
    duration = 900,
    delay = 0,
    once = true,
}: TextScrambleProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayed, setDisplayed] = useState(text);
    const hasRun = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                if (once && hasRun.current) return;
                hasRun.current = true;

                const timeout = setTimeout(() => {
                    const startTime = performance.now();
                    const FRAMES_PER_SEC = 40;
                    const interval = setInterval(() => {
                        const elapsed = performance.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        setDisplayed(buildFrame(text, progress));
                        if (progress >= 1) {
                            clearInterval(interval);
                            setDisplayed(text);
                        }
                    }, 1000 / FRAMES_PER_SEC);
                }, delay);

                return () => clearTimeout(timeout);
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [text, duration, delay, once]);

    return (
        <span ref={ref} className={className} aria-label={text}>
            {displayed}
        </span>
    );
}

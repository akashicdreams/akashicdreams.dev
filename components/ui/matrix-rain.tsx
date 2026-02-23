'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface MatrixRainProps {
    opacity?: number;
    speed?: number;
    density?: number;
    className?: string;
}

export function MatrixRain({
    opacity = 0.06,
    speed = 1,
    density = 0.6,
    className = '',
}: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const animFrameRef = useRef<number>(0);
    const dropsRef = useRef<number[]>([]);
    const lastTimeRef = useRef<number>(0);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|=+-*&^%$#@!~';

    const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, isLight: boolean) => {
        const fontSize = 14;
        const columns = Math.floor(w / fontSize);

        if (dropsRef.current.length !== columns) {
            dropsRef.current = Array.from({ length: columns }, () =>
                Math.random() * -100
            );
        }

        const color = isLight ? '0, 0, 0' : '255, 255, 255';
        ctx.fillStyle = isLight
            ? `rgba(255, 255, 255, 0.08)`
            : `rgba(0, 0, 0, 0.08)`;
        ctx.fillRect(0, 0, w, h);

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < columns; i++) {
            if (Math.random() > density) continue;

            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = dropsRef.current[i] * fontSize;

            const alpha = 0.1 + Math.random() * 0.3;
            ctx.fillStyle = `rgba(${color}, ${alpha})`;
            ctx.fillText(char, x, y);

            if (dropsRef.current[i] * fontSize > h && Math.random() > 0.975) {
                dropsRef.current[i] = 0;
            }
            dropsRef.current[i] += speed * (0.5 + Math.random() * 0.5);
        }
    }, [chars, density, speed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        const isLight = theme === 'light';

        const animate = (time: number) => {
            if (time - lastTimeRef.current > 50) {
                draw(ctx, canvas.width, canvas.height, isLight);
                lastTimeRef.current = time;
            }
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            resizeObserver.disconnect();
        };
    }, [theme, draw]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ opacity }}
        />
    );
}

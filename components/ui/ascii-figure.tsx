'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

type ShapeType = 'diamond' | 'circle' | 'triangle' | 'hexagon' | 'code-block';

interface AsciiArtFigureProps {
    shape?: ShapeType;
    rows?: number;
    cols?: number;
    className?: string;
    charSet?: string;
    animSpeed?: number;
}

const CODE_CHARS = '01{}[]<>|/\\=+-*&^%$#@!~;:.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function seededChar(seed: number): string {
    const x = Math.sin(seed * 127.1) * 43758.5453;
    const idx = Math.floor((x - Math.floor(x)) * CODE_CHARS.length);
    return CODE_CHARS[idx];
}

function isInsideShape(row: number, col: number, rows: number, cols: number, shape: ShapeType): boolean {
    const cy = rows / 2;
    const cx = cols / 2;
    const ny = (row - cy) / cy;
    const nx = (col - cx) / cx;

    switch (shape) {
        case 'diamond': {
            return Math.abs(nx) + Math.abs(ny) < 0.85;
        }
        case 'circle': {
            return nx * nx + ny * ny < 0.75;
        }
        case 'triangle': {
            const t = (ny + 1) / 2;
            return ny > -0.8 && Math.abs(nx) < t * 0.9;
        }
        case 'hexagon': {
            const ax = Math.abs(nx);
            const ay = Math.abs(ny);
            return ay < 0.8 && ax < 0.8 && (ax + ay * 0.577) < 0.85;
        }
        case 'code-block': {
            const margin = 0.15;
            return Math.abs(nx) < (1 - margin) && Math.abs(ny) < (1 - margin);
        }
    }
}

function generateGrid(rows: number, cols: number, shape: ShapeType, tick: number): (string | null)[][] {
    const grid: (string | null)[][] = [];
    for (let r = 0; r < rows; r++) {
        const row: (string | null)[] = [];
        for (let c = 0; c < cols; c++) {
            if (isInsideShape(r, c, rows, cols, shape)) {
                const seed = r * cols + c + tick * 0.3;
                row.push(seededChar(seed));
            } else {
                row.push(null);
            }
        }
        grid.push(row);
    }
    return grid;
}

export function AsciiArtFigure({
    shape = 'diamond',
    rows = 30,
    cols = 30,
    className = '',
    animSpeed = 2000,
}: AsciiArtFigureProps) {
    const [grid, setGrid] = useState<(string | null)[][]>([]);
    const [tick, setTick] = useState(0);

    const updateGrid = useCallback(() => {
        setTick(t => t + 1);
    }, []);

    useEffect(() => {
        setGrid(generateGrid(rows, cols, shape, 0));
        const interval = setInterval(updateGrid, animSpeed);
        return () => clearInterval(interval);
    }, [rows, cols, shape, animSpeed, updateGrid]);

    useEffect(() => {
        setGrid(generateGrid(rows, cols, shape, tick));
    }, [tick, rows, cols, shape]);

    if (grid.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className={`font-mono select-none pointer-events-none ${className}`}
            style={{ lineHeight: '1.15', fontSize: '0.75rem', letterSpacing: '0.15em' }}
            aria-hidden="true"
        >
            {grid.map((row, r) => (
                <div key={r} className="whitespace-pre flex justify-center">
                    {row.map((char, c) => {
                        if (char === null) return <span key={c} style={{ width: '0.65em', display: 'inline-block' }}>&nbsp;</span>;

                        const dist = Math.sqrt(
                            Math.pow((r - rows / 2) / rows, 2) +
                            Math.pow((c - cols / 2) / cols, 2)
                        );
                        const opacity = 0.15 + (1 - dist * 2) * 0.55;

                        return (
                            <span
                                key={c}
                                style={{
                                    opacity: Math.max(0.08, Math.min(0.7, opacity)),
                                    width: '0.65em',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    transition: 'opacity 0.8s ease',
                                }}
                                className="text-[var(--fg)]"
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>
            ))}
        </motion.div>
    );
}

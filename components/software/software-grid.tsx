'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SoftwareProject } from '@/lib/software';

interface SoftwareGridProps {
    projects: SoftwareProject[];
}

export function SoftwareGrid({ projects }: SoftwareGridProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-24 text-[var(--muted)]">
                <p className="text-xl mb-2 lowercase">no software projects yet.</p>
                <p className="text-sm">Add markdown files to content/software/</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14"
        >
            {projects.map((project, index) => (
                <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12, duration: 0.6 }}
                    className="group card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 cursor-pointer relative"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('a') || target.closest('button')) return;
                        const targetUrl = project.demo || project.github;
                        if (targetUrl) {
                            window.open(targetUrl, '_blank', 'noopener,noreferrer');
                        }
                    }}
                >
                    {project.thumbnail && (
                        <div className="aspect-video bg-[var(--border)] relative overflow-hidden">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
                        </div>
                    )}

                    <div className="p-8 md:p-10">
                        <h3 className="text-2xl font-bold mb-3 lowercase tracking-tight group-hover:tracking-normal transition-all duration-300">
                            {project.title.toLowerCase()}
                        </h3>
                        <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
                            {project.summary.toLowerCase()}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-4 py-2 border border-[var(--border)] rounded-sm lowercase font-medium text-[var(--muted)] group-hover:border-[var(--fg)] group-hover:text-[var(--fg)] transition-all duration-300"
                                >
                                    {tech.toLowerCase()}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-6 pt-6 border-t border-[var(--border)]">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs tracking-wider hover:text-[var(--fg)] text-[var(--muted)] transition-colors lowercase font-semibold"
                                onClick={(e) => e.stopPropagation()}
                            >
                                github →
                            </a>
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs tracking-wider flex items-center gap-2 hover:opacity-70 transition-opacity lowercase font-semibold"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    live demo →
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </motion.div>
            ))}
        </motion.div>
    );
}

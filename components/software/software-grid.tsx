'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SoftwareProject } from '@/lib/software';

interface SoftwareGridProps {
    projects: SoftwareProject[];
}

export function SoftwareGrid({ projects }: SoftwareGridProps) {
    const [selectedTag, setSelectedTag] = useState<string>('all');

    // Extract all unique tags
    const allTags = projects.reduce((tags: string[], project) => {
        project.tags.forEach((tag) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
        return tags;
    }, []);

    const filteredProjects = selectedTag === 'all'
        ? projects
        : projects.filter((project) => project.tags.includes(selectedTag));

    if (projects.length === 0) {
        return (
            <div className="text-center py-24 text-[var(--muted)]">
                <p className="text-xl mb-2">No software projects yet.</p>
                <p className="text-sm">Add markdown files to content/software/</p>
            </div>
        );
    }

    return (
        <div>
            {/* Filter chips */}
            {allTags.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <button
                        onClick={() => setSelectedTag('all')}
                        className={`px-4 py-2 text-sm lowercase tracking-wider rounded-sm transition-all ${selectedTag === 'all'
                            ? 'bg-[var(--fg)] text-[var(--bg)]'
                            : 'border border-[var(--border)] hover:border-[var(--fg)]'
                            }`}
                    >
                        all
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 text-sm lowercase tracking-wider rounded-sm transition-all ${selectedTag === tag
                                ? 'bg-[var(--fg)] text-[var(--bg)]'
                                : 'border border-[var(--border)] hover:border-[var(--fg)]'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            {/* Projects grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all"
                    >
                        {project.thumbnail && (
                            <div className="aspect-video bg-[var(--border)] relative overflow-hidden">
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 lowercase">{project.title.toLowerCase()}</h3>
                            <p className="text-sm text-[var(--muted)] mb-4">{project.summary.toLowerCase()}</p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 border border-[var(--border)] rounded-sm lowercase"
                                    >
                                        {tech.toLowerCase()}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs hover:text-[var(--fg)] text-[var(--muted)] transition-colors lowercase"
                                >
                                    github
                                </a>
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs flex items-center gap-2 hover:opacity-70 transition-opacity"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        live demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-24 text-[var(--muted)]">
                    <p>No projects match the selected filter.</p>
                </div>
            )}
        </div>
    );
}

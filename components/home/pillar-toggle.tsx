'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SoftwareProject } from '@/lib/software';
import { PhotoAlbum } from '@/lib/photos';

interface PillarToggleProps {
    projects: SoftwareProject[];
    albums: PhotoAlbum[];
}

export function PillarToggle({ projects, albums }: PillarToggleProps) {
    const [activeTab, setActiveTab] = useState<'software' | 'photos'>('software');

    const latestProjects = projects.slice(0, 3);
    const latestAlbums = albums.slice(0, 3);

    return (
        <section style={{ paddingTop: '6rem', paddingBottom: '6rem' }} className="px-4">
            <div className="container max-w-6xl mx-auto">
                {/* Toggle */}
                <div className="flex justify-center mb-24 gap-12">
                    <button
                        onClick={() => setActiveTab('software')}
                        className={`text-lg lowercase tracking-widest transition-all pb-2 border-b-2 ${activeTab === 'software'
                            ? 'border-[var(--fg)] text-[var(--fg)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]'
                            }`}
                    >
                        software
                    </button>
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`text-lg lowercase tracking-widest transition-all pb-2 border-b-2 ${activeTab === 'photos'
                            ? 'border-[var(--fg)] text-[var(--fg)]'
                            : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]'
                            }`}
                    >
                        photos
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'software' ? (
                        <motion.div
                            key="software"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {latestProjects.length > 0 ? (
                                latestProjects.map((project, index) => (
                                    <motion.div
                                        key={project.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all"
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
                                                <h3 className="text-xl font-bold mb-2 lowercase">{project.title}</h3>
                                                <p className="text-sm text-[var(--muted)] mb-4">{project.summary}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.stack.slice(0, 3).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="text-xs px-2 py-1 border border-[var(--border)] rounded-sm"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-16 text-[var(--muted)]">
                                    <p>No software projects yet.</p>
                                    <p className="text-sm mt-2">Add markdown files to content/software/</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="photos"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {latestAlbums.length > 0 ? (
                                latestAlbums.map((album, index) => (
                                    <motion.div
                                        key={album.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={`/photos/${album.slug}`}
                                            className="group block border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all"
                                        >
                                            <div className="aspect-square bg-[var(--border)] relative overflow-hidden">
                                                <Image
                                                    src={album.cover}
                                                    alt={album.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-[var(--bg)] opacity-0 group-hover:opacity-90 transition-opacity flex items-end p-6">
                                                    <div>
                                                        <h3 className="text-xl font-bold lowercase">{album.title}</h3>
                                                        {album.location && (
                                                            <p className="text-sm text-[var(--muted)]">{album.location}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-16 text-[var(--muted)]">
                                    <p>No photo albums yet.</p>
                                    <p className="text-sm mt-2">Add folders to public/photos/</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center mt-12">
                    <Link
                        href={activeTab === 'software' ? '/software' : '/photos'}
                        className="inline-block px-6 py-3 text-sm lowercase tracking-wider border border-[var(--fg)] rounded-sm hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all"
                    >
                        view all {activeTab}
                    </Link>
                </div>
            </div>
        </section>
    );
}

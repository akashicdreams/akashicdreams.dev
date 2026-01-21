'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoAlbum } from '@/lib/photos';

interface AlbumsGridProps {
    albums: PhotoAlbum[];
}

export function AlbumsGrid({ albums }: AlbumsGridProps) {
    if (albums.length === 0) {
        return (
            <div className="text-center py-24 text-[var(--muted)]">
                <p className="text-xl mb-2">No photo albums yet.</p>
                <p className="text-sm">Add folders to public/photos/</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
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
                            {/* Hover overlay */}
                            <motion.div
                                initial={{ y: '100%' }}
                                whileHover={{ y: 0 }}
                                className="absolute inset-0 bg-[var(--bg)]/95 flex flex-col justify-end p-6"
                            >
                                <h3 className="text-2xl font-bold lowercase mb-2">{album.title}</h3>
                                <div className="text-sm text-[var(--muted)]">
                                    {album.location && <p>{album.location}</p>}
                                    {album.date && <p>{album.date}</p>}
                                    {album.description && <p className="mt-2">{album.description}</p>}
                                </div>
                                <p className="text-sm mt-4 opacity-50">
                                    {album.images.length} {album.images.length === 1 ? 'photo' : 'photos'}
                                </p>
                            </motion.div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}

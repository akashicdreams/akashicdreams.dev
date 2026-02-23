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
                <p className="text-xl mb-2 lowercase">no photo albums yet.</p>
                <p className="text-sm">Add folders to public/photos/</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {albums.map((album, index) => (
                <motion.div
                    key={album.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12, duration: 0.6 }}
                >
                    <Link
                        href={`/photos/${album.slug}`}
                        className="group block card-glow border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 relative"
                    >
                        <div className="aspect-[4/3] bg-[var(--border)] relative overflow-hidden">
                            <Image
                                src={album.cover}
                                alt={album.title}
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Info overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold lowercase text-white mb-2 tracking-tight">
                                        {album.title}
                                    </h3>
                                    {album.location && (
                                        <p className="text-sm text-white/60 lowercase tracking-wider">
                                            {album.location}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-xs text-white/50 lowercase tracking-wider font-semibold">
                                        view album →
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover accent line */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}

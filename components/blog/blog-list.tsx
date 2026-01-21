'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');

    // Extract all unique tags
    const allTags = posts.reduce((tags: string[], post) => {
        post.tags.forEach((tag) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
        return tags;
    }, []);

    // Filter posts by search and tag
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    if (posts.length === 0) {
        return (
            <div className="text-center py-24 text-[var(--muted)]">
                <p className="text-xl mb-2">No blog posts yet.</p>
                <p className="text-sm">Add markdown files to content/blog/</p>
            </div>
        );
    }

    return (
        <div>
            {/* Search and filters */}
            <div className="mb-12">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-sm focus:border-[var(--fg)] outline-none transition-all mb-6"
                />

                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
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
            </div>

            {/* Posts list */}
            <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-[var(--border)] pb-8"
                    >
                        <Link href={`/blog/${post.slug}`} className="group block">
                            <p className="text-sm text-[var(--muted)] mb-2">{post.date}</p>
                            <h2 className="text-2xl md:text-3xl font-bold lowercase mb-3 group-hover:opacity-70 transition-opacity">
                                {post.title.toLowerCase()}
                            </h2>
                            <p className="text-[var(--muted)] mb-4">{post.summary.toLowerCase()}</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 border border-[var(--border)] rounded-sm lowercase"
                                    >
                                        {tag.toLowerCase()}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-24 text-[var(--muted)]">
                    <p>no posts match your search or filter.</p>
                </div>
            )}
        </div>
    );
}

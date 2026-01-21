'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { markdownToHtml } from '@/lib/markdown';

interface BlogPostViewProps {
  post: BlogPost;
}

export function BlogPostView({ post }: BlogPostViewProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    markdownToHtml(post.content).then(setHtmlContent);
  }, [post.content]);

  return (
    <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--fg)] origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container max-w-3xl mx-auto">
        {/* Back link */}
        <Link href="/blog" className="text-sm text-[var(--muted)] hover:opacity-70 mb-8 inline-block">
          ← back to blog
        </Link>

        {/* Post header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-sm text-[var(--muted)] mb-4">{post.date}</p>
          <h1 className="text-4xl md:text-5xl font-bold lowercase mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-[var(--muted)] mb-6">{post.summary}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 border border-[var(--border)] rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Post content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            // Custom prose styles
            fontSize: '1.125rem',
            lineHeight: '1.8',
          }}
        />
      </div>

      <style jsx>{`
        :global(.prose) {
          color: var(--fg);
        }
        :global(.prose h2) {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          text-transform: lowercase;
        }
        :global(.prose h3) {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-transform: lowercase;
        }
        :global(.prose p) {
          margin-bottom: 1.5rem;
        }
        :global(.prose a) {
          color: var(--fg);
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        :global(.prose a:hover) {
          opacity: 0.7;
        }
        :global(.prose ul, .prose ol) {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        :global(.prose li) {
          margin-bottom: 0.5rem;
        }
        :global(.prose blockquote) {
          border-left: 4px solid var(--border);
          padding-left: 1.5rem;
          font-style: italic;
          margin: 2rem 0;
          color: var(--muted);
        }
        :global(.prose code) {
          background: var(--border);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        :global(.prose pre) {
          background: var(--border);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        :global(.prose pre code) {
          background: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

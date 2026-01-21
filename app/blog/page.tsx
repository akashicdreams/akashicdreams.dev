import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { BlogList } from '@/components/blog/blog-list';

export const metadata: Metadata = {
    title: 'blog',
    description: 'thoughts on software, design, and visual storytelling',
};

export default async function BlogPage() {
    const posts = getAllBlogPosts();

    return (
        <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container max-w-4xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold lowercase mb-4">blog</h1>
                    <p className="text-lg text-[var(--muted)]">
                        thoughts on software, design, and visual storytelling
                    </p>
                </header>

                <BlogList posts={posts} />
            </div>
        </div>
    );
}

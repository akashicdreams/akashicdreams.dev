import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    summary: string;
    content: string;
}

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllBlogPosts(): BlogPost[] {
    try {
        if (!fs.existsSync(contentDirectory)) {
            return [];
        }

        const fileNames = fs.readdirSync(contentDirectory);
        const posts = fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map((fileName) => {
                const slug = fileName.replace(/\.md$/, '');
                const fullPath = path.join(contentDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data, content } = matter(fileContents);

                return {
                    slug,
                    title: data.title || slug,
                    date: data.date || '',
                    tags: data.tags || [],
                    summary: data.summary || '',
                    content,
                } as BlogPost;
            })
            .sort((a, b) => (a.date > b.date ? -1 : 1));

        return posts;
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            date: data.date || '',
            tags: data.tags || [],
            summary: data.summary || '',
            content,
        } as BlogPost;
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

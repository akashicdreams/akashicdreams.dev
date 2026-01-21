import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface SoftwareProject {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    stack: string[];
    thumbnail: string;
    github: string;
    demo?: string;
    content: string;
}

const contentDirectory = path.join(process.cwd(), 'content', 'software');

export function getAllSoftwareProjects(): SoftwareProject[] {
    try {
        if (!fs.existsSync(contentDirectory)) {
            return [];
        }

        const fileNames = fs.readdirSync(contentDirectory);
        const projects = fileNames
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
                    summary: data.summary || '',
                    tags: data.tags || [],
                    stack: data.stack || [],
                    thumbnail: data.thumbnail || '',
                    github: data.github || '',
                    demo: data.demo,
                    content,
                } as SoftwareProject;
            })
            .sort((a, b) => (a.date > b.date ? -1 : 1));

        return projects;
    } catch (error) {
        console.error('Error reading software projects:', error);
        return [];
    }
}

export function getSoftwareProjectBySlug(slug: string): SoftwareProject | null {
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
            summary: data.summary || '',
            tags: data.tags || [],
            stack: data.stack || [],
            thumbnail: data.thumbnail || '',
            github: data.github || '',
            demo: data.demo,
            content,
        } as SoftwareProject;
    } catch (error) {
        console.error(`Error reading project ${slug}:`, error);
        return null;
    }
}

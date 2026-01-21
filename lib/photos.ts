import fs from 'fs';
import path from 'path';

export interface PhotoAlbum {
    slug: string;
    title: string;
    date?: string;
    location?: string;
    description?: string;
    cover: string;
    images: string[];
}

const photosDirectory = path.join(process.cwd(), 'public', 'photos');

export function getAllPhotoAlbums(): PhotoAlbum[] {
    try {
        if (!fs.existsSync(photosDirectory)) {
            return [];
        }

        const folders = fs.readdirSync(photosDirectory, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const albums = folders.map((folder) => {
            const albumPath = path.join(photosDirectory, folder);
            const metaPath = path.join(albumPath, '_meta.json');

            let meta: any = {};
            if (fs.existsSync(metaPath)) {
                const metaContent = fs.readFileSync(metaPath, 'utf8');
                meta = JSON.parse(metaContent);
            }

            // Get all image files
            const files = fs.readdirSync(albumPath);
            const imageFiles = files.filter((file) =>
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && file !== 'cover.jpg'
            );

            // Determine cover image
            let cover = meta.cover || 'cover.jpg';
            if (!fs.existsSync(path.join(albumPath, cover))) {
                cover = imageFiles[0] || '';
            }

            const title = meta.title || folder.replace(/[-_]/g, ' ');
            const images = imageFiles.map((file) => `/photos/${folder}/${file}`);

            return {
                slug: folder,
                title,
                date: meta.date,
                location: meta.location,
                description: meta.description,
                cover: `/photos/${folder}/${cover}`,
                images,
            } as PhotoAlbum;
        });

        // Sort by date if available, otherwise by folder name
        return albums.sort((a, b) => {
            if (a.date && b.date) {
                return a.date > b.date ? -1 : 1;
            }
            return a.slug.localeCompare(b.slug);
        });
    } catch (error) {
        console.error('Error reading photo albums:', error);
        return [];
    }
}

export function getPhotoAlbumBySlug(slug: string): PhotoAlbum | null {
    try {
        const albumPath = path.join(photosDirectory, slug);
        if (!fs.existsSync(albumPath)) {
            return null;
        }

        const metaPath = path.join(albumPath, '_meta.json');
        let meta: any = {};
        if (fs.existsSync(metaPath)) {
            const metaContent = fs.readFileSync(metaPath, 'utf8');
            meta = JSON.parse(metaContent);
        }

        const files = fs.readdirSync(albumPath);
        const imageFiles = files.filter((file) =>
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && file !== 'cover.jpg'
        );

        let cover = meta.cover || 'cover.jpg';
        if (!fs.existsSync(path.join(albumPath, cover))) {
            cover = imageFiles[0] || '';
        }

        const title = meta.title || slug.replace(/[-_]/g, ' ');
        const images = imageFiles.map((file) => `/photos/${slug}/${file}`);

        return {
            slug,
            title,
            date: meta.date,
            location: meta.location,
            description: meta.description,
            cover: `/photos/${slug}/${cover}`,
            images,
        } as PhotoAlbum;
    } catch (error) {
        console.error(`Error reading album ${slug}:`, error);
        return null;
    }
}

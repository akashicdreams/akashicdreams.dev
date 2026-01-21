import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPhotoAlbumBySlug, getAllPhotoAlbums } from '@/lib/photos';
import { AlbumView } from '@/components/photos/album-view';

export async function generateStaticParams() {
    const albums = getAllPhotoAlbums();
    return albums.map((album) => ({
        slug: album.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const album = getPhotoAlbumBySlug(params.slug);

    if (!album) {
        return {
            title: 'Album Not Found',
        };
    }

    return {
        title: album.title,
        description: album.description || `Photo album: ${album.title}`,
    };
}

export default async function AlbumPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const album = getPhotoAlbumBySlug(params.slug);

    if (!album) {
        notFound();
    }

    return <AlbumView album={album} />;
}

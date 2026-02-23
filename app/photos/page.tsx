import { Metadata } from 'next';
import { getAllPhotoAlbums } from '@/lib/photos';
import { AlbumsGrid } from '@/components/photos/albums-grid';
import { PhotosPageShell } from '@/components/photos/photos-page-shell';

export const metadata: Metadata = {
    title: 'photos',
    description: 'life captured through the lens',
};

export default async function PhotosPage() {
    const albums = getAllPhotoAlbums();

    return (
        <PhotosPageShell>
            <AlbumsGrid albums={albums} />
        </PhotosPageShell>
    );
}

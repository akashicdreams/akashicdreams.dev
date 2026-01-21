import { Metadata } from 'next';
import { getAllPhotoAlbums } from '@/lib/photos';
import { AlbumsGrid } from '@/components/photos/albums-grid';

export const metadata: Metadata = {
    title: 'photos',
    description: 'life captured through the lens',
};

export default async function PhotosPage() {
    const albums = getAllPhotoAlbums();

    return (
        <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold lowercase mb-4">photos</h1>
                    <p className="text-lg text-[var(--muted)]">
                        life captured through the lens
                    </p>
                </header>

                <AlbumsGrid albums={albums} />
            </div>
        </div>
    );
}

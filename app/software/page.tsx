import { Metadata } from 'next';
import { getAllSoftwareProjects } from '@/lib/software';
import { SoftwareGrid } from '@/components/software/software-grid';

export const metadata: Metadata = {
    title: 'software',
    description: 'systems that ship, scale, and stay maintainable',
};

export default async function SoftwarePage() {
    const projects = getAllSoftwareProjects();

    return (
        <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold lowercase mb-4">software</h1>
                    <p className="text-lg text-[var(--muted)]">
                        systems that ship, scale, and stay maintainable
                    </p>
                </header>

                <SoftwareGrid projects={projects} />
            </div>
        </div>
    );
}

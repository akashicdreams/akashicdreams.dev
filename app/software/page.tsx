import { Metadata } from 'next';
import { getAllSoftwareProjects } from '@/lib/software';
import { SoftwareGrid } from '@/components/software/software-grid';
import { SoftwarePageShell } from '@/components/software/software-page-shell';

export const metadata: Metadata = {
    title: 'software',
    description: 'systems that ship, scale, and stay maintainable',
};

export default async function SoftwarePage() {
    const projects = getAllSoftwareProjects();

    return (
        <SoftwarePageShell>
            <SoftwareGrid projects={projects} />
        </SoftwarePageShell>
    );
}

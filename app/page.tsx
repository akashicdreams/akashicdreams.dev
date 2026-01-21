import { getAllSoftwareProjects } from '@/lib/software';
import { getAllPhotoAlbums } from '@/lib/photos';
import { Hero } from '@/components/home/hero';
import { PillarToggle } from '@/components/home/pillar-toggle';
import { PhilosophySection } from '@/components/home/philosophy-section';
import { ContactCTA } from '@/components/home/contact-cta';

export default async function HomePage() {
  const projects = getAllSoftwareProjects();
  const albums = getAllPhotoAlbums();

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-32">
      <Hero projects={projects} albums={albums} />

      {/* Explicit margin wrapper */}
      <div style={{ marginBottom: '12rem' }}>
        <PillarToggle projects={projects} albums={albums} />
      </div>

      <ContactCTA />

      {/* Unbreakable spacer using inline styles to guarantee rendering */}
      <div style={{ height: '200px', display: 'block', width: '100%' }} aria-hidden="true" />

    </div>
  );
}

import { getAllSoftwareProjects } from '@/lib/software';
import { getAllPhotoAlbums } from '@/lib/photos';
import { Hero } from '@/components/home/hero';
import { PillarToggle } from '@/components/home/pillar-toggle';
import { ServicesPricing } from '@/components/home/services-pricing';
import { ContactCTA } from '@/components/home/contact-cta';

export default async function HomePage() {
  const projects = getAllSoftwareProjects();
  const albums = getAllPhotoAlbums();

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-32">
      <Hero projects={projects} albums={albums} />

      {/* Services & Pricing */}
      <ServicesPricing />

      {/* Portfolio Showcase */}
      <div style={{ marginBottom: '6rem' }}>
        <PillarToggle projects={projects} albums={albums} />
      </div>

      {/* Contact Form */}
      <ContactCTA />

      {/* Spacer */}
      <div style={{ height: '100px', display: 'block', width: '100%' }} aria-hidden="true" />
    </div>
  );
}

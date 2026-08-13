import { EditorialHero } from '@/components/home/editorial-hero';
import { WorkShowcase } from '@/components/home/work-showcase';
import { WhoWeAre } from '@/components/home/who-we-are';
import { ServicesPillars } from '@/components/home/services-pillars';
import { ProcessSection } from '@/components/home/process-section';
import { ClientMarquee } from '@/components/home/client-marquee';
import { Testimonials } from '@/components/home/testimonials';
import { ContactCTA } from '@/components/home/contact-cta';
import { services } from '@/lib/services';
import { getFeaturedPortfolioItems } from '@/lib/portfolio';

export default function HomePage() {
  const portfolioByService = getFeaturedPortfolioItems();

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      {/* Editorial hero - greeting, big headline, service chips */}
      <EditorialHero />

      {/* Portfolio - gray color block with rounded cards */}
      <WorkShowcase portfolioByService={portfolioByService} services={services} />

      {/* About - inverted block + text marquee */}
      <WhoWeAre />

      {/* Services - deep gray block, 3 pillar columns */}
      <ServicesPillars />

      {/* Process steps + values - numbered editorial lists */}
      <ProcessSection />

      {/* Client logos marquee */}
      <ClientMarquee />

      {/* Reviews - hidden automatically while lib/testimonials.ts is empty */}
      <Testimonials />

      {/* Contact */}
      <ContactCTA />
    </div>
  );
}

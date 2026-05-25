import { Hero } from '@/components/home/hero';
import { StatsCounter } from '@/components/home/stats-counter';
import { ServicesPricing } from '@/components/home/services-pricing';
import { PillarToggle } from '@/components/home/pillar-toggle';
import { PhilosophySection } from '@/components/home/philosophy-section';
import { ClientMarquee } from '@/components/home/client-marquee';
import { ContactCTA } from '@/components/home/contact-cta';
import { services } from '@/lib/services';
import { getFeaturedPortfolioItems } from '@/lib/portfolio';

export default function HomePage() {
  const portfolioByService = getFeaturedPortfolioItems();

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <Hero />

      {/* Stats strip -immediate trust signal after hero */}
      <StatsCounter />

      <div className="section-divider" />

      {/* Services & Pricing */}
      <ServicesPricing />

      <div className="section-divider" />

      {/* Portfolio preview -tabbed by service */}
      <PillarToggle portfolioByService={portfolioByService} services={services} />

      <div className="section-divider" />

      {/* Philosophy / Approach */}
      <PhilosophySection />

      {/* Client logos marquee */}
      <ClientMarquee />

      <div className="section-divider" />

      {/* Contact */}
      <ContactCTA />

      <div style={{ height: '120px' }} aria-hidden="true" />
    </div>
  );
}

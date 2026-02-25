import { getFeaturedPortfolioItems } from '@/lib/portfolio';
import { services } from '@/lib/services';
import { Hero } from '@/components/home/hero';
import { PillarToggle } from '@/components/home/pillar-toggle';
import { ServicesPricing } from '@/components/home/services-pricing';
import { ContactCTA } from '@/components/home/contact-cta';

export default async function HomePage() {
  const featuredItems = getFeaturedPortfolioItems();

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <Hero />

      {/* Divider */}
      <div className="section-divider" />

      {/* Services & Pricing */}
      <ServicesPricing />

      {/* Divider */}
      <div className="section-divider" />

      {/* Portfolio Showcase */}
      <PillarToggle portfolioByService={featuredItems} services={services} />

      {/* Divider */}
      <div className="section-divider" />

      {/* Contact Form */}
      <ContactCTA />

      {/* Bottom breathing room */}
      <div style={{ height: '120px' }} aria-hidden="true" />
    </div>
  );
}

import { Hero } from '@/components/home/hero';
import { ServicesPricing } from '@/components/home/services-pricing';
import { ContactCTA } from '@/components/home/contact-cta';

export default function HomePage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <Hero />

      {/* Divider */}
      <div className="section-divider" />

      {/* Services & Pricing */}
      <ServicesPricing />

      {/* Divider */}
      <div className="section-divider" />

      {/* Contact Form */}
      <ContactCTA />

      {/* Bottom breathing room */}
      <div style={{ height: '120px' }} aria-hidden="true" />
    </div>
  );
}

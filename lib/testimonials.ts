export interface Testimonial {
  /** short quote, 1-2 sentences, lowercase */
  quote: string;
  name: string;
  /** e.g. "owner" */
  role: string;
  company: string;
  /** 1-5 */
  rating: number;
  /** square headshot in /public, e.g. "/testimonials/sorina.jpg" - optional, initials shown as fallback */
  photo?: string;
}

/*
 * Empty = the reviews section is hidden on the homepage.
 * When real client material arrives, add entries here and the section
 * appears automatically. Ask each client for: square headshot (min
 * 800x800, natural light, plain background) placed in /public/testimonials,
 * name + role + company, a 1-2 sentence specific quote, a rating, and
 * written permission to publish.
 *
 * Example entry:
 * {
 *   quote: 'bookings doubled after the new site went live.',
 *   name: 'full name',
 *   role: 'owner',
 *   company: 'company name',
 *   rating: 5,
 *   photo: '/testimonials/full-name.jpg',
 * },
 */
export const testimonials: Testimonial[] = [];

export interface Service {
  slug: string;
  number: string;
  title: string;
  description: string;
  startingPrice: number;
  currency: string;
  image: string;
  features: string[];
  details: string;
}

export const services: Service[] = [
  {
    slug: "website-development",
    number: "01",
    title: "website development",
    description: "responsive, fast, and built to convert.",
    startingPrice: 200,
    currency: "EUR",
    image: "/images/services/web.png",
    features: [
      "responsive design for all devices",
      "seo optimization & meta tags",
      "performance tuning & core web vitals",
      "analytics integration",
      "content management system",
      "ssl & security setup",
      "domain & hosting configuration",
      "post-launch support",
    ],
    details:
      "we build custom websites from scratch using modern frameworks. every site is optimized for speed, search engines, and conversions. whether you need a landing page or a full business website, we deliver clean code that performs.",
  },
  {
    slug: "mobile-application",
    number: "02",
    title: "mobile application",
    description: "one codebase, native feel, deployed everywhere.",
    startingPrice: 800,
    currency: "EUR",
    image: "/images/services/mobile.png",
    features: [
      "cross-platform (ios & android)",
      "push notifications",
      "offline support",
      "app store deployment",
      "backend & api development",
      "authentication & user management",
      "in-app payments",
      "post-launch maintenance",
    ],
    details:
      "we build cross-platform mobile apps using flutter that feel native on both ios and android. from idea to app store, we handle architecture, design, development, and deployment.",
  },
  {
    slug: "social-media-management",
    number: "03",
    title: "social media management",
    description: "consistent content that grows your presence.",
    startingPrice: 100,
    currency: "EUR/mo",
    image: "/images/services/social_media.png",
    features: [
      "content creation & copywriting",
      "posting schedule & calendar",
      "analytics & monthly reporting",
      "brand voice consistency",
      "community engagement",
      "hashtag & trend research",
      "story & reel creation",
      "competitor analysis",
    ],
    details:
      "we handle your social media so you can focus on your business. from content creation to analytics, we keep your accounts active, on-brand, and growing month after month.",
  },
  {
    slug: "brand-identity",
    number: "04",
    title: "brand identity",
    description: "logo, colors, typography, and guidelines.",
    startingPrice: 100,
    currency: "EUR",
    image: "/images/services/branding.png",
    features: [
      "logo design & variations",
      "color palette definition",
      "typography system",
      "brand guidelines document",
      "business card design",
      "social media templates",
      "letterhead & stationery",
      "file formats for print & digital",
    ],
    details:
      "we create complete visual identity systems that communicate who you are. from logo to guidelines, everything is designed to work together and make your brand recognizable and consistent.",
  },
  {
    slug: "photography",
    number: "05",
    title: "photography",
    description: "professional coverage for any occasion.",
    startingPrice: 100,
    currency: "EUR",
    image: "/images/services/photography.png",
    features: [
      "multi-hour event coverage",
      "quick turnaround delivery",
      "high-resolution edited photos",
      "commercial usage license",
      "online gallery access",
      "print-ready files",
      "candid & posed shots",
      "backup & secure storage",
    ],
    details:
      "we capture authentic moments at corporate events, celebrations, and gatherings. professional equipment, fast editing, and high-resolution delivery so you can relive and share your event.",
  },
  {
    slug: "videography",
    number: "06",
    title: "videography",
    description: "cinematic production from concept to final cut.",
    startingPrice: 100,
    currency: "EUR",
    image: "/images/services/videography.png",
    features: [
      "event & occasion coverage",
      "promotional videos",
      "color grading & post-production",
      "delivery in 4k",
      "drone footage (where permitted)",
      "short-form content for social media",
      "music licensing & sound design",
      "raw footage delivery",
    ],
    details:
      "from events to brand promos, we produce cinematic video content that tells your story. every project goes through professional editing, color grading, and sound design for a polished final product.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

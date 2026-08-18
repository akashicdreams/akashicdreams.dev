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
    title: "creare site-uri",
    description: "rapide, adaptate pe telefon, făcute să aducă clienți.",
    startingPrice: 200,
    currency: "EUR",
    image: "/images/services/web.png",
    features: [
      "design adaptat pentru telefon, tabletă și desktop",
      "optimizare seo și meta tags",
      "viteză de încărcare și core web vitals",
      "integrare google analytics",
      "sistem de administrare a conținutului",
      "certificat ssl și securitate",
      "configurare domeniu și găzduire",
      "suport după lansare",
    ],
    details:
      "construim site-uri de la zero, cu tehnologii moderne. fiecare site este optimizat pentru viteză, google și conversii. fie că ai nevoie de o pagină de prezentare sau de un site complet pentru firmă, primești cod curat care chiar performează.",
  },
  {
    slug: "mobile-application",
    number: "02",
    title: "aplicații mobile",
    description: "o singură aplicație, pe android și ios.",
    startingPrice: 800,
    currency: "EUR",
    image: "/images/services/mobile.png",
    features: [
      "o aplicație pentru ios și android",
      "notificări push",
      "funcționare offline",
      "publicare în app store și google play",
      "backend și api",
      "conturi și autentificare",
      "plăți în aplicație",
      "mentenanță după lansare",
    ],
    details:
      "construim aplicații mobile în flutter, care se simt native atât pe ios cât și pe android. de la idee până la publicarea în magazine, ne ocupăm de arhitectură, design, dezvoltare și lansare.",
  },
  {
    slug: "social-media-management",
    number: "03",
    title: "administrare social media",
    description: "conținut constant, care îți crește prezența.",
    startingPrice: 100,
    currency: "EUR/luna",
    image: "/images/services/social_media.png",
    features: [
      "creare conținut și texte",
      "calendar de postare",
      "raport lunar cu rezultate",
      "ton de comunicare consecvent",
      "interacțiune cu comunitatea",
      "cercetare hashtag-uri și trenduri",
      "story-uri și reels",
      "analiza concurenței",
    ],
    details:
      "ne ocupăm de social media ca tu să te poți concentra pe afacere. de la creare de conținut până la rapoarte, îți ținem conturile active, coerente și în creștere lună de lună.",
  },
  {
    slug: "brand-identity",
    number: "04",
    title: "identitate vizuală",
    description: "logo, culori, tipografie și manual de brand.",
    startingPrice: 100,
    currency: "EUR",
    image: "/images/services/branding.png",
    features: [
      "logo și variante de logo",
      "paletă de culori",
      "sistem tipografic",
      "manual de brand",
      "design carte de vizită",
      "șabloane pentru social media",
      "antet și papetărie",
      "fișiere pentru print și digital",
    ],
    details:
      "creăm identități vizuale complete, care comunică cine ești. de la logo până la manualul de brand, totul este gândit să funcționeze împreună și să facă brandul tău ușor de recunoscut.",
  },
  {
    slug: "photography",
    number: "05",
    title: "fotografie",
    description: "acoperire profesionistă pentru orice ocazie.",
    startingPrice: 100,
    currency: "EUR",
    image: "/images/services/photography.png",
    features: [
      "acoperire eveniment de mai multe ore",
      "livrare rapidă",
      "poze editate la rezoluție mare",
      "drept de folosire comercială",
      "galerie online",
      "fișiere pregătite pentru print",
      "cadre spontane și pozate",
      "backup și stocare sigură",
    ],
    details:
      "surprindem momente autentice la evenimente de firmă, sărbători și întâlniri. echipament profesional, editare rapidă și livrare la rezoluție mare, ca să poți retrăi și împărtăși evenimentul.",
  },
  {
    slug: "videography",
    number: "06",
    title: "videografie",
    description: "producție cinematică, de la concept la montaj final.",
    startingPrice: 100,
    currency: "EUR",
    image: "/images/services/videography.png",
    features: [
      "filmare evenimente",
      "clipuri promoționale",
      "color grading și post-producție",
      "livrare în 4k",
      "filmare cu drona (unde e permis)",
      "clipuri scurte pentru social media",
      "muzică licențiată și sound design",
      "livrare material brut",
    ],
    details:
      "de la evenimente la clipuri de promovare, producem video cinematic care spune povestea ta. fiecare proiect trece prin montaj profesional, color grading și sound design.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

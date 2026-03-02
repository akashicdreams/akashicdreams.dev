import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getPhotoAlbumBySlug, PhotoAlbum } from './photos';
import { getClientBySlug } from './clients';

export interface BasePortfolioItem {
  slug: string;
  title: string;
  clientSlug?: string;
  clientName?: string;
  clientIcon?: string;
  description: string;
  date: string;
  featured?: boolean;
}

export interface WebsiteProject extends BasePortfolioItem {
  type: 'website-development';
  url?: string;
  thumbnail?: string;
  stack?: string[];
}

export interface SocialMediaProject extends BasePortfolioItem {
  type: 'social-media-management';
  platforms: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  embeds: string[];
}

export interface MobileAppProject extends BasePortfolioItem {
  type: 'mobile-application';
  github?: string;
  website?: string;
  thumbnail?: string;
  stack?: string[];
}

export interface VideographyProject extends BasePortfolioItem {
  type: 'videography';
  youtubeUrl: string;
}

export interface PhotographyProject extends BasePortfolioItem {
  type: 'photography';
  albumSlug: string;
  location?: string;
  album?: PhotoAlbum | null;
}

export interface BrandIdentityProject extends BasePortfolioItem {
  type: 'brand-identity';
  images?: string[];
}

export type PortfolioItem =
  | WebsiteProject
  | SocialMediaProject
  | MobileAppProject
  | VideographyProject
  | PhotographyProject
  | BrandIdentityProject;

type ServiceSlug =
  | 'website-development'
  | 'social-media-management'
  | 'mobile-application'
  | 'videography'
  | 'photography'
  | 'brand-identity';

const contentBase = path.join(process.cwd(), 'content', 'portfolio');

function parseMarkdownFiles(serviceSlug: string) {
  const dir = path.join(contentBase, serviceSlug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const filePath = path.join(dir, f);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.md$/, ''), data, content };
    });
}

function resolveClient(data: Record<string, any>) {
  const slug = data.clientSlug as string | undefined;
  if (!slug) return { clientSlug: undefined, clientName: undefined, clientIcon: undefined };

  const client = getClientBySlug(slug);
  return {
    clientSlug: slug,
    clientName: client?.name,
    clientIcon: client?.icon,
  };
}

function buildWebsiteProjects(): WebsiteProject[] {
  return parseMarkdownFiles('website-development').map(({ slug, data, content }) => ({
    type: 'website-development',
    slug,
    title: data.title || slug,
    ...resolveClient(data),
    description: content.trim() || data.summary || '',
    date: data.date || '',
    featured: data.featured ?? false,
    url: data.url,
    thumbnail: data.thumbnail,
    stack: data.stack,
  }));
}

function buildSocialMediaProjects(): SocialMediaProject[] {
  return parseMarkdownFiles('social-media-management').map(({ slug, data, content }) => ({
    type: 'social-media-management',
    slug,
    title: data.title || slug,
    ...resolveClient(data),
    description: content.trim() || data.summary || '',
    date: data.date || '',
    featured: data.featured ?? false,
    platforms: {
      facebook: data.facebook,
      instagram: data.instagram,
      tiktok: data.tiktok,
    },
    embeds: data.embeds || [],
  }));
}

function buildMobileAppProjects(): MobileAppProject[] {
  return parseMarkdownFiles('mobile-application').map(({ slug, data, content }) => ({
    type: 'mobile-application',
    slug,
    title: data.title || slug,
    ...resolveClient(data),
    description: content.trim() || data.summary || '',
    date: data.date || '',
    featured: data.featured ?? false,
    github: data.github,
    website: data.website || data.demo,
    thumbnail: data.thumbnail,
    stack: data.stack,
  }));
}

function buildVideographyProjects(): VideographyProject[] {
  return parseMarkdownFiles('videography').map(({ slug, data, content }) => ({
    type: 'videography',
    slug,
    title: data.title || slug,
    ...resolveClient(data),
    description: content.trim() || data.summary || '',
    date: data.date || '',
    featured: data.featured ?? false,
    youtubeUrl: data.youtubeUrl || '',
  }));
}

function buildPhotographyProjects(): PhotographyProject[] {
  return parseMarkdownFiles('photography').map(({ slug, data, content }) => {
    const albumSlug = data.albumSlug || slug;
    const album = getPhotoAlbumBySlug(albumSlug);
    return {
      type: 'photography',
      slug,
      title: data.title || album?.title || slug,
      ...resolveClient(data),
      description: content.trim() || data.summary || album?.description || '',
      date: data.date || album?.date || '',
      featured: data.featured ?? false,
      albumSlug,
      location: data.location || album?.location,
      album,
    };
  });
}

function buildBrandIdentityProjects(): BrandIdentityProject[] {
  return parseMarkdownFiles('brand-identity').map(({ slug, data, content }) => ({
    type: 'brand-identity',
    slug,
    title: data.title || slug,
    ...resolveClient(data),
    description: content.trim() || data.summary || '',
    date: data.date || '',
    featured: data.featured ?? false,
    images: data.images || [],
  }));
}

const builders: Record<ServiceSlug, () => PortfolioItem[]> = {
  'website-development': buildWebsiteProjects,
  'social-media-management': buildSocialMediaProjects,
  'mobile-application': buildMobileAppProjects,
  'videography': buildVideographyProjects,
  'photography': buildPhotographyProjects,
  'brand-identity': buildBrandIdentityProjects,
};

export function getPortfolioByService(serviceSlug: string): PortfolioItem[] {
  const builder = builders[serviceSlug as ServiceSlug];
  if (!builder) return [];

  try {
    return builder().sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error(`Error loading portfolio for ${serviceSlug}:`, error);
    return [];
  }
}

export function getAllPortfolioItems(): Record<string, PortfolioItem[]> {
  const all: Record<string, PortfolioItem[]> = {};
  for (const slug of Object.keys(builders)) {
    const items = getPortfolioByService(slug);
    if (items.length > 0) {
      all[slug] = items;
    }
  }
  return all;
}

export function getFeaturedPortfolioItems(): Record<string, PortfolioItem[]> {
  const all = getAllPortfolioItems();
  const featured: Record<string, PortfolioItem[]> = {};
  for (const [slug, items] of Object.entries(all)) {
    const feat = items.filter((i) => i.featured);
    featured[slug] = feat.length > 0 ? feat : items.slice(0, 3);
  }
  return featured;
}

export function getPortfolioByClient(clientSlug: string): Record<string, PortfolioItem[]> {
  const all = getAllPortfolioItems();
  const byService: Record<string, PortfolioItem[]> = {};
  for (const [serviceSlug, items] of Object.entries(all)) {
    const clientItems = items.filter((i) => i.clientSlug === clientSlug);
    if (clientItems.length > 0) {
      byService[serviceSlug] = clientItems;
    }
  }
  return byService;
}

export interface ClientWithPortfolio {
  slug: string;
  name: string;
  icon?: string;
  services: { serviceSlug: string; serviceTitle: string; items: PortfolioItem[] }[];
}

export function getAllClientsWithPortfolio(): ClientWithPortfolio[] {
  const all = getAllPortfolioItems();
  const clientMap = new Map<string, { serviceSlug: string; items: PortfolioItem[] }[]>();

  for (const [serviceSlug, items] of Object.entries(all)) {
    for (const item of items) {
      if (!item.clientSlug) continue;
      if (!clientMap.has(item.clientSlug)) {
        clientMap.set(item.clientSlug, []);
      }
      const existing = clientMap.get(item.clientSlug)!.find((e) => e.serviceSlug === serviceSlug);
      if (existing) {
        existing.items.push(item);
      } else {
        clientMap.get(item.clientSlug)!.push({ serviceSlug, items: [item] });
      }
    }
  }

  const serviceNameMap: Record<string, string> = {
    'website-development': 'website development',
    'social-media-management': 'social media management',
    'mobile-application': 'mobile application',
    'videography': 'videography',
    'photography': 'photography',
    'brand-identity': 'brand identity',
  };

  const results: ClientWithPortfolio[] = [];
  for (const [clientSlug, serviceEntries] of clientMap.entries()) {
    const client = getClientBySlug(clientSlug);
    if (!client) continue;
    results.push({
      slug: client.slug,
      name: client.name,
      icon: client.icon,
      services: serviceEntries.map((e) => ({
        serviceSlug: e.serviceSlug,
        serviceTitle: serviceNameMap[e.serviceSlug] || e.serviceSlug.replace(/-/g, ' '),
        items: e.items,
      })),
    });
  }

  return results.sort((a, b) => b.services.length - a.services.length);
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Client {
  slug: string;
  name: string;
  icon?: string;
  /** the client's own site, if we built or maintain one */
  website?: string;
  /** 4:3 showcase image (1024x768) collecting the work done for this client */
  showcase?: string;
}

const clientsDirectory = path.join(process.cwd(), 'content', 'clients');

/** True when a "/foo/bar.png" style path resolves to a real file in public/ */
function publicFileExists(publicPath?: string): boolean {
  if (!publicPath) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', publicPath.replace(/^\//, '')));
  } catch {
    return false;
  }
}

const clientCache = new Map<string, Client | null>();

export function getClientBySlug(slug: string): Client | null {
  if (clientCache.has(slug)) return clientCache.get(slug)!;

  try {
    const filePath = path.join(clientsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      clientCache.set(slug, null);
      return null;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    const client: Client = {
      slug,
      name: data.name || slug.replace(/-/g, ' '),
      icon: data.icon,
      website: data.website,
      // Only expose the showcase once the file actually exists, so a client
      // without artwork yet falls back to the logo tile instead of a broken image
      showcase: publicFileExists(data.showcase) ? data.showcase : undefined,
    };

    clientCache.set(slug, client);
    return client;
  } catch (error) {
    console.error(`Error reading client ${slug}:`, error);
    clientCache.set(slug, null);
    return null;
  }
}

export function getAllClients(): Client[] {
  try {
    if (!fs.existsSync(clientsDirectory)) return [];

    return fs
      .readdirSync(clientsDirectory)
      .filter((f) => f.endsWith('.md'))
      .map((f) => getClientBySlug(f.replace(/\.md$/, '')))
      .filter((c): c is Client => c !== null);
  } catch (error) {
    console.error('Error reading clients:', error);
    return [];
  }
}

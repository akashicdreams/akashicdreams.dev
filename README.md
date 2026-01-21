# Akashic Dreams

Ultra-modern portfolio and IT studio website built with Next.js, TypeScript, and TailwindCSS.

## Features

- 🎨 Monochrome design system (black/white only)
- 🌓 Dark/Light mode with dark as default
- ✨ Spectacular but tasteful animations using Framer Motion
- ♿ Respects prefers-reduced-motion
- 📱 Fully responsive
- 🚀 Static-first for Netlify deployment
- 📝 Filesystem-based content (no database required)

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Theming**: next-themes
- **Content**: Markdown with gray-matter
- **Rendering**: remark + unified

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Management

### Adding Logos

Place your logo files in `/public/brand/`:

- `logo-mark-dark.svg` - Icon-only for dark mode (white/light)
- `logo-mark-light.svg` - Icon-only for light mode (black/dark)
- `logo-type-dark.svg` - Full logo for dark mode (white/light)
- `logo-type-light.svg` - Full logo for light mode (black/dark)

**Format**: SVG preferred, PNG fallback supported.

### Adding Software Projects

Create markdown files in `/content/software/` with frontmatter:

```markdown
---
title: "Project Name"
date: "2026-01-18"
summary: "One sentence project description"
tags: ["web", "automation", "mobile", "ai"]
stack: ["Next.js", "TypeScript", "PostgreSQL"]
thumbnail: "/software/thumbnails/project.jpg"
github: "https://github.com/username/repo"
demo: "https://example.com"  # optional
---

Extended project description in markdown...
```

### Adding Blog Posts

Create markdown files in `/content/blog/` with frontmatter:

```markdown
---
title: "Post Title"
date: "2026-01-18"
tags: ["software", "design", "thinking"]
summary: "Brief post summary"
---

Post content in markdown...
```

### Adding Photo Albums

1. Create a folder in `/public/photos/[album-name]/`
2. Add your images (JPG, PNG, WebP)
3. Optionally add a `cover.jpg` for the album cover
4. Optionally create `_meta.json`:

```json
{
  "title": "Album Title",
  "date": "2026-01-18",
  "location": "City, Country",
  "description": "Album description",
  "cover": "cover.jpg"
}
```

If `_meta.json` is missing, the folder name becomes the title.

## Project Structure

```
akashicdreams.dev/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── software/          # Software projects page
│   ├── photos/            # Photo albums pages
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── navigation.tsx     # Navigation bar
│   ├── footer.tsx         # Footer
│   ├── home/              # Home page components
│   ├── software/          # Software components
│   ├── photos/            # Photo components
│   ├── blog/              # Blog components
│   └── contact/           # Contact components
├── lib/                   # Utilities
│   ├── software.ts        # Software projects parser
│   ├── blog.ts            # Blog posts parser
│   ├── photos.ts          # Photo albums parser
│   └── markdown.ts        # Markdown renderer
├── content/               # Content files
│   ├── software/          # Software project markdown
│   └── blog/              # Blog post markdown
├── public/                # Static assets
│   ├── brand/             # Logo files
│   └── photos/            # Photo album folders
└── app/globals.css        # Global styles & theme
```

## Deployment to Netlify

### Option 1: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

### Configuration

Create `netlify.toml` in the project root (optional):

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Customization

### Colors

Edit color variables in `app/globals.css`:

```css
:root {
  --bg: oklch(0% 0 0);      /* Background */
  --fg: oklch(100% 0 0);    /* Foreground */
  --muted: oklch(40% 0 0);  /* Muted text */
  --border: oklch(20% 0 0); /* Borders */
}
```

### Typography

The site uses Rajdhani (400, 700). To change fonts, edit `app/layout.tsx`.

### Animations

All animations use Framer Motion and respect `prefers-reduced-motion`. Adjust animation configs in component files.

## Features Overview

### Home Page
- Full-viewport hero with breathing logo animation
- Parallax mouse effects
- Toggle between latest 3 software projects and photo albums
- Philosophy/about section

### Software Page
- Filterable grid by tags
- Project cards with thumbnails, tech stack
- Links to GitHub and live demos

### Photos Page
- Album grid with grayscale images
- Hover caption reveal with slide-up animation
- Album detail page with masonry layout
- Lightbox viewer with keyboard navigation (←/→/Esc)

### Blog
- Post list with client-side search
- Tag filtering
- Reading progress bar on post pages
- Clean typography optimized for reading

### Contact
- Simple contact form with mailto integration
- Contact information and social links

## License

[Your License Here]

## Contact

- Email: admin@akashicdreams.dev
- Phone: +40 741 963 166
- LinkedIn: [akashic-dreams](https://www.linkedin.com/company/akashic-dreams/)
- Instagram: [@akashicdreams.dev](https://www.instagram.com/akashicdreams.dev/)
- Facebook: [Profile](https://www.facebook.com/profile.php?id=61586506872768)

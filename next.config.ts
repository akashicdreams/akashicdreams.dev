import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  outputFileTracingExcludes: {
    '*': [
      'public/albums/**/*',
      './public/albums/**/*',
    ],
  },
  async redirects() {
    return [
      {
        source: '/software',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/photos',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/photos/:slug',
        destination: '/services/photography',
        permanent: true,
      },
      {
        source: '/services/event-photography',
        destination: '/services/photography',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

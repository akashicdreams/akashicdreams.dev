import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        destination: '/services/event-photography',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

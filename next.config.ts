import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': [
      'public/photos/**/*',
      './public/photos/**/*',
    ],
  },
};

export default nextConfig;

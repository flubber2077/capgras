import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        destination: '/volumes/1/:slug',
        permanent: true,
        source: '/volume-1/:slug',
      },
    ];
  },
  transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;

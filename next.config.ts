import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        destination: '/volumes/1/:slug',
        permanent: true,
        source: '/volume-1/:slug',
      },
      {
        destination: '/feed.xml',
        permanent: true,
        source: '/feed',
      },
    ];
  },
  transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ruzgfryrwudsjvhqragj.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

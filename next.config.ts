import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;

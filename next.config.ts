import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "www.movienewz.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/series",
        destination: "/shows",
        permanent: true,
      },
      {
        source: "/tv/:id",
        destination: "/show/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

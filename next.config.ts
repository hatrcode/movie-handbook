import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
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

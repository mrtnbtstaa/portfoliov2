import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Add your Supabase Storage hostname here once you're serving real
      // project images from it, e.g. "xxxxx.supabase.co".
    ],
  },
};

export default nextConfig;

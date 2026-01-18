import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // Enable static export
  trailingSlash: true,        // Add trailing slashes for static hosting
  images: {
    unoptimized: true,        // Required for static export
  },
};

export default nextConfig;

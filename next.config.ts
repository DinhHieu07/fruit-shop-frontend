import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bizweb.dktcdn.net",
      },
      {
        protocol: "https",
        hostname: "afamilycdn.com",
      },
      {
        protocol: "https",
        hostname: "icdn.dantri.com.vn",
      },
    ],
  },
};

export default nextConfig;

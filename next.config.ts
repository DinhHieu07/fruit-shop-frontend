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
      {
        protocol: "https",
        hostname: "cdn.tienphong.vn",
      },
      {
        protocol: "https",
        hostname: "product.hstatic.net",
      }
    ],
  },
};

export default nextConfig;

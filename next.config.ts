import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  allowedDevOrigins: ["192.168.56.1"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://smart-returns.huma-volve.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;

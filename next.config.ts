import type { NextConfig } from "next";

const BACKEND_URL = process.env.API;

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL is not set. Add it to .env.local");
}

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  allowedDevOrigins:
    process.env.DEV_ORIGINS?.split(",").map((o) => o.trim()) ?? [],
  async rewrites() {
    return [
      {
        // "/backend/*" -> real server; "/api/auth/*" is left for NextAuth
        source: "/backend/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

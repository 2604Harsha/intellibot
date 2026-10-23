import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse"],
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;

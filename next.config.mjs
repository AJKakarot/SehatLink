/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
    nodeMiddleware: true,            // ✅ enable Node.js runtime for middleware
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // optional, stops ESLint breaking Vercel builds
  },
};

export default nextConfig;

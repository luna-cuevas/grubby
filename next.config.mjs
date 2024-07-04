/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bypassai.ai",
      },
    ],
  },
};

export default nextConfig;

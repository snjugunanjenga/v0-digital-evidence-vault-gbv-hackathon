/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "stunning-journey-64wrp9xvq4r3x546-3000.app.github.dev"
      ],
    },
  },
}

export default nextConfig

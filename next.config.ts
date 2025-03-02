import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'api-images-getimg.b74c4cef8e39fc0d1de2c7604852a487.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}
export default nextConfig

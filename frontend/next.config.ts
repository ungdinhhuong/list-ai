import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ontoolaz.com',
      },
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },

  compress: true,
  reactStrictMode: true,

  compiler: {
    // Tùy chọn thêm cho production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  transpilePackages: [], // nếu có
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)

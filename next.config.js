// next.config.mjs
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(process.cwd(), 'src'),
    }
    return config
  }
}

export default nextConfig
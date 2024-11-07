import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        // pathname: '/account123/**',
      },
    ],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig)

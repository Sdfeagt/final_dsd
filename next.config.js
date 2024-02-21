/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
      ],
      disableStaticImages: true,
    },
  }

module.exports = nextConfig

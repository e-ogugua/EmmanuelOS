import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'images.pexels.com',
      'images.unsplash.com'
    ],
  },
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@firebase/app': require.resolve('firebase/app'),
      '@firebase/auth': require.resolve('firebase/auth'),
    }
    return config
  }
};

export default nextConfig;

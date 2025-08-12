/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'picsum.photos', 'placehold.co'],
  },
};

export default nextConfig;

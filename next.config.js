/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com','media.istockphoto.com'], // Add your allowed image domains here
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com', 'youtube.com'], // دامنه‌های مجاز برای تصاویر و ویدیوها
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
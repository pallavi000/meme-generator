/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.memegen.link"],
    allowFutureImage: true,
  },
};

module.exports = nextConfig;

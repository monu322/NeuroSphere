const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://firebasestorage.googleapis.com"],
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/css")],
  },
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;

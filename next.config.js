const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/css")],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home1',
        permanent: true
      },
    ]
  },
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
}


module.exports = nextConfig

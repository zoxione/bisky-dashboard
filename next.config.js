/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 100000,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/overview",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    APP_URL: process.env.APP_URL,
    GITHUB_ACCESSTOKEN: process.env.GITHUB_ACCESSTOKEN,
    GITHUB_UPDATEANIME_URL: process.env.GITHUB_UPDATEANIME_URL,
  },
}

module.exports = nextConfig

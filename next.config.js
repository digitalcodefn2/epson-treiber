/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.driversidn.com"
      },
      {
        protocol:"http",
        hostname:"localhost:1337"
      }
    ]
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  "presets": [ "next/babel" ],
  async rewrites() {
    return [
      {
        source: '/:prefix*/server/:path*',
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + '/:path*' // Proxy to Backend
      }
    ]
  }
};

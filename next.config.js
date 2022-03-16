/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  "presets": [ "next/babel" ],
  async rewrites() {
    return [
      {
        source: '/:prefix*/server/:path*',
        destination: 'http://localhost:3000/:path*' // Proxy to Backend
      }
    ]
  }
};

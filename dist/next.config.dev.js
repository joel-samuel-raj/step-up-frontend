"use strict";

/** @type {import('next').NextConfig} */
module.exports = {
  // swcMinify: true,
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL
  },
  headers: function headers() {
    return regeneratorRuntime.async(function headers$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", [{
              source: "/(.*)",
              headers: [{
                key: "Access-Control-Allow-Credentials",
                value: "true"
              }, {
                key: "Access-Control-Allow-Origin",
                value: "https://stepup-quizapp.vercel.app/"
              }, {
                key: "Access-Control-Allow-Methods",
                value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
              }, {
                key: "Access-Control-Allow-Headers",
                value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
              }]
            }]);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  "presets": ["next/babel"],
  rewrites: function rewrites() {
    return regeneratorRuntime.async(function rewrites$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", [{
              source: '/:prefix*/server/:path*',
              destination: process.env.NEXT_PUBLIC_BACKEND_URL + '/:path*' // Proxy to Backend

            }]);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
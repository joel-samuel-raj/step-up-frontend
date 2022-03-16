"use strict";

module.exports = {
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#e60019",
        secondary: "#181818"
      },
      textColor: {
        secondary: "#e60019"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
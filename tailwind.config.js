module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#651cb1",
        secondary: "#c725c7",
        purple_heart : {
          50: "#f7f4fb",
          100: "#f0e8f7",
          200: "#d9c6ec",
          300: "#c1a4e0",
          400: "#9360c8",
          500: "#651cb1",
          600: "#5b199f",
          700: "#4c1585",
          800: "#3d116a",
          900: "#310e57",
        },
      },
      textColor: {
        secondary: "#e60019",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

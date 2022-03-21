module.exports = {
  purge: false,
  darkMode: "class", // or 'media' or 'class'
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
        violet_eggplant: {
          '50': '#fcf4fc', 
          '100': '#f9e9f9', 
          '200': '#f1c9f1', 
          '300': '#e9a8e9', 
          '400': '#d866d8', 
          '500': '#c725c7', 
          '600': '#b321b3', 
          '700': '#951c95', 
          '800': '#771677', 
          '900': '#621262'
        }
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

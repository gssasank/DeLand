module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "back-light": "#383838",
        "back-med": "#1E1E1E",
        "back-dark": "#121212",
        "primary-dark": "#3D0000",
        "primary-light": "#EF4444",
        "primary-med": "#B91C1C",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

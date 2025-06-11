/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        red: "#FC4747",
        gray: "#9d9ea1",
        darkBlue: "#10141E",
        greyishBlue: "#5A698F",
        semiDarkBlue: "#161D2F",
        pureWhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

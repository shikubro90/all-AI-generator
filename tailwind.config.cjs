/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Rubik Mono One", "sans-serif"],
        body: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        primary: "#332FD0",
        secondary: "#F3F2FF",
      },
      screens: {
        "lg": "1280px",
      },
    },
  },
  plugins: [],
}
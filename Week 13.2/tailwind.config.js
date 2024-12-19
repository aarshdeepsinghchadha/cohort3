/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        88: "22rem",
      },
      colors: {
        blue: {
          800: "#6cd5c8",
          900: "#04122C",
          200: "#8094ad",
          300: "#758a9e",
          500: "#19406a",
          600: "#33bfb8",
          700: "#002b5b",
        },
        green: {
          400: "#36c6c0",
        },
      },
    },
  },
  plugins: []

};

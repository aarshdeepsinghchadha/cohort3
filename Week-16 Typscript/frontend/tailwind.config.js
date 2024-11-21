/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#e0e7fe",
          500: "#7c3aed",
          600: "#5b21b6",
        },
      },
    },
  },
  plugins: [],
};

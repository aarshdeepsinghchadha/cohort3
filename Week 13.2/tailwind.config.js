/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '88': '22rem',
      },
      colors: {
        blue: {
          500: "#6cd5c8", 
          900:"#04122C"
        },
      },
    },
  },
  plugins: [],
};

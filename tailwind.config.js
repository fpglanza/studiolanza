/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#33cfb5",
        primaryDark: "#279c88",
        headingColor: "#081e21",
        smallTextColor: "#193256"
      }
    },
  },
  plugins: [],
}


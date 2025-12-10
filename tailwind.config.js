/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'leetcode-green': '#00b8a3',
        'leetcode-yellow': '#ffc107',
        'leetcode-red': '#ff5252',
        'leetcode-dark': '#1a1a1a',
        'leetcode-light': '#f5f5f5',
      }
    },
  },
  plugins: [],
}
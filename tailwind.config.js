/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',// allows us to toggle dark mode by adding a 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#ffffff', // white
          text: '#000000', // black
        },
        secondary: {
          bg: '#000000', // black
          text: '#ffffff', // white
        },
        accent: '#3b82f6', // blue-500
      },
    },
  },
  plugins: [],
}

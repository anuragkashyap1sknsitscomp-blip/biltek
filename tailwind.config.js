/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Ye line na hone se CSS apply nahi hoti
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
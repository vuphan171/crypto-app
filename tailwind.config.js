/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      '6': '24px',
      '7': '28px',
      '9': '36px',
      '10': '40px'
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ms-gray': 'rgb(192,192,192)',
      },
      spacing: {
        'ms-22': '1.375rem',
        'ms-24': '1.5rem',
        'ms-l-40': '12rem'
      },
    },
  },
  plugins: [],
}

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
        'ms-22': '0.935rem', // 1.375ren
        'ms-24': '1.02rem', // 1.5rem
        'ms-field-size': '20rem', //29.4rem
        'ms-panel': '2.721rem', // 4rem
      },
    },
  },
  plugins: [],
}

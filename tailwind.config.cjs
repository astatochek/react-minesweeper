/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ms-gray": "rgb(192,192,192)",
      },
      spacing: {
        "ms-22": "0.91rem",
        "ms-24": "1.0rem",
        "ms-panel": "2.721rem",
        "ms-counter": "2.126rem",
        "ms-number": "2.16rem",
        "ms-cell": "1.25rem",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

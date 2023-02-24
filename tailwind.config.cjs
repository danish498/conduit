/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'titillium-web': ['Titillium Web', 'sans-serif'],
        titillium: ['Titillium Web', 'sans-serif'],
      },
      colors: {
        'true-green': '#5CB85C',
        'true-black': '#333',
      },
    },
  },
  plugins: [],
};

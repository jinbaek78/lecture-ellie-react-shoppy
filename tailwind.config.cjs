/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4abad9',
      },
      backgroundImage: {
        banner: "url('./public/images/clothes.jpeg')",
      },
    },
  },
  plugins: [],
};

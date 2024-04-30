/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#374985',
        'custom-red': '#DB4A2B',
        'custom-green': '#6CB694',
        'custom-yellow': '#F8D040',
        'custom-pink': '#FAA1AE',
        'custom-lightblue': '#7FB6F2',
      },
      fontFamily: {
        ultra: ['Ultra'],
        worksans: ['Work Sans', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        custom: '6px 6px 0px #000000',
        custom_login: '4px 4px 0px #000000',
        custom_active: '1px 1px 0px #000000',
      },
      translate: {
        2: '2px',
      },
    },
    plugins: [require('@headlessui/tailwindcss')],
  },
};

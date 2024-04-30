/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#374985',
      },
      fontFamily: {
        ultra: ['Ultra'],
        worksans: ['Work Sans', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        custom: '6px 6px 0px #000000',
        custom_active: '1px 1px 0px #000000',
      },
      translate: {
        2: '2px',
      },
    },
    plugins: [require('@headlessui/tailwindcss')],
  },
};

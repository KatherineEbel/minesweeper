const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      slate: colors.slate,
      gray: colors.gray,
      white: colors.white,
      emerald: colors.emerald,
      sky: colors.sky,
      rose: colors.rose,
    },
    extend: {
      dropShadow: {
        counter: '0 4px 3px #e11d48',
      },
    },
  },
  plugins: [],
}
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'mine': './assets/icons8-naval-min-50.png'
      },
      colors: {
        amber: colors.amber,
        slate: colors.slate,
        gray: colors.gray,
        white: colors.white,
        emerald: colors.emerald,
        sky: colors.sky,
        rose: colors.rose,
      },
      dropShadow: {
        counter: '0 4px 3px #e11d48',
      },
      fontFamily: {
        'display': ['"Press Start 2P"']
      }
    },
  },
  plugins: [],
}

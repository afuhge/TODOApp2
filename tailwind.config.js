const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        rose: colors.rose,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  purge: ['./app/**/*.tsx', './app/**/*.jsx', './app/**/*.js', './app/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
    colors: {
      yellow: '#F9AC00',
      red: '#FE4A49',
      green: '#61E786',
      blue: '#7EB2DD',
      black: '#342E37',
      white: '#FFFFFF',
      'dark-grey': '#50514F',
      'light-grey': '#CCCDCB',
    },
  },
  variants: {},
  plugins: [],
};

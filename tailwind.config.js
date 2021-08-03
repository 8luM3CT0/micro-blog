module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'twitter-bg': 'url(https://pbs.twimg.com/media/DFCnD0zXkAE2A-D.jpg)'
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar-hide')]
}

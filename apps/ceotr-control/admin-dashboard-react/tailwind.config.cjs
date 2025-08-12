/**** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0b1f3a',
          silver: '#c0c0c0',
          gold: '#d4af37'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia']
      },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: []
}

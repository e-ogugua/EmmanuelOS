/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'
  ],
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
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
}

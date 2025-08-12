import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0ea5a3',
          secondary: '#f59e0b',
          accent: '#7c3aed',
          ink: '#0b132b',
          soft: '#f8fafc'
        }
      }
    },
  },
  plugins: [],
} satisfies Config

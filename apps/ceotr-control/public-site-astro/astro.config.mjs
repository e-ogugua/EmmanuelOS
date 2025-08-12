import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://ceotr.example.com',
  integrations: [tailwind({ applyBaseStyles: true })],
  srcDir: 'src',
  output: 'static'
})

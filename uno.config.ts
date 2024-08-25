import { defineConfig } from 'unocss'
import { presetUno } from '@unocss/preset-uno'

export default defineConfig({
  presets: [presetUno()],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
})

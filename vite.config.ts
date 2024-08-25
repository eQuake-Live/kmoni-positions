import { defineConfig } from 'vite'
import uno from 'unocss/vite'
import * as fs from 'node:fs/promises'

export default defineConfig({
  server: {
    proxy: {
      '/kmoni': {
        target: 'http://www.kmoni.bosai.go.jp',
        rewrite: (p) => p.slice(6),
      },
    },
  },
  plugins: [
    uno(),
    {
      name: 'plugin-save-json',
      configureServer(server) {
        server.middlewares.use('/save', async (req, res) => {
          let text = ''
          req.addListener('data', (chunk) => {
            text += chunk.toString()
          })
          req.on('end', async () => {
            await fs.writeFile('positions.json', text)

            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('OK')
          })
        })
        server.middlewares.use('/get', async (req, res) => {
          const text = await fs.readFile('positions.json')
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(text)
          return
        })
      },
    },
  ],
})

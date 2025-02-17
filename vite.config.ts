import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root:'./src/pages/html',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/html/index.html'),
        getStart: resolve(__dirname, 'src/pages/html/get-start.html'),
        play: resolve(__dirname, 'src/pages/html/play.html'),
      },
    },
  },
})
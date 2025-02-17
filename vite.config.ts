import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: '/src/pages/html/index.html',
        getStart: '/src/pages/html/get-start.html',
        play: '/src/pages/html/play.html',
      },
      output: {
        dir: '../dist'
      },
    },
  },
})

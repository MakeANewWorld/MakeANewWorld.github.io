import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  root: '/src/pages/html/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        getStart: 'get-start.html',
        play: 'play.html',
      },
    },
  },
})

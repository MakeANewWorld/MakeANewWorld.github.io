import { defineConfig } from "vite";
import { resolve } from "path";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/pages/html",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/html/index.html'),
        getStart: resolve(__dirname, 'src/pages/html/get-start.html'),
        play: resolve(__dirname, 'src/pages/html/play.html'),
      },
    },
  },
});
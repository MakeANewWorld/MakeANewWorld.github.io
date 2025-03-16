import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginBundleObfuscator({
      autoExcludeNodeModules: true,
      threadPool: true,
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        main: 'index.html',
        getStart: 'get-start.html',
        play: 'play.html',
        about: 'about.html',
        user: 'user.html',
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
  },
})

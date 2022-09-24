import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 4545,
    cors: true,
    proxy: {
          '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
    }
  }
})

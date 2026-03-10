import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@kilimarkets/domain': fileURLToPath(new URL('../../packages/domain/src', import.meta.url)),
      '@kilimarkets/sdk-injective': fileURLToPath(
        new URL('../../packages/sdk-injective/src', import.meta.url),
      ),
      '@kilimarkets/ui': fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})

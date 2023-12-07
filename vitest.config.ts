import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    environment: 'jsdom',
  },
})

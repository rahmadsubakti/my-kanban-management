import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'components': `${path.resolve(__dirname, './src/components/')}`,
      'forms': `${path.resolve(__dirname, './src/forms/')}`,
      'utils': `${path.resolve(__dirname, './src/utils/')}`,
    },
  }
})

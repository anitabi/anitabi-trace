import { defineConfig } from 'vite'

import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
import Font from 'vite-plugin-font';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(), 
    tailwindcss(), 
    Font.vite({
    scanFiles: ['src/**/*.{vue,ts,tsx,js,jsx}']
    }),
    mockDevServerPlugin({
      prefix: '/api',
      reload: true,
      include: ['mock/*.{js,ts}'],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  }
})

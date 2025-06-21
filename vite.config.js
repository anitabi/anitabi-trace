import { defineConfig } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
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
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      watchFiles: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  }
})

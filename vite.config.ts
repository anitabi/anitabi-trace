import { defineConfig, type PluginOption } from 'vite'

import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';
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
    }),
    visualizer({
      emitFile: !!process.env.BUNDLE_ANALYZE,
    }) as PluginOption
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  }
})

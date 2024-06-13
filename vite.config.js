import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base : '/',
	outDir: 'dist',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    server: {
        open: true,
        // host: 'localhost',
        port: 5173,
        // proxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1:8888',
        //         changeOrigin: true,
        //         rewrite: path => path.replace('^/api', '')
        //     }
        // }
    },
	plugins: [svelte()]
})

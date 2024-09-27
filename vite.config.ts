import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import { join } from 'path'
import viteCompression from 'vite-plugin-compression'

const config = loadEnv('development', './')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression(),
    viteEslint({
      failOnError: false,
      exclude: ['/virtual:/', 'node_modules/**']
    })
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      // 跨域处理
      '/v1': {
        target: config.VITE_APP_SERVER_HOST,
        changeOrigin: true
      }
    }
  },
  build: {
    minify: process.env.NODE_ENV !== 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          lodash: ['lodash'],
          tdesign: ['tdesign']
        }
      }
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': join(__dirname, 'src')
    }
  }
})

import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// Unocss
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
const variablesPath = fileURLToPath(
  new URL('./src/styles/variables.scss', import.meta.url),
).replace(/\\/g, '/')

export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 在每个 scss 文件顶部注入全局变量（使用绝对路径以避免别名在 preprocess 阶段无法解析）
        additionalData: `@use "${variablesPath}" as *;`,
      },
    },
  },
})

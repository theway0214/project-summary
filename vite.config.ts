import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
  ],
      // 开发或生产环境服务的公共基础路径
      base: './',
      // 开发服务器配置
      server: {
        host: true, // 监听所有地址
        port: 3005, // 服务端口
        open: true, // 自动打开浏览器
        cors: true, // 启用 CORS
        // 代理配置
        proxy: {
          // '/two-energy-management': {
          //   // target: 'http://127.0.0.1',
          //   target: viteEnv.VITE_API_URL || 'http://192.168.0.10',
          //   changeOrigin: true,
          //   // rewrite: (path) => path.replace(/^\/two-energy-management/, ''),
          //   secure: false, // 禁用 SSL 证书验证
          // },
        },
      },
      // 解析配置
    resolve: {
      // 路径别名配置
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@interface': fileURLToPath(new URL('./src/interface', import.meta.url)),
        '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      },
      // 导入时可以省略的扩展名
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json',],
    },
})


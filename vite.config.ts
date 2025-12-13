import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import { cwd } from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, cwd(), '')
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'

  return {
    plugins: [
      react(),
      // UnoCSS 插件（必须在其他插件之后，确保虚拟模块正确解析）
      UnoCSS(),
    ],
    // 开发或生产环境服务的公共基础路径
    base: env.VITE_APP_BASE_URL || './',
    
    // 开发服务器配置（仅开发环境）
    server: isDevelopment
      ? {
          host: true, // 监听所有地址
          port: Number(env.VITE_PORT) || 3005, // 服务端口
          open: true, // 自动打开浏览器
          cors: true, // 启用 CORS
          // 热更新配置
          hmr: {
            overlay: true, // 显示错误覆盖层
          },
          // 代理配置
          proxy: {
            // '/api': {
            //   target: env.VITE_API_URL || 'http://localhost:3000',
            //   changeOrigin: true,
            //   rewrite: (path) => path.replace(/^\/api/, ''),
            // },
          },
        }
      : undefined,

    // 构建配置（仅生产环境）
    build: isProduction
      ? {
          // 输出目录
          outDir: 'dist',
          // 生成 source map（生产环境可以关闭以提高性能）
          sourcemap: false,
          // 最小化混淆（使用 esbuild，更快）
          minify: 'esbuild',
          // 如果需要使用 terser，需要安装 terser: npm install -D terser
          // minify: 'terser',
          // terserOptions: {
          //   compress: {
          //     drop_console: true,
          //     drop_debugger: true,
          //   },
          // },
          // 构建后是否生成 gzip 报告
          reportCompressedSize: false,
          // chunk 大小警告的限制
          chunkSizeWarningLimit: 1000,
          // 代码分割配置
          rollupOptions: {
            output: {
              // 手动分包
              manualChunks: {
                // 将 React 相关库打包到一个 chunk
                'react-vendor': ['react', 'react-dom', 'react-router'],
                // 将 Ant Design 相关库打包到一个 chunk
                'antd-vendor': ['antd', '@ant-design/icons'],
                // 将 ECharts 打包到一个 chunk
                'echarts-vendor': ['echarts'],
              },
              // chunk 文件命名
              chunkFileNames: 'js/[name]-[hash].js',
              entryFileNames: 'js/[name]-[hash].js',
              assetFileNames: (assetInfo) => {
                const info = assetInfo.name?.split('.') || []
                const ext = info[info.length - 1]
                if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                  return `images/[name]-[hash][extname]`
                }
                if (/woff2?|eot|ttf|otf/i.test(ext)) {
                  return `fonts/[name]-[hash][extname]`
                }
                return `assets/[name]-[hash][extname]`
              },
            },
          },
          // 启用/禁用 CSS 代码拆分
          cssCodeSplit: true,
          // 移除 cssMinify，让 UnoCSS 自己处理 CSS（避免与 UnoCSS 冲突）
          // cssMinify: 'esbuild',
        }
      : undefined,

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
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },

    // 定义全局常量
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
    },
  }
})


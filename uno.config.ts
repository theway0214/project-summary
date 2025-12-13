import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  // 预设
  presets: [
    presetUno(), // 默认预设
    presetAttributify(), // 属性化模式
    presetIcons({
      // 图标预设
      scale: 1.2,
      warn: true,
    }),
  ],
  // 内容扫描
  content: {
    filesystem: [
      'index.html',
      'src/**/*.{js,ts,jsx,tsx,vue}',
    ],
  },
  // 主题配置
  theme: {
    colors: {
      primary: '#1890ff',
    },
  },
  // 快捷方式
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
  },
})


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import 'antd/dist/reset.css'
import 'virtual:uno.css'
import './index.css'
/* 使用相对路径引入全局样式，CSS 中不支持 @ 这种别名写法 */
import '@/assets/styles/main.css';
import router from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)


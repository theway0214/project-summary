import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { HomeOutlined, BarChartOutlined } from '@ant-design/icons'
import App from '../App'

// 懒加载组件
const Home = lazy(() => import('../view/home'))
const BarChart = lazy(() => import('../view/barChart'))

// 路由菜单配置类型
export interface RouteMenuConfig {
  path: string
  label: string
  icon?: React.ReactNode
  component: React.LazyExoticComponent<React.ComponentType<any>>
  showInMenu?: boolean
  children?: RouteMenuConfig[]
}

// 路由菜单配置
export const routeMenuConfig: RouteMenuConfig[] = [
  {
    path: '/home',
    label: '首页',
    icon: <HomeOutlined />,
    component: Home,
    showInMenu: true,
  },
  {
    path: '/bar-chart',
    label: '图表',
    icon: <BarChartOutlined />,
    component: BarChart,
    showInMenu: true,
  },
]

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      ...routeMenuConfig.map((config) => {
        const Component = config.component
        return {
          path: config.path.replace('/', ''),
          element: <Component />,
        }
      }),
    ],
  },
])

export default router

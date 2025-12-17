import { lazy, type ReactNode, type LazyExoticComponent, type ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { HomeOutlined, BarChartOutlined } from '@ant-design/icons'
import App from '../App'

// 懒加载组件
const Home = lazy(() => import('../view/home'))
const BarChart = lazy(() => import('../view/barChart'))
const LineChart = lazy(() => import('../view/lineChart'))

// 路由菜单配置类型
export interface RouteMenuConfig {
  path: string
  label: string
  icon?: ReactNode
  component: LazyExoticComponent<ComponentType<unknown>>

  
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
    label: '柱状图',
    icon: <BarChartOutlined />,
    component: BarChart,
    showInMenu: true,
  },
  {
    path: '/line-chart',
    label: '折线图',
    icon: <BarChartOutlined />,
    component: LineChart,
    showInMenu: true,
  },
  {
    path:'/map-chart',
    label:'地图',
    icon:<BarChartOutlined />,
    component:lazy(()=>import('../view/mapChart/index')),
    showInMenu:true
  },
  {
    path:'/pie-chart',
    label:'饼图',
    icon:<BarChartOutlined />,
    component:lazy(()=>import('../view/pieChart/index')),
    showInMenu:true
  },{
    path:'/pc-component-demo',
    label:'PC组件示例',
    icon:<BarChartOutlined />,
    component:lazy(()=>import('../view/pcComponentDemo/index')),
    showInMenu:true
  }
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

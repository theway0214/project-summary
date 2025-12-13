import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Layout, Menu, type MenuProps } from 'antd'
import { routeMenuConfig, type RouteMenuConfig } from '../router'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

// 将路由配置转换为菜单项
function convertRouteToMenuItem(config: RouteMenuConfig): MenuItem {
  return {
    key: config.path,
    icon: config.icon,
    label: config.label,
    children: config.children?.map(convertRouteToMenuItem),
  }
}

const MenuBar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 从路由配置中生成菜单项（只显示 showInMenu 为 true 的）
  const menuItems: MenuItem[] = useMemo(() => {
    return routeMenuConfig
      .filter((config) => config.showInMenu !== false)
      .map(convertRouteToMenuItem)
  }, [])

  // 根据当前路径设置选中的菜单项
  useEffect(() => {
    const currentPath = location.pathname
    
    // 根路径默认选中首页
    if (currentPath === '/') {
      setSelectedKeys(['/home'])
      return
    }

    // 查找匹配的路由配置
    const matchedConfig = routeMenuConfig.find((config) => currentPath === config.path)
    
    if (matchedConfig) {
      setSelectedKeys([matchedConfig.path])
    }
  }, [location.pathname])

  const onSelect = (info: { key: string }) => {
    setSelectedKeys([info.key])
    navigate(info.key as string)
  }

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  return (
    <Sider
      width={256}
      style={{
        background: '#fff',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #f0f0f0',
          background: '#fff',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1890ff' }}>
          XYQ记录
        </h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        items={menuItems}
        style={{
          height: 'calc(100vh - 64px)',
          borderRight: 0,
          paddingTop: '8px',
        }}
        theme="light"
      />
    </Sider>
  )
}

export default MenuBar

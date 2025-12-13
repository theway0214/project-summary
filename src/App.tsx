import { Suspense } from 'react'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router'
import MenuBar from './components/MenuBar'
import './App.css'

const { Content } = Layout

// 加载中组件
const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    }}
  >
    <Spin size="large" tip="加载中..." />
  </div>
)

function App() {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <MenuBar />
      <Layout style={{ marginLeft: 256 }}>
        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div className="content-wrapper">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App


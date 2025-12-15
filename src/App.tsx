import { Suspense } from 'react'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router'
import MenuBar from './components/MenuBar'
import AiAgent from './components/AiAgent'
import './App.css'

const { Content } = Layout

// 加载中组件
const Loading = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    }}
  >
    <Spin size="large" />
    <span style={{ marginTop: '12px', color: 'rgba(0, 0, 0, 0.65)' }}>加载中...</span>
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
      <AiAgent />
    </Layout>
  )
}

export default App


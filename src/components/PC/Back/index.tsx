/**
 * PC 端返回按钮组件（React 版）
 * 显示在一个卡片中，点击返回上一页
 */
import type { ReactNode } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { Typography } from 'antd'
import PCCard from '../Card'

const { Text } = Typography

export interface BackProps {
  /** 文本内容，默认为“返回” */
  text?: ReactNode
}

function Back({ text = '返回' }: BackProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <PCCard className="mb-2">
      <div className="flex items-center text-[16px] text-[#0081FF]">
        <span className="cursor-pointer" onClick={handleBack}>
          <LeftOutlined style={{ marginRight: 8 }} />
          <Text style={{ color: '#0081FF' }}>{text}</Text>
        </span>
      </div>
    </PCCard>
  )
}

export default Back



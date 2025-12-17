/**
 * PC 端通用 Card 组件（React 版）
 * 基于 antd 的 Card，统一外观样式
 */
import type { ReactNode } from 'react'
import { Card as AntCard } from 'antd'
import './index.css'

export interface PCCardProps {
  /** 标题文本 */
  title?: ReactNode
  /** 加载状态 */
  loading?: boolean
  /** 头部自定义内容（等价于 Vue 版的 title slot） */
  headerSlot?: ReactNode
  children?: ReactNode
  className?: string
}

function PCCard({ title, loading = false, headerSlot, children, className }: PCCardProps) {
  return (
    <AntCard
      loading={loading}
      title={headerSlot ?? title}
      className={['pc-card', className].filter(Boolean).join(' ')}
    >
      <div className="pc-card-body-box">
        {children}
      </div>
    </AntCard>
  )
}

export default PCCard



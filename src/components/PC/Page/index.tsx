/**
 * PC 端页面容器组件（React 版）
 * 提供统一的背景色与内边距
 */
import type { ReactNode, CSSProperties } from 'react'

export interface PageProps {
  bodyClassName?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function Page({ bodyClassName = '', className = '', style, children }: PageProps) {
  return (
    <div
      id="fa-page-container"
      className={['bg-[#F2F3F5]', className].filter(Boolean).join(' ')}
      style={{ minHeight: 'calc(100vh - 200px)', ...(style || {}) }}
    >
      <div className={['mt-2', bodyClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </div>
  )
}

export default Page



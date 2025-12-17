/**
 * PC 端通用弹窗组件（React 版）
 * 基于 antd Modal，替代原来的 Vue 版 Dialog
 */
import type { ReactNode } from 'react'
import { Modal } from 'antd'
import type { ModalProps } from 'antd'
import { modalsDefaultConfig } from './modalsDefaultConfig'

export interface DialogProps {
  /** 是否打开 */
  open: boolean
  /** 标题文本 */
  title?: ReactNode
  /** 额外配置，最终会与默认配置合并后传给 Modal */
  config?: ModalProps
  /** 关闭事件回调（对应 Vue 版的 cancel 事件） */
  onCancel?: () => void
  /** 自定义标题内容（对应 Vue 版的 title 插槽） */
  titleSlot?: ReactNode
  /** 自定义底部内容（对应 Vue 版的 footer 插槽） */
  footerSlot?: ReactNode
  children?: ReactNode
}

function Dialog({
  open,
  title,
  config,
  onCancel,
  titleSlot,
  footerSlot,
  children,
}: DialogProps) {
  const mergedConfig: ModalProps = {
    ...modalsDefaultConfig,
    ...config,
  }

  return (
    <div style={{ background: '#ffffff' }}>
      <Modal
        open={open}
        title={titleSlot ?? title}
        destroyOnClose
        onCancel={onCancel}
        footer={footerSlot}
        {...mergedConfig}
      >
        {children}
      </Modal>
    </div>
  )
}

export default Dialog



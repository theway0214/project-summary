## 公共 Dialog 组件（PC）使用文档

该公共 Dialog 组件是基于 antd 的 `Modal` 在 **React** 中封装，用于统一 PC 端弹窗的配置和样式。
内部合并了默认配置 `modalsDefaultConfig`，支持自定义标题和底部内容。

### 在 React 组件中的示例

```tsx
import { useState } from 'react'
import Dialog from '@/components/PC/Dialog'

function DemoDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>打开弹窗</button>

      <Dialog
        open={open}
        title="示例弹窗"
        onCancel={() => setOpen(false)}
      >
        <div>这里是弹窗内容</div>
      </Dialog>
    </>
  )
}
```

自定义标题和底部按钮：

```tsx
<Dialog
  open={open}
  titleSlot={<span>自定义标题</span>}
  footerSlot={(
    <div style={{ textAlign: 'right' }}>
      <Button onClick={() => setOpen(false)}>取消</Button>
      <Button type="primary" onClick={handleOk}>确定</Button>
    </div>
  )}
  onCancel={() => setOpen(false)}
/>
```

### 配置参数

- **open**: 是否打开弹窗（布尔值）。
- **title**: 标题文本（不使用 `titleSlot` 时生效）。
- **config**: 额外传给 antd `Modal` 的配置，最终会与 `modalsDefaultConfig` 合并。
- **onCancel**: 关闭弹窗回调函数。
- **titleSlot**: 自定义标题内容（`ReactNode`），优先级高于 `title`。
- **footerSlot**: 自定义底部内容（`ReactNode`），完全自定义按钮区域。
- **children**: 弹窗主体内容。



## 公共 Page 组件（PC）使用文档

该组件用于作为 PC 端页面的最外层容器，统一背景色和最小高度，并提供一个内部内容区域。

### 在 React 组件中的示例

```tsx
import Page from '@/components/PC/Page'

function DemoPage() {
  return (
    <Page bodyClassName="px-6 py-4" className="custom-page-class">
      <h1>页面标题</h1>
      <p>这里是页面内容。</p>
    </Page>
  )
}
```

### 配置参数

- **bodyClassName**: 内容区域外层 `div` 的额外 class，用于控制内部布局（如 `px-6` 等）。
- **className**: 最外层容器的额外 class。
- **style**: 最外层容器的行内样式（在默认 `minHeight: 'calc(100vh - 200px)'` 的基础上追加）。
- **children**: 页面主体内容。



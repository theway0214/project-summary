## 公共 Back 组件（PC）使用文档

该组件用于在页面顶部展示一个「返回」操作区域，点击后返回上一页（通过 `react-router` 的 `navigate(-1)` 实现），
外层包裹在统一风格的 `PCCard` 中。

### 在 React 组件中的示例

```tsx
import Back from '@/components/PC/Back'

function DetailPage() {
  return (
    <>
      <Back text="返回列表" />
      {/* 下面是页面主体内容 */}
    </>
  )
}
```

### 配置参数

- **text**: 文本内容，默认值为 `'返回'`，支持传入字符串或任意 `ReactNode`。



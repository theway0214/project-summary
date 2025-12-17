## 公共 Card 组件（PC）使用文档

该公共 Card 组件是基于 antd 的 `Card` 在 **React** 中进行封装，用于全局统一卡片风格样式，
目前支持传入标题和 loading 状态，更改过基础样式，根据不同项目 UI 可灵活修改样式。

### 在 React 组件中的示例

```tsx
import PCCard from '@/components/PC/Card'

function Demo() {
  return (
    <PCCard title="标题文本">
      <span>文本内容</span>
    </PCCard>
  )
}
```

自定义头部内容（等价于 Vue 版的 `title` 插槽）：

```tsx
import PCCard from '@/components/PC/Card'

function Demo() {
  return (
    <PCCard
      headerSlot={(
        <div className="flex items-center">
          <span>自定义头部</span>
        </div>
      )}
    >
      <span>内容区域</span>
    </PCCard>
  )
}
```

### 配置参数

- **title**: 卡片标题，支持字符串或任意 `ReactNode`。
- **loading**: 卡片内容加载中状态。
- **headerSlot**: 自定义头部内容，优先级高于 `title`。
- **children**: 卡片内容区域。
- **className**: 额外的 class 名。


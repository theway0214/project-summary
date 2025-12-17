## 公共 Search 组件（PC）使用文档

该组件用于页面顶部或表格上方的筛选区域：左侧放筛选表单，右侧统一放「展开/收起、重置、查询」操作按钮。

### 在 React 组件中的示例

```tsx
import Search from '@/components/PC/Search'
import PCForm from '@/components/PC/Form'
import { formColumns, formConfig } from './config/searchFormConfig'

function DemoSearch() {
  const [data, setData] = useState<Record<string, any>>({})

  const handleSearch = () => {
    // 发起查询
    console.log('查询条件:', data)
  }

  const handleReset = () => {
    setData({})
  }

  return (
    <Search
      isInline
      expand
      onSearch={handleSearch}
      onReset={handleReset}
    >
      <PCForm
        config={formConfig}
        columns={formColumns}
        data={data}
        onDataChange={setData}
      />
    </Search>
  )
}
```

### 配置参数

- **searchLoading**: 查询按钮的加载状态。
- **resetLoading**: 重置按钮的加载状态。
- **isInline**: 是否为行内布局（与表单并排显示），默认 `true`。
- **expand**: 是否展示「展开/收起」按钮，且允许内容高度展开或折叠。
- **children**: 左侧筛选区域，一般放表单组件。
- **onSearch**: 点击「查询」按钮时的回调。
- **onReset**: 点击「重置」按钮时的回调。



## 公共 Table 组件（PC）使用文档

该公共 Table 组件是基于 antd 的 `Table` 在 **React** 中封装，用于全局统一表格风格，快速生成表格。
表格配置与列配置建议抽离为单独 TS 文件。表格列目前支持：文本、数字、tooltip、tag、时间、性别、数组等类型，可按需扩展。

### 在 React 组件中的示例

配置文件示例（`config/tableConfig.ts`）：

```ts
import type { TableConfigType, TableColumnAllType } from '@/components/PC/Table/types'
import { TableColumnTypeEnum } from '@/components/PC/Table/types'

export const tableConfig: TableConfigType = {
  rowKey: 'id',
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
  },
}

export const tableColumns: TableColumnAllType[] = [
  {
    title: '序号',
    key: 'index',
    fixed: 'left',
    align: 'center',
    width: 50,
    type: TableColumnTypeEnum.INDEX,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'center',
    fixed: 'left',
    width: 120,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    title: '项目编号',
    dataIndex: 'projectCode',
    align: 'center',
    width: 100,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 300,
    type: TableColumnTypeEnum.OPERATION,
  },
]
```

在页面组件中使用：

```tsx
import { useState } from 'react'
import PCTable from '@/components/PC/Table'
import { tableColumns, tableConfig } from './config/tableConfig'

function DemoTable() {
  const [data, setData] = useState<any[]>([])
  const [selectList, setSelectList] = useState<(string | number)[]>([])

  const handleChange = (pagination: any) => {
    // 更新分页参数并重新请求数据
    console.log('pagination:', pagination)
  }

  return (
    <PCTable
      data={data}
      columns={tableColumns}
      config={tableConfig}
      loading={false}
      selectList={selectList}
      onSelectListChange={setSelectList}
      onChange={handleChange}
      headerSlot={(
        <>
          <button>新增</button>
          <button>导入</button>
          <button>批量删除</button>
        </>
      )}
      operationSlot={(row) => (
        <>
          <button>编辑</button>
          <button>删除</button>
        </>
      )}
    />
  )
}
```

### 配置参数

- **data**: 表格数据源数组。
- **columns**: 表格列配置，类型为 `TableColumnAllType[]`。
- **config**: 表格配置项，类型为 `TableConfigType`（含分页、滚动、选择配置等）。
- **loading**: 表格加载状态。
- **selectList**: 当前选中的行 key 数组。
- **onSelectListChange**: 选中行变更时回调。
- **onChange**: 分页、排序、筛选变化时的回调（同 antd Table 的 `onChange`）。
- **onSelectChange**: 选中行列表变更时的回调。
- **onLinkChange**: 点击 `LINK` 类型单元格时的回调。
- **onRowClick**: 行点击回调。
- **headerSlot**: 表头上方自定义区域（如按钮组）。
- **operationSlot**: 操作列渲染函数，参数为当前行数据。


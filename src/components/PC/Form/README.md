## 公共 Form 组件（PC）使用文档

该公共 Form 组件是基于 antd 的 `Form` 在 **React** 中封装，用于快速生成表单数据，
可用于常规的信息编辑/修改页、表格筛选区域等。表单配置与表单字段定义建议抽离到单独的 TS 文件中维护。

目前内置支持的字段类型包括：`input`、`number`、`select`、`search-select`、`textarea`、`switch`、`range-picker`、`cascader`、`date`，后续可按需扩展。

### 在 React 组件中的示例

配置文件示例（`config/detailFormConfig.ts`）：

```ts
import { FormColumnTypeEnum, type FormColumnType, type FormConfigType } from '@/components/PC/Form/types'

export const formConfig: FormConfigType = {
  rules: {
    projectName: [{ required: true, message: '请输入项目名称' }],
    trainMethod: [{ required: true, message: '请选择方式' }],
  },
  col: {
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 8 },
    xl: { span: 6 },
  },
  labelCol: {
    style: { width: '120px' },
  },
}

export const formColumns: FormColumnType[] = [
  {
    label: '项目名称',
    field: 'projectName',
    type: FormColumnTypeEnum.INPUT,
    placeholder: '请输入',
  },
  {
    label: '项目编号',
    field: 'projectCode',
    type: FormColumnTypeEnum.INPUT,
    placeholder: '自动生成，无需填写',
    disabled: true,
  },
  {
    label: '方式',
    field: 'trainMethod',
    type: FormColumnTypeEnum.SELECT,
    placeholder: '请选择',
    options: [],
    hidden: true,
  },
]
```

在页面组件中使用：

```tsx
import { useRef, useState } from 'react'
import PCForm, { type PCFormRef } from '@/components/PC/Form'
import { formColumns, formConfig } from './config/detailFormConfig'

function DemoFormPage() {
  const [data, setData] = useState<Record<string, any>>({})
  const formRef = useRef<PCFormRef | null>(null)

  const handleSubmit = async () => {
    await formRef.current?.formValidFn()
    console.log('表单数据:', data)
  }

  return (
    <>
      <PCForm
        ref={formRef}
        config={formConfig}
        columns={formColumns}
        data={data}
        onDataChange={setData}
      />
      <button onClick={handleSubmit}>提交</button>
    </>
  )
}
```

### 配置参数

- **data**: 表单数据对象，推荐使用 `useState` 管理。
- **columns**: 表单字段配置数组，类型为 `FormColumnType[]`。
- **config**: 表单整体配置，类型为 `FormConfigType`（布局、校验、栅格等）。
- **onDataChange**: 表单值变更时的回调，参数为最新的 `data`。
- **onChange**: 字段值变更时的回调，参数为变更字段的 `key`。


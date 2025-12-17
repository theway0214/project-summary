import { useRef, useState } from 'react'
import type { PCFormRef } from '@/components/PC/Form'
import PCForm from '@/components/PC/Form'
import { FormColumnTypeEnum, type FormColumnType, type FormConfigType } from '@/components/PC/Form/types'
import PCCard from '@/components/PC/Card'
import Back from '@/components/PC/Back'
import Page from '@/components/PC/Page'
import Search from '@/components/PC/Search'
import Dialog from '@/components/PC/Dialog'
import PCTable from '@/components/PC/Table'
import { TableColumnTypeEnum, type TableColumnAllType, type TableConfigType } from '@/components/PC/Table/types'
import { Button } from 'antd'

const demoFormConfig: FormConfigType = {}

const demoFormColumns: FormColumnType[] = [
  {
    label: '名称',
    field: 'name',
    type: FormColumnTypeEnum.INPUT,
    placeholder: '请输入名称',
  },
  {
    label: '状态',
    field: 'status',
    type: FormColumnTypeEnum.SELECT,
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: 'enabled' },
      { label: '禁用', value: 'disabled' },
    ],
  },
]

const demoTableConfig: TableConfigType = {
  rowKey: 'id',
}

interface DemoTableRow {
  id: number
  name: string
  status: string
}

const demoTableColumns: TableColumnAllType[] = [
  {
    title: '序号',
    key: 'index',
    width: 60,
    align: 'center',
    type: TableColumnTypeEnum.INDEX,
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
    type: TableColumnTypeEnum.TEXT,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    type: TableColumnTypeEnum.TAG,
    typeMap: {
      enabled: 'green',
      disabled: 'red',
    },
    valueMap: {
      enabled: '启用',
      disabled: '禁用',
    },
  },
]

function PCComponentDemo() {
  const [searchData, setSearchData] = useState<Record<string, unknown>>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [tableSelectKeys, setTableSelectKeys] = useState<(string | number)[]>([])
  const formRef = useRef<PCFormRef | null>(null)

  const handleSearch = () => {
    // 简单输出下搜索条件（实际项目中可在此发起接口请求）
  }

  const handleReset = () => {
    setSearchData({})
  }

  const handleSubmit = async () => {
    await formRef.current?.formValidFn()
    setDialogOpen(true)
  }

  return (
    <Page bodyClassName="p-4">
      <Back text="返回上一页" />

      <PCCard title="Search + Form 示例" className="mb-4">
        <Search expand onSearch={handleSearch} onReset={handleReset}>
          <PCForm
            ref={formRef}
            config={demoFormConfig}
            columns={demoFormColumns}
            data={searchData}
            onDataChange={setSearchData}
          />
        </Search>
        <div className="mt-4">
          <Button type="primary" onClick={handleSubmit}>
            校验并打开 Dialog
          </Button>
        </div>
      </PCCard>

      <PCCard title="Form 独立示例" className="mt-4 mb-4">
        <PCForm
          config={demoFormConfig}
          columns={demoFormColumns}
          data={searchData}
          onDataChange={setSearchData}
        />
      </PCCard>

      <PCCard title="Table 示例" className="mt-4">
        <PCTable<DemoTableRow>
          data={[
            { id: 1, name: '示例一', status: 'enabled' },
            { id: 2, name: '示例二', status: 'disabled' },
          ]}
          columns={demoTableColumns}
          config={demoTableConfig}
          selectList={tableSelectKeys}
          onSelectListChange={setTableSelectKeys}
        />
      </PCCard>

      <PCCard headerSlot={(
        <div className="flex items-center justify-between w-full">
          <span>自定义头部 Card 示例</span>
        </div>
      )}
      >
        <div>这里是 Card 内容区域。</div>
      </PCCard>

      <Dialog
        open={dialogOpen}
        title="表单数据预览"
        onCancel={() => setDialogOpen(false)}
      >
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(searchData, null, 2)}</pre>
      </Dialog>
    </Page>
  )
}

export default PCComponentDemo
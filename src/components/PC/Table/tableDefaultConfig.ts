import type { TableConfigType } from './types'

export const tableDefaultConfig: TableConfigType = {
  rowKey: 'id',
  bordered: true,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
  },
  // sticky: { offsetHeader: 0 },
  scroll: {
    x: '100%',
    scrollToFirstRowOnChange: true,
  },
  rowSelection: {
    fixed: true,
    preserveSelectedRowKeys: false,
    selections: false,
  },
}

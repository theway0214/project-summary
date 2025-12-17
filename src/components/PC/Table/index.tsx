/**
 * PC 端通用 Table 组件（React 版）
 * 基于 antd Table，支持统一配置与多类型列渲染
 */
import { useCallback, useMemo, useState, type ReactNode, type Key } from 'react'
import { Table, Tag, Space } from 'antd'
import type { TableProps, TablePaginationConfig } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { tableDefaultConfig } from './tableDefaultConfig'
import { TableColumnTypeEnum, type TableColumnAllType, type TableConfigType } from './types'
import './index.css'

export interface PCTableProps<RecordType extends object = Record<string, unknown>> {
  data: RecordType[]
  columns: TableColumnAllType[]
  config?: TableConfigType
  loading?: boolean
  selectList?: (string | number)[]
  onSelectListChange?: (keys: (string | number)[]) => void
  onChange?: TableProps<RecordType>['onChange']
  onSelectChange?: (selectedRows: RecordType[]) => void
  onLinkChange?: (row: RecordType, key?: string) => void
  onRowClick?: (row: RecordType) => void
  /** 表头插槽内容 */
  headerSlot?: ReactNode
  /** 操作列默认插槽：传入 row */
  operationSlot?: (row: RecordType) => ReactNode
}

function PCTable<RecordType extends object = Record<string, unknown>>({
  data,
  columns,
  config,
  loading,
  selectList,
  onSelectListChange,
  onChange,
  onSelectChange,
  onLinkChange,
  onRowClick,
  headerSlot,
  operationSlot,
}: PCTableProps<RecordType>) {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<(string | number)[]>(selectList || [])

  const mergedConfig: TableConfigType = useMemo(
    () => ({
      ...tableDefaultConfig,
      ...(config || {}),
    }),
    [config],
  )

  const triggerSelectChange = useCallback((keys: (string | number)[], rows: RecordType[]) => {
    setInternalSelectedKeys(keys)
    onSelectListChange?.(keys)
    onSelectChange?.(rows)
  }, [onSelectListChange, onSelectChange])

  const handleChange: TableProps<RecordType>['onChange'] = (pagination, filters, sorter, extra) => {
    const p = pagination as TablePaginationConfig
    // 分页变化交给外部 onChange 处理
    onChange?.(p, filters, sorter, extra)
  }

  const rowSelection =
    config?.rowSelection === null || !mergedConfig.rowSelection
      ? undefined
      : {
          ...mergedConfig.rowSelection,
          selectedRowKeys: selectList ?? internalSelectedKeys,
          onChange: (selectedRowKeys: Key[], selectedRows: RecordType[]) => {
            triggerSelectChange(selectedRowKeys as (string | number)[], selectedRows)
          },
        }

  const renderCell = (column: TableColumnAllType, record: RecordType, text: unknown, index: number) => {
    switch (column.type) {
      case TableColumnTypeEnum.OPERATION:
        return <Space>{operationSlot?.(record)}</Space>
      case TableColumnTypeEnum.INDEX: {
        if (mergedConfig.pagination && typeof mergedConfig.pagination !== 'boolean') {
          const current = mergedConfig.pagination.current || 1
          const pageSize = mergedConfig.pagination.pageSize || 10
          return (current - 1) * pageSize + index + 1
        }
        return index + 1
      }
      case TableColumnTypeEnum.TEXT:
        return text as ReactNode
      case TableColumnTypeEnum.NUMBER:
        return text ?? 0
      case TableColumnTypeEnum.TOOLTIP:
        // 这里可以接入你自己的 Tooltip 组件
        return text as ReactNode
      case TableColumnTypeEnum.LINK:
        return (
          <div
            className="pc-table-link"
            onClick={() => onLinkChange?.(record, column.dataIndex)}
          >
            {text as ReactNode}
          </div>
        )
      case TableColumnTypeEnum.TAG:
        if (text !== null && text !== undefined) {
          const color = column.typeMap?.[text as keyof typeof column.typeMap] || 'default'
          const label = column.valueMap?.[text as keyof typeof column.valueMap] ?? text
          return <Tag color={color}>{label as ReactNode}</Tag>
        }
        return <span>-</span>
      case TableColumnTypeEnum.SELECT:
        return (column.valueMap?.[text as keyof typeof column.valueMap] ?? text) as ReactNode
      case TableColumnTypeEnum.DATE: {
        if (!text) return <span>-</span>
        const fmt = column.format || 'YYYY-MM-DD'
        return dayjs(Number(text)).format(fmt)
      }
      case TableColumnTypeEnum.DETAIL_DATE: {
        if (!text) return <span>-</span>
        const fmt = column.format || 'YYYY-MM-DD HH:mm:ss'
        if (Array.isArray(text) && text.length > 1) {
          return `${dayjs(+text[0]).format(fmt)} - ${dayjs(+text[1]).format(fmt)}`
        }
        return dayjs(+text).format(fmt)
      }
      case TableColumnTypeEnum.ARRAY:
        return Array.isArray(text) ? text.join(column.separator || ',') : (text as ReactNode)
      case TableColumnTypeEnum.SEX:
        return <div>{Number(text) ? '女' : '男'}</div>
      default:
        return text as ReactNode
    }
  }

  const enhancedColumns: ColumnsType<RecordType> = columns.map((col) => ({
    ...col,
    render: (text: unknown, record: RecordType, index: number) => renderCell(col, record, text, index),
  }))

  return (
    <div className="w-full">
      {headerSlot && <div className="mb-4">{headerSlot}</div>}
      <Table<RecordType>
        {...(mergedConfig as TableProps<RecordType>)}
        dataSource={data}
        columns={enhancedColumns}
        loading={loading}
        rowSelection={rowSelection as TableProps<RecordType>['rowSelection']}
        onChange={handleChange}
        onRow={onRowClick ? (record) => ({
          onClick: () => onRowClick(record),
        }) : undefined}
      />
    </div>
  )
}

export default PCTable



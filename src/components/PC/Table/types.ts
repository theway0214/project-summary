import type { TableProps } from 'antd'
import type { PaginationProps } from 'antd/es/pagination'

// 表格列类型枚举，对应原 Vue 版的 TableColumnTypeEnum
export enum TableColumnTypeEnum {
  OPERATION = 'OPERATION',
  INDEX = 'INDEX',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  TOOLTIP = 'TOOLTIP',
  LINK = 'LINK',
  TAG = 'TAG',
  SELECT = 'SELECT',
  DATE = 'DATE',
  DETAIL_DATE = 'DETAIL_DATE',
  ARRAY = 'ARRAY',
  SEX = 'SEX',
}

export interface TableConfigType extends TableProps<Record<string, unknown>> {
  pagination?: PaginationProps | false
}

export interface TableColumnAllType {
  title?: string
  dataIndex?: string
  key?: string
  width?: number
  align?: 'left' | 'right' | 'center'
  fixed?: 'left' | 'right'
  type?: TableColumnTypeEnum
  typeMap?: Record<string | number, string>
  valueMap?: Record<string | number, string>
  format?: string
  separator?: string
  [key: string]: unknown
}



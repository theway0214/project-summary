import type { FormProps } from 'antd'
import type { ColProps, RowProps } from 'antd/es/grid'
import type { Rule } from 'antd/es/form'

// 表单项类型枚举，对应原 Vue 版的 FormColumnTypeEnum
export enum FormColumnTypeEnum {
  INPUT = 'INPUT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  SEARCH_SELECT = 'SEARCH_SELECT',
  SWITCH = 'SWITCH',
  TEXTAREA = 'TEXTAREA',
  CASCADER = 'CASCADER',
  DATE_RANGE = 'DATE_RANGE',
  DATE = 'DATE',
}

// 单个表单项配置
export interface FormColumnType {
  label: string
  field: string
  type: FormColumnTypeEnum
  name?: string
  rules?: Rule[]
  hidden?: boolean
  span?: ColProps
  col?: ColProps
  options?: Array<{ label: string; value: string | number; [key: string]: unknown }>
  fieldNames?: Record<string, string>
  readonly?: boolean
  max?: number
  beginWidth?: 'start' | 'end'
  // 允许透传给具体控件的其它属性
  [key: string]: unknown
}

// 表单整体配置
export interface FormConfigType extends FormProps {
  row?: RowProps
  col?: ColProps
  isEmbedded?: boolean
  hasValidator?: boolean
}



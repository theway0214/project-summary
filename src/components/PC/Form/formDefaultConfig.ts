import type { FormConfigType } from './types'
import type { RangePickerProps } from 'antd/es/date-picker'
import type { SelectProps } from 'antd'

export const formDefaultConfig: FormConfigType = {
  layout: 'horizontal',
  labelCol: {
    style: {
      width: '200px',
    },
  },
  row: {
    gutter: [16, 0],
    justify: 'start',
    align: 'middle',
    wrap: true,
  },
  col: {
    sm: {
      span: 24,
    },
    md: {
      span: 24,
    },
    lg: {
      span: 12,
    },
    xl: {
      span: 12,
    },
  },
  isEmbedded: false,
  hasValidator: true,
}

export const selectDefaultConfig: SelectProps = {
  allowClear: true,
  showSearch: true,
}

export const dateRangeDefaultConfig: RangePickerProps = {
  showTime: { format: 'HH:mm' },
  format: 'YYYY-MM-DD HH:mm',
  placeholder: ['开始时间', '结束时间'],
}

export const datePickerDefaultConfig = {
  picker: 'year' as const,
  placeholder: '请选择',
}

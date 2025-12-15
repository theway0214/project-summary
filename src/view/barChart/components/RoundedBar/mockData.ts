/**
 * RoundedBar 圆角柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface RoundedBarDataItem {
  name: string
  value: number
}

export const mockData: RoundedBarDataItem[] = [
  { name: 'A产品', value: 43.3 },
  { name: 'B产品', value: 83.1 },
  { name: 'C产品', value: 86.4 },
  { name: 'D产品', value: 72.4 },
  { name: 'E产品', value: 65.2 },
  { name: 'F产品', value: 53.9 },
  { name: 'G产品', value: 39.1 },
]

export const colorPalette = [
  '#5470C6',
  '#91CC75',
  '#FAC858',
  '#EE6666',
  '#73C0DE',
  '#3BA272',
  '#FC8452',
]

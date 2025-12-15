/**
 * PolarBar 极坐标柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface PolarBarDataItem {
  name: string
  value: number
}

export const mockData: PolarBarDataItem[] = [
  { name: '周一', value: 120 },
  { name: '周二', value: 200 },
  { name: '周三', value: 150 },
  { name: '周四', value: 80 },
  { name: '周五', value: 70 },
  { name: '周六', value: 180 },
  { name: '周日', value: 140 },
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

/**
 * BarChart1 模拟数据
 * 表示四种装修状态下的占比（单位：%）
 */

export interface BarChart1Item {
  /** 状态名称 */
  status: '未装修' | '装修' | '装修未入住' | '已入住'
  /** 百分比数值 */
  value: number
}

export const mockData: BarChart1Item[] = [
  { status: '未装修', value: 40 },
  { status: '装修', value: 60 },
  { status: '装修未入住', value: 20 },
  { status: '已入住', value: 80 },
]



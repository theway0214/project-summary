/**
 * NegativeBar 正负值柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface NegativeBarDataItem {
  month: string
  value: number
}

export const mockData: NegativeBarDataItem[] = [
  { month: '1月', value: 200 },
  { month: '2月', value: 170 },
  { month: '3月', value: -140 },
  { month: '4月', value: -230 },
  { month: '5月', value: -130 },
  { month: '6月', value: 100 },
  { month: '7月', value: 230 },
  { month: '8月', value: 350 },
  { month: '9月', value: 250 },
  { month: '10月', value: -50 },
  { month: '11月', value: 180 },
  { month: '12月', value: 310 },
]

/**
 * DualColorLine 正负双色折线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface DualColorLineDataItem {
  name: string
  value: number
}

export const mockData: DualColorLineDataItem[] = [
  { name: '1月', value: 120 },
  { name: '2月', value: 80 },
  { name: '3月', value: -30 },
  { name: '4月', value: -80 },
  { name: '5月', value: -50 },
  { name: '6月', value: 40 },
  { name: '7月', value: 150 },
  { name: '8月', value: 200 },
  { name: '9月', value: 100 },
  { name: '10月', value: -20 },
  { name: '11月', value: -60 },
  { name: '12月', value: 50 },
]

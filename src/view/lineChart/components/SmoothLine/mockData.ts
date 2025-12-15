/**
 * SmoothLine 平滑折线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface SmoothLineDataItem {
  name: string
  value: number
}

export const mockData: SmoothLineDataItem[] = [
  { name: '1月', value: 820 },
  { name: '2月', value: 932 },
  { name: '3月', value: 901 },
  { name: '4月', value: 934 },
  { name: '5月', value: 1290 },
  { name: '6月', value: 1330 },
  { name: '7月', value: 1520 },
  { name: '8月', value: 1320 },
  { name: '9月', value: 1100 },
  { name: '10月', value: 950 },
  { name: '11月', value: 880 },
  { name: '12月', value: 1050 },
]

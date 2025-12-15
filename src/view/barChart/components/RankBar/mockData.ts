/**
 * RankBar 排名柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface RankDataItem {
  area: string
  numerical_value: number
  average?: number
}

export const mockData: RankDataItem[] = [
  { area: '重庆市', numerical_value: 1520, average: 980 },
  { area: '四川省', numerical_value: 1350 },
  { area: '贵州省', numerical_value: 1180 },
  { area: '云南省', numerical_value: 1050 },
  { area: '广西省', numerical_value: 920 },
]

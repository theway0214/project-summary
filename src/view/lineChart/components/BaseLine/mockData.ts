/**
 * BaseLine 基础折线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface ElectricDataItem {
  area: string
  electric: number
}

export const mockData: ElectricDataItem[] = [
  { area: '四川', electric: 0.5234 },
  { area: '贵州', electric: 0.4856 },
  { area: '重庆', electric: 0.5012 },
  { area: '云南', electric: 0.4678 },
  { area: '广西', electric: 0.5389 },
]

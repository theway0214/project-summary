/**
 * StepLine 阶梯折线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface StepLineDataItem {
  date: string
  price: number
}

export const mockData: StepLineDataItem[] = [
  { date: '2024-01', price: 100 },
  { date: '2024-02', price: 100 },
  { date: '2024-03', price: 120 },
  { date: '2024-04', price: 120 },
  { date: '2024-05', price: 150 },
  { date: '2024-06', price: 150 },
  { date: '2024-07', price: 180 },
  { date: '2024-08', price: 180 },
  { date: '2024-09', price: 160 },
  { date: '2024-10', price: 160 },
  { date: '2024-11', price: 200 },
  { date: '2024-12', price: 200 },
]

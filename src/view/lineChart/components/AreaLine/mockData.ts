/**
 * AreaLine 面积折线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface AreaLineDataItem {
  time: string
  value: number
}

export const mockData: AreaLineDataItem[] = [
  { time: '00:00', value: 120 },
  { time: '02:00', value: 80 },
  { time: '04:00', value: 50 },
  { time: '06:00', value: 90 },
  { time: '08:00', value: 200 },
  { time: '10:00', value: 350 },
  { time: '12:00', value: 420 },
  { time: '14:00', value: 380 },
  { time: '16:00', value: 450 },
  { time: '18:00', value: 520 },
  { time: '20:00', value: 380 },
  { time: '22:00', value: 200 },
]

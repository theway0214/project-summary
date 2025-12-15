/**
 * BaseBar 基础柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface BaseBarDataItem {
  data_time: string
  peak_valley_difference_rate: number
  cooling_load?: number
}

export const mockData: BaseBarDataItem[] = [
  { data_time: '2020', peak_valley_difference_rate: 120, cooling_load: 50 },
  { data_time: '2021', peak_valley_difference_rate: 200, cooling_load: 80 },
  { data_time: '2022', peak_valley_difference_rate: 150, cooling_load: 60 },
  { data_time: '2023', peak_valley_difference_rate: 250, cooling_load: 100 },
  { data_time: '2024', peak_valley_difference_rate: 300, cooling_load: 120 },
]

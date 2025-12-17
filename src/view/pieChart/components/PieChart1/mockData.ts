/**
 * PieChart1 模拟数据
 * @author xhj
 * @since 2025-12-17
 */

export interface FinishedOilChannelItem {
  transportLineName: string
  transportVolume: number
  transportProportion: number
  year: number
}

export const mockData: FinishedOilChannelItem[] = [
  {
    transportLineName: '水路',
    transportVolume: 113,
    transportProportion: 20,
    year: 2024,
  },
  {
    transportLineName: '公路',
    transportVolume: 101,
    transportProportion: 20,
    year: 2024,
  },
  {
    transportLineName: '铁路',
    transportVolume: 89,
    transportProportion: 20,
    year: 2024,
  },
  {
    transportLineName: '管道',
    transportVolume: 89,
    transportProportion: 20,
    year: 2024,
  },
]


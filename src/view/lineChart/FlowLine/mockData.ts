/**
 * FlowLine 流光折线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface CarbonEmissionsTotalTrendType {
  statistical_date: string
  intensity_value: number
}

// 生成模拟数据
const generateMockData = (): CarbonEmissionsTotalTrendType[] => {
  const data: CarbonEmissionsTotalTrendType[] = []
  const currentYear = new Date().getFullYear()

  // 生成12个月的数据
  for (let i = 1; i <= 12; i++) {
    const month = String(i).padStart(2, '0')
    // 模拟碳排放数据，基准值在 100-200 之间波动
    const baseValue = 120 + Math.random() * 80
    data.push({
      statistical_date: `${currentYear}-${month}`,
      intensity_value: Math.round(baseValue * 10) / 10,
    })
  }

  return data
}

export const mockData: CarbonEmissionsTotalTrendType[] = generateMockData()

// Tab 类型定义
export type TabType = 1 | 2 | 3

// 根据 tab 获取 Y 轴单位
export const getYAxisUnit = (tabActive: TabType): string => {
  switch (tabActive) {
    case 1:
      return '万吨二氧化碳'
    case 2:
      return '吨/万元'
    case 3:
      return '吨二氧化碳'
    default:
      return ''
  }
}

/**
 * CurveLine 曲线图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface LoadDataItem {
  data_time: string
  maximum_load: number
}

// 生成模拟数据
const generateYearData = (year: number, baseLoad: number): LoadDataItem[] => {
  const data: LoadDataItem[] = []
  const daysInYear = year % 4 === 0 ? 366 : 365

  for (let i = 1; i <= daysInYear; i++) {
    const date = new Date(year, 0, i)
    const month = date.getMonth()
    // 夏季(6-8月)和冬季(12-2月)负荷较高
    let seasonFactor = 1
    if (month >= 5 && month <= 7) {
      seasonFactor = 1.3 + Math.random() * 0.2
    } else if (month === 11 || month <= 1) {
      seasonFactor = 1.2 + Math.random() * 0.15
    } else {
      seasonFactor = 0.8 + Math.random() * 0.3
    }

    const load = Math.round((baseLoad * seasonFactor + (Math.random() - 0.5) * 500) * 100) / 100

    data.push({
      data_time: `${year}-${String(month + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      maximum_load: load,
    })
  }

  return data
}

const currentYear = new Date().getFullYear()

export const mockData: LoadDataItem[] = [
  ...generateYearData(currentYear, 2800),
  ...generateYearData(currentYear - 1, 2650),
  ...generateYearData(currentYear - 2, 2500),
]

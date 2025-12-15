/**
 * GradientBar 渐变柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface GradientBarDataItem {
  year: string
  unit_gdp: number
  growth_rate_curve: number
}

export const mockData: GradientBarDataItem[] = [
  { year: '2015', unit_gdp: 820, growth_rate_curve: 5.2 },
  { year: '2016', unit_gdp: 932, growth_rate_curve: 6.1 },
  { year: '2017', unit_gdp: 901, growth_rate_curve: 4.8 },
  { year: '2018', unit_gdp: 934, growth_rate_curve: 5.5 },
  { year: '2019', unit_gdp: 1290, growth_rate_curve: 8.2 },
  { year: '2020', unit_gdp: 1330, growth_rate_curve: 3.1 },
  { year: '2021', unit_gdp: 1520, growth_rate_curve: 7.6 },
  { year: '2022', unit_gdp: 1450, growth_rate_curve: 4.2 },
  { year: '2023', unit_gdp: 1200, growth_rate_curve: 3.8 },
  { year: '2024', unit_gdp: 1100, growth_rate_curve: 5.9 },
  { year: '2025', unit_gdp: 980, growth_rate_curve: 6.3 },
  { year: '2026', unit_gdp: 1050, growth_rate_curve: 4.5 },
]

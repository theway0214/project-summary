/**
 * StackedBar 堆叠柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface EnergyDataItem {
  year: string
  fossil_energy: string
  non_fossil_energy: string
}

export const mockData: EnergyDataItem[] = [
  { year: '2015', fossil_energy: '88%', non_fossil_energy: '12%' },
  { year: '2016', fossil_energy: '86.5%', non_fossil_energy: '13.5%' },
  { year: '2017', fossil_energy: '85.5%', non_fossil_energy: '14.5%' },
  { year: '2018', fossil_energy: '84.5%', non_fossil_energy: '15.5%' },
  { year: '2019', fossil_energy: '83.5%', non_fossil_energy: '16.5%' },
  { year: '2020', fossil_energy: '82.5%', non_fossil_energy: '17.5%' },
  { year: '2021', fossil_energy: '81.5%', non_fossil_energy: '18.5%' },
  { year: '2022', fossil_energy: '80.5%', non_fossil_energy: '19.5%' },
  { year: '2023', fossil_energy: '79%', non_fossil_energy: '21%' },
  { year: '2024', fossil_energy: '77.5%', non_fossil_energy: '22.5%' },
]

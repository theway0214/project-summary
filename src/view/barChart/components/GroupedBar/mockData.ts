/**
 * GroupedBar 分组柱状图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export interface GroupedBarDataItem {
  category: string
  year2011: number
  year2012: number
}

export const mockData: GroupedBarDataItem[] = [
  { category: '巴西', year2011: 18203, year2012: 19325 },
  { category: '印尼', year2011: 23489, year2012: 23438 },
  { category: '美国', year2011: 29034, year2012: 31000 },
  { category: '印度', year2011: 104970, year2012: 121594 },
  { category: '中国', year2011: 131744, year2012: 134141 },
  { category: '世界', year2011: 630230, year2012: 681807 },
]

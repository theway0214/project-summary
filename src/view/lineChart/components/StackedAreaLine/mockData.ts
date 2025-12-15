/**
 * StackedAreaLine 堆叠面积图模拟数据
 * @author xhj
 * @since 2025-12-15
 */

export const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export interface StackedAreaLineData {
  categories: string[]
  email: number[]
  unionAds: number[]
  videoAds: number[]
  direct: number[]
  search: number[]
}

export const mockData: StackedAreaLineData = {
  categories,
  email: [120, 132, 101, 134, 90, 230, 210],
  unionAds: [220, 182, 191, 234, 290, 330, 310],
  videoAds: [150, 232, 201, 154, 190, 330, 410],
  direct: [320, 332, 301, 334, 390, 330, 320],
  search: [820, 932, 901, 934, 1290, 1330, 1320],
}

export const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE']

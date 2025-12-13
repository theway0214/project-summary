import type { EChartsOption } from 'echarts'

// 预设的 x 轴配置
export const defaultXAxis: EChartsOption['xAxis'] = {
  type: 'category',
  axisLine: {
    lineStyle: {
      width: 1,
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    interval: 0,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    padding: 8,
  },
}

// 预设的 y 轴配置
export const defaultYAxis: EChartsOption['yAxis'] = {
  type: 'value',
  nameGap: 30,
  axisLine: {
    show: true,
    lineStyle: {
      width: 1,
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },
  nameTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    align: 'right',
  },
  axisLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    padding: [0, 12, 0, 0],
  },
  splitLine: {
    show: true,
    lineStyle: {
      width: 1,
      color: 'rgba(255, 255, 255, 0.2)',
      type: 'dashed',
    },
    showMinLine: false,
  },
}

// 预设的网格配置
export const defaultGrid: EChartsOption['grid'] = {
  top: '15%',
  left: '5%',
  right: '5%',
  bottom: '8%',
  containLabel: true,
}

// 预设的图例配置
export const defaultLegend: EChartsOption['legend'] = {
  top: '8%',
  right: '5%',
  show: true,
  itemWidth: 14,
  itemHeight: 14,
  itemGap: 16,
  textStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    padding: [0, 0, 0, 8],
  },
}

// 预设的提示框配置
export const defaultTooltip: EChartsOption['tooltip'] = {
  trigger: 'axis',
  axisPointer: {
    show: true,
    type: 'shadow',
  },
  backgroundColor: 'transparent',
  borderWidth: 0,
  padding: 0,
}

// 合并所有默认配置
export const defaultChartOptions: Partial<EChartsOption> = {
  grid: defaultGrid,
  legend: defaultLegend,
  tooltip: defaultTooltip,
  xAxis: defaultXAxis,
  yAxis: defaultYAxis,
}

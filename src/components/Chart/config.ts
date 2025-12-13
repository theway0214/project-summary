import type { EChartsOption } from 'echarts'

// 默认的 tooltip 配置
export const defaultTooltipConfig: EChartsOption['tooltip'] = {
  trigger: 'axis',
  axisPointer: {
    type: 'line',
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.3)',
      width: 1,
      type: 'dashed',
    },
  },
  backgroundColor: 'rgba(255,255,255,0.3)',
  borderWidth: 0,
  padding: 0,
  textStyle: {
    color: '#fff',
    fontSize: 14,
  },
  // 添加动画效果
  transitionDuration: 0.2,
  // 添加阴影效果
  extraCssText: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); border-radius: 8px;',
}

// 默认的 x 轴配置
export const defaultXAxisConfig: EChartsOption['xAxis'] = {
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
  splitLine: {
    show: false,
  },
}

// 默认的 y 轴配置
export const defaultYAxisConfig: EChartsOption['yAxis'] = {
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
  },
  axisLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    padding: [0, 12, 0, 0],
  },
  splitLine: {
    show: true,
    showMinLine: false,
    lineStyle: {
      width: 1,
      color: 'rgba(255, 255, 255, 0.2)',
      type: 'dashed',
    },
  },
}

// 默认的网格配置
export const defaultGridConfig: EChartsOption['grid'] = {
  top: '15%',
  left: '5%',
  right: '5%',
  bottom: '8%',
  containLabel: true,
}

// 默认的图例配置
export const defaultLegendConfig: EChartsOption['legend'] = {
  top: '8%',
  right: '5%',
  show: true,
  icon: 'rich',
  itemWidth: 14,
  itemHeight: 14,
  itemGap: 16,
  textStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    padding: [0, 0, 0, 8],
  },
}

// 默认的文本样式配置
export const defaultTextStyle: EChartsOption['textStyle'] = {
  fontSize: 14,
  fontFamily: 'OPPOSans-Regular',
  color: '#FFFFFF',
}

// 合并所有默认配置
export const defaultChartOptions: Partial<EChartsOption> = {
  textStyle: defaultTextStyle,
  grid: defaultGridConfig,
  legend: defaultLegendConfig,
  tooltip: defaultTooltipConfig,
  xAxis: defaultXAxisConfig,
  yAxis: defaultYAxisConfig,
}

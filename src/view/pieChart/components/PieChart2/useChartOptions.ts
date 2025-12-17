/**
 * PieChart2 图表配置 Hook
 * @author xhj
 * @since 2025-12-17
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { NaturalGasPipelineItem } from './mockData'
// 引入 echarts-gl 以支持 3D 图表
import 'echarts-gl'

/**
 * 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
 */
const getParametricEquation = (startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, h: number) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1)
    isSelected = false
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x(u: number, v: number) {
      if (u < startRadian)
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian)
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y(u: number, v: number) {
      if (u < startRadian)
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian)
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z(u: number, v: number) {
      if (u < -Math.PI * 0.5)
        return Math.sin(u)
      if (u > Math.PI * 2.5)
        return Math.sin(u) * h * 0.1
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    },
  }
}

/**
 * 获取3d饼图的最高扇区的高度
 */
const getHeight3D = (series: Array<{ pieData: { value: number } }>, height: number) => {
  series.sort((a, b) => {
    return b.pieData.value - a.pieData.value
  })
  return (height * 25) / series[0].pieData.value
}

/**
 * 格式化浮点数
 */
const formatFloat = (num: number, n: number) => {
  let f = Number.parseFloat(String(num))
  if (Number.isNaN(f))
    return '0'
  f = Math.round(num * 10 ** n) / 10 ** n // n 幂
  let s = f.toString()
  let rs = s.indexOf('.')

  // 判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length
    s += '.'
  }

  while (s.length <= rs + n)
    s += '0'
  return s
}

interface PieDataItem {
  name: string
  value: number
  lengthRatio: number
}

const getPie3D = (pieData: PieDataItem[], internalDiameterRatio: number, distance: number, alpha: number, pieHeight: number) => {
  const colors = ['#CD51EC', '#308CF7', '#1EDAE6', '#EFB030', '#EE8254', '#16C172', '#5D5AE6']
  const series: Array<{
    name: string
    type: string
    parametric: boolean
    color: string
    wireframe: { show: boolean }
    pieData: PieDataItem & { startRatio?: number; endRatio?: number }
    pieStatus: { selected: boolean; hovered: boolean; k: number }
    parametricEquation?: ReturnType<typeof getParametricEquation>
  }> = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const legendBfb: Array<{ name: string; value: number }> = []
  const k = 1 - internalDiameterRatio
  pieData.sort((a, b) => {
    return b.value - a.value
  })

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value
    const seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      color: colors[i % colors.length],
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    }

    series.push(seriesItem)
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio!,
      series[i].pieData.endRatio!,
      false,
      false,
      k,
      series[i].pieData.value,
    )
    startValue = endValue
    legendBfb.push({
      name: series[i].name,
      value: pieData.find(item => item.name === series[i].name)?.lengthRatio || 0,
    })
  }
  const boxHeight = getHeight3D(series, pieHeight) // 通过pieHeight设定3d饼/环的高度，单位是px
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const option: any = {
    colors,
    legend: {
      show: true,
      icon: 'rect',
      itemGap: 16,
      type: 'scroll',
      pageIconColor: '#76b9ff',
      pageIconInactiveColor: 'yellow',
      pageTextStyle: {
        color: '#76b9ff',
        fontSize: 12,
      },
      pageIconSize: 10,
      orient: 'vertical',
      top: '60%',
      right: '10%',
      textStyle: {
        align: 'left',
        color: '#fff',
        fontSize: 12,
      },
      formatter: (name: string) => {
        const item = legendBfb.find(item => item.name === name)
        if (!item) return name
        const bfs = formatFloat(item.value, 2)
        return `${name} ${bfs === 'NaN' ? '0' : bfs}%`
      },
    },
    labelLine: {
      show: true,
      lineStyle: {
        color: '#fff',
      },
    },
    label: {
      show: true,
      position: 'outside',
      formatter: '{b} \n{c} {d}%',
      color: '#fff',
      fontSize: 12,
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = params as any
        const seriesName = p?.seriesName || p?.name || (Array.isArray(p) ? p[0]?.seriesName : '')
        const color = p?.color || (Array.isArray(p) ? p[0]?.color : '#5470C6')
        const item = pieData.find((item) => item.name === seriesName)
        if (!item) return ''
        return `<div style="color: #fff; font-size: 14px; padding: 8px;">
          <div style="margin-bottom: 10px; font-size: 14px;">${item.name}</div>
          <div style="display: flex; margin: 5px 0; align-items: center;">
            <div style="width: 6px; height: 12px; background-color: ${color}; margin-right: 8px;"></div>
            <div style="font-size: 13px;">长度: ${item.value}公里</div>
          </div>
          <div style="display: flex; margin: 5px 0; align-items: center;">
            <div style="width: 6px; height: 12px; background-color: ${color}; margin-right: 8px;"></div>
            <div style="font-size: 13px;">百分比：${item.lengthRatio}%</div>
          </div>
        </div>`
      },
      backgroundColor: 'rgba(255,255,255,0.14)',
      extraCssText: 'backdrop-filter: blur(60px);',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    xAxis3D: {
      min: -1.7,
      max: 1.7,
    },
    yAxis3D: {
      min: -1.7,
      max: 1.7,
    },
    zAxis3D: {
      min: -1.7,
      max: 1.7,
    },
    grid3D: {
      left: '-15%',
      top: '2%',
      right: '0%',
      show: false,
      boxHeight,
      viewControl: {
        alpha,
        distance,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true,
      },
    },
    series,
  }
  return option
}

export function useChartOptions(data: NaturalGasPipelineItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const pieData = data.map((item) => ({
      name: item.pipelineName,
      value: item.length,
      lengthRatio: item.lengthRatio,
    }))

    return getPie3D(pieData, 0, 280, 30, 45)
  }, [data])

  return chartOptions
}

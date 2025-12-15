/**
 * DualColorLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { DualColorLineDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

/**
 * 处理数据，生成正值和负值两个系列
 */
function processData(data: DualColorLineDataItem[]) {
  const result: { x: number; label: string; pos: number | null; neg: number | null }[] = []

  for (let i = 0; i < data.length; i++) {
    const curr = data[i]
    const next = i < data.length - 1 ? data[i + 1] : null

    if (curr.value >= 0) {
      result.push({ x: i, label: curr.name, pos: curr.value, neg: null })
    } else {
      result.push({ x: i, label: curr.name, pos: null, neg: curr.value })
    }

    if (next !== null && curr.value * next.value < 0) {
      const y1 = curr.value
      const y2 = next.value
      const xCross = i - y1 / (y2 - y1)

      result.push({
        x: xCross,
        label: '',
        pos: 0,
        neg: 0
      })
    }
  }

  result.sort((a, b) => a.x - b.x)

  const xAxisData: number[] = result.map(r => r.x)
  const xAxisLabels: Record<number, string> = {}
  result.forEach(r => {
    if (r.label) {
      xAxisLabels[r.x] = r.label
    }
  })

  return {
    xAxisData,
    xAxisLabels,
    positiveData: result.map(r => r.pos),
    negativeData: result.map(r => r.neg),
  }
}

export function useChartOptions(data: DualColorLineDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const { positiveData, negativeData, xAxisData, xAxisLabels } = processData(data)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
            width: 1,
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const validItems = paramArray.filter(item => {
            const value = item.value as number | null
            const name = String(item.name)
            return value !== null && xAxisLabels[Number(name)] !== undefined
          })
          if (validItems.length === 0) return ''

          const item = validItems[0]
          const value = item.value as number
          const xValue = Number(item.name)
          const color = value >= 0 ? '#91CC75' : '#EE6666'
          const list: TooltipItem[] = [{
            color,
            label: '收益',
            value: `${value >= 0 ? '+' : ''}${value}`,
          }]
          const title = xAxisLabels[xValue] || ''
          return createTooltipContainer(title, list)
        },
      },
      legend: {
        show: true,
        top: 10,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        data: ['正收益', '负收益'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '18%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: false,
        min: 0,
        max: data.length - 1,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          formatter: (value: number) => {
            if (Number.isInteger(value) && value >= 0 && value < data.length) {
              return xAxisLabels[value] || ''
            }
            return ''
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        name: '收益',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
      series: [
        {
          name: '正收益',
          type: 'line',
          data: positiveData.map((val, idx) => val === null ? null : [xAxisData[idx], val]),
          smooth: false,
          connectNulls: false,
          lineStyle: {
            color: '#91CC75',
            width: 3,
          },
          symbol: 'circle',
          symbolSize: (value: number | number[] | null) => {
            const val = Array.isArray(value) ? value[1] : value
            return val === 0 ? 0 : 8
          },
          itemStyle: {
            color: '#91CC75',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(145, 204, 117, 0.4)' },
                { offset: 1, color: 'rgba(145, 204, 117, 0.05)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(145, 204, 117, 0.5)',
            },
          },
        },
        {
          name: '负收益',
          type: 'line',
          data: negativeData.map((val, idx) => val === null ? null : [xAxisData[idx], val]),
          smooth: false,
          connectNulls: false,
          lineStyle: {
            color: '#EE6666',
            width: 3,
          },
          symbol: 'circle',
          symbolSize: (value: number | number[] | null) => {
            const val = Array.isArray(value) ? value[1] : value
            return val === 0 ? 0 : 8
          },
          itemStyle: {
            color: '#EE6666',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(238, 102, 102, 0.4)' },
                { offset: 1, color: 'rgba(238, 102, 102, 0.05)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(238, 102, 102, 0.5)',
            },
          },
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              type: 'solid',
              width: 2,
            },
            label: {
              show: true,
              position: 'end',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 11,
              formatter: '0',
            },
            data: [
              { yAxis: 0 },
            ],
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

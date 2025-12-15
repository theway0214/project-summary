/**
 * GroupedBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { GroupedBarDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: GroupedBarDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const categories = data.map((item) => item.category)
    const year2011Data = data.map((item) => item.year2011)
    const year2012Data = data.map((item) => item.year2012)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: item.color as string,
            label: item.seriesName || '',
            value: (item.value as number).toLocaleString(),
          }))
          const title = paramArray[0]?.name || ''
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
        itemWidth: 14,
        itemHeight: 14,
        icon: 'rect',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          formatter: (value: number) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'K'
            }
            return value.toString()
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: categories,
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
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: year2011Data,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#37A2DA' },
                { offset: 1, color: '#67E0E3' },
              ],
            },
            borderRadius: [0, 4, 4, 0],
          },
        },
        {
          name: '2012年',
          type: 'bar',
          data: year2012Data,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#9FE6B8' },
                { offset: 1, color: '#32C5E9' },
              ],
            },
            borderRadius: [0, 4, 4, 0],
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

/**
 * BaseBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { BaseBarDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: BaseBarDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const stacking = 50
    const maxSum = 400

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => {
            const color = typeof item.color === 'string'
              ? item.color
              : (item.color as { colorStops?: Array<{ color: string }> })?.colorStops?.[0]?.color || '#5470C6'
            return {
              color,
              label: item.seriesName || '',
              value: item.value as number,
            }
          })
          const title = paramArray[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.data_time + '年'),
        axisLine: {
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
      yAxis: [
        {
          name: '万千瓦',
          type: 'value',
          splitNumber: 4,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          nameTextStyle: {
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.7)',
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
            formatter: (value: number | string) => {
              const numValue = typeof value === 'number' ? value : parseFloat(value)
              return `${numValue.toFixed(0)}`
            },
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      ],
      series: [
        {
          name: '基础负荷',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map((item) => item.peak_valley_difference_rate),
          stack: '1',
          label: {
            show: true,
            position: 'top',
            color: '#FFFFFF',
            fontSize: 12,
            offset: [0, -4],
            formatter: (params: CallbackDataParams) => {
              const dataValue = typeof params.data === 'number' ? params.data : 0
              return `${dataValue + stacking}`
            },
          },
          itemStyle: {
            color: '#5470C6',
            borderRadius: [0, 0, 0, 0],
          },
          barWidth: '40%',
        },
        {
          name: '降温负荷',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map(() => stacking),
          stack: '1',
          tooltip: {
            show: false,
          },
          label: {
            show: false,
          },
          itemStyle: {
            color: '#91CC75',
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '40%',
        },
        {
          name: '背景',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map(() => maxSum),
          tooltip: {
            show: false,
          },
          label: {
            show: false,
          },
          barGap: '-100%',
          itemStyle: {
            color: 'rgba(255, 255, 255, 0.05)',
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '40%',
        },
      ],
    }
  }, [data])

  return chartOptions
}

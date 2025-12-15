/**
 * NegativeBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { NegativeBarDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: NegativeBarDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const item = paramArray[0]
          const value = item.value as number
          const color = value >= 0 ? '#91CC75' : '#EE6666'
          const list: TooltipItem[] = [{
            color,
            label: '利润',
            value: `${value >= 0 ? '+' : ''}${value}万`,
          }]
          const title = item.name || ''
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
      xAxis: {
        type: 'category',
        data: data.map(item => item.month),
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
      yAxis: {
        type: 'value',
        name: '利润(万)',
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
          name: '利润',
          type: 'bar',
          barWidth: '50%',
          data: data.map(item => ({
            value: item.value,
            itemStyle: {
              color: item.value >= 0 ? '#91CC75' : '#EE6666',
              borderRadius: item.value >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
            },
          })),
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 11,
            formatter: (params: CallbackDataParams) => {
              const value = params.value as number
              return value >= 0 ? `+${value}` : `${value}`
            },
          },
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 0,
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.5)',
                  type: 'solid',
                },
                label: {
                  show: false,
                },
              },
            ],
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

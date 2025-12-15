/**
 * RoundedBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { RoundedBarDataItem } from './mockData'
import { colorPalette } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: RoundedBarDataItem[]) {
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
          const list: TooltipItem[] = [{
            color: item.color as string,
            label: '完成率',
            value: `${item.value}%`,
          }]
          const title = item.name || ''
          return createTooltipContainer(title, list)
        },
      },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        max: 100,
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          formatter: '{value}%',
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
        data: data.map(item => item.name),
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '完成率',
          type: 'bar',
          barWidth: 20,
          data: data.map((item, index) => ({
            value: item.value,
            itemStyle: {
              color: colorPalette[index % colorPalette.length],
              borderRadius: 10,
            },
          })),
          label: {
            show: true,
            position: 'right',
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            formatter: '{c}%',
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            borderRadius: 10,
          },
          animationDelay: (idx: number) => idx * 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    }
  }, [data])

  return chartOptions
}

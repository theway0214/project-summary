/**
 * PolarBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { PolarBarDataItem } from './mockData'
import { colorPalette } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: PolarBarDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textStyle: {
          color: '#fff',
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const item = paramArray[0]
          const list: TooltipItem[] = [{
            color: item.color as string || '#5470C6',
            label: '访问量',
            value: item.value as number,
          }]
          const title = item.name || ''
          return createTooltipContainer(title, list)
        },
      },
      angleAxis: {
        type: 'category',
        data: data.map(item => item.name),
        startAngle: 90,
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
      radiusAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 10,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      polar: {
        radius: ['20%', '80%'],
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'bar',
          coordinateSystem: 'polar',
          data: data.map((item, index) => ({
            value: item.value,
            itemStyle: {
              color: colorPalette[index % colorPalette.length],
            },
          })),
          barWidth: 20,
          roundCap: true,
          label: {
            show: true,
            position: 'middle',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            formatter: '{c}',
          },
        },
      ],
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: () => Math.random() * 200,
    }
  }, [data])

  return chartOptions
}

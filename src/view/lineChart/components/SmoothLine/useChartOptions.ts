/**
 * SmoothLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { SmoothLineDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: SmoothLineDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(91, 204, 117, 0.5)',
            width: 2,
            type: 'solid',
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: item.color as string || '#91CC75',
            label: item.seriesName || '',
            value: `${(item.value as number).toLocaleString()}`,
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
        itemWidth: 25,
        itemHeight: 10,
        icon: 'path://M0,5 Q5,0 10,5 T20,5',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(item => item.name),
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          interval: 0,
          rotate: 0,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        name: '销售额',
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
          formatter: (value: number) => {
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k'
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
        min: (value: { min: number }) => Math.floor(value.min * 0.9),
        max: (value: { max: number }) => Math.ceil(value.max * 1.1),
      },
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          smoothMonotone: 'x',
          data: data.map(item => item.value),
          lineStyle: {
            color: '#91CC75',
            width: 3,
            cap: 'round',
            join: 'round',
          },
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          itemStyle: {
            color: '#91CC75',
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            scale: true,
            itemStyle: {
              color: '#91CC75',
              borderColor: '#fff',
              borderWidth: 3,
              shadowBlur: 15,
              shadowColor: 'rgba(145, 204, 117, 0.6)',
            },
            lineStyle: {
              width: 4,
            },
          },
          animationDuration: 1500,
          animationEasing: 'cubicInOut',
        },
      ],
    }
  }, [data])

  return chartOptions
}

/**
 * StepLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { StepLineDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: StepLineDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(238, 102, 102, 0.5)',
            width: 2,
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: item.color as string || '#EE6666',
            label: item.seriesName || '',
            value: `¥${item.value}`,
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
        data: [
          { name: '阶梯价格', icon: 'path://M0,10 L10,10 L10,0 L20,0' },
        ],
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
        data: data.map(item => item.date),
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 11,
          rotate: 30,
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
        name: '价格(元)',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        min: 50,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          formatter: '¥{value}',
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
          name: '阶梯价格',
          type: 'line',
          step: 'middle',
          data: data.map(item => item.price),
          lineStyle: {
            color: '#EE6666',
            width: 3,
          },
          symbol: 'rect',
          symbolSize: [8, 8],
          itemStyle: {
            color: '#EE6666',
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 10,
            formatter: (params: CallbackDataParams) => {
              const dataIndex = params.dataIndex as number
              if (dataIndex === 0) return `¥${params.value}`
              const prevValue = data[dataIndex - 1].price
              const currValue = params.value as number
              if (prevValue !== currValue) {
                return `¥${currValue}`
              }
              return ''
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(238, 102, 102, 0.3)' },
                { offset: 1, color: 'rgba(238, 102, 102, 0)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: '#EE6666',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(238, 102, 102, 0.5)',
            },
          },
          markArea: {
            silent: true,
            itemStyle: {
              color: 'rgba(238, 102, 102, 0.1)',
            },
            data: [
              [
                { yAxis: 180 },
                { yAxis: 250 },
              ],
            ],
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

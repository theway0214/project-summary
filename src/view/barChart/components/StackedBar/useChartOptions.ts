/**
 * StackedBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { EnergyDataItem } from './mockData'
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

export function useChartOptions(data: EnergyDataItem[], noData: boolean) {
  const chartOptions: ChartOption = useMemo(() => {
    if (noData || !data || data.length === 0) {
      return {}
    }

    const xAxisData = data.map((item) => `${item.year}`)
    const fossil_energy = data.map((item) => {
      return item.fossil_energy ? Number(item.fossil_energy.replace('%', '')) : 0
    })
    const non_fossil_energy = data.map((item) => {
      return item.non_fossil_energy ? Number(item.non_fossil_energy.replace('%', '')) : 0
    })

    return {
      tooltip: {
        formatter: (params: TopLevelFormatterParams) => {
          const paramList = Array.isArray(params) ? params : [params]
          const list = paramList.map((item) => {
            const color = item.color
            const bgColor =
              color && typeof color === 'object' && 'colorStops' in color
                ? color.colorStops?.[0]?.color
                : color
            return {
              color: bgColor as string,
              label: item.seriesName || '',
              value: item.data as number,
            }
          }) as TooltipItem[]
          const title = paramList[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      legend: {
        top: '3%',
        data: ['非化石能源', '化石能源'],
        textStyle: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.8)',
        },
        itemWidth: 14,
        itemHeight: 10,
        itemGap: 20,
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: {
        data: xAxisData,
        axisLabel: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
      yAxis: {
        name: '%',
        type: 'value',
        nameTextStyle: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.7)',
          padding: [0, 30, 0, 0],
        },
        axisLabel: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.15)',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
          show: true,
          zoomOnMouseWheel: false,
          moveOnMouseMove: false,
          moveOnMouseWheel: true,
          xAxisIndex: 0,
          startValue: xAxisData.length - 10,
          endValue: xAxisData.length,
        },
      ],
      series: [
        {
          name: '化石能源',
          type: 'bar',
          yAxisIndex: 0,
          data: fossil_energy,
          stack: '1',
          color: 'rgba(248,190,41,1)',
          barWidth: 24,
          barGap: '30%',
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#01AEB9',
                },
                {
                  offset: 1,
                  color: 'rgba(1, 174, 185, 0)',
                },
              ],
            },
            borderWidth: 2,
            borderColor: '#01AEB9',
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 12,
            color: '#fff',
            offset: [0, 20],
            formatter: '{c}%',
          },
        },
        {
          name: '',
          type: 'bar',
          data: non_fossil_energy.map(() => 2),
          tooltip: {
            show: false,
          },
          stack: '1',
          color: 'rgba(248,190,41,1)',
          barWidth: 24,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
          },
        },
        {
          name: '非化石能源',
          type: 'bar',
          data: non_fossil_energy,
          stack: '1',
          color: 'rgba(248,190,41,1)',
          barWidth: 24,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0.1,
                  color: '#068DFF',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 117, 216, 0)',
                },
              ],
            },
            borderWidth: 2,
            borderColor: '#0075D8',
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 12,
            color: '#fff',
            offset: [0, 20],
            formatter: (params: { value: number }) => {
              return `${params.value}%`
            },
          },
        },
      ],
    }
  }, [data, noData])

  return chartOptions
}

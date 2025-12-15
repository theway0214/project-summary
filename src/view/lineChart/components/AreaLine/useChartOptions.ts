/**
 * AreaLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { AreaLineDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: AreaLineDataItem[]) {
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
            color: 'rgba(250, 200, 88, 0.5)',
            width: 2,
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: '#FAC858',
            label: item.seriesName || '',
            value: `${item.value} 人`,
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
        itemWidth: 20,
        itemHeight: 10,
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
        data: data.map(item => item.time),
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
        name: '在线人数',
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
          name: '在线人数',
          type: 'line',
          smooth: true,
          data: data.map(item => item.value),
          lineStyle: {
            color: '#FAC858',
            width: 2,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(250, 200, 88, 0.5)' },
                { offset: 0.5, color: 'rgba(250, 200, 88, 0.2)' },
                { offset: 1, color: 'rgba(250, 200, 88, 0)' },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          itemStyle: {
            color: '#FAC858',
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            showSymbol: true,
            itemStyle: {
              color: '#FAC858',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(250, 200, 88, 0.5)',
            },
          },
          markPoint: {
            symbol: 'pin',
            symbolSize: 50,
            itemStyle: {
              color: '#FAC858',
            },
            label: {
              color: '#fff',
              fontSize: 10,
            },
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            lineStyle: {
              color: '#EE6666',
              type: 'dashed',
              width: 1,
            },
            label: {
              color: '#EE6666',
              fontSize: 10,
              formatter: '平均: {c}',
            },
            data: [
              { type: 'average', name: '平均值' },
            ],
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

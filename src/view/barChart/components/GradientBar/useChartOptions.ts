/**
 * GradientBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { GradientBarDataItem } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: GradientBarDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const xAxisData = data.map((item) => `${item.year}`)
    const growth_rate_curve = data.map((item) => item.growth_rate_curve)
    const GDPList = data.map((item) => item.unit_gdp)

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
      legend: {
        top: '4%',
        right: '15%',
        data: ['单位GDP能耗', '增长率曲线'],
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '25%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
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
          name: '万吨',
          type: 'value',
          splitNumber: 4,
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
        {
          name: '%',
          type: 'value',
          position: 'right',
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
          },
          splitNumber: 4,
          splitLine: {
            show: false,
          },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          show: true,
          zoomOnMouseWheel: false,
          moveOnMouseMove: false,
          moveOnMouseWheel: true,
          xAxisIndex: 0,
          startValue: GDPList.length - 10,
          endValue: GDPList.length,
        },
      ],
      series: [
        {
          name: '增长率曲线',
          type: 'line',
          smooth: false,
          showAllSymbol: false,
          yAxisIndex: 1,
          symbol: 'emptyCircle',
          symbolSize: 0,
          itemStyle: {
            color: '#E8E26B',
          },
          lineStyle: {
            type: [6, 10],
            dashOffset: 6,
            width: 2,
          },
          data: growth_rate_curve,
        },
        {
          name: '单位GDP能耗',
          type: 'bar',
          yAxisIndex: 0,
          data: GDPList,
          stack: '1',
          barWidth: '50%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#068dfd' },
                { offset: 1, color: 'rgba(0, 117, 216, 0)' },
              ],
            },
            borderWidth: 2,
            borderColor: '#068dfd',
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff',
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

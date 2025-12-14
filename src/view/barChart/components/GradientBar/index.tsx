/**
 * 渐变柱状图组件
 * @author xhj
 * @since 2025-12-13
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据
const mockData = [
  { month: '1月', value: 820 },
  { month: '2月', value: 932 },
  { month: '3月', value: 901 },
  { month: '4月', value: 934 },
  { month: '5月', value: 1290 },
  { month: '6月', value: 1330 },
  { month: '7月', value: 1520 },
  { month: '8月', value: 1450 },
  { month: '9月', value: 1200 },
  { month: '10月', value: 1100 },
  { month: '11月', value: 980 },
  { month: '12月', value: 1050 },
]

export default function GradientBar() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
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
      xAxis: {
        type: 'category',
        data: mockData.map(item => item.month),
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
        name: '销售额',
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
          name: '销售额',
          type: 'bar',
          barWidth: '50%',
          data: mockData.map(item => item.value),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ],
              },
            },
          },
        },
      ],
    }
  }, [])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="渐变柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

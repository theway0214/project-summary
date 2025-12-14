/**
 * 正负值柱状图组件
 * @author xhj
 * @since 2025-12-13
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据 - 利润数据
const mockData = [
  { month: '1月', value: 200 },
  { month: '2月', value: 170 },
  { month: '3月', value: -140 },
  { month: '4月', value: -230 },
  { month: '5月', value: -130 },
  { month: '6月', value: 100 },
  { month: '7月', value: 230 },
  { month: '8月', value: 350 },
  { month: '9月', value: 250 },
  { month: '10月', value: -50 },
  { month: '11月', value: 180 },
  { month: '12月', value: 310 },
]

export default function NegativeBar() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
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
          data: mockData.map(item => ({
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
  }, [])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="正负值柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

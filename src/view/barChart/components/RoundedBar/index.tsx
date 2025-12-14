/**
 * 圆角柱状图组件（带动画效果）
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
  { name: 'A产品', value: 43.3 },
  { name: 'B产品', value: 83.1 },
  { name: 'C产品', value: 86.4 },
  { name: 'D产品', value: 72.4 },
  { name: 'E产品', value: 65.2 },
  { name: 'F产品', value: 53.9 },
  { name: 'G产品', value: 39.1 },
]

const colorPalette = [
  '#5470C6',
  '#91CC75',
  '#FAC858',
  '#EE6666',
  '#73C0DE',
  '#3BA272',
  '#FC8452',
]

export default function RoundedBar() {
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
        data: mockData.map(item => item.name),
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
          data: mockData.map((item, index) => ({
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
  }, [])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="圆角柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

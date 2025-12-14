/**
 * 极坐标柱状图组件
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
  { name: '周一', value: 120 },
  { name: '周二', value: 200 },
  { name: '周三', value: 150 },
  { name: '周四', value: 80 },
  { name: '周五', value: 70 },
  { name: '周六', value: 180 },
  { name: '周日', value: 140 },
]

// 颜色列表
const colorPalette = [
  '#5470C6',
  '#91CC75',
  '#FAC858',
  '#EE6666',
  '#73C0DE',
  '#3BA272',
  '#FC8452',
]

export default function PolarBar() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
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
        data: mockData.map(item => item.name),
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
      series: [
        {
          type: 'bar',
          coordinateSystem: 'polar',
          data: mockData.map((item, index) => ({
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
  }, [])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="极坐标柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据接口
interface ChartDataItem {
  data_time: string
  peak_valley_difference_rate: number
  cooling_load?: number
}

// 示例数据
const mockData: ChartDataItem[] = [
  { data_time: '2020', peak_valley_difference_rate: 120, cooling_load: 50 },
  { data_time: '2021', peak_valley_difference_rate: 200, cooling_load: 80 },
  { data_time: '2022', peak_valley_difference_rate: 150, cooling_load: 60 },
  { data_time: '2023', peak_valley_difference_rate: 250, cooling_load: 100 },
  { data_time: '2024', peak_valley_difference_rate: 300, cooling_load: 120 },
]

export default function BaseBar() {
  // 计算数据
  const chartData = useMemo(() => {
    const data = mockData
    const stacking = 50 // 示例值，可以根据实际需求调整
    const maxSum = 400 // 示例值，可以根据实际需求调整
    
    return {
      data,
      stacking,
      maxSum,
    }
  }, [])

  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    const { data, stacking, maxSum } = chartData

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
      legend: {
        show: false,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.data_time + '年'),
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
          name: '万千瓦',
          type: 'value',
          splitNumber: 4,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          nameTextStyle: {
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.7)',
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
            formatter: (value: number | string) => {
              const numValue = typeof value === 'number' ? value : parseFloat(value)
              return `${numValue.toFixed(0)}`
            },
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      ],
      series: [
        {
          name: '基础负荷',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map((item) => item.peak_valley_difference_rate),
          stack: '1',
          label: {
            show: true,
            position: 'top',
            color: '#FFFFFF',
            fontSize: 12,
            offset: [0, -4],
            formatter: (params: CallbackDataParams) => {
              const dataValue = typeof params.data === 'number' ? params.data : 0
              return `${dataValue + stacking}`
            },
          },
          itemStyle: {
            color: '#5470C6',
            borderRadius: [0, 0, 0, 0],
          },
          barWidth: '40%',
        },
        {
          name: '降温负荷',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map(() => stacking),
          stack: '1',
          tooltip: {
            show: false,
          },
          label: {
            show: false,
          },
          itemStyle: {
            color: '#91CC75',
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '40%',
        },
        {
          name: '背景',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map(() => maxSum),
          tooltip: {
            show: false,
          },
          label: {
            show: false,
          },
          barGap: '-100%',
          itemStyle: {
            color: 'rgba(255, 255, 255, 0.05)',
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '40%',
        },
      ],
    }
  }, [chartData])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container 
      title="基础柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}
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
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => {
            const color = typeof item.color === 'string' 
              ? item.color 
              : (item.color as { colorStops?: Array<{ color: string }> })?.colorStops?.[0]?.color || '#396FBC'
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
        left: '60px',
        top: '15%',
        right: '50px',
        bottom: '10%',
        containLabel: true,
      },
      legend: [
        {
          show: false,
          top: 40,
          right: '15%',
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 16,
          icon: 'rect',
          textStyle: {
            fontFamily: 'OPPOSans-Regular',
            fontSize: 14,
            color: '#FFFFFF',
            padding: [0, 0, 0, 8],
          },
          data: ['基础负荷', '降温负荷'],
        },
      ],
      xAxis: {
        type: 'category',
        data: data.map((item) => item.data_time + '年'),
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 14,
          fontFamily: 'OPPOSans-Medium',
          padding: [8, 0, 0, 0],
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
              width: 1,
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          nameTextStyle: {
            fontSize: 14,
            fontFamily: 'OPPOSans-Regular',
            color: '#FFFFFF',
            padding: [0, 0, 0, 0],
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 14,
            fontFamily: 'OPPOSans-Medium',
            padding: [0, 12, 0, 0],
            formatter: (value: number | string) => {
              const numValue = typeof value === 'number' ? value : parseFloat(value)
              return `${numValue.toFixed(0)}.0`
            },
          },
          splitLine: {
            show: true,
            showMinLine: false,
            lineStyle: {
              type: 'dashed',
              width: 1,
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
          color: '#396FBC',
          stack: '1',
          label: {
            show: true,
            position: 'top',
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'OPPOSans-Bold',
            offset: [0, -8],
            formatter: (params: CallbackDataParams) => {
              const dataValue = typeof params.data === 'number' ? params.data : 0
              return `${dataValue + stacking}`
            },
          },
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#1D9FAA',
                },
                {
                  offset: 1,
                  color: 'rgba(31, 165, 120, 0)',
                },
              ],
            },
          },
          barWidth: 40,
        },
        {
          name: '降温负荷',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map(() => stacking),
          color: '#2BAFD4',
          stack: '1',
          tooltip: {
            show: false,
          },
          label: {
            show: false,
            position: 'top',
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'OPPOSans-Bold',
            fontWeight: 'bold',
            offset: [0, 8],
          },
          itemStyle: {
            color: '#fff',
          },
          barWidth: 40,
        },
        {
          name: '基础负荷',
          type: 'bar',
          yAxisIndex: 0,
          data: data.map(() => maxSum),
          color: '#396FBC',
          tooltip: {
            show: false,
          },
          label: {
            show: false,
            position: 'top',
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'OPPOSans-Bold',
            offset: [0, -8],
            formatter: (params: CallbackDataParams) => {
              const dataValue = typeof params.data === 'number' ? params.data : 0
              return `${dataValue + stacking}`
            },
          },
          barGap: '-105%',
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(107, 191, 237, 0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 255, 255, 0)',
                },
              ],
            },
          },
          barWidth: 50,
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
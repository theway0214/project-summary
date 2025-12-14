/**
 * 阶梯折线图组件
 * @author xhj
 * @since 2025-12-14
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据 - 价格阶梯
const mockData = [
  { date: '2024-01', price: 100 },
  { date: '2024-02', price: 100 },
  { date: '2024-03', price: 120 },
  { date: '2024-04', price: 120 },
  { date: '2024-05', price: 150 },
  { date: '2024-06', price: 150 },
  { date: '2024-07', price: 180 },
  { date: '2024-08', price: 180 },
  { date: '2024-09', price: 160 },
  { date: '2024-10', price: 160 },
  { date: '2024-11', price: 200 },
  { date: '2024-12', price: 200 },
]

export default function StepLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      // 提示框配置
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
      // 图例配置
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
      // 网格配置
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true,
      },
      // X轴配置
      xAxis: {
        type: 'category',
        data: mockData.map(item => item.date),
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 11,
          rotate: 30, // 旋转标签避免重叠
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      // Y轴配置
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
      // 系列配置
      series: [
        {
          name: '阶梯价格',
          type: 'line',
          step: 'middle', // 阶梯类型: 'start' | 'middle' | 'end'
          data: mockData.map(item => item.price),
          // 线条样式
          lineStyle: {
            color: '#EE6666',
            width: 3,
          },
          // 拐点样式
          symbol: 'rect', // 矩形标记
          symbolSize: [8, 8],
          itemStyle: {
            color: '#EE6666',
            borderColor: '#fff',
            borderWidth: 2,
          },
          // 标签配置
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 10,
            formatter: (params: CallbackDataParams) => {
              // 只在价格变化时显示标签
              const dataIndex = params.dataIndex as number
              if (dataIndex === 0) return `¥${params.value}`
              const prevValue = mockData[dataIndex - 1].price
              const currValue = params.value as number
              if (prevValue !== currValue) {
                return `¥${currValue}`
              }
              return ''
            },
          },
          // 面积填充
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
          // 高亮配置
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: '#EE6666',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(238, 102, 102, 0.5)',
            },
          },
          // 标记区域 - 高价区
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
  }, [])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="阶梯折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

/**
 * 基础折线图组件
 * @author xhj
 * @since 2025-12-14
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据
const mockData = [
  { name: '周一', value: 150 },
  { name: '周二', value: 230 },
  { name: '周三', value: 224 },
  { name: '周四', value: 218 },
  { name: '周五', value: 135 },
  { name: '周六', value: 147 },
  { name: '周日', value: 260 },
]

export default function BaseLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      // 提示框配置
      tooltip: {
        trigger: 'axis', // 触发类型：坐标轴触发
        axisPointer: {
          type: 'cross', // 十字准星指示器
          crossStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
            type: 'dashed',
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: item.color as string || '#5470C6',
            label: item.seriesName || '',
            value: item.value as number,
          }))
          const title = paramArray[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      // 图例配置
      legend: {
        show: true,
        top: 10,
        right: 10,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        itemWidth: 20,
        itemHeight: 10,
        icon: 'roundRect',
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
        boundaryGap: false, // 折线图两端不留白
        data: mockData.map(item => item.name),
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
        name: '数值',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          padding: [0, 40, 0, 0],
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
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
      // 系列配置
      series: [
        {
          name: '访问量',
          type: 'line',
          data: mockData.map(item => item.value),
          // 线条样式
          lineStyle: {
            color: '#5470C6',
            width: 2,
          },
          // 拐点样式
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#5470C6',
            borderColor: '#fff',
            borderWidth: 2,
          },
          // 标签配置
          label: {
            show: false,
            position: 'top',
            color: '#fff',
            fontSize: 12,
          },
          // 高亮配置
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: '#5470C6',
              borderColor: '#fff',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(84, 112, 198, 0.5)',
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
      title="基础折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

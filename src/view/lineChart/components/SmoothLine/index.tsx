/**
 * 平滑折线图组件
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
  { name: '1月', value: 820 },
  { name: '2月', value: 932 },
  { name: '3月', value: 901 },
  { name: '4月', value: 934 },
  { name: '5月', value: 1290 },
  { name: '6月', value: 1330 },
  { name: '7月', value: 1520 },
  { name: '8月', value: 1320 },
  { name: '9月', value: 1100 },
  { name: '10月', value: 950 },
  { name: '11月', value: 880 },
  { name: '12月', value: 1050 },
]

export default function SmoothLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      // 提示框配置
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(91, 204, 117, 0.5)',
            width: 2,
            type: 'solid',
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: item.color as string || '#91CC75',
            label: item.seriesName || '',
            value: `${(item.value as number).toLocaleString()}`,
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
        icon: 'path://M0,5 Q5,0 10,5 T20,5', // 自定义曲线图标
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
        boundaryGap: false,
        data: mockData.map(item => item.name),
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          interval: 0, // 显示所有标签
          rotate: 0, // 不旋转
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
        name: '销售额',
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
          formatter: (value: number) => {
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k'
            }
            return value.toString()
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        // 最小值和最大值配置
        min: (value: { min: number }) => Math.floor(value.min * 0.9),
        max: (value: { max: number }) => Math.ceil(value.max * 1.1),
      },
      // 系列配置
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true, // 平滑曲线
          smoothMonotone: 'x', // 保持单调性
          data: mockData.map(item => item.value),
          // 线条样式
          lineStyle: {
            color: '#91CC75',
            width: 3,
            cap: 'round', // 线条端点圆角
            join: 'round', // 线条连接处圆角
          },
          // 拐点样式
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          itemStyle: {
            color: '#91CC75',
            borderColor: '#fff',
            borderWidth: 2,
          },
          // 高亮配置
          emphasis: {
            focus: 'series',
            scale: true,
            itemStyle: {
              color: '#91CC75',
              borderColor: '#fff',
              borderWidth: 3,
              shadowBlur: 15,
              shadowColor: 'rgba(145, 204, 117, 0.6)',
            },
            lineStyle: {
              width: 4,
            },
          },
          // 动画配置
          animationDuration: 1500,
          animationEasing: 'cubicInOut',
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
      title="平滑折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

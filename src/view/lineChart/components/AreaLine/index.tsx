/**
 * 面积折线图组件（渐变填充）
 * @author xhj
 * @since 2025-12-14
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据 - 24小时数据
const mockData = [
  { time: '00:00', value: 120 },
  { time: '02:00', value: 80 },
  { time: '04:00', value: 50 },
  { time: '06:00', value: 90 },
  { time: '08:00', value: 200 },
  { time: '10:00', value: 350 },
  { time: '12:00', value: 420 },
  { time: '14:00', value: 380 },
  { time: '16:00', value: 450 },
  { time: '18:00', value: 520 },
  { time: '20:00', value: 380 },
  { time: '22:00', value: 200 },
]

export default function AreaLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      // 提示框配置
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(250, 200, 88, 0.5)',
            width: 2,
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: '#FAC858',
            label: item.seriesName || '',
            value: `${item.value} 人`,
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
        itemWidth: 20,
        itemHeight: 10,
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
        data: mockData.map(item => item.time),
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
      // Y轴配置
      yAxis: {
        type: 'value',
        name: '在线人数',
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
          name: '在线人数',
          type: 'line',
          smooth: true,
          data: mockData.map(item => item.value),
          // 线条样式
          lineStyle: {
            color: '#FAC858',
            width: 2,
          },
          // 面积填充样式 - 渐变
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(250, 200, 88, 0.5)' },
                { offset: 0.5, color: 'rgba(250, 200, 88, 0.2)' },
                { offset: 1, color: 'rgba(250, 200, 88, 0)' },
              ],
            },
          },
          // 拐点样式
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false, // 默认不显示，hover时显示
          itemStyle: {
            color: '#FAC858',
            borderColor: '#fff',
            borderWidth: 2,
          },
          // 高亮配置
          emphasis: {
            focus: 'series',
            showSymbol: true,
            itemStyle: {
              color: '#FAC858',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(250, 200, 88, 0.5)',
            },
          },
          // 标记点 - 最大值和最小值
          markPoint: {
            symbol: 'pin',
            symbolSize: 50,
            itemStyle: {
              color: '#FAC858',
            },
            label: {
              color: '#fff',
              fontSize: 10,
            },
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          // 标记线 - 平均值
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            lineStyle: {
              color: '#EE6666',
              type: 'dashed',
              width: 1,
            },
            label: {
              color: '#EE6666',
              fontSize: 10,
              formatter: '平均: {c}',
            },
            data: [
              { type: 'average', name: '平均值' },
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
      title="面积折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

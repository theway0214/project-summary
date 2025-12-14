/**
 * 分组柱状图组件
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
const categories = ['巴西', '印尼', '美国', '印度', '中国', '世界']
const seriesData = {
  year2011: [18203, 23489, 29034, 104970, 131744, 630230],
  year2012: [19325, 23438, 31000, 121594, 134141, 681807],
}

export default function GroupedBar() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => ({
            color: item.color as string,
            label: item.seriesName || '',
            value: (item.value as number).toLocaleString(),
          }))
          const title = paramArray[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      legend: {
        show: true,
        top: 10,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        itemWidth: 14,
        itemHeight: 14,
        icon: 'rect',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          formatter: (value: number) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'K'
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
      },
      yAxis: {
        type: 'category',
        data: categories,
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
      },
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: seriesData.year2011,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#37A2DA' },
                { offset: 1, color: '#67E0E3' },
              ],
            },
            borderRadius: [0, 4, 4, 0],
          },
        },
        {
          name: '2012年',
          type: 'bar',
          data: seriesData.year2012,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#9FE6B8' },
                { offset: 1, color: '#32C5E9' },
              ],
            },
            borderRadius: [0, 4, 4, 0],
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
      title="分组柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

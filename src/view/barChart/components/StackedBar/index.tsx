/**
 * 堆叠柱状图组件
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
const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const seriesData = {
  email: [120, 132, 101, 134, 90, 230, 210],
  unionAds: [220, 182, 191, 234, 290, 330, 310],
  videoAds: [150, 232, 201, 154, 190, 330, 410],
  direct: [320, 332, 301, 334, 390, 330, 320],
}

export default function StackedBar() {
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
            value: item.value as number,
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
        type: 'category',
        data: categories,
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
        name: '访问量',
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
          name: '邮件营销',
          type: 'bar',
          stack: 'total',
          barWidth: '40%',
          data: seriesData.email,
          itemStyle: {
            color: '#5470C6',
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '联盟广告',
          type: 'bar',
          stack: 'total',
          data: seriesData.unionAds,
          itemStyle: {
            color: '#91CC75',
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '视频广告',
          type: 'bar',
          stack: 'total',
          data: seriesData.videoAds,
          itemStyle: {
            color: '#FAC858',
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: '直接访问',
          type: 'bar',
          stack: 'total',
          data: seriesData.direct,
          itemStyle: {
            color: '#EE6666',
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            focus: 'series',
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
      title="堆叠柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

/**
 * 堆叠面积图组件
 * @author xhj
 * @since 2025-12-14
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据 - 一周流量来源
const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const seriesData = {
  email: [120, 132, 101, 134, 90, 230, 210],
  unionAds: [220, 182, 191, 234, 290, 330, 310],
  videoAds: [150, 232, 201, 154, 190, 330, 410],
  direct: [320, 332, 301, 334, 390, 330, 320],
  search: [820, 932, 901, 934, 1290, 1330, 1320],
}

// 颜色配置
const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE']

export default function StackedAreaLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      // 颜色配置
      color: colors,
      // 提示框配置
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
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
      // 图例配置
      legend: {
        show: true,
        top: 5,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 11,
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 15,
      },
      // 工具箱配置
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {},
        },
      },
      // 网格配置
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '18%',
        containLabel: true,
      },
      // X轴配置
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
      // Y轴配置
      yAxis: {
        type: 'value',
        name: '访问量',
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
          name: '邮件营销',
          type: 'line',
          stack: 'Total', // 堆叠标识
          smooth: true,
          lineStyle: { width: 0 }, // 隐藏线条，只显示面积
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(84, 112, 198, 0.8)' },
                { offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
              ],
            },
          },
          emphasis: { focus: 'series' },
          data: seriesData.email,
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(145, 204, 117, 0.8)' },
                { offset: 1, color: 'rgba(145, 204, 117, 0.1)' },
              ],
            },
          },
          emphasis: { focus: 'series' },
          data: seriesData.unionAds,
        },
        {
          name: '视频广告',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(250, 200, 88, 0.8)' },
                { offset: 1, color: 'rgba(250, 200, 88, 0.1)' },
              ],
            },
          },
          emphasis: { focus: 'series' },
          data: seriesData.videoAds,
        },
        {
          name: '直接访问',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(238, 102, 102, 0.8)' },
                { offset: 1, color: 'rgba(238, 102, 102, 0.1)' },
              ],
            },
          },
          emphasis: { focus: 'series' },
          data: seriesData.direct,
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(115, 192, 222, 0.8)' },
                { offset: 1, color: 'rgba(115, 192, 222, 0.1)' },
              ],
            },
          },
          emphasis: { focus: 'series' },
          data: seriesData.search,
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
      title="堆叠面积图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

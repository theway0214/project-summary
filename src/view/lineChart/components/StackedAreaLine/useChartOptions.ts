/**
 * StackedAreaLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { StackedAreaLineData } from './mockData'
import { colors } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: StackedAreaLineData) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || !data.categories || data.categories.length === 0) {
      return {}
    }

    return {
      color: colors,
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
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '18%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.categories,
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
      series: [
        {
          name: '邮件营销',
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
                { offset: 0, color: 'rgba(84, 112, 198, 0.8)' },
                { offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
              ],
            },
          },
          emphasis: { focus: 'series' },
          data: data.email,
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
          data: data.unionAds,
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
          data: data.videoAds,
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
          data: data.direct,
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
          data: data.search,
        },
      ],
    }
  }, [data])

  return chartOptions
}

/**
 * FlowLine 流光折线图配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { CarbonEmissionsTotalTrendType, TabType } from './mockData'
import { getYAxisUnit } from './mockData'
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

import dot from '@/assets/img/lineChart/dot.webp'


export function useChartOptions(
  data: CarbonEmissionsTotalTrendType[],
  tabActive: TabType = 1
): ChartOption {
  const chartOptions = useMemo<ChartOption>(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const yAxisUnit = getYAxisUnit(tabActive)

    // 处理 X 轴数据
    let xAxisData = data.map((item) => item.statistical_date.replace('-', '.'))

    if (tabActive === 2) {
      xAxisData = xAxisData.map((item) => `${item}季度`)
    }

    // 处理 Y 轴数据 - 转为数值类型
    const yAxisData = data.map((item) => Number(item.intensity_value.toFixed(1)))

    // 构建流光数据 - 使用数字索引映射
    const flowData: number[][] = []
    xAxisData.forEach((_, index) => {
      flowData.push([index, yAxisData[index]])
    })

    // 获取最大值用于背景柱状图
    const maxValue = Math.max(...yAxisData)

    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: TopLevelFormatterParams) => {
          const paramList = Array.isArray(params) ? params : [params]
          const list = paramList
            .filter((item) => item.seriesName && item.seriesName !== '')
            .map((item) => ({
              color: typeof item.color === 'string' ? item.color : '#1EE7E7',
              label: item.seriesName || '',
              value: `${item.data} ${yAxisUnit}`,
            })) as TooltipItem[]

          const title = paramList[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      legend: {
        top: '3%',
        right: '2%',
        show: true,
        itemWidth: 14,
        itemHeight: 14,
        icon: 'roundRect',
        textStyle: {
          fontFamily: 'OPPOSans-Regular',
          color: '#FFFFFF',
          fontSize: 12,
          padding: [0, 0, 0, 4],
        },
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '24%',
        containLabel: true,
      },
      xAxis: {
        data: xAxisData,
        type: 'category' as const,
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          padding: [8, 0, 0, 0],
        },
      },
      yAxis: [
        {
          name: yAxisUnit,
          type: 'value' as const,
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          nameTextStyle: {
            fontSize: 12,
            fontFamily: 'OPPOSans-Regular',
            color: '#FFFFFF',
            padding: [0, 8, 4, 0],
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: 'OPPOSans-Medium',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 8,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)',
              width: 1,
              type: 'dashed' as const,
            },
          },
        },
      ],
      series: [
        // 主折线
        {
          name: '碳排放总量',
          type: 'line',
          symbol: `image://${dot}`,
          symbolSize: 16,
          yAxisIndex: 0,
          showAllSymbol: true,
          smooth: false,
          data: yAxisData,
          lineStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(255, 255, 255, 0)' },
                { offset: 0.2, color: '#FFFFFF' },
                { offset: 0.4, color: 'rgba(255, 255, 255, 0)' },
                { offset: 0.6, color: '#FFFFFF' },
                { offset: 0.8, color: 'rgba(255, 255, 255, 0)' },
                { offset: 1, color: '#FFFFFF' },
              ],
            },
            width: 2,
          },
          itemStyle: {
            color: '#1EE7E7',
          },
          label: {
            show: true,
            position: 'top' as const,
            fontSize: 12,
            color: '#fff',
          },
        },
        // 流光效果
        {
          name: '碳排放总量',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          zlevel: 1,
          polyline: true,
          effect: {
            show: true,
            period: 10,
            trailLength: 0.6,
            symbolSize: 10,
            color: 'rgba(255, 255, 255, 0.5)',
          },
          data: [
            {
              coords: flowData,
            },
          ],
        },
        // 底部标记点
        {
          name: '',
          type: 'pictorialBar',
          symbol: 'rect',
          symbolSize: [24, 2],
          tooltip: {
            show: false,
          },
          symbolOffset: [0, 0],
          symbolPosition: 'start',
          z: 12,
          color: '#1EE7E7',
          data: yAxisData,
        },
        // 背景柱状图
        {
          name: '',
          type: 'bar',
          yAxisIndex: 0,
          data: yAxisData.map(() => maxValue),
          stack: '1',
          tooltip: {
            show: false,
          },
          barWidth: 24,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(30, 231, 231, 0)' },
                { offset: 1, color: 'rgba(30, 231, 231, 0.15)' },
              ],
            },
          },
        },
      ],
    } as ChartOption
  }, [data, tabActive])

  return chartOptions
}

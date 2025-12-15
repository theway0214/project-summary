/**
 * BaseLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { ElectricDataItem } from './mockData'
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

export function useChartOptions(chartData: ElectricDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return {}
    }

    // 处理 X 轴数据
    const xAxisData = chartData.map((item) => {
      return {
        value: item.area,
        textStyle: {
          fontSize: 12,
          fontFamily: 'OPPOSans-Regular',
          color: item.area === '重庆' ? '#F9D62A' : '#FFFFFF',
          padding: [8, 0, 0, 0],
        },
      }
    })

    // 折线图数据
    const electric = chartData.map((item) => {
      return {
        name: item.area,
        value: item.electric,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: item.area === '重庆' ? '#F9D62A' : '#FFFFFF',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 4,
        },
      }
    })

    // 重庆数据作为基准线
    const cqData = chartData.find((item) => item.area === '重庆')?.electric || 0

    // 基准线数据
    const lineData = chartData.map((item) => {
      const reduceData = item.electric - cqData
      let offset: [number, number]
      if (reduceData === 0) {
        offset = [0, -8]
      } else if (reduceData < 0) {
        offset = [0, -10]
      } else {
        offset = [0, -16]
      }

      return {
        name: item.area,
        value: cqData,
        label: {
          show: true,
          position: 'top' as const,
          offset,
          formatter: () => {
            if (item.area === '重庆') {
              return `{yellow|${cqData.toFixed(4)}}`
            }
            if (item.electric < cqData) {
              return `{red|高${(cqData - item.electric).toFixed(4)}}`
            } else {
              return `{green|低${(item.electric - cqData).toFixed(4)}}`
            }
          },
          rich: {
            yellow: {
              color: '#F9D62A',
              fontSize: 12,
              fontFamily: 'OPPOSans-Medium',
              fontWeight: 'bold' as const,
            },
            red: {
              color: '#FF6666',
              fontSize: 12,
              fontFamily: 'OPPOSans-Medium',
              fontWeight: 'bold' as const,
            },
            green: {
              color: '#31EAA3',
              fontSize: 12,
              fontFamily: 'OPPOSans-Medium',
              fontWeight: 'bold' as const,
            },
          },
        },
      }
    })

    return {
      tooltip: {
        formatter: (params: TopLevelFormatterParams) => {
          const paramList = Array.isArray(params) ? params : [params]
          const showList = paramList.filter((item) => item.seriesName === '工商业到户电价')
          const list = showList.map((item) => ({
            color: '#0091FF',
            label: item.seriesName || '',
            value: (item.data as { value: number })?.value ?? item.value,
          })) as TooltipItem[]
          const title = paramList[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      legend: {
        top: '4%',
        right: '0',
        icon: 'roundRect',
        show: true,
        itemWidth: 14,
        itemHeight: 10,
        data: [
          {
            name: '工商业到户电价',
            icon: 'roundRect',
            itemStyle: {
              color: '#0091FF',
            },
          },
        ],
        textStyle: {
          fontFamily: 'OPPOSans-Regular',
          color: '#FFFFFF',
          fontSize: 12,
          padding: [0, 0, 0, 4],
        },
        itemGap: 16,
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '20%',
        containLabel: true,
      },
      xAxis: {
        data: xAxisData,
        type: 'category',
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
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          padding: [8, 0, 0, 0],
        },
      },
      yAxis: [
        {
          name: '万/千瓦时',
          type: 'value',
          position: 'left',
          min: 0.4,
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
            padding: [0, 0, 8, 0],
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: 'OPPOSans-Medium',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 8,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '工商业到户电价',
          type: 'line',
          data: electric,
          lineStyle: {
            color: '#0091FF',
            width: 2,
          },
        },
        {
          name: 'line',
          type: 'line',
          data: lineData,
          lineStyle: {
            color: 'rgba(49, 234, 163, 0.6)',
            width: 2,
            type: 'dashed',
          },
          symbol: 'circle',
          symbolSize: 0,
        },
      ],
    }
  }, [chartData])

  return chartOptions
}

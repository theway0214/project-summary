/**
 * CurveLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { LoadDataItem } from './mockData'
import type { TopLevelFormatterParams, CallbackDataParams } from 'echarts/types/dist/shared'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

import curveSymbolLeft from '@/assets/img/lineChart/curve-symbol-left.webp'
import curveSymbolRight from '@/assets/img/lineChart/curve-symbol-right.webp'


// 格式化日期
const formatDate = (dateStr: string, format: string): string => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return format
    .replace('YYYY', String(year))
    .replace('M', String(month))
    .replace('D', String(day))
}

export function useChartOptions(data: LoadDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const thisYear = new Date().getFullYear()

    // X轴数据 - 365天
    const xAxisData = Array.from({ length: 365 }, (_, k) => k + 1)
    // X轴数据 - 12个月
    const xAxisData2 = Array.from({ length: 12 }, (_, k) => k + 1)

    // 今年数据
    const yearThis = data.filter((item) => item.data_time.includes(thisYear.toString()))
    const yearThisData = yearThis.map((item) => item.maximum_load)

    // 去年数据
    const yearLast = data.filter((item) => item.data_time.includes((thisYear - 1).toString()))
    const yearLastData = yearLast.map((item) => item.maximum_load)

    // 前年数据
    const yearLastTwo = data.filter((item) => item.data_time.includes((thisYear - 2).toString()))
    const yearLastTwoData = yearLastTwo.map((item) => item.maximum_load)

    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: TopLevelFormatterParams) => {
          const paramList = Array.isArray(params) ? params : [params]
          const list = paramList.map((item) => ({
            color: (item.color as string) || '#fff',
            label: item.seriesName || '',
            value: item.value as number,
          })) as TooltipItem[]
          const title = `第 ${paramList[0]?.name || ''} 天`
          return createTooltipContainer(title, list)
        },
      },
      legend: [
        {
          right: '4%',
          top: '3%',
          icon: 'roundRect',
          show: true,
          itemWidth: 14,
          itemHeight: 10,
          data: [`${thisYear}年`, `${thisYear - 1}年`, `${thisYear - 2}年`],
          textStyle: {
            fontFamily: 'OPPOSans-Regular',
            color: '#FFFFFF',
            fontSize: 12,
            padding: [0, 0, 0, 4],
          },
          itemGap: 16,
        },
      ],
      grid: {
        left: '4%',
        right: '4%',
        bottom: '10%',
        top: '25%',
        containLabel: true,
      },
      xAxis: [
        {
          show: false,
          data: xAxisData,
          type: 'category',
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              width: 1,
              color: '#596370',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 12,
            padding: [8, 0, 0, 0],
          },
        },
        {
          data: xAxisData2,
          type: 'category',
          boundaryGap: true,
          position: 'bottom',
          axisLine: {
            lineStyle: {
              width: 1,
              color: '#596370',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 12,
            padding: [8, 0, 0, 0],
            formatter: (value: number) => `${value}月`,
          },
        },
      ],
      yAxis: [
        {
          name: '万千瓦',
          type: 'value',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#596370',
            },
          },
          nameTextStyle: {
            fontSize: 12,
            fontFamily: 'OPPOSans-Regular',
            color: '#FFFFFF',
            padding: [0, 8, 12, 0],
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: 'OPPOSans-Medium',
            color: 'rgba(255,255,255,0.7)',
            margin: 8,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#596370',
              type: 'dashed' as const,
            },
          },
        },
      ],
      series: [
        {
          name: `${thisYear}年`,
          type: 'line',
          smooth: false,
          showAllSymbol: false,
          symbol: 'emptyCircle',
          symbolSize: 0,
          itemStyle: {
            color: '#00d8ff',
          },
          lineStyle: {
            type: 'solid' as const,
            width: 2,
          },

          data: yearThisData,
        },
        {
          name: `${thisYear - 1}年`,
          type: 'line',
          smooth: false,
          showAllSymbol: false,
          symbolSize: 0,
          itemStyle: {
            color: '#f39801',
          },
          lineStyle: {
            type: 'solid' as const,
            width: 2,
          },
          markPoint: {
            silent: true,
            symbol: `image://${curveSymbolLeft}`,
            symbolSize: [220, 50],
            data: [
              {
                type: 'max',
                name: '最大值',
              },
            ],
            label: {
              fontSize: 10,
              position: 'inside' as const,
              offset: [0, -2],
              align: 'center',
              verticalAlign: 'middle',
              fontFamily: 'OPPOSans-Bold',
              formatter: (params: CallbackDataParams) => {
                const value = typeof params.value === 'number' ? params.value : 0
                const maxItem = yearLast.find((item) => item.maximum_load === value)
                if (maxItem) {
                  return `${formatDate(maxItem.data_time, 'YYYY')}年最大负荷\n{a|${maxItem.maximum_load}}万千瓦 (${formatDate(maxItem.data_time, 'M月D日')})`
                }
                return ''
              },
              lineHeight: 16,
              rich: {
                a: {
                  fontFamily: 'NumberFont',
                  fontSize: 14,
                  color: '#f39801',
                  lineHeight: 20,
                  padding: [0, 4, 0, 0],
                },
              },
            },
          },
          data: yearLastData,
        },
        {
          name: `${thisYear - 2}年`,
          type: 'line',
          smooth: false,
          showAllSymbol: false,
          symbol: 'emptyCircle',
          symbolSize: 0,
          itemStyle: {
            color: '#cdae42',
          },
          lineStyle: {
            type: 'solid' as const,
            width: 2,
          },
          markPoint: {
            silent: true,
            symbol: `image://${curveSymbolRight}`,
            symbolSize: [220, 50],
            symbolOffset: [0, -30],
            data: [
              {
                type: 'max',
                name: '最大值',
              },
            ],
            label: {
              fontSize: 10,
              position: 'inside' as const,
              offset: [0, -2],
              align: 'center',
              verticalAlign: 'middle',
              fontFamily: 'OPPOSans-Bold',
              formatter: (params: CallbackDataParams) => {
                const value = typeof params.value === 'number' ? params.value : 0
                const maxItem = yearLastTwo.find((item) => item.maximum_load === value)
                if (maxItem) {
                  return `${formatDate(maxItem.data_time, 'YYYY')}年最大负荷\n{a|${maxItem.maximum_load}}万千瓦 (${formatDate(maxItem.data_time, 'M月D日')})`
                }
                return ''
              },
              lineHeight: 16,
              rich: {
                a: {
                  fontFamily: 'NumberFont',
                  fontSize: 14,
                  color: '#cdae42',
                  lineHeight: 20,
                  padding: [0, 4, 0, 0],
                },
              },
            },
          },
          data: yearLastTwoData,
        },
      ],
    }
  }, [data])

  return chartOptions
}

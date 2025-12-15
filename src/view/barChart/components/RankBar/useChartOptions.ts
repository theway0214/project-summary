/**
 * RankBar 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { RankDataItem } from './mockData'
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared'

import rankOne from '@/assets/img/rank1.webp'
import rankTwo from '@/assets/img/rank2.webp'
import rankThree from '@/assets/img/rank3.webp'
import rankFour from '@/assets/img/rank4.webp'
import rankFive from '@/assets/img/rank5.webp'

// // 排名图片占位符（实际项目中替换为真实图片路径）
// const rankOne = ''
// const rankTwo = ''
// const rankThree = ''
// const rankFour = ''
// const rankFive = ''

const rankMap = [
  {
    richName: 'first',
    color: ['rgba(250, 246, 158, 0.2)', '#B97602'],
  },
  {
    richName: 'second',
    color: ['rgba(18, 138, 222, 0.2)', '#128ADE'],
  },
  {
    richName: 'third',
    color: ['rgba(18, 138, 222, 0.2)', '#128ADE'],
  },
  {
    richName: 'fourth',
    color: ['rgba(18, 138, 222, 0.2)', '#128ADE'],
  },
  {
    richName: 'fifth',
    color: ['rgba(18, 138, 222, 0.2)', '#128ADE'],
  },
]

export function useChartOptions(chartData: RankDataItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return {}
    }

    // 处理数据
    const yData = chartData.map((item) => item.area)
    const average = chartData[0].average || 0

    const splitData = chartData.map((item) => {
      return {
        value: Number(item.numerical_value).toFixed(0),
        textStyle: {
          width: 32,
          height: 24,
          fontSize: 14,
          fontFamily: 'NumberFont',
          borderRadius: 4,
          align: 'center' as const,
          color: '#FFFFFF',
          padding: [0, 0, 0, 2],
          backgroundColor: item.area.includes('重庆') ? rankMap[0].color[1] : rankMap[1].color[1],
        },
      }
    })

    const data = chartData.map((item, index) => {
      return {
        name: item.area,
        value: item.numerical_value,
        richName: rankMap[index]?.richName || 'fifth',
        itemStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: item.area.includes('重庆') ? rankMap[0].color[0] : rankMap[1].color[0],
              },
              {
                offset: 1,
                color: item.area.includes('重庆') ? rankMap[0].color[1] : rankMap[1].color[1],
              },
            ],
            global: false,
          },
        },
      }
    })

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        borderColor: '#308CF7',
        borderWidth: 2,
        padding: [10, 15],
        textStyle: {
          color: '#fff',
          fontSize: 14,
          fontFamily: 'OPPOSans-Medium',
        },
        formatter: (params: TopLevelFormatterParams) => {
          const paramList = Array.isArray(params) ? params : [params]
          let html = `<div style="font-weight:bold;text-align:center;color:#fff;margin-bottom:10px;"></div>`
          html += `<div style="display:flex;align-items:center;margin:10px 0;">
          <span style="color:#fff;margin-right:15px;">${paramList[0]?.name ?? ''}</span>
        </div>`

          for (const item of paramList) {
            if (item.componentSubType === 'bar') {
              const color = item.color
              const bgColor =
                color && typeof color === 'object' && 'colorStops' in color
                  ? color.colorStops?.[1]?.color
                  : color
              html += `<div style="display:flex;align-items:center;margin:10px 0;">
              <span style="display:inline-block;width:4px;height:12px;background:${bgColor};border-radius:2px;margin-right:15px;"></span>
              <span style="color:#fff;margin-right:15px;">${item.name}:</span>
              <span style="color:#fff;font-weight:400; font-family:OPPOSans-Medium,serif;">${item.value}</span>
            </div>`
            }
          }
          return html
        },
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#484c55',
            width: 1,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#484c55',
            width: 1,
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          fontFamily: 'OPPOSans-Medium',
          padding: [10, 0, 0, 0],
          align: 'right',
        },
      },
      yAxis: [
        {
          type: 'category',
          data: yData,
          inverse: true,
          axisLabel: {
            padding: [0, 15, 0, 0],
            fontFamily: 'OPPOSans-Medium',
            fontWeight: 'bold',
            fontSize: 14,
            color: '#fff',
            formatter(params: string, index: number) {
              return `{${data[index]?.richName}|}` + `   ` + `{name|${params}}`
            },
            rich: {
              first: {
                backgroundColor: {
                  image: rankOne,
                },
                width: 32,
                height: 24,
                align: 'center',
              },
              second: {
                backgroundColor: {
                  image: rankTwo,
                },
                width: 32,
                height: 24,
                align: 'center',
              },
              third: {
                backgroundColor: {
                  image: rankThree,
                },
                width: 32,
                height: 24,
                align: 'center',
              },
              fourth: {
                backgroundColor: {
                  image: rankFour,
                },
                width: 32,
                height: 24,
                align: 'center',
              },
              fifth: {
                backgroundColor: {
                  image: rankFive,
                },
                width: 32,
                height: 24,
                align: 'center',
              },
              name: {
                color: '#fff',
                fontSize: 14,
              },
            },
          },
          splitLine: {
            show: false,
          },
        },
        {
          type: 'category',
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          show: true,
          data: splitData,
          offset: 40,
          splitLine: {
            show: false,
          },
        },
      ],
      grid: {
        top: '5%',
        left: '8%',
        right: '8%',
        bottom: '10%',
        containLabel: true,
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          data,
          z: 1,
          symbolRepeat: 'fixed',
          symbolMargin: 5,
          symbolSize: [8, 20],
        },
        {
          // 值分隔
          type: 'pictorialBar',
          symbolRepeat: 'fixed',
          symbolMargin: 5,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [4, 20],
          symbolOffset: [-4, 0],
          itemStyle: {
            color: 'rgba(0, 0, 0, 1)',
          },
          data: splitData,
          markLine: {
            symbol: 'none',
            data: [
              {
                name: '',
                xAxis: average,
              },
            ],
            label: {
              position: 'insideEndTop',
              rotate: 0,
              formatter: () => {
                return `{a|全国平均线${average}万吨}`
              },
              align: 'center',
              rich: {
                a: {
                  color: '#FFCD35',
                  padding: [0, 0, 5, 100],
                  fontSize: 12,
                },
              },
            },
            lineStyle: {
              color: '#FFCD35',
              width: 2,
            },
          },
          markArea: {
            silent: true,
            data: [
              [
                {
                  yAxis: 0,
                  xAxis: 0,
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(255, 205, 53, 0)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(255, 205, 53, 0.2)',
                        },
                      ],
                      global: false,
                    },
                  },
                },
                {
                  yAxis: 999,
                  xAxis: average,
                },
              ],
            ],
          },
          z: 2,
        },
      ],
    }
  }, [chartData])

  return chartOptions
}

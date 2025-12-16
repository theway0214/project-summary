/**
 * StackedBar1 堆叠柱状图配置 Hook
 * @author xhj
 * @since 2025-12-16
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { PowerBalanceItem } from './mockData'
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

// 缺口标记点图片 Base64
const gapMarkPointImage =
  'image://data:image/png;base64,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'

export function useChartOptions(data: PowerBalanceItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    // 处理数据
    const xAxisData = data.map((item) => `${item.data_time}年`)
    const nf = data.map((item) => item.inner_power)
    const wg = data.map((item) => item.out_buy_power)
    const yy = data.map((item) => item.profit_power)
    const qk = data.map((item) => item.gap_power)
    const qkMax = Math.max(...qk)
    const by = data.map((item) => item.prepare_power)
    const zdfh = data.map((item) => item.max_power)

    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: TopLevelFormatterParams) => {
          const paramList = Array.isArray(params) ? params : [params]
          const list = paramList
            .filter((v) => v.seriesName)
            .map((item) => {
              const color =
                item.seriesName === '缺口'
                  ? (item.borderColor as string)
                  : typeof item.color === 'object' && item.color !== null && 'colorStops' in item.color
                    ? ((item.color as { colorStops: { color: string }[] }).colorStops[0]?.color ?? '#fff')
                    : ((item.color as string) || '#fff')
              return {
                color,
                label: item.seriesName || '',
                value:
                  typeof item.data === 'object' && item.data !== null && 'value' in item.data
                    ? `${(item.data as { value: number }).value}万千瓦`
                    : `${item.data}万千瓦`,
              }
            }) as TooltipItem[]

          const title = paramList[0]?.name || ''
          return createTooltipContainer(title as string, list)
        },
      },
      legend: [
        {
          right: '4%',
          top: '4%',
          icon: 'rich',
          show: true,
          itemWidth: 14,
          itemHeight: 10,
          orient: 'horizontal' as const,
          data: ['最大负荷', '备用', '盈余', '外购', '内发'].map((v: string) => {
            return { name: v, icon: v === '最大负荷' ? 'circle' : 'rect' }
          }),
          textStyle: {
            fontFamily: 'OPPOSans-Regular',
            color: '#FFFFFF',
            fontSize: 12,
            padding: [0, 0, 0, 4],
          },
          itemGap: 12,
        },
      ],
      grid: [
        {
          left: '2%',
          right: '4%',
          bottom: '10%',
          top: '18%',
          containLabel: true,
        },
      ],
      xAxis: [
        {
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
      ],
      yAxis: [
        {
          name: '单位：万千瓦',
          type: 'value',
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
            padding: [0, 0, 8, 0],
          },
          axisLabel: {
            fontSize: 12,
            fontFamily: 'OPPOSans-Medium',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 8,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(255, 255, 255, 0.1)',
              type: 'dashed' as const,
            },
          },
          splitNumber: 4,
        },
      ],
      series: [
        {
          name: '内发',
          type: 'bar',
          z: 1,
          stack: '电力平衡',
          barWidth: '40%',
          color: '#01AEB9',
          label: {
            show: true,
            position: 'insideTop',
            offset: [0, 4],
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 10,
            fontFamily: 'OPPOSans-Bold',
            align: 'center',
            formatter: (params: { value: number }) => {
              return `内发\n{a|${params.value}}`
            },
            rich: {
              a: {
                padding: [2, 0, 0, 0],
                fontFamily: 'OPPOSans-Bold',
                fontSize: 10,
              },
            },
          },
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#0075D8',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 117, 216, 0.2)',
                },
              ],
            },
          },
          data: nf,
        },
        {
          name: '外购',
          type: 'bar',
          z: 1,
          stack: '电力平衡',
          barWidth: '40%',
          color: '#0075D8',
          label: {
            show: true,
            position: 'inside',
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 10,
            fontFamily: 'OPPOSans-Bold',
            align: 'center',
            formatter: (params: { value: number }) => {
              return `外购\n{a|${params.value}}`
            },
            rich: {
              a: {
                padding: [2, 0, 0, 0],
                fontFamily: 'OPPOSans-Bold',
                fontSize: 10,
              },
            },
          },
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#009E9E',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 158, 158, 0.2)',
                },
              ],
            },
          },
          data: wg,
        },
        {
          name: '缺口',
          type: 'bar',
          z: 1,
          stack: '电力平衡',
          barWidth: '40%',
          label: {
            show: false,
          },
          itemStyle: {
            color: 'transparent',
            borderColor: '#FA6F39',
            borderWidth: 2,
            borderType: 'dotted' as const,
          },
          data: qk.map((v) => {
            return { value: v, itemStyle: { borderWidth: v === 0 ? 0 : 2 } }
          }),
        },
        {
          name: '备用',
          type: 'bar',
          z: 1,
          stack: '电力平衡',
          barWidth: '40%',
          color: '#0075D8',
          label: {
            show: true,
            position: 'inside',
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 10,
            fontFamily: 'OPPOSans-Bold',
            align: 'center',
            formatter: (params: { value: number }) => {
              return `备用${params.value}`
            },
          },
          itemStyle: {
            color: 'rgba(49, 56, 70, 1)',
          },
          data: by,
        },
        {
          name: '盈余',
          type: 'bar',
          z: 1,
          stack: '电力平衡',
          barWidth: '40%',
          color: '#0075D8',
          label: {
            show: true,
            position: 'top',
            color: '#68C4F6',
            fontSize: 10,
            fontFamily: 'OPPOSans-Bold',
            align: 'center',
            formatter: (params: { value: number }) => {
              return `盈余${params.value}`
            },
          },
          data: yy.map((v) => {
            return v === 0 ? { value: v, label: { show: false } } : { value: v }
          }),
        },
        {
          name: '',
          type: 'bar',
          z: 1,
          stack: '电力平衡',
          barWidth: '40%',
          color: 'rgba(255, 212, 119, 1)',
          label: {
            show: true,
            position: 'top',
            offset: [0, -8],
            color: '#fff',
            fontSize: 10,
            fontFamily: 'OPPOSans-Bold',
            align: 'center',
            formatter: (params: { dataIndex: number }) => {
              return `{name|缺口}\n{value|${qk[params.dataIndex]}}`
            },
            rich: {
              name: {
                fontSize: 12,
                fontFamily: 'OPPOSans-Medium',
                fontWeight: 700,
                color: '#fff',
              },
              value: {
                fontSize: 14,
                fontFamily: 'OPPOSans-Medium',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'rgba(255, 212, 119, 1)',
                padding: [4, 0, 0, 0],
              },
            },
          },
          itemStyle: {
            color: 'transparent',
          },
          data: qk.map((v) => {
            const obj = { value: 0 }
            return v === 0 || v === qkMax ? { ...obj, label: { show: false } } : { ...obj }
          }),
          markPoint: {
            symbol: gapMarkPointImage,
            symbolSize: [24, 14],
            symbolOffset: [30, 0],
            data: [
              {
                name: '最大值',
                type: 'max' as const,
                label: {
                  show: true,
                  position: 'right',
                  offset: [20, -10],
                  color: '#68C4F6',
                  fontSize: 10,
                  fontFamily: 'OPPOSans-Bold',
                  align: 'center',
                  formatter: () => {
                    return `{name|缺口}\n{value|${qkMax}}`
                  },
                  rich: {
                    name: {
                      fontSize: 12,
                      fontFamily: 'OPPOSans-Medium',
                      fontWeight: 700,
                      color: '#fff',
                    },
                    value: {
                      fontSize: 14,
                      fontFamily: 'OPPOSans-Medium',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      color: 'rgba(255, 212, 119, 1)',
                      padding: [4, 0, 0, 0],
                    },
                  },
                },
              },
            ],
          },
        },
        {
          name: '',
          type: 'bar',
          data: [],
          barWidth: 20,
          color: 'transparent',
          itemStyle: {
            color: 'transparent',
          },
          barGap: '-165%',
          label: {
            show: false,
          },
        },
        {
          name: '最大负荷',
          type: 'line',
          data: zdfh,
          lineStyle: {
            color: '#F0974F',
            width: 2,
          },
          z: -10,
          color: '#F0974F',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#F0974F',
          },
          barGap: '-120%',
          label: {
            show: true,
            position: 'top',
            color: '#F0974F',
            fontSize: 10,
            offset: [0, -4],
            align: 'center',
            fontFamily: 'OPPOSans-Medium',
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

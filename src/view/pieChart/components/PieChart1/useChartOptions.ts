/**
 * PieChart1 图表配置 Hook
 * @author xhj
 * @since 2025-12-17
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { FinishedOilChannelItem } from './mockData'

const colors = ['#308CF7', '#F35252', '#3CE7E7', '#EFB030', '#EE8254', '#16C172', '#5D5AE6']

export function useChartOptions(data: FinishedOilChannelItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const pieData = data.map((item) => ({
      name: item.transportLineName,
      value: item.transportVolume,
      transportProportion: item.transportProportion,
    }))

    const total = pieData.reduce((sum, cur) => sum + cur.value, 0)

    return {
      color: colors,
      title: {
        show: true,
        text: `总量：${total}万吨`,
        subtext: '',
        x: '63%',
        y: '20%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 400,
        },
        subtextStyle: {
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 20,
        },
        textAlign: 'center',
      },
      legend: {
        show: true,
        icon: 'rect',
        itemGap: 12,
        type: 'scroll',
        pageIconColor: '#76b9ff',
        pageIconInactiveColor: 'yellow',
        pageTextStyle: {
          color: '#76b9ff',
          fontSize: 12,
        },
        pageIconSize: 8,
        orient: 'vertical',
        top: '36%',
        right: '5%',
        textStyle: {
          align: 'left',
          color: '#fff',
          fontSize: 12,
          rich: {
            name: {
              width: 100,
              fontSize: 12,
              color: '#fff',
              padding: [0, 0, 0, 12],
            },
            rate: {
              width: 40,
              align: 'right',
              fontSize: 12,
              color: '#fff',
              padding: [0, 0, 0, 0],
            },
          },
        },
        data: pieData.map((item) => item.name),
        formatter: (name: string) => {
          if (pieData.length) {
            const item = pieData.find((item) => item.name === name)
            if (item) {
              const rate = ((item.value / total) * 100).toFixed(0)
              return `{name|${name}（${item.value}万吨）} {rate|${rate === 'NaN' ? 0 : rate}%}`
            }
          }
          return name
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          if (Array.isArray(params)) {
            params = params[0]
          }
          const item = pieData.find((item) => item.name === params.name)
          if (!item) return ''
          const percent = ((item.value / total) * 100).toFixed(2)
          return `<div style="color: #fff; font-size: 14px; padding: 8px;">
            <div style="margin-bottom: 10px; font-size: 14px;">${params.name}</div>
            <div style="display: flex; margin: 5px 0; align-items: center;">
              <div style="width: 6px; height: 12px; background-color: ${params.color}; margin-right: 8px;"></div>
              <div style="font-size: 13px;">运输量: ${item.value}万吨</div>
            </div>
            <div style="display: flex; margin: 5px 0; align-items: center;">
              <div style="width: 6px; height: 12px; background-color: ${params.color}; margin-right: 8px;"></div>
              <div style="font-size: 13px;">百分比：${percent}%</div>
            </div>
          </div>`
        },
        backgroundColor: 'rgba(255,255,255,0.14)',
        extraCssText: 'backdrop-filter: blur(60px);',
        borderWidth: 1,
      },
      xAxis:{
        show:false
      },
      yAxis:{
        show:false
      },
      series: [
        {
          type: 'pie',
          radius: ['0%', '55%'],
          center: ['29%', '52%'],
          labelLine: {
            length: 5,
            length2: 30,
          },
          label: {
            show: false,
          },
          data: pieData,
        },
      ],
    }
  }, [data])

  return chartOptions
}


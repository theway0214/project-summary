/**
 * PieChart3 图表配置 Hook
 * @author xhj
 * @since 2025-12-17
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { ThermalCoalPurchaseItem } from './mockData'

const colors = ['#308CF7', '#F35252', '#3CE7E7', '#EFB030', '#EE8254', '#16C172', '#5D5AE6']

// 格式化数字，每三位加逗号
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function useChartOptions(data: ThermalCoalPurchaseItem[]) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    const pieData = data.map((item) => ({
      name: item.localName,
      value: item.purchaseVolume,
      percent: item.purchaseProportion,
    }))

    const total = pieData.reduce((sum, cur) => sum + cur.value, 0)

    // 构建带间隔的数据
    const optionData: Array<{
      value: number
      name: string
      itemStyle: { borderWidth?: number; borderRadius?: number; borderColor?: string } | { color: string }
      tooltip?: { show: boolean }
    }> = []

    pieData.forEach((item) => {
      optionData.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          borderWidth: 1.5,
          borderRadius: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.48)',
        },
      })
      // 添加透明间隔
      optionData.push({
        name: '',
        value: total / 100,
        itemStyle: { color: 'transparent' },
        tooltip: {
          show: false,
        },
      })
    })

    return {
      color: colors,
      title: {
        show: true,
        text: formatNumber(Number.parseFloat(total.toFixed(0))),
        subtext: '{a|总量(万吨)}',
        left: '24%',
        top: '42%',
        itemGap: 3,
        textStyle: {
          color: '#fff',
          fontSize: 28,
          fontFamily: 'NumberFont',
          fontWeight: 700,
          lineHeight: 28,
        },
        subtextStyle: {
          rich: {
            a: {
              color: 'rgba(243, 243, 243, 1)',
              fontSize: 14,
              fontFamily: 'PingFang SC',
              fontWeight: 500,
              padding: [-2.5, 0, 5, 0],
            },
          },
        },
        textAlign: 'center',
      },
      legend: {
        show: true,
        icon: 'rect',
        itemGap: 22,
        type: 'scroll',
        pageIconColor: '#76b9ff',
        pageIconInactiveColor: 'yellow',
        pageTextStyle: {
          color: '#76b9ff',
          fontSize: 12,
        },
        pageIconSize: 8,
        orient: 'vertical',
        top: '30%',
        right: '5%',
        textStyle: {
          align: 'left',
          fontSize: 12,
          rich: {
            name: {
              width: 60,
              fontSize: 12,
              fontWeight: 500,
              color: '#fff',
              fontFamily: 'OPPOSans, OPPOSans',
              padding: [0, 0, 0, 20],
            },
            rate: {
              width: 35,
              align: 'right',
              fontWeight: 500,
              fontSize: 12,
              fontFamily: 'OPPOSans, OPPOSans',
              color: '#fff',
              padding: [0, 0, 0, 28],
            },
          },
        },
        data: pieData.map((item) => item.name),
        formatter: (name: string) => {
          const item = pieData.find((item) => item.name === name)
          if (item) {
            return `{name|${name}（${item.value}万吨）}  {rate|${item.percent}%}`
          }
          return name
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          // 处理数组情况
          const param = Array.isArray(params) ? params[0] : params
          
          // 如果是透明间隔项（name 为空），不显示 tooltip
          if (!param.name || param.name === '') {
            return ''
          }
          
          // 查找对应的数据项
          const item = pieData.find((item) => item.name === param.name)
          if (!item) return ''
          
          const color = param.color || '#5470C6'
          
          return `<div style="color: #fff; font-size: 14px; padding: 8px;">
            <div style="margin-bottom: 10px; font-size: 14px;">${param.name}</div>
            <div style="display: flex; margin: 5px 0; align-items: center;">
              <div style="width: 6px; height: 12px; background-color: ${color}; margin-right: 8px;"></div>
              <div style="font-size: 13px;">电煤购入量(万吨): ${item.value}</div>
            </div>
            <div style="display: flex; margin: 5px 0; align-items: center;">
              <div style="width: 6px; height: 12px; background-color: ${color}; margin-right: 8px;"></div>
              <div style="font-size: 13px;">百分比：${item.percent}%</div>
            </div>
          </div>`
        },
        backgroundColor: 'rgba(255,255,255,0.14)',
        extraCssText: 'backdrop-filter: blur(60px);',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
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
          radius: ['39%', '55%'],
          center: ['24%', '50%'],
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: optionData,
        },
      ],
    }
  }, [data])

  return chartOptions
}


/**
 * BarChart1 图表配置 Hook - 多 grid 柱状图
 * @author xhj
 * @since 2025-12-17
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { BarChart1Item } from './mockData'

export function useChartOptions(data: BarChart1Item[]): ChartOption {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {}
    }

    // 保证顺序与原 option 一致
    const statusOrder: BarChart1Item['status'][] = ['未装修', '装修', '装修未入住', '已入住']
    const map = new Map<string, number>()
    data.forEach((item) => {
      map.set(item.status, item.value)
    })

    const values = statusOrder.map((status) => map.get(status) ?? 0)

    const option: ChartOption = {
      grid: [
        {
          top: '25%',
          width: '10%',
          left: '5%',
          show: true,
          backgroundColor: 'rgba(84, 112, 198, 0.2)',
          borderWidth: 0,
        },
        {
          top: '25%',
          width: '30%',
          left: '15%',
          show: true,
          backgroundColor: 'rgba(145, 204, 117, 0.2)',
          borderWidth: 0,
        },
        {
          top: '25%',
          width: '15%',
          right: '5%',
          left: '45%',
          show: true,
          backgroundColor: 'rgba(244, 215, 122, 0.2)',
          borderWidth: 0,
        },
        {
          top: '25%',
          width: '40%',
          right: '5%',
          left: '60%',
          show: true,
          backgroundColor: 'rgba(238, 102, 102, 0.2)',
          borderWidth: 0,
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          data: [{ value: '未装修' }],
        },
        {
          type: 'category',
          gridIndex: 1,
          data: [{ value: '装修' }],
        },
        {
          type: 'category',
          gridIndex: 2,
          data: [{ value: '装修未入住' }],
        },
        {
          type: 'category',
          gridIndex: 3,
          data: [{ value: '已入住' }],
        },
      ],
      yAxis: [
        {
          max: 100,
          min: 0,
          type: 'value',
          splitLine: {
            show: false,
          },
        },
        {
          max: 100,
          min: 0,
          show: false,
          gridIndex: 1,
          type: 'value',
        },
        {
          max: 100,
          min: 0,
          show: false,
          gridIndex: 2,
          type: 'value',
        },
        {
          max: 100,
          min: 0,
          show: false,
          gridIndex: 3,
          type: 'value',
        },
      ],
      series: [
        {
          name: '未装修',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: [values[0]],
          barWidth: '50%',
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
        },
        {
          name: '装修',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [values[1]],
          barWidth: '50%',
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
        },
        {
          name: '装修未入住',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: [values[2]],
          barWidth: '50%',
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
        },
        {
          name: '已入住',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: [values[3]],
          barWidth: '50%',
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
        },
      ],
    }

    return option
  }, [data])

  return chartOptions
}



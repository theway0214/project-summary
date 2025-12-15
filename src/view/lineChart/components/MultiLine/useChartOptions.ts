/**
 * MultiLine 图表配置 Hook
 * @author xhj
 * @since 2025-12-15
 */
import { useMemo } from 'react'
import type { ChartOption } from '@/components/Chart'
import type { MultiLineData } from './mockData'
import { colors } from './mockData'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

export function useChartOptions(data: MultiLineData) {
  const chartOptions: ChartOption = useMemo(() => {
    if (!data || !data.months || data.months.length === 0) {
      return {}
    }

    return {
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          const list: TooltipItem[] = paramArray.map((item) => {
            let unit = ''
            if (item.seriesName === '蒸发量') unit = ' ml'
            else if (item.seriesName === '降水量') unit = ' ml'
            else if (item.seriesName === '湿度') unit = '%'
            return {
              color: item.color as string,
              label: item.seriesName || '',
              value: `${item.value}${unit}`,
            }
          })
          const title = paramArray[0]?.name || ''
          return createTooltipContainer(title, list)
        },
      },
      legend: {
        show: true,
        top: 5,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        itemWidth: 20,
        itemHeight: 10,
        selectedMode: true,
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        top: '18%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.months,
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
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '水量',
          nameTextStyle: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
          },
          min: 0,
          max: 250,
          interval: 50,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
            formatter: '{value} ml',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
        {
          type: 'value',
          name: '湿度',
          nameTextStyle: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
          },
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12,
            formatter: '{value}%',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '蒸发量',
          type: 'line',
          yAxisIndex: 0,
          data: data.temperatureData,
          smooth: true,
          lineStyle: {
            color: colors[0],
            width: 2,
          },
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          itemStyle: {
            color: colors[0],
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(84, 112, 198, 0.5)',
            },
          },
        },
        {
          name: '降水量',
          type: 'line',
          yAxisIndex: 0,
          data: data.rainfallData,
          smooth: true,
          lineStyle: {
            color: colors[1],
            width: 2,
          },
          symbol: 'diamond',
          symbolSize: 6,
          showSymbol: true,
          itemStyle: {
            color: colors[1],
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(145, 204, 117, 0.5)',
            },
          },
        },
        {
          name: '湿度',
          type: 'line',
          yAxisIndex: 1,
          data: data.humidityData,
          smooth: true,
          lineStyle: {
            color: colors[2],
            width: 2,
            type: 'dashed',
          },
          symbol: 'triangle',
          symbolSize: 6,
          showSymbol: true,
          itemStyle: {
            color: colors[2],
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(250, 200, 88, 0.5)',
            },
          },
        },
      ],
    }
  }, [data])

  return chartOptions
}

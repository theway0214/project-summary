/**
 * 多系列折线图组件（双Y轴）
 * @author xhj
 * @since 2025-12-14
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据 - 温度和降水量
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const temperatureData = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
const rainfallData = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
const humidityData = [45, 52, 58, 65, 72, 78, 85, 82, 75, 62, 55, 48]

// 颜色配置
const colors = ['#5470C6', '#91CC75', '#FAC858']

export default function MultiLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    return {
      // 颜色配置
      color: colors,
      // 提示框配置
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
      // 图例配置
      legend: {
        show: true,
        top: 5,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        itemWidth: 20,
        itemHeight: 10,
        selectedMode: true, // 允许点击切换显示
      },
      // 网格配置
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        top: '18%',
        containLabel: true,
      },
      // X轴配置
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
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
      // 双Y轴配置
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
            show: false, // 右侧Y轴不显示分割线
          },
        },
      ],
      // 系列配置
      series: [
        {
          name: '蒸发量',
          type: 'line',
          yAxisIndex: 0, // 使用左侧Y轴
          data: temperatureData,
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
          yAxisIndex: 0, // 使用左侧Y轴
          data: rainfallData,
          smooth: true,
          lineStyle: {
            color: colors[1],
            width: 2,
          },
          symbol: 'diamond', // 菱形
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
          yAxisIndex: 1, // 使用右侧Y轴
          data: humidityData,
          smooth: true,
          lineStyle: {
            color: colors[2],
            width: 2,
            type: 'dashed', // 虚线区分
          },
          symbol: 'triangle', // 三角形
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
  }, [])

  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="多系列折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

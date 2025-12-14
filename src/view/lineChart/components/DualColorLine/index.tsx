/**
 * 正负值双色折线图组件
 * 0刻度线以上为绿色，0刻度线以下为红色
 * @author xhj
 * @since 2025-12-14
 */
import { useState, useMemo } from "react"
import Container from "@/components/Container"
import Chart from "@/components/Chart"
import type { ChartProps } from "@/components/Chart"
import { createTooltipContainer, type TooltipItem } from "@/components/Chart/tooltipUtils"
import type { CallbackDataParams } from 'echarts/types/dist/shared'

// 示例数据 - 包含正负值
const mockData = [
  { name: '1月', value: 120 },
  { name: '2月', value: 80 },
  { name: '3月', value: -30 },
  { name: '4月', value: -80 },
  { name: '5月', value: -50 },
  { name: '6月', value: 40 },
  { name: '7月', value: 150 },
  { name: '8月', value: 200 },
  { name: '9月', value: 100 },
  { name: '10月', value: -20 },
  { name: '11月', value: -60 },
  { name: '12月', value: 50 },
]

/**
 * 处理数据，生成正值和负值两个系列
 * 核心思路：使用分段数据，在正负交替处插入交叉点(0)
 * 交叉点的x位置通过线性插值计算，确保能连成直线
 *
 * 例如: 80 -> -30 会变成:
 * positiveData: [80, 0, null]  (从80画到0，然后断开)
 * negativeData: [null, 0, -30] (从0开始画到-30)
 */
function processData(data: { name: string; value: number }[]) {
  const result: { x: number; label: string; pos: number | null; neg: number | null }[] = []

  for (let i = 0; i < data.length; i++) {
    const curr = data[i]
    const next = i < data.length - 1 ? data[i + 1] : null

    // 添加当前点（使用索引作为x坐标）
    if (curr.value >= 0) {
      result.push({ x: i, label: curr.name, pos: curr.value, neg: null })
    } else {
      result.push({ x: i, label: curr.name, pos: null, neg: curr.value })
    }

    // 如果当前点和下一个点跨越零点，插入交叉点
    if (next !== null && curr.value * next.value < 0) {
      // 计算交叉点的x位置（线性插值）
      // 直线方程：y = y1 + (y2 - y1) * (x - x1) / (x2 - x1)
      // 当 y = 0 时：0 = y1 + (y2 - y1) * (x - i) / 1
      // 解得：x = i - y1 / (y2 - y1)
      const y1 = curr.value
      const y2 = next.value
      const xCross = i - y1 / (y2 - y1)
      
      result.push({ 
        x: xCross, 
        label: '', // 交叉点不显示标签
        pos: 0, 
        neg: 0 
      })
    }
  }

  // 按x坐标排序，确保顺序正确
  result.sort((a, b) => a.x - b.x)

  // 生成x轴数据和标签映射
  const xAxisData: number[] = result.map(r => r.x)
  const xAxisLabels: Record<number, string> = {}
  result.forEach(r => {
    if (r.label) {
      xAxisLabels[r.x] = r.label
    }
  })

  return {
    xAxisData,
    xAxisLabels,
    positiveData: result.map(r => r.pos),
    negativeData: result.map(r => r.neg),
  }
}

export default function DualColorLine() {
  const initialChartOptions: ChartProps['options'] = useMemo(() => {
    const { positiveData, negativeData, xAxisData, xAxisLabels } = processData(mockData)

    return {
      // 提示框配置
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
            width: 1,
          },
        },
        formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
          const paramArray = Array.isArray(params) ? params : [params]
          // 过滤掉null值和交叉点
          const validItems = paramArray.filter(item => {
            const value = item.value as number | null
            const name = String(item.name)
            return value !== null && xAxisLabels[Number(name)] !== undefined
          })
          if (validItems.length === 0) return ''

          const item = validItems[0]
          const value = item.value as number
          const xValue = Number(item.name)
          const color = value >= 0 ? '#91CC75' : '#EE6666'
          const list: TooltipItem[] = [{
            color,
            label: '收益',
            value: `${value >= 0 ? '+' : ''}${value}`,
          }]
          const title = xAxisLabels[xValue] || ''
          return createTooltipContainer(title, list)
        },
      },
      // 图例配置
      legend: {
        show: true,
        top: 10,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        data: ['正收益', '负收益'],
      },
      // 网格配置
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '18%',
        containLabel: true,
      },
      // X轴配置
      xAxis: {
        type: 'value', // 改为数值类型
        boundaryGap: false,
        min: 0,
        max: mockData.length - 1,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
          // 只显示原始数据点的标签
          formatter: (value: number) => {
            // 检查是否是整数（原始数据点）
            if (Number.isInteger(value) && value >= 0 && value < mockData.length) {
              return xAxisLabels[value] || ''
            }
            return '' // 交叉点不显示标签
          },
        },
        axisTick: {
          show: false,
        },
      },
      // Y轴配置
      yAxis: {
        type: 'value',
        name: '收益',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
      // 系列配置
      series: [
        // 正值折线（绿色）
        {
          name: '正收益',
          type: 'line',
          data: positiveData.map((val, idx) => val === null ? null : [xAxisData[idx], val]),
          smooth: false,
          connectNulls: false, // 不连接null点
          lineStyle: {
            color: '#91CC75',
            width: 3,
          },
          symbol: 'circle',
          symbolSize: (value: number | number[] | null) => {
            // 交叉点（值为0且是插入的点）不显示圆点
            const val = Array.isArray(value) ? value[1] : value
            return val === 0 ? 0 : 8
          },
          itemStyle: {
            color: '#91CC75',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(145, 204, 117, 0.4)' },
                { offset: 1, color: 'rgba(145, 204, 117, 0.05)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(145, 204, 117, 0.5)',
            },
          },
        },
        // 负值折线（红色）
        {
          name: '负收益',
          type: 'line',
          data: negativeData.map((val, idx) => val === null ? null : [xAxisData[idx], val]),
          smooth: false,
          connectNulls: false,
          lineStyle: {
            color: '#EE6666',
            width: 3,
          },
          symbol: 'circle',
          symbolSize: (value: number | number[] | null) => {
            const val = Array.isArray(value) ? value[1] : value
            return val === 0 ? 0 : 8
          },
          itemStyle: {
            color: '#EE6666',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(238, 102, 102, 0.4)' },
                { offset: 1, color: 'rgba(238, 102, 102, 0.05)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(238, 102, 102, 0.5)',
            },
          },
          // 标记线 - 零线
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              type: 'solid',
              width: 2,
            },
            label: {
              show: true,
              position: 'end',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 11,
              formatter: '0',
            },
            data: [
              { yAxis: 0 },
            ],
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
      title="正负双色折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

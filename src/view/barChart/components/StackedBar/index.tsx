/**
 * 堆叠柱状图组件
 * @author xhj
 * @since 2025-12-13
 */
import { useState } from 'react'
import Container from '@/components/Container'
import Chart from '@/components/Chart'
import type { ChartOption } from '@/components/Chart'
import { mockData } from './mockData'
import { useChartOptions } from './useChartOptions'

export default function StackedBar() {
  const [data] = useState(mockData)
  const [noData] = useState(false)

  const initialChartOptions = useChartOptions(data, noData)
  const [chartOptions, setChartOptions] = useState<ChartOption>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartOption | undefined) => {
    if (options) {
      setChartOptions(options)
    }
  }

  return (
    <Container
      title="堆叠柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

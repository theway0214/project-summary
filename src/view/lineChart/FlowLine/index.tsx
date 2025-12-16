/**
 * FlowLine 流光折线图组件
 * @author xhj
 * @since 2025-12-15
 */
import { useState } from 'react'
import Container from '@/components/Container'
import Chart from '@/components/Chart'
import type { ChartOption } from '@/components/Chart'
import { mockData } from './mockData'
import { useChartOptions } from './useChartOptions'

export default function FlowLine() {
  const [data] = useState(mockData)

  const initialChartOptions = useChartOptions(data)
  const [chartOptions, setChartOptions] = useState<ChartOption>(initialChartOptions)

  const handleChartOptionsChange = (options: ChartOption | undefined) => {
    if (options) {
      setChartOptions(options)
    }
  }

  return (
    <Container
      title="流光折线图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

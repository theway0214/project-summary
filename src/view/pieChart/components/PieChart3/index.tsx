/**
 * 电煤购入量饼图组件
 * @author xhj
 * @since 2025-12-17
 */
import { useState } from 'react'
import Container from '@/components/Container'
import Chart from '@/components/Chart'
import type { ChartOption } from '@/components/Chart'
import { mockData } from './mockData'
import { useChartOptions } from './useChartOptions'

export default function PieChart3() {
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
      title="圆环饼图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}


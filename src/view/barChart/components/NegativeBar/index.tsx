/**
 * 正负值柱状图组件
 * @author xhj
 * @since 2025-12-13
 */
import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import Chart from '@/components/Chart'
import type { ChartOption } from '@/components/Chart'
import { useChartOptions } from './useChartOptions'
import { mockData } from './mockData'

export default function NegativeBar() {
  const initialChartOptions = useChartOptions(mockData)
  const [chartOptions, setChartOptions] = useState<ChartOption>(initialChartOptions)

  useEffect(() => {
    setChartOptions(initialChartOptions)
  }, [initialChartOptions])

  const handleChartOptionsChange = (options: ChartOption | undefined) => {
    if (options) {
      setChartOptions(options)
    }
  }

  return (
    <Container
      title="正负值柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

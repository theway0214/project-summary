/**
 * 排名柱状图组件
 * @author xhj
 * @since 2025-12-15
 */
import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import Chart from '@/components/Chart'
import type { ChartProps } from '@/components/Chart'
import { useChartOptions } from './useChartOptions'
import { mockData } from './mockData'

function RankBar() {
  const initialChartOptions = useChartOptions(mockData)
  const [chartOptions, setChartOptions] = useState<ChartProps['options']>(initialChartOptions)

  useEffect(() => {
    setChartOptions(initialChartOptions)
  }, [initialChartOptions])

  const handleChartOptionsChange = (options: ChartProps['options']) => {
    setChartOptions(options)
  }

  return (
    <Container
      title="排名柱状图"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

export default RankBar

/**
 * BarChart1 多 grid 柱状图组件
 * 使用 Container + Chart 组件
 */
import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import Chart from '@/components/Chart'
import type { ChartOption } from '@/components/Chart'
import { useChartOptions } from './useChartOptions'
import { mockData } from './mockData'

function BarChart1() {
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
      title="装修状态分布"
      chartOptions={chartOptions}
      onChartOptionsChange={handleChartOptionsChange}
    >
      <Chart options={chartOptions} height="100%" autoResize={true} />
    </Container>
  )
}

export default BarChart1
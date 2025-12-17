/**
 * 出力分析组件
 * @author xhj
 * @since 2025-12-17
 */
import { useRef, useEffect } from 'react'
import Container from '@/components/Container'
import Chart, { type ChartRef, type ChartOption } from '@/components/Chart'

import { useOutputAnalysisData } from './useOutputAnalysisData'

export default function OutputAnalysis() {
  const chartRef = useRef<ChartRef>(null)

  const { noData, outputAnalysisOption, loading, registerChartEvents } = useOutputAnalysisData()

  // 注册图表事件
  useEffect(() => {
    if (chartRef.current?.chartInstance) {
      registerChartEvents(chartRef.current.chartInstance)
    }
  }, [registerChartEvents])

  return (
    <Container title="出力分析">
      <Chart
        ref={chartRef}
        options={outputAnalysisOption as ChartOption}
        noData={noData}
        loading={loading}
        height="100%"
        autoResize={true}
      />
    </Container>
  )
}

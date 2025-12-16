/**
 * 容量分布热力图组件
 * @author xhj
 * @since 2025-12-16
 */
import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

import CQ_BG from '@/assets/img/mapImg/cq_bg.webp'
import { CQ } from '@/common/mapGeoJSON/CQ'
import { CQOutLine } from '@/common/mapGeoJSON/CQOutLine'
import { ChinaMap } from '@/common/mapGeoJSON/ChinaMap'

import { useChartOptions } from './useChartOptions'
import { legendData } from './mockData'

import styles from './index.module.less'
import { isPointInCQ } from '@/utils/area'

// 注册地图
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('CQ', CQ as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('CQOutLine', CQOutLine as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('ChinaMap', ChinaMap as any)

interface CapacityMapProps {
  className?: string
}

export default function CapacityMap({ className }: CapacityMapProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  const [heatmapData, setHeatmapData] = useState<number[][]>([])
  const [isReady, setIsReady] = useState(false)

  // 使用抽离的 hook 获取图表配置
  const chartOptions = useChartOptions({ heatmapData })

  // 模拟获取数据（实际项目中替换为真实 API 调用）
  const fetchData = async () => {
 

    // 生成模拟热力图数据
    const mockData: number[][] = []
    for (let i = 0; i < 1900; i++) {
      const lng = 105.5 + Math.random() * 5
      const lat = 28.5 + Math.random() * 5
      if (isPointInCQ(lng, lat)) {
      mockData.push([
          lng,
          lat,
          Math.floor(Math.random() * 200) + 1, // value
        ])
      }
    }
    setHeatmapData(mockData)
  }

  // 初始化
  useEffect(() => {
    // 延迟显示，避免闪屏
    const timer = setTimeout(() => {
      setIsReady(true)
      fetchData()
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // 初始化图表
  useEffect(() => {
    if (isReady && chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)
      chartInstance.current.resize()

      // 窗口大小变化时重新调整图表大小
      const handleResize = () => chartInstance.current?.resize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        chartInstance.current?.dispose()
      }
    }
  }, [isReady])

  // 更新图表配置
  useEffect(() => {
    if (chartInstance.current && heatmapData.length > 0) {
      chartInstance.current.setOption(chartOptions, true)
    }
  }, [chartOptions, heatmapData])

  return (
    <div className={`${styles.container} h-[500px] bg-[rgba(119,126,211,0.5)] w-[700px] ${className || ''}`}>
      {/* 标题 */}
      <div className={styles.title}>容量分布热力图</div>

      {/* 地图容器 */}
      <div className={styles.mapWrapper}>
        {isReady && <img src={CQ_BG} className={styles.mapBg} alt="" />}
        <div ref={chartRef} className={styles.chart}></div>
      </div>

      {/* 图例 */}
      {isReady && (
        <div className={styles.legendWrapper}>
          <div className={styles.legendTitle}>容量分布热力图(万kW)</div>
          <div className={styles.legendContent}>
            <div className={styles.legendLabels}>
              {legendData.map((item, index) => (
                <div key={index} className={styles.legendLabel}>
                  {item.label}
                </div>
              ))}
            </div>
            <div className={styles.legendBar} />
          </div>
        </div>
      )}
    </div>
  )
}

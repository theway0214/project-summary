/**
 * 区域热力图组件 - 充电量/充电站分布
 * @author xhj
 * @since 2025-12-16
 */
import { useEffect, useRef, useState, useMemo } from 'react'
import * as echarts from 'echarts'

import CQ_BG from '@/assets/img/mapImg/cq_bg.webp'
import { CQ } from '@/common/mapGeoJSON/CQ'
import { CQOutLine } from '@/common/mapGeoJSON/CQOutLine'
import { ChinaMap } from '@/common/mapGeoJSON/ChinaMap'

import { useChartOptions } from './useChartOptions'
import { mapData, stationLegendData, capacityLegendData } from './mockData'

import styles from './index.module.less'

// 注册地图
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('CQ', CQ as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('CQOutLine', CQOutLine as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('ChinaMap', ChinaMap as any)

type ActiveKeyType = 'capacity-distribution' | 'station-distribution'

interface HotMapAreaProps {
  className?: string
}

export default function HotMapArea({ className }: HotMapAreaProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  const [activeKey] = useState<ActiveKeyType>('capacity-distribution')

  // 初始化热力图数据
  const hotMapData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (CQ as any).features.map((item: any) => {
      if (activeKey === 'station-distribution') {
        return {
          name: item.properties.name,
          value: 0,
        }
      }
      const data = mapData.find((d) => d.name?.includes(item.properties.name))
      return {
        name: item.properties.name,
        value: data?.value || 0,
      }
    })
  }, [activeKey])

  // 使用抽离的 hook 获取图表配置
  const chartOptions = useChartOptions({ hotMapData, activeKey })

  // 获取当前图例数据
  const currentLegendData = activeKey === 'station-distribution' ? stationLegendData : capacityLegendData

  // 获取当前时间文本
  const timeText = activeKey === 'station-distribution' ? '2025年10月' : '2025年1-10月'

  // 获取当前标题
  const legendTitle =
    activeKey === 'station-distribution' ? '充电站热力分布(座)' : '充电量热力分布（万千瓦时）'

  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)

      // 窗口大小变化时重新调整图表大小
      const handleResize = () => chartInstance.current?.resize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        chartInstance.current?.dispose()
      }
    }
  }, [])

  // 更新图表配置
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(chartOptions)
    }
  }, [chartOptions])

  return (
    <div className={`${styles.container} h-[500px] bg-[rgba(119,126,211,0.5)] w-[700px] ${className || ''}`}>
      {/* 标题 */}
      <div className={styles.title}>区域热力图</div>

      {/* 地图容器 */}
      <div className={styles.mapWrapper}>
        <img src={CQ_BG} className={styles.mapBg} alt="" />
        <div ref={chartRef} className={styles.chart}></div>
      </div>

      {/* 图例 */}
      <div className={styles.legendWrapper}>
        <div className={styles.timeText}>时间：{timeText}</div>
        <div className={styles.legendTitle}>{legendTitle}</div>
        <div className={styles.legendContent}>
          <div className={activeKey === 'station-distribution' ? styles.legendBar : styles.legendBar2} />
          <div className={styles.legendLabels}>
            {currentLegendData.map((item, index) => (
              <div key={index} className={styles.legendLabel}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

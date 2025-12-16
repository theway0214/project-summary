/**
 * 电力地图组件 - 风电光伏规划图
 * @author xhj
 * @since 2025-12-16
 */
import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as echarts from 'echarts'
import CQ_BG from '@/assets/img/mapImg/cq_bg.webp'
import { CQ } from '@/common/mapGeoJSON/CQ'
import { CQOutLine } from '@/common/mapGeoJSON/CQOutLine'
import { ChinaMap } from '@/common/mapGeoJSON/ChinaMap'

import { useChartOptions } from './useChartOptions'

import windStartIcon from './assets/wind-start.webp'
import windPlanIcon from './assets/wind-plan.webp'
import lightStartIcon from './assets/light-start.webp'
import lightPlanIcon from './assets/light-plan.webp'
import playIcon from './assets/play.webp'
import pointIcon from './assets/point.webp'

import styles from './index.module.less'

// 注册地图
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('CQ', CQ as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('CQOutLine', CQOutLine as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('ChinaMap', ChinaMap as any)

interface SelectedInfo {
  name: string
  value: number
  coord: [number, number]
  pixel: [number, number]
}

interface LegendItem {
  name: string
  type: 'start' | 'plan'
  icon: string
  active: boolean
}

interface ElectricityMapProps {
  onMapClick?: (info: SelectedInfo) => void
}

export default function ElectricityMap({ onMapClick }: ElectricityMapProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentYear = new Date().getFullYear()
  const [currentData, setCurrentData] = useState(currentYear)
  const [currentSelect] = useState<string | undefined>(undefined)
  const [legendList, setLegendList] = useState<LegendItem[]>([
    { name: '风电', type: 'start', icon: 'wind-start', active: true },
    { name: '光伏', type: 'start', icon: 'light-start', active: true },
    { name: '风电', type: 'plan', icon: 'wind-plan', active: true },
    { name: '光伏', type: 'plan', icon: 'light-plan', active: true },
  ])

  // 使用抽离的 hook 获取图表配置
  const chartOptions = useChartOptions({ currentData, currentSelect })

  const getIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      'wind-start': windStartIcon,
      'wind-plan': windPlanIcon,
      'light-start': lightStartIcon,
      'light-plan': lightPlanIcon,
    }
    return iconMap[type] || ''
  }

  // 处理区域点击事件
  const handleRegionClick = useCallback(
    (params: echarts.ECElementEvent) => {
      const regionName = params.name

      const selectedInfo: SelectedInfo = {
        name: regionName || '',
        value: (params.value as number) || 0,
        coord: [0, 0],
        pixel: [(params.event?.event as MouseEvent)?.offsetX || 0, (params.event?.event as MouseEvent)?.offsetY || 0],
      }

      if (chartInstance.current) {
        chartInstance.current.setOption({
          geo: [
            { id: 'CQBgGeo' },
            {
              selectedMode: 'single',
              selected: { [params.name || '']: true },
            },
            { id: 'CQBgGeo1' },
          ],
        })
        onMapClick?.(selectedInfo)
      }
    },
    [onMapClick]
  )

  // 处理图例点击
  const handleLegendClick = (item: LegendItem) => {
    setLegendList((prev) =>
      prev.map((legendItem) => {
        if (legendItem.name === item.name && legendItem.type === item.type) {
          return { ...legendItem, active: !legendItem.active }
        }
        return legendItem
      })
    )

    const typeText = item.type === 'start' ? '（已开工）' : '（规划）'
    const seriesName = `${item.name}${typeText}`

    chartInstance.current?.dispatchAction({
      type: 'legendToggleSelect',
      name: seriesName,
    })
  }

  // 播放动画
  const handlePlay = () => {
    setCurrentData(2020)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCurrentData((prev) => {
        if (prev >= 2025) {
          clearInterval(timerRef.current as ReturnType<typeof setInterval>)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  // 处理滑块变化
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData(Number(e.target.value))
  }

  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)

      // 添加点击事件监听
      chartInstance.current.on('click', (params: echarts.ECElementEvent) => {
        if (params.componentType === 'series' && params.componentSubType === 'scatter') {
          handleRegionClick(params)
        }
      })

      // 窗口大小变化时重新调整图表大小
      const handleResize = () => chartInstance.current?.resize()
      window.addEventListener('resize', handleResize)

      // 自动播放
      setTimeout(() => handlePlay(), 100)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        chartInstance.current?.dispose()
      }
    }
  }, [handleRegionClick])

  // 更新图表配置
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(chartOptions)
    }
  }, [chartOptions])

  return (
    <div className={`${styles.container} h-[500px] bg-[rgba(119,126,211,0.5)] w-[700px]`}>
      {/* 标题 */}
      <div className={styles.title}>时间变化趋势图</div>

      {/* 时间轴控制器 */}
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderLabels}>
            <span>2020</span>
            <span>2025</span>
          </div>
          <input
            type="range"
            min={2020}
            max={2025}
            step={1}
            value={currentData}
            onChange={handleSliderChange}
            className={styles.slider}
            style={
              {
                '--progress': `${((currentData - 2020) / 5) * 100}%`,
                '--thumb-image': `url(${pointIcon})`,
              } as React.CSSProperties
            }
          />
          <img src={playIcon} alt="play" className={styles.playBtn} onClick={handlePlay} />
        </div>
      </div>

      {/* 地图容器 */}
      <div className={styles.mapWrapper}>
        <img src={CQ_BG} className={styles.mapBg} alt="" />
        <div ref={chartRef} className={styles.chart}></div>
      </div>

      {/* 图例 */}
      <div className={styles.legendWrapper}>
        <div className={styles.legendList}>
          {legendList.map((item, index) => (
            <div key={index} className={styles.legendItem} onClick={() => handleLegendClick(item)}>
              <img src={getIcon(item.icon)} className={styles.legendIcon} alt="" />
              <div className={styles.legendText}>
                <div
                  className={`${styles.legendName} ${
                    item.type === 'start' && item.active
                      ? styles.startText
                      : item.type === 'plan' && item.active
                        ? styles.planText
                        : !item.active
                          ? styles.inActiveText
                          : ''
                  }`}
                >
                  {item.name}
                </div>
                <div className={`${styles.typeText} ${!item.active ? styles.textColorGray : ''}`}>
                  {item.type === 'start' ? '(已开工)' : '(规划)'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

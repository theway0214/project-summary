/**
 * 电力现状地图组件 - 各类电源分布图
 * @author xhj
 * @since 2025-12-16
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import * as echarts from 'echarts'

import CQ_BG from '@/assets/img/mapImg/cq_bg.webp'
import { CQ } from '@/common/mapGeoJSON/CQ'
import { CQOutLine } from '@/common/mapGeoJSON/CQOutLine'
import { ChinaMap } from '@/common/mapGeoJSON/ChinaMap'

import { useChartOptions } from './useChartOptions'

// 导入图标
import firePowerIcon from './assets/fire-power.webp'
import firePowerPopIcon from './assets/fire-power-pop.webp'
import waterPowerIcon from './assets/water-power.webp'
import waterPowerPopIcon from './assets/water-power-pop.webp'
import windPowerIcon from './assets/wind-power.webp'
import windPowerPopIcon from './assets/wind-power-pop.webp'
import photovoltaicIcon from './assets/photovoltaic.webp'
import photovoltaicPopIcon from './assets/photovoltaic-pop.webp'
import energyStorageIcon from './assets/energy-storage.webp'
import energyStoragePopIcon from './assets/energy-storage-pop.webp'
import pumpStorageIcon from './assets/pump-storage.webp'
import pumpStoragePopIcon from './assets/pump-storage-pop.webp'

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

interface ActiveScatter {
  type: string
  name: string
  lng: number
  lat: number
  pixel: [number, number]
}

interface LegendItem {
  name: string
  icon: string
  value: number
  unit: string
  active: boolean
}

interface ElectricityPresentMapProps {
  onMapClick?: (info: SelectedInfo) => void
}


// 特殊显示名称列表
const allShowNameList = ['双槐', '狮子滩', '麒麟', '回山坪', '淮远', '蟠龙']

export default function ElectricityPresentMap({ onMapClick }: ElectricityPresentMapProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  const [activeScatter, setActiveScatter] = useState<ActiveScatter | null>(null)
  const [legendList, setLegendList] = useState<LegendItem[]>([
    { name: '火电', icon: 'fire-power', value: 37, unit: '座', active: true },
    { name: '水电', icon: 'water-power', value: 32, unit: '座', active: true },
    { name: '风电', icon: 'wind-power', value: 34, unit: '座', active: true },
    { name: '光伏', icon: 'photovoltaic', value: 34, unit: '座', active: true },
    { name: '储能', icon: 'energy-storage', value: 11, unit: '座', active: true },
    { name: '抽蓄', icon: 'pump-storage', value: 1, unit: '座', active: true },
  ])

  // 使用抽离的 hook 获取图表配置
  const chartOptions = useChartOptions()

  const getIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      'fire-power': firePowerIcon,
      'water-power': waterPowerIcon,
      'wind-power': windPowerIcon,
      'photovoltaic': photovoltaicIcon,
      'energy-storage': energyStorageIcon,
      'pump-storage': pumpStorageIcon,
    }
    return iconMap[type] || ''
  }

  const getPopIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      'fire-power': firePowerPopIcon,
      'water-power': waterPowerPopIcon,
      'wind-power': windPowerPopIcon,
      'photovoltaic': photovoltaicPopIcon,
      'energy-storage': energyStoragePopIcon,
      'pump-storage': pumpStoragePopIcon,
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
        if (legendItem.name === item.name) {
          return { ...legendItem, active: !legendItem.active }
        }
        return legendItem
      })
    )

    chartInstance.current?.dispatchAction({
      type: 'legendToggleSelect',
      name: item.name,
    })
  }

  // 获取弹窗位置
  const getPopPosition = (type: string) => {
    if (!activeScatter) return {}

    const offsetMap: Record<string, { left: number; top: number }> = {
      'fire-power': { left: -18, top: -31 },
      'water-power': { left: -18, top: -31 },
      'wind-power': { left: -17, top: -33 },
      'photovoltaic': { left: -17, top: -33 },
      'energy-storage': { left: -17, top: -31 },
      'pump-storage': { left: -17, top: -28 },
    }

    const offset = offsetMap[type] || { left: -18, top: -31 }
    return {
      left: activeScatter.pixel[0] + offset.left + 'px',
      top: activeScatter.pixel[1] + offset.top + 'px',
    }
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

      // 鼠标悬停事件
      chartInstance.current.on('mouseover', (params: echarts.ECElementEvent) => {
        if (params.componentType === 'series' && params.componentSubType === 'scatter') {
          if (chartInstance.current && Array.isArray(params.value)) {
            const [lng, lat] = params.value as number[]
            const pixel = chartInstance.current.convertToPixel({ geoIndex: 1 }, [lng, lat])
            setActiveScatter({
              type: (params.value as (number | string)[])[3] as string,
              name: params.name || '',
              lng,
              lat,
              pixel: pixel as [number, number],
            })
          }
        }
      })

      // 鼠标移出事件
      chartInstance.current.on('mouseout', () => {
        setActiveScatter(null)
      })

      // 窗口大小变化时重新调整图表大小
      const handleResize = () => chartInstance.current?.resize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
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
      <div className={styles.title}>散点图</div>

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
                <div className={`${styles.legendName} ${!item.active ? styles.inActiveText : ''}`}>
                  {item.name}
                </div>
                <div className={`${styles.legendValue} ${!item.active ? styles.inActiveText : ''}`}>
                  {item.value} {item.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 弹窗 */}
      {activeScatter?.type && !allShowNameList.includes(activeScatter.name) && (
        <div
          className={styles.popup}
          style={{
            ...getPopPosition(activeScatter.type),
            backgroundImage: `url(${getPopIcon(activeScatter.type)})`,
          }}
        >
          <div className={styles.popupName}>{activeScatter.name}</div>
        </div>
      )}
    </div>
  )
}

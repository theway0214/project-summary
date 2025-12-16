/**
 * ElectricityPresentMap 图表配置 Hook
 * @author xhj
 * @since 2025-12-16
 */
import { useMemo } from 'react'
import * as echarts from 'echarts'

import China_bg from '@/assets/img/mapImg/china_dark_blue.webp'
import Water_line from './assets/water-line.webp'

import {
  firePowerData,
  waterPowerData,
  windPowerData,
  photovoltaicData,
  energyStorageData,
  pumpStorageData,
} from './mockData'

// 导入图标
import firePowerIcon from './assets/fire-power.webp'
import firePowerByNameIcon from './assets/fire-power-by-name.webp'
import waterPowerIcon from './assets/water-power.webp'
import waterPowerByNameIcon from './assets/water-power-by-name.webp'
import windPowerIcon from './assets/wind-power.webp'
import windPowerByNameIcon from './assets/wind-power-by-name.webp'
import photovoltaicIcon from './assets/photovoltaic.webp'
import photovoltaicByNameIcon from './assets/photovoltaic-by-name.webp'
import energyStorageIcon from './assets/energy-storage.webp'
import energyStorageByNameIcon from './assets/energy-storage-by-name.webp'
import pumpStorageIcon from './assets/pump-storage.webp'
import pumpStorageByNameIcon from './assets/pump-storage-by-name.webp'

export function useChartOptions() {
  const chartOptions: echarts.EChartsOption = useMemo(() => {
    const aspectScale = 1.14
    const layoutSize = '118%'
    const layoutCenter = ['45.85%', '44.7%']

    return {
      tooltip: {
        show: false,
        trigger: 'item',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => `${params.name}<br/>数值: ${params.value || 0}`,
        borderWidth: 1,
        borderColor: '#FFFFFF99',
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: { color: '#FFFFFF', fontSize: 10 },
        padding: [2, 4],
      },
      legend: { show: false },
      geo: [
        {
          type: 'map',
          silent: true,
          select: { disabled: true },
          id: 'CQBgGeo',
          map: 'CQOutLine',
          layoutSize,
          aspectScale,
          layoutCenter,
          itemStyle: {
            areaColor: {
              image: China_bg,
              repeat: 'no-repeat',
              x: 17,
              y: 17,
              scaleX: 0.33,
              scaleY: 0.33,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
            borderWidth: 0,
            borderColor: 'transparent',
          },
        },
        {
          type: 'map',
          silent: true,
          select: { disabled: true },
          map: 'CQOutLine',
          layoutSize,
          aspectScale,
          layoutCenter,
          itemStyle: {
            areaColor: {
              image: Water_line,
              repeat: 'no-repeat',
              x: 55,
              y: 110,
              scaleX: 0.24,
              scaleY: 0.23,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
            borderWidth: 0,
            borderColor: 'transparent',
          },
        },
        {
          map: 'CQ',
          type: 'map',
          aspectScale,
          layoutSize,
          layoutCenter,
          label: {
            show: true,
            fontSize: 8,
            fontFamily: 'OPPOSans-Regular',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 500,
          },
          itemStyle: {
            areaColor: 'rgba(31, 71, 133,0.2)',
            borderColor: 'transparent',
            borderWidth: 0,
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(31, 71, 133,0.2)',
              borderColor: 'transparent',
            },
            label: {
              show: true,
              fontSize: 8,
              fontFamily: 'OPPOSans-Regular',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 500,
            },
          },
          select: {
            disabled: true,
            itemStyle: {
              areaColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
            },
            label: {
              show: true,
              fontSize: 8,
              fontFamily: 'OPPOSans-Regular',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 500,
            },
          },
          selectedMode: 'single',
          tooltip: { show: false },
          z: 2,
        },
        {
          type: 'map',
          silent: true,
          select: { disabled: true },
          z: 4,
          id: 'CQBgGeo1',
          map: 'CQOutLine',
          layoutSize,
          aspectScale,
          layoutCenter,
          itemStyle: {
            areaColor: 'transparent',
            borderWidth: 2,
            borderColor: 'rgba(180, 234, 252)',
          },
        },
      ],
      series: [
        {
          name: '火电',
          type: 'scatter',
          coordinateSystem: 'geo',
          z: 5,
          data: firePowerData.map((item) => {
            const isSpecial = item.name === '双槐'
            return {
              name: item.name,
              value: [item.lng, item.lat, item.value, 'fire-power'],
              itemStyle: { opacity: 1 },
              symbol: `image://${isSpecial ? firePowerByNameIcon : firePowerIcon}`,
              symbolSize: isSpecial ? [37, 46] : [30, 19],
            }
          }),
        },
        {
          name: '水电',
          type: 'scatter',
          z: 6,
          coordinateSystem: 'geo',
          data: waterPowerData.map((item) => {
            const isSpecial = item.name === '狮子滩'
            return {
              name: item.name,
              value: [item.lng, item.lat, item.value, 'water-power'],
              itemStyle: { opacity: 1 },
              symbol: `image://${isSpecial ? waterPowerByNameIcon : waterPowerIcon}`,
              symbolSize: isSpecial ? [37, 41] : [30, 20],
            }
          }),
        },
        {
          name: '风电',
          type: 'scatter',
          z: 7,
          coordinateSystem: 'geo',
          data: windPowerData.map((item) => {
            const isSpecial = item.name === '麒麟'
            return {
              name: item.name,
              value: [item.lng, item.lat, item.value, 'wind-power'],
              itemStyle: { opacity: 1 },
              symbol: `image://${isSpecial ? windPowerByNameIcon : windPowerIcon}`,
              symbolSize: isSpecial ? [37, 45] : [30, 20],
            }
          }),
        },
        {
          name: '光伏',
          type: 'scatter',
          z: 8,
          coordinateSystem: 'geo',
          data: photovoltaicData.map((item) => {
            const isSpecial = item.name === '回山坪'
            return {
              name: item.name,
              value: [item.lng, item.lat, item.value, 'photovoltaic'],
              itemStyle: { opacity: 1 },
              symbol: `image://${isSpecial ? photovoltaicByNameIcon : photovoltaicIcon}`,
              symbolSize: isSpecial ? [38, 45] : [30, 20],
            }
          }),
        },
        {
          name: '储能',
          type: 'scatter',
          z: 8,
          coordinateSystem: 'geo',
          data: energyStorageData.map((item) => {
            const isSpecial = item.name === '淮远'
            return {
              name: item.name,
              value: [item.lng, item.lat, item.value, 'energy-storage'],
              itemStyle: { opacity: 1 },
              symbol: `image://${isSpecial ? energyStorageByNameIcon : energyStorageIcon}`,
              symbolSize: isSpecial ? [37, 44] : [30, 20],
            }
          }),
        },
        {
          name: '抽蓄',
          type: 'scatter',
          z: 8,
          coordinateSystem: 'geo',
          data: pumpStorageData.map((item) => {
            const isSpecial = item.name === '蟠龙'
            return {
              name: item.name,
              value: [item.lng, item.lat, item.value, 'pump-storage'],
              itemStyle: { opacity: 1 },
              symbol: `image://${isSpecial ? pumpStorageByNameIcon : pumpStorageIcon}`,
              symbolSize: isSpecial ? [37, 43] : [30, 20],
            }
          }),
        },
      ],
    }
  }, [])

  return chartOptions
}

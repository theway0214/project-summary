/**
 * ElectricityMap 图表配置 Hook
 * @author xhj
 * @since 2025-12-16
 */
import { useMemo } from 'react'
import * as echarts from 'echarts'

import China_bg from '@/assets/img/mapImg/china_dark_blue.webp'
import { lightStartData, lightPlanData, windStartData, windPlanData } from './mockData'

import windStartIcon from './assets/wind-start.webp'
import windPlanIcon from './assets/wind-plan.webp'
import lightStartIcon from './assets/light-start.webp'
import lightPlanIcon from './assets/light-plan.webp'

interface UseChartOptionsParams {
  currentData: number
  currentSelect?: string
}

export function useChartOptions({ currentData, currentSelect }: UseChartOptionsParams) {
  const chartOptions: echarts.EChartsOption = useMemo(() => {
    const aspectScale = 1.14
    const layoutSize = '118%'
    const layoutCenter = ['50.85%', '46.7%']

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
              x: 57,
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
            borderColor: 'rgba(96, 203, 250,1)',
            borderWidth: 1,
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
          name: '风电（已开工）',
          type: 'scatter',
          coordinateSystem: 'geo',
          z: 5,
          data: windStartData
            .filter((item) => item.year <= currentData)
            .map((item) => {
              let symbol
              if (currentSelect) {
                symbol = currentSelect === item.name ? `image://${windStartIcon}` : 'none'
              } else {
                symbol = `image://${windStartIcon}`
              }
              return {
                name: item.name,
                value: [item.lng, item.lat, item.value],
                itemStyle: { opacity: 1 },
                symbol,
                symbolSize: [40, 31],
              }
            }),
        },
        {
          name: '光伏（已开工）',
          type: 'scatter',
          z: 6,
          coordinateSystem: 'geo',
          data: lightStartData
            .filter((item) => item.year <= currentData)
            .map((item) => {
              let symbol
              if (currentSelect) {
                symbol = currentSelect === item.name ? `image://${lightStartIcon}` : 'none'
              } else {
                symbol = `image://${lightStartIcon}`
              }
              return {
                name: item.name,
                value: [item.lng, item.lat, item.value],
                itemStyle: { opacity: 1 },
                symbol,
                symbolSize: [40, 31],
              }
            }),
        },
        {
          name: '风电（规划）',
          type: 'scatter',
          z: 7,
          coordinateSystem: 'geo',
          data: windPlanData
            .filter((item) => item.year <= currentData)
            .map((item) => {
              let symbol
              if (currentSelect) {
                symbol = currentSelect === item.name ? `image://${windPlanIcon}` : 'none'
              } else {
                symbol = `image://${windPlanIcon}`
              }
              return {
                name: item.name,
                value: [item.lng, item.lat, item.value],
                itemStyle: { opacity: 1 },
                symbol,
                symbolSize: [40, 31],
              }
            }),
        },
        {
          name: '光伏（规划）',
          type: 'scatter',
          z: 8,
          coordinateSystem: 'geo',
          data: lightPlanData
            .filter((item) => item.year <= currentData)
            .map((item) => {
              let symbol
              if (currentSelect) {
                symbol = currentSelect === item.name ? `image://${lightPlanIcon}` : 'none'
              } else {
                symbol = `image://${lightPlanIcon}`
              }
              return {
                name: item.name,
                value: [item.lng, item.lat, item.value],
                itemStyle: { opacity: 1 },
                symbol,
                symbolSize: [40, 31],
              }
            }),
        },
      ],
    }
  }, [currentData, currentSelect])

  return chartOptions
}

/**
 * CapacityMap 图表配置 Hook
 * @author xhj
 * @since 2025-12-16
 */
import { useMemo } from 'react'
import * as echarts from 'echarts'

import China_bg from '@/assets/img/mapImg/china_dark_blue.webp'
import { CQ } from '@/common/mapGeoJSON/CQ'
import { capacityByDistrict, mainCityConfig, heatmapColorStops } from './mockData'

interface DistrictData {
  name: string
  value: [number, number, number]
  symbol: string
  symbolSize: [number, number]
}

interface UseChartOptionsParams {
  heatmapData: number[][]
}

export function useChartOptions({ heatmapData }: UseChartOptionsParams) {
  // 计算区县标注数据
  const districtLabelData: DistrictData[] = useMemo(() => {
    const result = Object.entries(capacityByDistrict)
      .map(([name, v]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const feature = (CQ as any).features.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (f: any) => (f.properties.name as string) === name
        )
        if (!feature) return null
        const [lng, lat] = feature.properties.center as [number, number]
        return {
          name,
          value: [lng, lat, v] as [number, number, number],
          symbol: 'roundRect',
          symbolSize: [60, 32] as [number, number],
        }
      })
      .filter(Boolean) as DistrictData[]

    // 添加主城区域
    result.push({
      name: mainCityConfig.name,
      value: [mainCityConfig.lng, mainCityConfig.lat, mainCityConfig.value],
      symbol: 'roundRect',
      symbolSize: [60, 32],
    })

    return result
  }, [])

  const chartOptions: echarts.EChartsOption = useMemo(() => {
    const aspectScale = 1.14
    const layoutSize = '118%'
    const layoutCenter: [string, string] = ['50.85%', '46.7%']

    return {
      backgroundColor: 'transparent',
      tooltip: {
        show: false,
      },
      geo: [
        {
          type: 'map',
          silent: true,
          select: {
            disabled: true,
          },
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
          silent: true,
          label: {
            show: false,
            fontSize: 10,
            fontFamily: 'OPPOSans-Regular',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 500,
          },
          itemStyle: {
            areaColor: 'rgba(17, 113, 183)',
            borderColor: 'rgba(35, 138, 208, 1)',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(17, 113, 183)',
            },
            label: {
              show: true,
              fontSize: 10,
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
              fontSize: 10,
              fontFamily: 'OPPOSans-Regular',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 500,
            },
          },
          selectedMode: 'single',
          tooltip: {
            show: false,
          },
          z: 2,
        },
        {
          type: 'map',
          silent: true,
          select: {
            disabled: true,
          },
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
      visualMap: {
        show: false,
        bottom: 30,
        z: 5,
        right: 100,
        type: 'piecewise',
        dimension: 2,
        seriesIndex: 0,
        color: heatmapColorStops,
        min: 1,
        max: 40,
        calculable: true,
        itemWidth: 10,
        itemHeight: 140,
        textStyle: {
          show: false,
          color: 'transparent',
          fontSize: 0,
        },
      },
      series: [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mapType: 'CQ' as any,
          name: 'AQI',
          type: 'heatmap',
          coordinateSystem: 'geo',
          data: heatmapData,
          progressive: 0,
          animation: false,
          pointSize: 8,
          blurSize: 40,
        },
        {
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          z: 6,
          data: districtLabelData,
          itemStyle: {
            color: 'rgba(0, 80, 160, 0.85)',
            borderColor: 'rgba(100, 200, 255, 0.8)',
            borderWidth: 1,
          },
          label: {
            show: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => `${params.name}\n${Number(params.value?.[2] || 0)}座`,
            color: '#FFFFFF',
            fontSize: 10,
            fontFamily: 'OPPOSans-Regular',
            lineHeight: 12,
            padding: [2, 3],
          },
        },
      ],
    }
  }, [heatmapData, districtLabelData])

  return chartOptions
}

/**
 * HotMapArea 图表配置 Hook
 * @author xhj
 * @since 2025-12-16
 */
import { useMemo } from 'react'
import * as echarts from 'echarts'

import China_bg from '@/assets/img/mapImg/china_dark_blue.webp'
import { greenColorPieces, redColorPieces } from './mockData'

interface HotMapDataItem {
  name: string
  value: number
}

interface UseChartOptionsParams {
  hotMapData: HotMapDataItem[]
  activeKey: 'capacity-distribution' | 'station-distribution'
  mapType?: string
}

export function useChartOptions({ hotMapData, activeKey, mapType = 'all' }: UseChartOptionsParams) {
  const chartOptions: echarts.EChartsOption = useMemo(() => {
    const aspectScale = 1.14
    const layoutSize = '118%'
    const layoutCenter: [string, string] = ['50%', '50%']

    return {
      tooltip: {
        show: activeKey !== 'station-distribution',
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderColor: '#308CF7',
        borderWidth: 2,
        padding: [8, 12],
        textStyle: {
          color: '#fff',
          fontSize: 12,
          fontFamily: 'OPPOSans-Medium',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          return `<div style="display:flex;align-items:center;font-size:12px;">
            <span style="display:inline-block;width:4px;height:12px;background:#2FC1FF;margin-right:8px;"></span>
            <span style="color:#fff;margin-right:8px;">${params.name}:</span>
            <span style="color:#fff;font-weight:400;font-family:OPPOSans-Medium;">${params.value}万千瓦时</span>
          </div>`
        },
      },
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
              x: 40,
              y: 20,
              scaleX: 0.4,
              scaleY: 0.4,
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
            show: false,
            fontSize: 10,
            fontFamily: 'OPPOSans-Regular',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 500,
          },
          itemStyle: {
            areaColor: 'transparent',
            borderColor: 'rgba(96, 205, 252)',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              areaColor: 'transparent',
              borderColor: 'transparent',
            },
            label: {
              show: true,
              fontSize: 10,
              fontFamily: 'OPPOSans-Regular',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 500,
            },
          },
          tooltip: { show: true },
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
      visualMap: [
        {
          show: false,
          type: 'piecewise',
          pieces: [...greenColorPieces, ...redColorPieces],
          textStyle: { color: 'transparent' },
          align: 'left',
          right: '200px',
          bottom: '2.3%',
          itemWidth: 10,
          itemHeight: 5,
        },
      ],
      series: [
        {
          type: 'map',
          map: 'CQ',
          aspectScale,
          layoutSize,
          layoutCenter,
          z: 15,
          label: {
            show: true,
            fontFamily: 'OPPOSans-Regular',
            fontSize: 10,
            color: 'rgba(255, 255, 255, 0.5)',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (e: any) => {
              if (e.value === 0) {
                return `{a|${e.name}}`
              } else if (mapType !== 'all' && (e.name === '长寿' || e.name === '璧山')) {
                return ''
              } else {
                return `{b|${e.value}}\n{a|${e.name}}`
              }
            },
            rich: {
              b: {
                color: '#fff',
                fontSize: 8,
                fontFamily: 'OPPOSans-Regular',
                fontWeight: 700,
                padding: [0, 0, 2, 0],
              },
              a: {
                color: '#fff',
                fontSize: 8,
                fontFamily: 'OPPOSans-Regular',
              },
            },
          },
          itemStyle: {
            borderWidth: 0,
          },
          data: hotMapData,
          select: {
            disabled: true,
            itemStyle: {
              areaColor: 'transparent',
              borderColor: 'rgb(78, 215, 250)',
              borderWidth: 2,
            },
            label: {
              show: false,
              fontSize: 10,
              color: '#fff',
            },
          },
        },
      ],
    }
  }, [hotMapData, activeKey, mapType])

  return chartOptions
}

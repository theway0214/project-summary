/**
 * OutputAnalysis 数据处理 Hook
 * @author xhj
 * @since 2025-12-17
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import dayjs from 'dayjs'
import type { EChartsOption, EChartsType } from 'echarts'

import { mockData, type OutputAnalysisDataItem } from './mockData'

const TYPE_LIST = [1, 2, 3, 4, 5] // 1水电 2火电 3风电 4光伏 5发购
const COLOR_MAP = ['#316fea', '#f8be29', '#1edae6', '#37f7bd', '#ee8254']

function getType(type: number): string {
  switch (type) {
    case 1:
      return '水电'
    case 2:
      return '火电'
    case 3:
      return '风电'
    case 4:
      return '光伏'
    case 5:
      return '发购'
    default:
      return ''
  }
}

export function useOutputAnalysisData() {
  const [outputAnalysisOption, setOutputAnalysisOption] = useState<EChartsOption>()
  const [searchResult, setSearchResult] = useState<OutputAnalysisDataItem[]>([])
  const [noData, setNoData] = useState(false)
  const [loading, setLoading] = useState(false)
  const chartInstanceRef = useRef<EChartsType | null>(null)

  const buildOutputAnalysisOption = useCallback((data: OutputAnalysisDataItem[]) => {
    if (!data || data.length <= 0) {
      setNoData(true)
      return
    }

    setNoData(false)

    // 构建时间轴数据
    let dataTimeArr: string[] = []
    data.forEach((item) => {
      const timeStr = dayjs(item.dataTime).format('HH:mm')
      if (!dataTimeArr.includes(timeStr)) {
        dataTimeArr.push(timeStr)
      }
    })

    // 对时间数组进行排序
    dataTimeArr.sort()
    
    // 获取最后一个时间点的小时数
    const lastTime = dataTimeArr[dataTimeArr.length - 1]
    const lastHour = lastTime ? parseInt(lastTime.split(':')[0]) : 0
    
    // 生成后续的整点时间（每2小时一个）
    const startHour = Math.ceil((lastHour + 1) / 2) * 2 // 向上取整到最近的偶数小时
    const cutOutArr: string[] = []
    for (let i = startHour; i <= 24; i += 2) {
      cutOutArr.push(`${String(i).padStart(2, '0')}:00`)
    }
    dataTimeArr = [...dataTimeArr, ...cutOutArr]

    // 构建系列数据
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesArr: any[] = []
    TYPE_LIST.forEach((type) => {
      const dataValues = dataTimeArr.map((dataTime) => {
        const dataItem = data.find((item) => dayjs(item.dataTime).format('HH:mm') === dataTime && item.indexType === type)
        return dataItem ? dataItem.outputValue : '-'
      })

      const numericValues = dataValues.filter((v) => v !== '-') as number[]
      const maxValue = numericValues.length > 0 ? Math.max(...numericValues) : 0
      const minValue = numericValues.length > 0 ? Math.min(...numericValues) : 0

      seriesArr.push({
        name: getType(type),
        type: 'line',
        symbol: 'none',
        color: COLOR_MAP[type - 1],
        lineStyle: {
          color: COLOR_MAP[type - 1],
          width: 2,
        },
        data: dataValues,
        markLine: {
          symbol: ['none', 'none'],
          label: {
            show: true,
            position: 'end',
            formatter: '{b}\n\n',
            color: '#FFFFFF',
            fontSize: 12,
            padding: [0, 0, 0, -20],
          },
          data: [
            {
              name: 'Max',
              yAxis: maxValue,
              lineStyle: {
                color: '#ee8254',
                type: 'dashed',
                width: 1,
              },
            },
            {
              name: 'Min',
              yAxis: minValue,
              lineStyle: {
                color: '#24cbff',
                type: 'dashed',
                width: 1,
              },
            },
          ],
        },
      })
    })

    // 计算 Y 轴范围（基于水电数据）
    let maxData = 0
    let minData = 0
    const waterItem = seriesArr.find((e) => e.name === '水电')
    if (Array.isArray(waterItem?.data)) {
      const numericData = waterItem.data.filter((v: string | number) => typeof v === 'number') as number[]
      if (numericData.length > 0) {
        maxData = Number((Math.max(...numericData) * 1.1).toFixed(0))
        minData = Number((Math.min(...numericData) * 0.8).toFixed(0))
      }
    }

    setOutputAnalysisOption({
      grid: {
        left: '6%',
        right: '4%',
        bottom: '8%',
        top: '28%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        textStyle: {
          color: '#FFFFFF',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          if (!Array.isArray(params)) return ''
          const timeStr = params[0].axisValueLabel
          let result = `${dayjs().format('YYYY-MM-DD')} ${timeStr}<br/>`
          params.forEach((param: { marker: string; seriesName: string; value: number | string }) => {
            result += `${param.marker}${param.seriesName}: ${param.value}<br/>`
          })
          return result
        },
      },
      legend: {
        show: true,
        icon: 'rect',
        left: 'center',
        top: '5%',
        itemHeight: 6,
        itemWidth: 32,
        itemGap: 5,
        textStyle: {
          color: '#FFFFFF',
          fontSize: 12,
        },
        selected: {
          发购: false,
          水电: true,
          火电: false,
          风电: false,
          光伏: false,
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        triggerEvent: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        axisLabel: {
          color: '#FFFFFF',
          fontSize: 8,
          rotate: 45,
          formatter: (value: string) => {
            // 如果是 "HH:00" 格式，转换为 "HH时"
            if (value.endsWith(':00')) {
              const hour = parseInt(value.split(':')[0])
              return `${hour}时`
            }
            return value
          },
        },
        data: dataTimeArr,
      },
      yAxis: {
        type: 'value',
        name: '单位（万kW）',
        nameGap: 20,
        nameTextStyle: {
          color: '#FFFFFF',
          fontSize: 12,
        },
        max: maxData,
        min: minData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        axisLabel: {
          color: '#FFFFFF',
          fontSize: 10,
        },
      },
      series: seriesArr,
    })
  }, [])

  const fetchData = useCallback(() => {
    setLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setSearchResult(mockData)
      buildOutputAnalysisOption(mockData)
      setLoading(false)
    }, 100)
  }, [buildOutputAnalysisOption])

  // 注册图例选择事件
  const registerChartEvents = useCallback(
    (instance: EChartsType) => {
      chartInstanceRef.current = instance
      const list = ['水电', '火电', '风电', '光伏', '发购']

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance.on('legendselectchanged', (params: any) => {
        const series = outputAnalysisOption?.series as { name: string; data: (number | string)[] }[]
        if (Array.isArray(series)) {
          const item = series.find((e) => e.name === params.name)

          if (item && Array.isArray(item.data)) {
            const numericData = item.data.filter((v) => typeof v === 'number') as number[]
            if (numericData.length > 0) {
              const max = Math.max(...numericData)
              const min = Math.min(...numericData)

              setOutputAnalysisOption((prev) => ({
                ...prev,
                yAxis: {
                  ...(prev?.yAxis as object),
                  max: Number((max * 1.1).toFixed(0)),
                  min: Number((min * 0.8).toFixed(0)),
                },
              }))
            }
          }
        }

        instance.on('rendered', () => {
          list.forEach((e) => {
            instance.dispatchAction({
              type: e === params.name ? 'legendSelect' : 'legendUnSelect',
              name: e,
            })
          })
          instance.off('rendered')
        })
      })
    },
    [outputAnalysisOption]
  )

  // 初始加载数据
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 定时刷新（可选）
  useEffect(() => {
    // 如果需要定时刷新，可以启用这个
    // const timer = setInterval(() => {
    //   fetchData()
    // }, 60000) // 60秒刷新一次
    // return () => clearInterval(timer)
  }, [fetchData])

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      buildOutputAnalysisOption(searchResult)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [searchResult, buildOutputAnalysisOption])

  return {
    noData,
    outputAnalysisOption,
    loading,
    registerChartEvents,
  }
}

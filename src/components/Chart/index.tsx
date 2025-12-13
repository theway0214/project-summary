import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import type { CSSProperties } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import { tooltipDataMap } from './tooltipMap'
import { createTooltipContainer } from './tooltipUtils'
import './index.css'

export interface ChartProps {
  options?: ChartOption
  noData?: boolean
  loading?: boolean
  height?: string | number
  width?: string | number
  autoResize?: boolean
  disableDirtyCheck?: boolean
  anchorMode?: boolean
}

export interface ChartRef {
  chartInstance?: ECharts
  initChart: () => void
  resizeChart: () => void
}

interface SeriesOption {
  data?: (object | number | null | undefined)[]
  name?: string
  show?: boolean
  type?: string
  [key: string]: unknown
}

type ChartOption = EChartsOption & {
  yAxis?: EChartsOption['yAxis']
  series?: SeriesOption[]
}

interface LegendSelectChangedParams {
  selected: Record<string, boolean>
}

const Chart = forwardRef<ChartRef, ChartProps>(
  (
    {
      options = {},
      noData = false,
      loading = false,
      height = '100%',
      width = '100%',
      autoResize = false,
      disableDirtyCheck = false,
      anchorMode = false,
    },
    ref
  ) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartWrapperRef = useRef<HTMLDivElement>(null)
    const chartInstanceRef = useRef<ECharts | undefined>(undefined)
    const resizeObserverRef = useRef<ResizeObserver | null>(null)
    const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [hasShownData, setHasShownData] = useState(false)

    // 默认的 tooltip 配置
    const defaultTooltipConfig = {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'none' as const,
      },
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
    }

    // 默认的 x 轴配置
    const defaultXAxisConfig = {
      type: 'category' as const,
      axisLine: {
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        padding: 8,
      },
      splitLine: {
        show: false,
      },
    }

    // 默认的 y 轴配置
    const defaultYAxisConfig = {
      nameGap: 30,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
      nameTextStyle: {
        fontSize: 14,
        color: '#FFFFFF',
      },
      axisLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        padding: [0, 12, 0, 0],
      },
      splitLine: {
        show: true,
        showMinLine: false,
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.2)',
          type: 'dashed' as const,
        },
      },
    }

    // 默认的网格配置
    const defaultGridConfig = {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '8%',
      containLabel: true,
    }

    // 默认的图例配置
    const defaultLegendConfig = {
      top: '8%',
      right: '5%',
      show: true,
      icon: 'rich',
      itemWidth: 14,
      itemHeight: 14,
      itemGap: 16,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 14,
        padding: [0, 0, 0, 8],
      },
    }

    function mountVueTooltip() {
      if (!chartInstanceRef.current) return

      const container = document.querySelector('[id^=echarts-tooltip-vue-]') as HTMLElement | null
      if (!container) return

      const tooltipId = container.id
      const data = tooltipDataMap.get(tooltipId)
      if (!data) return

      container.innerHTML = createTooltipContainer(data.title, data.list)
    }

    function unmountVueTooltip() {
      const container = document.querySelector('[id^=echarts-tooltip-vue-]') as HTMLElement | null

      if (container) {
        container.innerHTML = ''
      }
    }

    // 处理图例点击事件
    const handleLegendSelectChanged = (params: unknown) => {
      if (!chartInstanceRef.current) return

      const selected = (params as LegendSelectChangedParams).selected
      const currentOption = chartInstanceRef.current.getOption() as ChartOption
      const series = currentOption?.series || []

      const allSeriesHidden = series.every((item: SeriesOption) => {
        const seriesName = item.name
        return seriesName ? !selected[seriesName] : true
      })

      // 更新隐藏状态（如果需要可以用于其他逻辑）

      const newOptions: ChartOption = {
        ...currentOption,
        yAxis: {
          ...currentOption?.yAxis,
          ...(allSeriesHidden
            ? {
                min: 0,
                max: 100,
                splitNumber: 5,
              }
            : {
                min: undefined,
                max: undefined,
              }),
        },
      }

      chartInstanceRef.current.setOption(newOptions)
    }

    // 合并配置的辅助函数
    const mergeConfig = (
      defaultConfig: Record<string, unknown>,
      userConfig: unknown
    ): Record<string, unknown> | Record<string, unknown>[] => {
      if (!userConfig) {
        return defaultConfig
      }
      if (Array.isArray(userConfig)) {
        return userConfig.map((config) => ({
          ...defaultConfig,
          ...(config as Record<string, unknown>),
        }))
      }
      return {
        ...defaultConfig,
        ...(userConfig as Record<string, unknown>),
      }
    }

    // 初始化图表
    const initChart = () => {
      if (!chartRef.current) return

      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
      }

      chartInstanceRef.current = echarts.init(chartRef.current)

      if (!chartRef.current.id) {
        chartRef.current.id = `chart-${Math.random().toString(36).slice(2)}`
      }

      if (options) {
        const mergedOptions = {
          textStyle: {
            fontSize: 14,
            fontFamily: 'OPPOSans-Regular',
            color: '#FFFFFF',
          },
          ...options,
          tooltip: {
            ...defaultTooltipConfig,
            ...options.tooltip,
          },
          xAxis: mergeConfig(defaultXAxisConfig, options.xAxis),
          yAxis: mergeConfig(defaultYAxisConfig, options.yAxis),
          grid: mergeConfig(defaultGridConfig, options.grid),
          legend: mergeConfig(defaultLegendConfig, options.legend),
        }

        chartInstanceRef.current.setOption(mergedOptions, {
          notMerge: false,
          lazyUpdate: false,
        })

        if (!noData) {
          setHasShownData(true)
        }
      }

      chartInstanceRef.current.on('legendselectchanged', handleLegendSelectChanged)

      chartInstanceRef.current.on('showTip', () => {
        mountVueTooltip()
      })

      chartInstanceRef.current.on('hideTip', () => {
        unmountVueTooltip()
        const container = document.querySelector('[id^=echarts-tooltip-vue-]') as HTMLElement | null

        if (container) {
          const tooltipId = container.id
          tooltipDataMap.delete(tooltipId)
        }
      })
    }

    // 更新图表大小（带防抖）
    const resizeChart = () => {
      if (!chartInstanceRef.current) return

      // 清除之前的定时器
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }

      // 防抖处理：延迟 100ms 执行 resize
      resizeTimerRef.current = setTimeout(() => {
        if (!chartInstanceRef.current) return

        // 重置图表大小
        chartInstanceRef.current.resize({ animation: { duration: 300 } })

        // 如果需要，重新设置配置
        if (!disableDirtyCheck && options) {
          setTimeout(() => {
            chartInstanceRef.current?.setOption(options, {
              notMerge: false,
              lazyUpdate: false,
            })
          }, 0)
        }
      }, 100)
    }

    // 暴露实例和方法
    useImperativeHandle(ref, () => ({
      chartInstance: chartInstanceRef.current,
      initChart,
      resizeChart,
    }))

    // 监听配置变化
    useEffect(() => {
      if (!chartInstanceRef.current || !options) return

      if (anchorMode && hasShownData && noData) {
        return
      }

      const mergedOptions = {
        textStyle: {
          fontSize: 14,
          fontFamily: 'OPPOSans-Regular',
          color: '#FFFFFF',
        },
        ...options,
        tooltip: {
          ...defaultTooltipConfig,
          ...options.tooltip,
        },
        xAxis: mergeConfig(defaultXAxisConfig, options.xAxis),
        yAxis: mergeConfig(defaultYAxisConfig, options.yAxis),
        grid: mergeConfig(defaultGridConfig, options.grid),
        legend: mergeConfig(defaultLegendConfig, options.legend),
      }

      chartInstanceRef.current.setOption(mergedOptions, {
        notMerge: false,
        lazyUpdate: false,
      })

      // 使用 setTimeout 避免在 effect 中同步调用 setState
      if (!noData && !hasShownData) {
        setTimeout(() => {
          setHasShownData(true)
        }, 0)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, noData, anchorMode, hasShownData])

    // 初始化图表和监听窗口/容器大小变化
    useEffect(() => {
      // 延迟初始化，确保 DOM 已渲染
      const timer = setTimeout(() => {
        initChart()
      }, 0)

      // 窗口大小变化处理函数
      const handleWindowResize = () => {
        resizeChart()
      }

      // 监听窗口大小变化（始终监听，确保窗口变化时图表能正确重置）
      window.addEventListener('resize', handleWindowResize)

      // 使用 ResizeObserver 监听容器大小变化
      // 监听 chart-wrapper，因为它是实际占位的容器
      const targetElement = chartWrapperRef.current || chartRef.current
      
      if (targetElement && typeof ResizeObserver !== 'undefined') {
        resizeObserverRef.current = new ResizeObserver((entries) => {
          // 检查容器大小是否真的发生了变化
          for (const entry of entries) {
            const { width, height } = entry.contentRect
            // 只有当尺寸大于 0 时才执行 resize（避免初始化时的无效调用）
            if (width > 0 && height > 0) {
              resizeChart()
            }
          }
        })
        resizeObserverRef.current.observe(targetElement)
      }

      return () => {
        clearTimeout(timer)
        
        // 清除防抖定时器
        if (resizeTimerRef.current) {
          clearTimeout(resizeTimerRef.current)
          resizeTimerRef.current = null
        }

        // 移除窗口监听
        window.removeEventListener('resize', handleWindowResize)

        // 断开 ResizeObserver
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect()
          resizeObserverRef.current = null
        }

        // 清理图表实例
        if (chartInstanceRef.current) {
          const instance = chartInstanceRef.current
          setTimeout(() => {
            if (instance) {
              instance.dispose()
            }
            chartInstanceRef.current = undefined
          }, 1000)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoResize])

    const chartWidth = typeof width === 'number' ? `${width}px` : width || '100%'
    const chartHeight = typeof height === 'number' ? `${height}px` : height === '100%' ? '100%' : height || '300px'

    // 当高度为 100% 时，使用 CSS 控制，不设置内联样式
    const containerStyle: CSSProperties = {
      width: chartWidth,
    }
    
    if (height !== '100%') {
      containerStyle.height = chartHeight
    }

    return (
      <div ref={chartWrapperRef} className="chart-wrapper">
        <div
          ref={chartRef}
          style={containerStyle}
          className="chart-container"
        />

        {loading && (!anchorMode || !hasShownData) && (
          <div className="no-data">
            <Spin indicator={<LoadingOutlined className="loading-icon" />} />
            <span className="loading-text">加载中...</span>
          </div>
        )}

        {!loading && noData && (!anchorMode || !hasShownData) && (
          <div className="no-data">
            <span>暂无数据</span>
          </div>
        )}
      </div>
    )
  }
)

Chart.displayName = 'Chart'

export default Chart



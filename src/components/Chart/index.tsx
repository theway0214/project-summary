import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import type { CSSProperties } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import { tooltipDataMap } from './tooltipMap'
import { createTooltipContainer } from './tooltipUtils'
import {
  defaultTooltipConfig,
  defaultXAxisConfig,
  defaultYAxisConfig,
  defaultGridConfig,
  defaultLegendConfig,
  defaultTextStyle,
} from './config'
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
    const mergeConfig = <T extends Record<string, unknown>>(
      defaultConfig: T,
      userConfig: T | T[] | undefined
    ): T | T[] => {
      if (!userConfig) {
        return defaultConfig
      }
      if (Array.isArray(userConfig)) {
        return userConfig.map((config) => ({
          ...defaultConfig,
          ...config,
        }))
      }
      return {
        ...defaultConfig,
        ...userConfig,
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
          textStyle: defaultTextStyle,
          ...options,
          tooltip: {
            ...defaultTooltipConfig,
            ...options.tooltip,
          },
          xAxis: mergeConfig(defaultXAxisConfig as Record<string, unknown>, options.xAxis as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['xAxis'],
          yAxis: mergeConfig(defaultYAxisConfig as Record<string, unknown>, options.yAxis as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['yAxis'],
          grid: mergeConfig(defaultGridConfig as Record<string, unknown>, options.grid as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['grid'],
          legend: mergeConfig(defaultLegendConfig as Record<string, unknown>, options.legend as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['legend'],
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
        textStyle: defaultTextStyle,
        ...options,
        tooltip: {
          ...defaultTooltipConfig,
          ...options.tooltip,
        },
        xAxis: mergeConfig(defaultXAxisConfig as Record<string, unknown>, options.xAxis as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['xAxis'],
        yAxis: mergeConfig(defaultYAxisConfig as Record<string, unknown>, options.yAxis as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['yAxis'],
        grid: mergeConfig(defaultGridConfig as Record<string, unknown>, options.grid as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['grid'],
        legend: mergeConfig(defaultLegendConfig as Record<string, unknown>, options.legend as Record<string, unknown> | Record<string, unknown>[] | undefined) as EChartsOption['legend'],
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



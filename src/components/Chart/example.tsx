import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Space } from 'antd'
import Chart from './index'
import './example.css'

interface ChartDataItem {
  c_s_j: string
  y_a_g: string
  c_y: string
  j_j_y: string
}

const ChartExample = () => {
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [anchorMode, setAnchorMode] = useState(false)

  const createRandomData = (): ChartDataItem[] => {
    return [
      {
        c_s_j: Math.floor(Math.random() * 10000).toString(),
        y_a_g: Math.floor(Math.random() * 10000).toString(),
        c_y: Math.floor(Math.random() * 10000).toString(),
        j_j_y: Math.floor(Math.random() * 10000).toString(),
      },
    ]
  }

  const randomData = useCallback(() => {
    setLoading(true)
    setChartData(createRandomData())
    setLoading(false)
  }, [])

  const lowLoading = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setChartData(createRandomData())
    setLoading(false)
  }

  const loadApiData = () => {
    // TODO: 实现 API 数据加载
    // setChartData(apiData || [])
  }

  const clearData = () => {
    setLoading(true)
    setChartData([])
    setLoading(false)
  }

  const toggleAnchorMode = () => {
    setAnchorMode(!anchorMode)
  }

  useEffect(() => {
    // 使用 setTimeout 避免在 effect 中同步调用 setState
    setTimeout(() => {
      randomData()
    }, 0)
  }, [randomData])

  const noData = useMemo(() => {
    return !chartData || chartData.length === 0
  }, [chartData])

  const chartOptions = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis' as const,
      },
      legend: {
        top: '8%',
        right: '5%',
        show: true,
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 16,
        textStyle: {
          color: '#FFFFFF',
          fontSize: 14,
          padding: [0, 0, 0, 8],
        },
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category' as const,
        data: ['数据对比'],
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
      },
      yAxis: {
        name: '数值',
        type: 'value' as const,
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
          align: 'right' as const,
        },
        axisLabel: {
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.7)',
          padding: [0, 12, 0, 0],
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.3)',
            type: 'dashed' as const,
          },
        },
      },
      series: [
        {
          name: '城市数据',
          type: 'bar' as const,
          data: chartData ? [Number(chartData[0]?.c_s_j) || 0] : [],
        },
        {
          name: '园区数据',
          type: 'bar' as const,
          data: chartData ? [Number(chartData[0]?.y_a_g) || 0] : [],
        },
        {
          name: '产业数据',
          type: 'bar' as const,
          data: chartData ? [Number(chartData[0]?.c_y) || 0] : [],
        },
        {
          name: '经济数据',
          type: 'bar' as const,
          data: chartData ? [Number(chartData[0]?.j_j_y) || 0] : [],
        },
      ],
    }),
    [chartData]
  )

  return (
    <div style={{ height: '100%' }} className='w-1000px'>
      <div className="chart-example">
        <div className="chart-controls">
          <Space size="large" wrap>
            <Button type="primary" onClick={randomData}>
              随机数据
            </Button>
            <Button type="primary" onClick={lowLoading}>
              慢速加载(加载中)
            </Button>
            <Button type="primary" onClick={loadApiData}>
              接口数据
            </Button>
            <Button type="primary" onClick={clearData}>
              暂无数据
            </Button>
            <Button type={anchorMode ? 'primary' : 'default'} onClick={toggleAnchorMode}>
              {anchorMode ? '关闭主播模式' : '开启主播模式'}
            </Button>
          </Space>
        </div>

        <Chart
          options={chartOptions}
          noData={noData}
          height={500}
          width={800}
          loading={loading}
          autoResize={true}
          anchorMode={anchorMode}
        />
      </div>
    </div>
  )
}

export default ChartExample


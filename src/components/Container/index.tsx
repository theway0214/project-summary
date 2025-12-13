import { useState, useRef, useEffect } from "react"
import { Button, Modal, Input, message } from "antd"
import type { ReactNode } from "react"
import Chart, { type ChartProps, type ChartRef } from "@/components/Chart"
import "./index.css"

const { TextArea } = Input

interface ContainerProps {
  title?: string
  children: ReactNode
  actions?: ReactNode
  showDefaultAction?: boolean
  // 图表编辑相关 props
  chartOptions?: ChartProps['options']
  onChartOptionsChange?: (options: ChartProps['options']) => void
}

function Container({ 
  title, 
  children, 
  actions, 
  showDefaultAction = true,
  chartOptions,
  onChartOptionsChange,
}: ContainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editorValue, setEditorValue] = useState("")
  const [previewOptions, setPreviewOptions] = useState<ChartProps['options']>(chartOptions)
  const chartRef = useRef<ChartRef>(null)

  // 当弹窗打开时，初始化编辑器内容
  useEffect(() => {
    if (isModalOpen && chartOptions) {
      // 使用 setTimeout 避免在 effect 中同步调用 setState
      setTimeout(() => {
        try {
          const formatted = JSON.stringify(chartOptions, null, 2)
          setEditorValue(formatted)
          setPreviewOptions(chartOptions)
        } catch {
          message.error("配置格式错误")
        }
      }, 0)
    }
  }, [isModalOpen, chartOptions])

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const handleRun = () => {
    try {
      const parsed = JSON.parse(editorValue)
      setPreviewOptions(parsed)
      message.success("配置已应用")
    } catch {
      message.error("JSON 格式错误，请检查配置")
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    // 重置为原始配置
    if (chartOptions) {
      setPreviewOptions(chartOptions)
    }
  }

  const hasChartEdit = chartOptions !== undefined && onChartOptionsChange !== undefined

  return (
    <>
      <div className="container">
        {title && <div className="container-title">{title}</div>}
        <div>{children}</div>
        {(actions || showDefaultAction) && (
          <div className="container-actions">
            {actions || (
              showDefaultAction && (
                <Button 
                  type="primary" 
                  onClick={hasChartEdit ? handleEdit : undefined}
                >
                  编辑
                </Button>
              )
            )}
          </div>
        )}
      </div>

      {hasChartEdit && (
        <Modal
          title="编辑图表配置"
          open={isModalOpen}
          onCancel={handleCancel}
          width={1400}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="run" type="primary" onClick={handleRun}>
              运行
            </Button>,
          ]}
        >
          <div className="chart-editor-modal">
            <div className="chart-editor-left">
              {/* <div className="chart-editor-header">
                <Button type="primary" onClick={handleRun} style={{ marginBottom: 16 }}>
                  运行
                </Button>
              </div> */}
              <TextArea
                value={editorValue}
                onChange={(e) => setEditorValue(e.target.value)}
                rows={32}
                style={{ fontFamily: 'monospace', fontSize: 12 }}
                placeholder="请输入 ECharts 配置（JSON 格式）"
              />
            </div>
            <div className="chart-editor-right">
              <div className="chart-preview-title">图表预览</div>
              <div className="chart-preview-container">
                <Chart
                  ref={chartRef}
                  options={previewOptions}
                  height="100%"
                  autoResize={true}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Container
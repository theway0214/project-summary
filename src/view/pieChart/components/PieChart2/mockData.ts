/**
 * PieChart2 模拟数据
 * @author xhj
 * @since 2025-12-17
 */

export interface NaturalGasPipelineItem {
  pipelineName: string
  length: number
  lengthRatio: number
}

export const mockData: NaturalGasPipelineItem[] = [
  {
    pipelineName: '国家管网',
    length: 113,
    lengthRatio: 35.5,
  },
  {
    pipelineName: '中石油',
    length: 101,
    lengthRatio: 31.7,
  },
  {
    pipelineName: '其他管道长度',
    length: 89,
    lengthRatio: 28.0,
  },
]


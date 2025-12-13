import { tooltipDataMap } from './tooltipMap'

export interface TooltipItem {
  color: string
  label: string
  value: string | number
}

export function createTooltipContainer(title: string, list: TooltipItem[]) {
  const tooltipId = 'echarts-tooltip-vue-' + Math.random().toString(36).slice(2)
  tooltipDataMap.set(tooltipId, { title, list })
  return `<div id="${tooltipId}" class="tooltip-container">
    <div class="tooltip-bg-layer"></div>
    <div class="tooltip-content">
      <div class="tooltip-title">${title}</div>
      ${list
        .map(
          item => `
        <div class="tooltip-row">
          <span class="tooltip-dot" style="background: ${item.color}"></span>
          <span class="tooltip-label">${item.label}:</span>
          <span class="tooltip-value">${item.value}</span>
        </div>
      `
        )
        .join('')}
    </div>
  </div>`
}

// 清理 tooltip 数据
export function clearTooltipData() {
  tooltipDataMap.clear()
}

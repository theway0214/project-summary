// tooltipMap.ts
export interface TooltipData {
  title: string
  list: Array<{ color: string; label: string; value: string | number }>
}

export const tooltipDataMap = new Map<string, TooltipData>() 
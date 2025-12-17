/**
 * PieChart3 模拟数据
 * @author xhj
 * @since 2025-12-17
 */

export interface ThermalCoalPurchaseItem {
  localName: string
  purchaseVolume: number
  purchaseProportion: number
}

export const mockData: ThermalCoalPurchaseItem[] = [
  {
    localName: '陕西',
    purchaseVolume: 1250,
    purchaseProportion: 35.5,
  },
  {
    localName: '山西',
    purchaseVolume: 980,
    purchaseProportion: 27.8,
  },
  {
    localName: '内蒙古',
    purchaseVolume: 750,
    purchaseProportion: 21.3,
  },
  {
    localName: '其他',
    purchaseVolume: 540,
    purchaseProportion: 15.4,
  },
]


/**
 * StackedBar1 堆叠柱状图模拟数据
 * @author xhj
 * @since 2025-12-16
 */

export interface PowerBalanceItem {
  data_time: number // 年份
  inner_power: number // 内发
  out_buy_power: number // 外购
  profit_power: number // 盈余
  gap_power: number // 缺口
  prepare_power: number // 备用
  max_power: number // 最大负荷
}

export const mockData: PowerBalanceItem[] = [
  {
    data_time: 2023,
    inner_power: 1800,
    out_buy_power: 600,
    profit_power: 150,
    gap_power: 0,
    prepare_power: 200,
    max_power: 2550,
  },
  {
    data_time: 2024,
    inner_power: 1950,
    out_buy_power: 650,
    profit_power: 0,
    gap_power: 120,
    prepare_power: 180,
    max_power: 2780,
  },
  {
    data_time: 2025,
    inner_power: 2100,
    out_buy_power: 700,
    profit_power: 0,
    gap_power: 280,
    prepare_power: 220,
    max_power: 3020,
  },
  {
    data_time: 2026,
    inner_power: 2250,
    out_buy_power: 750,
    profit_power: 80,
    gap_power: 0,
    prepare_power: 200,
    max_power: 3080,
  },
  {
    data_time: 2027,
    inner_power: 2400,
    out_buy_power: 800,
    profit_power: 0,
    gap_power: 350,
    prepare_power: 250,
    max_power: 3450,
  },
]

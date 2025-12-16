/**
 * 热力图组件静态数据
 * @author xhj
 * @since 2025-12-16
 */

/**
 * 区县容量数据（万kW）
 */
export const capacityByDistrict: Record<string, number> = {
  万州: 148,
  城口: 90,
  巫溪: 75,
  巫山: 58,
  奉节: 69,
  云阳: 99,
  开州: 70,
  梁平: 120,
  忠县: 77,
  石柱: 71,
  丰都: 73,
  垫江: 98,
  长寿: 122,
  涪陵: 161,
  武隆: 99,
  彭水: 85,
  黔江: 91,
  酉阳: 54,
  秀山: 46,
  南川: 93,
  綦江: 135,
  江津: 199,
  永川: 196,
  荣昌: 59,
  大足: 106,
  铜梁: 96,
  潼南: 72,
  合川: 112,
  璧山: 157,
  主城区域: 3260,
}

/**
 * 主城区域坐标配置
 */
export const mainCityConfig = {
  name: '主城区域',
  lng: 106.512851,
  lat: 29.601451,
  value: 3260,
}

/**
 * 热力图色阶配置
 */
export const heatmapColorStops = ['#f41e21', '#edcc00', '#90ff07', '#84d100']

/**
 * 图例数据配置
 */
export const legendData = [
  { label: '>30', value: 30 },
  { label: '20-30', value: 20 },
  { label: '10-20', value: 10 },
  { label: '1-10', value: 1 },
]

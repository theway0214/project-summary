/**
 * 区域热力图组件静态数据
 * @author xhj
 * @since 2025-12-16
 */

/**
 * 区县充电量数据（万千瓦时）
 */
export const mapData = [
  { name: '万州区', value: 3120.45 },
  { name: '涪陵区', value: 2689.32 },
  { name: '渝中区', value: 2156.78 },
  { name: '大渡口区', value: 1950.12 },
  { name: '江北区', value: 6230.54 },
  { name: '沙坪坝区', value: 9056.21 },
  { name: '九龙坡区', value: 9873.66 },
  { name: '南岸区', value: 8123.47 },
  { name: '北碚区', value: 5021.33 },
  { name: '綦江区', value: 1789.65 },
  { name: '大足区', value: 1935.84 },
  { name: '渝北区', value: 20563.27 },
  { name: '巴南区', value: 8021.39 },
  { name: '黔江区', value: 756.44 },
  { name: '长寿区', value: 1890.27 },
  { name: '江津区', value: 4123.88 },
  { name: '合川区', value: 1986.52 },
  { name: '永川区', value: 2975.63 },
  { name: '南川区', value: 1150.79 },
  { name: '璧山区', value: 3560.44 },
  { name: '铜梁区', value: 1280.66 },
  { name: '潼南区', value: 1536.92 },
  { name: '荣昌区', value: 635.24 },
  { name: '开州区', value: 932.18 },
  { name: '梁平区', value: 881.36 },
  { name: '武隆区', value: 735.42 },
  { name: '城口县', value: 230.57 },
  { name: '丰都县', value: 892.13 },
  { name: '垫江县', value: 706.58 },
  { name: '忠县', value: 589.74 },
  { name: '云阳县', value: 648.29 },
  { name: '奉节县', value: 452.37 },
  { name: '巫山县', value: 315.82 },
  { name: '巫溪县', value: 128.64 },
  { name: '石柱县', value: 398.51 },
  { name: '秀山县', value: 263.98 },
  { name: '酉阳县', value: 318.46 },
  { name: '彭水县', value: 702.15 },
]

/**
 * 视觉映射配置 - 绿色系（小于1000）
 */
export const greenColorPieces = [
  { min: 90.62, max: 125.82, color: 'rgba(0, 58, 45, 0.55)' },
  { min: 125.82, max: 161.02, color: 'rgba(0, 64, 50, 0.55)' },
  { min: 161.02, max: 196.22, color: 'rgba(0, 69, 55, 0.55)' },
  { min: 196.22, max: 231.42, color: 'rgba(0, 75, 60, 0.55)' },
  { min: 231.42, max: 266.62, color: 'rgba(0, 81, 65, 0.55)' },
  { min: 266.62, max: 301.82, color: 'rgba(0, 86, 69, 0.55)' },
  { min: 301.82, max: 337.02, color: 'rgba(0, 92, 74, 0.55)' },
  { min: 337.02, max: 372.22, color: 'rgba(0, 97, 79, 0.55)' },
  { min: 372.22, max: 407.42, color: 'rgba(0, 103, 84, 0.55)' },
  { min: 407.42, max: 442.62, color: 'rgba(1, 109, 89, 0.55)' },
  { min: 442.62, max: 477.82, color: 'rgba(1, 114, 94, 0.55)' },
  { min: 477.82, max: 513.02, color: 'rgba(1, 120, 99, 0.55)' },
  { min: 513.02, max: 548.22, color: 'rgba(1, 126, 104, 0.55)' },
  { min: 548.22, max: 583.42, color: 'rgba(1, 131, 109, 0.55)' },
  { min: 583.42, max: 618.62, color: 'rgba(1, 137, 113, 0.55)' },
  { min: 618.62, max: 653.82, color: 'rgba(1, 142, 118, 0.55)' },
  { min: 653.82, max: 689.02, color: 'rgba(1, 148, 123, 0.55)' },
  { min: 689.02, max: 724.22, color: 'rgba(1, 159, 133, 0.55)' },
  { min: 724.22, max: 759.42, color: 'rgba(1, 165, 138, 0.55)' },
  { min: 759.42, max: 794.62, color: 'rgba(1, 171, 143, 0.55)' },
  { min: 794.62, max: 829.82, color: 'rgba(1, 176, 148, 0.55)' },
  { min: 829.82, max: 865.02, color: 'rgba(1, 182, 152, 0.55)' },
  { min: 865.02, max: 900.22, color: 'rgba(1, 187, 157, 0.55)' },
  { min: 900.22, max: 935.42, color: 'rgba(1, 193, 162, 0.55)' },
  { min: 935.42, max: 970.62, color: 'rgba(1, 199, 167, 0.55)' },
  { min: 970.62, max: 1005.82, color: 'rgba(1, 204, 172, 0.55)' },
  { min: 1005.82, max: 1041.02, color: 'rgba(2, 210, 177, 0.55)' },
  { min: 1041.02, max: 1076.22, color: 'rgba(2, 216, 182, 0.55)' },
  { min: 1076.22, max: 1111.42, color: 'rgba(2, 221, 187, 0.55)' },
  { min: 1111.42, max: 1000, color: 'rgba(2, 227, 192, 0.55)' },
]

/**
 * 视觉映射配置 - 红色系（大于等于1000）
 */
export const redColorPieces = [
  { min: 1000, max: 1628.99, color: 'rgba(254, 134, 134, 0.55)' },
  { min: 1628.99, max: 2257.98, color: 'rgba(254, 129, 129, 0.55)' },
  { min: 2257.98, max: 2886.97, color: 'rgba(254, 125, 125, 0.55)' },
  { min: 2886.97, max: 3515.96, color: 'rgba(254, 120, 120, 0.55)' },
  { min: 3515.96, max: 4144.95, color: 'rgba(254, 116, 116, 0.55)' },
  { min: 4144.95, max: 4773.94, color: 'rgba(254, 111, 111, 0.55)' },
  { min: 4773.94, max: 5402.93, color: 'rgba(254, 107, 107, 0.55)' },
  { min: 5402.93, max: 6031.92, color: 'rgba(254, 103, 103, 0.55)' },
  { min: 6031.92, max: 6660.91, color: 'rgba(254, 98, 98, 0.55)' },
  { min: 6660.91, max: 7289.9, color: 'rgba(254, 94, 94, 0.55)' },
  { min: 7289.9, max: 7918.89, color: 'rgba(254, 89, 89, 0.55)' },
  { min: 7918.89, max: 8547.88, color: 'rgba(254, 85, 85, 0.55)' },
  { min: 8547.88, max: 9176.87, color: 'rgba(255, 80, 80, 0.55)' },
  { min: 9176.87, max: 9805.86, color: 'rgba(255, 76, 76, 0.55)' },
  { min: 9805.86, max: 10434.85, color: 'rgba(255, 71, 71, 0.55)' },
  { min: 10434.85, max: 11063.84, color: 'rgba(255, 67, 67, 0.55)' },
  { min: 11063.84, max: 11692.83, color: 'rgba(255, 62, 62, 0.55)' },
  { min: 11692.83, max: 12321.82, color: 'rgba(255, 58, 58, 0.55)' },
  { min: 12321.82, max: 12950.81, color: 'rgba(255, 54, 54, 0.55)' },
  { min: 12950.81, max: 13579.8, color: 'rgba(255, 50, 50, 0.55)' },
  { min: 13579.8, max: 14208.79, color: 'rgba(255, 46, 46, 0.55)' },
  { min: 14208.79, max: 14837.78, color: 'rgba(255, 42, 42, 0.55)' },
  { min: 14837.78, max: 15466.77, color: 'rgba(255, 38, 38, 0.55)' },
  { min: 15466.77, max: 16095.76, color: 'rgba(255, 34, 34, 0.55)' },
  { min: 16095.76, max: 16724.75, color: 'rgba(255, 30, 30, 0.55)' },
  { min: 16724.75, max: 17353.74, color: 'rgba(255, 26, 26, 0.55)' },
  { min: 17353.74, max: 17982.73, color: 'rgba(255, 22, 22, 0.55)' },
  { min: 17982.73, max: 18611.72, color: 'rgba(255, 18, 18, 0.55)' },
  { min: 18611.72, max: 19240.71, color: 'rgba(255, 14, 14, 0.55)' },
  { min: 19240.71, max: 20000, color: 'rgba(255, 10, 10, 0.55)' },
]

/**
 * 图例配置 - 充电站分布
 */
export const stationLegendData = [
  { label: '56-70', value: 56 },
  { label: '42-56', value: 42 },
  { label: '28-42', value: 28 },
  { label: '14-28', value: 14 },
  { label: '1-14', value: 1 },
]

/**
 * 图例配置 - 充电量分布
 */
export const capacityLegendData = [
  { label: '10000-20000', value: 10000 },
  { label: '1200-10000', value: 1200 },
  { label: '800-1200', value: 800 },
  { label: '400-800', value: 400 },
  { label: '1-400', value: 1 },
]

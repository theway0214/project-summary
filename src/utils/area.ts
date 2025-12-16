  import { CQ } from '@/common/mapGeoJSON/CQ.ts'

  // 点在环内判断（射线法）
  const pointInRing = ([x, y]: [number, number], ring: number[][]) => {
    let inside = false
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1]
      const xj = ring[j][0], yj = ring[j][1]
      const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }
    return inside
  }

  // 点在多边形（含洞）判断
  const pointInPolygon = (pt: [number, number], outer: number[][], holes: number[][][] = []) => {
    if (!pointInRing(pt, outer)) return false
    for (const hole of holes) {
      if (pointInRing(pt, hole)) return false
    }
    return true
  }

  // 预计算重庆边界的包围盒
  const CQBounds = (() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    type PolygonGeometry = {
      type: 'Polygon'
      coordinates: number[][][]
    }
    type MultiPolygonGeometry = {
      type: 'MultiPolygon'
      coordinates: number[][][][]
    }
    type Geometry = PolygonGeometry | MultiPolygonGeometry
    type Feature = {
      geometry: Geometry
    }

    const features: Feature[] = (CQ as { features?: Feature[] }).features || []
    for (const feat of features) {
      const geom = feat.geometry
      let polys: number[][][]
      if (geom.type === 'Polygon') {
        polys = geom.coordinates
      } else {
        // MultiPolygon 展开为多个 Polygon
        polys = ([] as number[][][]).concat(...geom.coordinates)
      }

      for (const ring of polys) {
        for (const [x, y] of ring) {
          if (x < minX) minX = x
          if (y < minY) minY = y
          if (x > maxX) maxX = x
          if (y > maxY) maxY = y
        }
      }
    }
    return { minX, minY, maxX, maxY }
  })()

  // 判断点是否在重庆任一区县面内
  export const isPointInCQ = (lng: number, lat: number) => {
    if (lng < CQBounds.minX || lng > CQBounds.maxX || lat < CQBounds.minY || lat > CQBounds.maxY) return false

    type PolygonGeometry = {
      type: 'Polygon'
      coordinates: number[][][]
    }
    type MultiPolygonGeometry = {
      type: 'MultiPolygon'
      coordinates: number[][][][]
    }
    type Geometry = PolygonGeometry | MultiPolygonGeometry
    type Feature = {
      geometry: Geometry
    }

    const features: Feature[] = (CQ as { features?: Feature[] }).features || []
    for (const feat of features) {
      const geom = feat.geometry
      if (geom.type === 'Polygon') {
        const [outer, ...holes] = geom.coordinates
        if (pointInPolygon([lng, lat], outer, holes)) return true
      } else if (geom.type === 'MultiPolygon') {
        for (const poly of geom.coordinates) {
          const [outer, ...holes] = poly
          if (pointInPolygon([lng, lat], outer, holes)) return true
        }
      }
    }
    return false
  }

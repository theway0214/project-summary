
import ElectricityPresentMap from './components/ElectricityPresentMap/index'
import ElectricityMap from './components/ElectricityMap/index'
import CapacityMap from './components/HotMap/index'
import  HotMapArea from './components/HotMapArea/index'
function MapChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">地图合集</h1>
      </div>
      <div className="page-content grid grid-cols-2 gap-50px" style={{ flex: 1, overflowY: 'scroll'}}>
        <ElectricityPresentMap ></ElectricityPresentMap>
        <ElectricityMap />
        <CapacityMap />
        <HotMapArea />
      </div>
    </div>
  )
}

export default MapChart

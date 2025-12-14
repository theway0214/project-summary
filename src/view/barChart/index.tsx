import BaseBar from './components/BaseBar'
import GradientBar from './components/GradientBar'
import StackedBar from './components/StackedBar'
import GroupedBar from './components/GroupedBar'
import RoundedBar from './components/RoundedBar'
import NegativeBar from './components/NegativeBar'
import PolarBar from './components/PolarBar'

function BarChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">柱状图合集</h1>
      </div>
      <div className="page-content grid grid-cols-3 gap-4" style={{ flex: 1, overflowY: 'scroll'}}>
        <BaseBar />
        <GradientBar />
        <StackedBar />
        <GroupedBar />
        <RoundedBar />
        <NegativeBar />
        <PolarBar />
      </div>
    </div>
  )
}

export default BarChart
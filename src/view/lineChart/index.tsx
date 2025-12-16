import BaseLine from './components/BaseLine'
import SmoothLine from './components/SmoothLine'
import AreaLine from './components/AreaLine'
import StackedAreaLine from './components/StackedAreaLine'
import MultiLine from './components/MultiLine'
import StepLine from './components/StepLine'
import DualColorLine from './components/DualColorLine'
import CurveLine from './components/CurveLine'
import FlowLine from './FlowLine'

function LineChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">折线图合集</h1>
      </div>
      <div className="page-content grid grid-cols-3 gap-4" style={{ flex: 1, overflowY: 'scroll'}}>
        <BaseLine />
        <SmoothLine />
        <AreaLine />
        <StackedAreaLine />
        <MultiLine /> 
        <StepLine />
        <DualColorLine />
        <FlowLine />
        <div className="col-span-3">
          <CurveLine />
        </div>
      </div>
    </div>
  )
}

export default LineChart

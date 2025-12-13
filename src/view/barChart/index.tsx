import BaseBar from './components/BaseBar'
function BarChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">图表</h1>
      </div>
      <div className="page-content grid grid-cols-3 gap-4" style={{ flex: 1, overflowY: 'scroll'}}>
        <BaseBar />
        <BaseBar />
        <BaseBar />
        <BaseBar />
        <BaseBar />
        <BaseBar />
        <BaseBar />
        <BaseBar />
        <BaseBar />
      </div>
    </div>
  )
}

export default BarChart
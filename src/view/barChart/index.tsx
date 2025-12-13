import BaseBar from './components/BaseBar'
function BarChart() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">图表</h1>
      </div>
      <div className="page-content grid grid-cols-3 gap-4">
        <BaseBar />
        <BaseBar />
        <BaseBar />
      </div>
    </div>
  )
}

export default BarChart
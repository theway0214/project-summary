/**
 * 饼图合集
 * @author xhj
 * @since 2025-12-17
 */
import PieChart1 from './components/PieChart1'
import PieChart2 from './components/PieChart2'
import PieChart3 from './components/PieChart3'

function PieChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <h1 className="page-title">饼图合集</h1>
      </div>
      <div className="page-content grid grid-cols-3 gap-4" style={{ flex: 1, overflowY: 'scroll' }}>
        <PieChart1 />
        <PieChart2 />
        <PieChart3 />
        <PieChart3 />
      </div>
    </div>
  )
}

export default PieChart
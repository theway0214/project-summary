
function Home() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">首页</h1>
      </div>
      <div className="page-content bg-[red] w-500px flex justify-center items-center">
        <p style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '14px' }}>
          欢迎使用管理系统
        </p>
      </div>
    </div>
  )
}

export default Home
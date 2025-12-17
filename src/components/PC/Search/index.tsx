/**
 * PC 端搜索操作区域（React 版）
 * 左侧放筛选表单，右侧放「展开 / 收起、重置、查询」按钮
 */
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import './index.css'

export interface SearchProps {
  searchLoading?: boolean
  resetLoading?: boolean
  /** 是否行内布局（与表单并排） */
  isInline?: boolean
  /** 是否展示展开/收起按钮 */
  expand?: boolean
  children?: ReactNode
  onSearch?: () => void
  onReset?: () => void
}

function Search({
  searchLoading = false,
  resetLoading = false,
  isInline = true,
  expand = false,
  children,
  onSearch,
  onReset,
}: SearchProps) {
  const [internalExpand, setInternalExpand] = useState<boolean>(expand)

  // 同步外部 expand 变化
  useEffect(() => {
    setInternalExpand(expand)
  }, [expand])

  const handleToggleExpand = () => {
    setInternalExpand((prev) => !prev)
  }

  const handleSearch = () => {
    onSearch?.()
  }

  const handleReset = () => {
    onReset?.()
  }

  return (
    <div
      className={[
        'pc-search-transition',
        isInline ? 'pc-search-inline' : '',
        !internalExpand ? 'pc-search-not-expand' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      <div className="flex justify-end ml-[20px]">
        <Space size={15} align="center">
          {expand && (
            <Button
              className="flex justify-center items-center p-0 text-[16px] text-[#0081FF]"
              type="link"
              onClick={handleToggleExpand}
            >
              {internalExpand ? '收起' : '展开'}
            </Button>
          )}
          <Button
            loading={resetLoading}
            className="min-w-[86px] text-[16px] text-[#0081FF]"
            onClick={handleReset}
          >
            重置
          </Button>
          <Button
            loading={searchLoading}
            type="primary"
            className="min-w-[86px] text-[16px]"
            onClick={handleSearch}
          >
            查询
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default Search



# ECharts 图表组件

基于 ECharts 5.x 封装的 Vue 3 组件，提供了简单易用的接口用于创建各种图表。

## 特性

- 完整支持 ECharts 的所有图表类型和配置项
- 响应式设计，支持自动调整大小
- 主题切换功能
- 加载状态显示
- 事件处理
- 默认开启脏检查，实时响应数据变化
- 简洁的 API，易于集成
- 支持自定义 Vue 组件作为 tooltip
- 内置默认的 tooltip 配置，支持透明背景和阴影指示器

## 使用方法

### 基本使用

```vue
<script setup lang="ts">
import { ref } from 'vue'

import Chart from '@/components/Chart/index.vue'

// 图表配置
const chartOptions = ref({
  title: {
    text: '我的图表',
  },
  // tooltip 配置是可选的，组件会使用默认配置
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '销量',
      type: 'line',
      data: [150, 230, 224, 218, 135, 147],
    },
  ],
})
</script>

<template>
  <Chart :options="chartOptions" :height="400" :auto-resize="true" />
</template>
```

### 默认 Tooltip 配置

组件内置了默认的 tooltip 配置：

```typescript
const defaultTooltipConfig = {
  trigger: 'axis',
  axisPointer: {
    show: true,
    type: 'shadow',
  },
  backgroundColor: 'transparent',
  borderWidth: 0,
  padding: 0,
}
```

如果需要覆盖默认配置，可以在 options 中传入自定义的 tooltip 配置：

```typescript
const chartOptions = ref({
  tooltip: {
    // 自定义配置会覆盖默认配置
    trigger: 'item',
    // ... 其他配置
  },
  // ... 其他配置
})
```

### 自定义 Tooltip

组件支持使用 Vue 组件作为 tooltip 内容，提供了更灵活的样式和交互能力：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Chart from '@/components/Chart/index.vue'
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

const chartOptions = ref({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    formatter: (params: any) => {
      const list = params.map((item: any) => ({
        color: item.color?.colorStops ? item.color?.colorStops[0].color : item.color,
        label: item.seriesName,
        value: item.data,
      })) as TooltipItem[]
      const title = params[0].name
      return createTooltipContainer(title, list)
    },
  },
  // ... 其他配置
})
</script>

<template>
  <Chart :options="chartOptions" :height="400" />
</template>
```

自定义 tooltip 组件示例：

```vue
<!-- CustomTooltip.vue -->
<template>
  <div class="custom-tooltip">
    <div class="title">{{ title }}</div>
    <div class="list">
      <div v-for="item in list" :key="item.label" class="item">
        <span class="color-dot" :style="{ backgroundColor: item.color }" />
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TooltipItem } from '@/components/Chart/tooltipUtils'

defineProps<{
  title: string
  list: TooltipItem[]
}>()
</script>
```

### 主题切换

```vue
<script setup lang="ts">
import { ref } from 'vue'

import Chart from '@/components/Chart/index.vue'

const theme = ref('light') // 可选值: 'light', 'dark' 或自定义主题名称
const chartOptions = ref({
  // 图表配置...
})

// 切换主题
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button @click="toggleTheme">切换主题</button>
  <Chart :options="chartOptions" :theme="theme" :height="400" />
</template>
```

### 显示加载状态

```vue
<script setup lang="ts">
import { ref } from 'vue'

import Chart from '@/components/Chart/index.vue'

const loading = ref(false)
const chartOptions = ref({
  // 图表配置...
})

// 模拟数据加载
const fetchData = async () => {
  loading.value = true

  try {
    // 异步获取数据
    await new Promise(resolve => setTimeout(resolve, 1500))
    // 更新图表数据...
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button @click="fetchData">加载数据</button>
  <Chart :options="chartOptions" :loading="loading" :height="400" />
</template>
```

### 事件处理

```vue
<script setup lang="ts">
import Chart from '@/components/Chart/index.vue'

const chartOptions = ref({
  // 图表配置...
})

// 处理图表点击事件
const handleChartClick = params => {}
</script>

<template>
  <Chart :options="chartOptions" :height="400" @chart-click="handleChartClick" />
</template>
```

### 脏检查控制

组件默认启用脏检查，确保图表在数据变化或尺寸调整时能够实时更新。如果需要在特定场景下禁用脏检查（例如大量数据场景以优化性能），可以通过以下方式：

```vue
<template>
  <!-- 禁用脏检查 -->
  <Chart :options="chartOptions" :disable-dirty-check="true" />
</template>
```

## 属性

| 属性名            | 类型          | 默认值  | 说明                                            |
| ----------------- | ------------- | ------- | ----------------------------------------------- |
| options           | Object        | -       | ECharts 图表配置项                              |
| theme             | String        | -       | 图表主题，支持 'light', 'dark' 或自定义主题名称 |
| width             | String/Number | '100%'  | 图表宽度                                        |
| height            | String/Number | '300px' | 图表高度                                        |
| autoResize        | Boolean       | false   | 是否随窗口大小自动调整图表大小                  |
| loading           | Boolean       | false   | 是否显示加载动画                                |
| loadingOptions    | Object        | -       | 加载动画配置选项                                |
| disableDirtyCheck | Boolean       | false   | 是否禁用脏检查（默认启用）                      |
| anchorMode        | Boolean       | false   | 是否启用主播模式（保持首次数据状态）            |

## 事件

| 事件名        | 说明             | 参数         |
| ------------- | ---------------- | ------------ |
| chart-click   | 图表点击事件     | 事件参数对象 |
| chart-created | 图表创建完成事件 | 图表实例     |

## 实例方法

通过 ref 获取组件实例后，可以调用以下方法：

| 方法名      | 说明         | 参数 |
| ----------- | ------------ | ---- |
| initChart   | 初始化图表   | -    |
| resizeChart | 调整图表大小 | -    |

可以通过 `chartInstance` 属性获取原始的 ECharts 实例，以便调用 ECharts 的原生方法。

## 工具函数

组件提供了一些工具函数来简化开发：

### createTooltipContainer

用于创建自定义 tooltip 容器：

```typescript
import { createTooltipContainer, type TooltipItem } from '@/components/Chart/tooltipUtils'

// 在 formatter 中使用
formatter: (params: any) => {
  const list = params.map((item: any) => ({
    color: item.color,
    label: item.seriesName,
    value: item.data,
  })) as TooltipItem[]
  const title = params[0].name
  return createTooltipContainer(title, list)
}
```

### TooltipItem 类型

```typescript
interface TooltipItem {
  color: string
  label: string
  value: string | number
}
```

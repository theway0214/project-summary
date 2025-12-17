<script setup lang="ts">
// 定义props的类型
interface PageProps {
  bodyClassName?: string
  className?: string
}

// 使用defineProps接收props
const props = defineProps<PageProps>()

// 默认值处理
const bodyClassName = props.bodyClassName ?? ''
const className = props.className ?? ''
</script>

<template>
  <div
    id="fa-page-container"
    class="bg-[#F2F3F5]"
    :class="[className]"
    :style="{ minHeight: 'calc(100vh - 200px)' }"
  >
    <div class="mt-2" :class="[bodyClassName]">
      <slot />
    </div>
  </div>
</template>

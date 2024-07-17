<script setup>
/**
 * i-page
 *
 * @author tangjiahui
 * @date 2024/07/17
 * @description 封装的page容器组件。
 * @tips:
 *    - display: flex
 *    - flex 列布局
 *    - width：100%
 *    - height：100%
 */
const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  style: {
    type: [Object, String],
    default: ''
  }
})
</script>

<template>
  <div :class="['tt-page', className]" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.tt-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>

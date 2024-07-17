<script setup>
/**
 * IDatePicker 日期选择器
 */
import { ref } from 'vue'

const emit = defineEmits(['change', 'update:modelValue'])
const props = defineProps({
  // 绑定值： YYYY-MM-DD
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择日期'
  },
  /** 列表类 */
  className: {
    type: String,
    default: ''
  },
  /** 列表样式 */
  style: {
    type: [String, Object],
    default: ''
  }
})

const visible = ref(false)

function handleClickHead() {
  visible.value = true
}

function handleChange(str) {
  emit('update:modelValue', str)
  emit('change', str)
}

function handleConfirm(data) {
  handleChange(`${data.year}-${data.month}-${data.day}`)
}

function handleCancel() {
  handleChange('')
}
</script>
<template>
  <div
    :class="['datepicker-header', className]"
    :style="style"
    @click="handleClickHead"
  >
    <div class="datepicker-header-main">{{ modelValue || placeholder }}</div>
    <u-icon name="arrow-down" />
  </div>

  <u-picker
    v-model="visible"
    mode="time"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    :defaultTime="modelValue"
  />
</template>

<style lang="scss" scoped>
.datepicker-header {
  height: 48px;
  padding: 12px;
  box-sizing: border-box;
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: row;

  &-main {
    padding-right: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

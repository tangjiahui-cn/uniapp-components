<script setup>
/**
 * I-Select 下拉框模板
 *
 * @author tangjiahui
 * @date 2024/7/16
 */
import { ref, computed } from 'vue'

const emits = defineEmits(['change', 'update:modelValue'])
const props = defineProps({
  // 查询选项的函数（暂不支持服务端搜索）
  // @examples：async () => [{label: '选项一', value: 11}]
  query: {
    type: Function,
    default: undefined
  },
  // 使用model绑定
  modelValue: {
    default: undefined
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
  },
  all: {
    type: Boolean,
    default: false
  },
  allName: {
    type: String,
    default: '全部'
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})

const visible = ref(false)
const list = ref([])
const valueMap = ref({}) // 数组下标索引map

// 重置列表
function fetchList() {
  props?.query?.()?.then(res => {
    const map = {}
    const dataList = props?.all
      ? [{ value: '', label: props?.allName || '全部' }, ...res]
      : res

    list.value = dataList?.map((x, _index) => {
      return (map[x.value] = {
        ...x,
        _index
      })
    })
    valueMap.value = map
  })
}

// 点击头部
function handleClickHead() {
  visible.value = true
}

function handleChange(value) {
  emits('update:modelValue', value)
  emits('change', value)
}

// 选中选项
function handleConfirm([item]) {
  handleChange(item?.value)
}

function handleCancel() {
  handleChange('')
}

// 当前选中项
const isEmpty = v => !v && v !== 0
const current = computed(() => {
  const item = valueMap.value[props?.modelValue]
  return {
    name: item?.label,
    value: isEmpty(item?._index) ? [0] : [item?._index]
  }
})

fetchList()
</script>

<template>
  <div
    :class="['select-header', className]"
    :style="style"
    @click="handleClickHead"
  >
    <div class="select-header-main">{{ current.name || placeholder }}</div>
    <u-icon name="arrow-down" />
  </div>
  <u-select
    :default-value="current.value"
    :list="list"
    v-model="visible"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<style lang="scss" scoped>
.select-header {
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

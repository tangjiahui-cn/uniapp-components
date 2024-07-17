<script setup>
/**
 * 图片组件
 */
import { ref, watch } from 'vue'
import { getUrlByUuid } from '../_utils'

const props = defineProps({
  uuid: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  },
  empty: {
    type: String,
    default: ''
  }
})

const url = ref('')

watch(
  () => props.uuid,
  v => {
    getUrlByUuid(v).then(src => {
      url.value = src
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="i-image" :style="style">
    <img v-if="url" :src="url" />
    <span v-if="!url && empty">{{ empty }}</span>
  </div>
</template>

<style scoped lang="scss">
.i-image {
  width: 48px;
  height: 48px;
  position: relative;
  border: 1px solid #b8b8b8;

  & > img {
    width: 100%;
    height: 100%;
    border: none;
  }

  & > span {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #929292;
    letter-spacing: 1px;
    font-size: 1.025em;
    transform: translate(-50%, -50%);
  }
}
</style>

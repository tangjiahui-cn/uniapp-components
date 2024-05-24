<script setup>
/**
 * 列表控制组件
 *
 * @author tangjiahui
 * @date 2024/5/24
 * @description 需要在pages.json里配置 "enablePullDownRefresh": true 以支持下拉刷新
 */
import { watch, ref, computed } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import useLoading from "./useLoading";

const emits = defineEmits(["change"]);
const props = defineProps({
  /** 分页大小 */
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 是否启用分页 */
  enablePagination: {
    type: Boolean,
    default: true,
  },
  /** 列表类 */
  className: {
    type: String,
    default: "",
  },
  /** 列表样式 */
  style: {
    type: [String, Object],
    default: "",
  },
  /** 查询函数 */
  query: {
    type: Function,
    default: async (pagination) => {
      return {
        total: 0,
        list: [],
      };
    },
  },
  /** 更新依赖 */
  effectParams: {
    type: Array,
    default: () => [],
  },
  /** 文字 */
  loadText: {
    type: Object,
    default: () => ({
      loadmore: "点击加载更多",
      loading: "努力加载中",
      nomore: "已经到底啦！",
    }),
  },
});

/** 暴露子组件属性和方法 */
defineExpose({
  /** 重置 */
  reset,
  /** 查询下一个分页 */
  queryNextPage: handleReachBottom,
});

const INIT_PAGINATION = {
  current: 1,
  pageSize: props?.pageSize || 10,
};

const INIT_DATA = {
  isEnd: false, // 是否末尾
  total: 0, // 总数
  list: [], // 缓存总列表
};

const loading = useLoading();
const pagination = ref({ ...INIT_PAGINATION });
const data = ref({ ...INIT_DATA });

const loadmore = computed(() =>
  loading.isLoading() ? "loading" : data.value.isEnd ? "nomore" : "loadmore"
);

async function runQuery() {
  if (loading.isLoading()) {
    return Promise.resolve();
  }
  loading.showLoading();
  const currentPagination = { ...pagination.value };
  return props.query?.(currentPagination).then((res) => {
    loading.hideLoading();
    const { total = 0, list = [] } = res || {};
    const targetList = [...data.value.list, ...list];
    data.value = {
      total,
      list: targetList,
      isEnd: !list.length || targetList.length >= total,
    };
    emits("change", data.value, currentPagination);
  });
}

function resetStatus() {
  pagination.value = { ...INIT_PAGINATION };
  data.value = { ...INIT_DATA };
}

async function reset() {
  resetStatus();
  return runQuery();
}

function handleReachBottom() {
  if (!props?.enablePagination) {
    console.warn("disable query because pagination closed.");
    return;
  }

  if (data.value?.isEnd) {
    return;
  }
  pagination.value.current++;
  runQuery();
}

onPullDownRefresh(() => {
  reset().then(() => uni.stopPullDownRefresh());
});

watch(
  () => props.effectParams || [],
  () => {
    reset();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <scroll-view
    :class="['i-list', className]"
    :style="style"
    :scroll-y="true"
    :refresher-enabled="false"
    @scrolltolower="handleReachBottom"
  >
    <slot :list="data.list" :total="data.total" :isEnd="data.isEnd"></slot>
    <view v-if="enablePagination" style="height: 60rpx; line-height: 60rpx">
      <u-loadmore
        :status="loadmore"
        :load-text="loadText"
        @click="handleReachBottom"
      />
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.i-list {
  height: 100px;
}
</style>

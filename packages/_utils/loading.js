/**
 * loading 效果控制
 *
 * @author tangjiahui
 * @date 2024/7/16
 */

import { ref } from 'vue'

function loadingFactory() {
  const loading = ref(false)

  function isLoading() {
    return loading.value
  }

  function showLoading() {
    loading.value = true
    uni.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 60000
    })
  }

  function hideLoading() {
    uni.hideToast()
    loading.value = false
  }

  return {
    isLoading,
    showLoading,
    hideLoading
  }
}

const loading = loadingFactory()
export default loading

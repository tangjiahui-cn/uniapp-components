
import {  ref } from 'vue'

export default function useLoading () {
  const loading = ref(false)

  function isLoading () {
    return loading.value
  }

  function showLoading () {
    loading.value = true
    uni.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 60000
    })
  }

  function hideLoading () {
    uni.hideToast()
    loading.value = false
  }

  return {
    isLoading,
    showLoading,
    hideLoading
  }
}

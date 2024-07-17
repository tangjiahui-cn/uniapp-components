export function toast() {
  uni.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 60000
  })
}

export function pm(promise, loading) {
  loading && toast()
  if (loading)
    return promise.then(res => {
      loading && uni.hideToast()
      return res
    })
  return promise
}

const isNullOrUndefined = v => v === undefined || v === null

export function getData(data = {}, options) {
  // 是否开启自动过滤 null、undefined
  const autoTransform = options?.autoTransform || false
  // 是否自动转换 null、undefined 为 ''
  const autoNullOrUndefinedToString =
    options?.autoNullOrUndefinedToString || false
  // 自动过滤空字符串
  const autoNoNullString = options?.autoNoNullString || false

  if (autoNoNullString) {
    const newData = {}
    for (const k in data) {
      if (data[k] !== '') {
        newData[k] = data[k]
      }
    }
    data = newData
  }

  if (!autoTransform) return data
  if (autoNullOrUndefinedToString) {
    return Object.entries(data).reduce((pre, [k, v]) => {
      pre[k] = isNullOrUndefined(v) ? '' : v
      return pre
    }, {})
  }
  return Object.entries(data)
    .filter(([_, v]) => !isNullOrUndefined(v))
    .reduce((pre, [k, v]) => {
      pre[k] = v
      return pre
    }, {})
}

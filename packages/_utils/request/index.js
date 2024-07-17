import headers from './headers'
import { pm, getData } from './utils'

function getHeaders() {
  return {
    Authorization: localStorage['accessToken'],
    'site3-f-ue': localStorage['site3-f-ue']
  }
}

// Post 请求
function post(
  url,
  {
    data = {},
    requestType = 'json', // 可选 json、form
    headers: _headers = {},
    loading = false,
    autoTransform = true,
    autoNullOrUndefinedToString = false,
    autoNoNullString = false
  } = {}
) {
  const _data = getData(data, {
    autoTransform,
    autoNullOrUndefinedToString,
    autoNoNullString
  })
  return pm(
    uni.$u.http.post(url, _data, {
      ...getHeaders(),
      ...(headers[requestType] || {}),
      ..._headers
    }),
    loading
  )
}

// get请求
function get(
  url,
  {
    params = {},
    headers: _headers = {},
    loading = false,
    autoTransform = true,
    autoNullOrUndefinedToString = false,
    autoNoNullString = false
  } = {}
) {
  const _data = getData(params, {
    autoTransform,
    autoNullOrUndefinedToString,
    autoNoNullString
  })
  return pm(
    uni.$u.http.get(url, _data, {
      ...getHeaders(),
      ...headers['json'],
      ..._headers
    }),
    loading
  )
}

// 封装request请求
// options: {
//    method,       // get、post
//    data,         // {}
//    params        // {}
//    requestType,  // json、form,
//    autoTransform // true // 是否开启自动过滤 null、undefined
//    autoNullOrUndefinedToString // false // 是否自动转换 null、undefined 为 ''
// }

const request = (url, options = {}) => {
  // 示例：const { method = 'get', data, params, requestType } = options
  const method = `${options.method || ''}`.toLowerCase()
  switch (method) {
    case 'get':
      return get(url, options)
    case 'post':
      return post(url, options)
    default:
      return get(url, options)
  }
}

request.post = post
request.get = get

export default request

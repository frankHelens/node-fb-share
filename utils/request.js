const axios = require('axios')

const service = axios.create({
  // 设置超时时间
  timeout: 60000,
  // baseURL: process.env.BASE_URL + '/town'
  baseURL: 'https://test.ebuyhouse.com:8070'
})

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use((config) => {
  config.headers['SIGN'] = 4
  return config
}, (error) => {
  return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use((response) => {
  const responseCode = response.status
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    if (response.data.code === 0) {
      return Promise.resolve(response.data.data)
    } else {
      if (response.data.code === 2) {
        console.log('登录超时')
        return false
      }
      console.log(response.data.msg)
      return Promise.resolve(response.data)
    }
  } else {
    return Promise.reject(response)
  }
}, (error) => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status
  switch (responseCode) {
    // 401：未登录
    case 401:
      // 跳转登录页
      // router.replace({
      //   path: '/login',
      //   query: {
      //     redirect: router.currentRoute.fullPath
      //   }
      // })
      break
    // 403: token过期
    case 403:
      // 弹出错误信息
      console.log('登录信息过期，请重新登录')
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      // setTimeout(() => {
      //   router.replace({
      //     path: '/login',
      //     query: {
      //       redirect: router.currentRoute.fullPath
      //     }
      //   })
      // }, 1000)
      break
    // 404请求不存在
    case 404:
      console.log('404：登录信息过期，请重新登录')
      break
    // 其他错误，直接抛出错误提示
    default:
      console.log(error.response.data.msg)
  }
  return Promise.reject(error)
})

module.exports = service

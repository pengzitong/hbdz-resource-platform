import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import Vue from 'vue'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_API_ENV === 'development' ? process.env.VUE_APP_API_URL : '/',
  timeout: 8000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const authorization = localStorage.getItem('authorization') || ''
  // if (!authorization) {  // 在路由拦截中通过白名单区分是否为admin
  //   router.push('/login')
  // }
  if (config.headers) {
    config.headers['Authorization'] = authorization
  }
  return config
})

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 接口调用成功
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else {
      Vue.prototype.$message.error((response.data && response.data.error) || '系统异常')
      return Promise.reject('error')
    }
  },
  error => {
    const { response } = error
    if (response.status == 401) {
      Vue.prototype.$message.warning('登录状态已过期，请重新登录')
      router.push('/login')
    } else {
      Vue.prototype.$message.error(response.data.error || '系统异常')
    }
    return Promise.reject('error')
  }
)

export default service

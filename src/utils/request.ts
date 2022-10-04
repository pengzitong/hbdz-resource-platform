import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import Vue from 'vue'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_API_ENV === 'development' ? process.env.VUE_APP_API_URL : '/',
  timeout: 8000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const authorization = localStorage.getItem('authorization')
  if (!authorization) {
    router.push('/login')
  } else if (config.headers) {
    config.headers['Authorization'] = authorization
  }
  return config
})

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 接口调用成功
    if (response.status == 200) {
      console.log(response.data, 'response')
      return Promise.resolve(response.data)
    } else {
      console.log(response.data, 'error res')
      Vue.prototype.$message.error((response.data && response.data.error) || '系统异常')
      return Promise.reject('error')
    }
  },
  error => {
    console.log(error.response, 'error response')
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

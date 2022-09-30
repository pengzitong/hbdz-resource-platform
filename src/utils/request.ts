import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import Vue from 'vue'
const service = axios.create({
  baseURL: process.env.VUE_APP_API_ENV === 'development' ? process.env.VUE_APP_API_URL : '/',
  timeout: 8000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    // config.headers['Authorization'] =
    //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImp0aSI6IjgwZjhmOGFlMDUwZjRhYTZhMDEyY2Y3ZTZiZGM1MjVkIn0.jzeeb0jQafVBQq56KOhoW7pGYcmotkR-fmR3yffFuZqbYQ1a0rm7NVwQdUXcF1hNQRSFcsWI2ACkmI3sTDIbbQ'
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
    Vue.prototype.$message.error(error || '系统异常')
    return Promise.reject('error')
  }
)

export default service

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
const service = axios.create({
  baseURL: 'https://api-yy.dev.jk.com/',
  timeout: 8000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers['Authorization'] =
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJhZG1pbiIsImp0aSI6IjgwZjhmOGFlMDUwZjRhYTZhMDEyY2Y3ZTZiZGM1MjVkIn0.jzeeb0jQafVBQq56KOhoW7pGYcmotkR-fmR3yffFuZqbYQ1a0rm7NVwQdUXcF1hNQRSFcsWI2ACkmI3sTDIbbQ'
  }
  return config
})

service.interceptors.response.use((response: AxiosResponse) => {
  // 接口调用成功
  if (response.status == 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject('error')
  }
})

export default service

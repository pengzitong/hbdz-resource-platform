
import { 
  AxiosRequestConfig, 
  CustomSuccessData
 } from 'axios'
import request from './request'

interface IAxiosGet {
  <T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig | null ) : Promise<CustomSuccessData<T>>
}
interface IAxiosPostOrPutOrDelete {
  <T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig ) : Promise<CustomSuccessData<T>>
}
const get:IAxiosGet = (url, params, config) => {
  return request.get(url,{params, ...config})
}
const post:IAxiosPostOrPutOrDelete = (url, data, config) => {
  return request.post(url, data, config)
}
const put:IAxiosPostOrPutOrDelete = (url, data, config) => {
  return request.put(url, data, config)
}
const deleteRequest:IAxiosPostOrPutOrDelete = (url, data, config) => {
  return request.delete(url,{data, ...config})
}
export default {
  get,
  post,
  put,
  "delete":deleteRequest
}
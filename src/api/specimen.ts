import request from '@/utils/index'
import qs from 'qs'

export const querySpecimenList = (params: any) => {
  return request.get(`/public_api/specimen/search?${qs.stringify(params)}`)
}

export const querySpecimenDetail = (specimen_number: string) => {
  return request.get(`/public_api/specimen/${specimen_number}`)
}

export const querySpecimenClassification = () => {
  return request.get(`/public_api/resource_classification`)
}

export const querySpecimenImageList = (params: any) => {
  return request.get(`/public_api/specimen/image/search?${qs.stringify(params)}`)
}

export const querySelectLists = () => {
  return request.get(`/public_api/specimen/search/config`)
}

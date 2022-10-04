import request from '@/utils/index'
import qs from 'qs'

export const login = (data: { account_name: string; password: string }) => {
  return request.post('/public_api/admin/login', data)
}

export const logout = () => {
  return request.get('/admin_api/admin/sign_out')
}

export const udSpecimen = (data: any) => {
  return request.post('/admin_api/specimen/update', data)
}

export const exportExcel = (data: any) => {
  return request.get(`/admin_api/specimen/export/excel?${qs.stringify(data)}`)
}

export const importExcel = (data: any) => {
  return request.put(`/admin_api/specimen/import/excel`, data)
}

export const importExcelPost = (data: any) => {
  return request.post(`/admin_api/specimen/import/excel`, data)
}

export const importImagesPost = (data: any) => {
  return request.post(`/admin_api/specimen/import/images`, data)
}

export const deleteSpecimen = (specimen_number: string | number) => {
  return request.post(`/admin_api/specimen/${specimen_number}/delete`)
}

export const importImage = (data: any) => {
  return request.post(`/admin_api/best_photo_gallery/image/upload`, data)
}

export const uploadGalleryImage = (data: any, best_photo_gallery_id: string | number = '') => {
  const path = best_photo_gallery_id ? `/${best_photo_gallery_id}` : ''
  return request.post(`/admin_api/best_photo_gallery${path}`, data)
}

export const deleteGalleryImage = (best_photo_gallery_id: string | number) => {
  return request.post(`/admin_api/best_photo_gallery/${best_photo_gallery_id}/delete`)
}

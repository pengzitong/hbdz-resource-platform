import request from '@/utils/index'
import qs from 'qs'

export const queryPhotoGallerySummary = (gallery_id: string) => {
  return request.get(`/public_api/best_photo_gallery/${gallery_id}/summary`)
}

export const queryPhotoGalleryList = ({ gallery_id, ...rest }: any) => {
  return request.get(`/public_api/best_photo_gallery/${gallery_id}/detail?${qs.stringify(rest)}`)
}

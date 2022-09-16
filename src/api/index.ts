import request from '@/utils/index'
// import qs from 'qs'
// import { AxiosPromise } from 'axios'

// interface pageInfo {
//   page: number,
//   size: number
// }

// export function getListData(url:string, params:pageInfo):AxiosPromise {
//   return request({
//     url: url + '?' + qs.stringify(params, { indices: false }),
//     method: 'get'
//   })
// }

import { IList } from '@/models'

export const getUser = (form: IList) => request.get<IList>('/person/info', form)
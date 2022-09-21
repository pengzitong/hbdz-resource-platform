import request from '@/utils/index'
import { IResponseBody } from 'axios'

import { IArticle, IList } from '@/models'

export const getUser = (form: IList) => {
  // console.log(request.get<IList>('/person/info', form))
}

export const getArticleDetail: () => Promise<IResponseBody<IArticle>> = () => {
  return request.get('https://api.test2.jk.com/community/share/article/detail?id=2784')
}

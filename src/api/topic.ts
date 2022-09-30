import request from '@/utils/index'

export const queryTopicLists = ({ topic_id, page, num }: any) => {
  return request.get(`/public_api/important_topics/${topic_id}?page=${page}&num=${num}`)
}

export const queryTopicArticles = (articles_id: string) => {
  return request.get(`/public_api/articles/${articles_id}`)
}

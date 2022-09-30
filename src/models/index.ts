export interface IList {
  username: string
  age: number
  job?: string
}

export interface IArticle {
  id: number
  articleTitle: string
  articleContent: string
  articleAbstract: string
  [keys: string]: any
}

/** 重要专题 */
export interface ITopic {
  url: string
  name: string
  topic_id: number
}

/** 精品图片库图片 */
export interface IPhoto {
  banners: []
  gallery_id: number
  name: string
  url: string
}

/** 重要专题的list项 */
export interface ITopicArticle {
  articles_id: number
  cover_url: string
  name: string
  special_id: number
}

/** 重要专题的article详情 */
export interface ITopicArticleDetail {
  articles_id: number
  category: string
  content: string
  title: string
}

/** 标本list item */
export interface ISpecimen {
  collation_name: string
  complete_origin: string
  foreign_language_name: string
  platform_resource_number: number
  resource_name: string
  resource_number: number
  specimen_id: number
  specimen_number: string
  stock_location: string
}

/** 标本图片 */
export interface ISpecimenImage {
  specimen_number: string
  resource_name: string
  foreign_language_name: string
  url: string
}

/** 矿物精品 */
export interface IMineralProduct {
  best_photo_gallery_id: number
  foreign_language_name: string
  image_name: string
  image_url: string
  resource_name: string
  specimen_number: string
}

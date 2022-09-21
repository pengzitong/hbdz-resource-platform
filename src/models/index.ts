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

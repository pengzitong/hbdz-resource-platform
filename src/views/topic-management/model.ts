export interface topicModel {
  /**
   * 文章封面，为绝对路径文件名
   */
  cover_url?: string | undefined
  data: topicContent[]
  /**
   * 文章标题
   */
  title?: string
  /**
   * 专题类别ID
   */
  topic_id?: number

  fileList: file[]
}

export interface topicContent {
  /**
   * 图片描述，仅当`type`为`IMAGE`时此字段有意义
   */
  describe?: string
  /**
   * 图片名，仅当`type`为`IMAGE`时此字段有意义
   */
  name?: string
  /**
   * 文章类型
   */
  type: topicType
  /**
   * 文本数据，仅当`type`为`TEXT`时此字段有意义
   */
  value?: string

  fileList?: file[]
}

/**
 * 文章类型
 */
export enum topicType {
  // eslint-disable-next-line no-unused-vars
  IMAGE = 'IMAGE',
  // eslint-disable-next-line no-unused-vars
  TEXT = 'TEXT'
}

interface file {
  name?: string
  url: string
}

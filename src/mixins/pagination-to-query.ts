import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class PaginationToQuery extends Mixins() {
  // 属性如果写private，组件中可能无法识别
  loading = false
  pageInfo = {
    page: 1,
    num: 5,
    all_page: 0
  }

  private handleCurrentChange(page: number) {
    this.pageInfo.page = page
    ;(this as any).query()
  }
  private handleSizeChange(num: number) {
    this.pageInfo.page = 1
    this.pageInfo.num = num
    ;(this as any).query()
  }
}

import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class LoadMore extends Mixins() {
  private clientHeight: number = 0 // 可视区的高度
  private scrollTop: number = 0 // 滚动条滚动时，距离顶部的距离
  private scrollHeight: number = 0 // 滚动条的总高度

  private mounted() {
    // 监听函数
    window.addEventListener('scroll', this.listenerFunction)
  }

  private destroyed() {
    // 销毁监听函数
    window.removeEventListener('scroll', this.listenerFunction)
  }

  private listenerFunction() {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    // windows在控制台打开的情况下会导致失效，需要+1px解决
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
      ;(this as any).page++
      ;(this as any).queryList(true)
    }
  }
}

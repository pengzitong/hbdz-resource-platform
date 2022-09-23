<template>
  <div class="mineral-products">
    <static-slider class="mb-40" />
    <el-form class="search-form" :inline="true" align="center">
      <el-form-item>
        <el-input class="search-input" v-model="search" size="medium" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">查询</el-button>
      </el-form-item>
      <br />
      <el-form-item class="search-radio-wrapper">
        <div class="search-radio">
          <div class="search-radio-item border-primary active">全部（123434）</div>
          <div class="search-radio-item border-primary">自然元素（123）</div>
          <div class="search-radio-item border-primary">其他元素（123）</div>
        </div>
      </el-form-item>
    </el-form>
    <div class="mineral-products-wrapper mb-30" v-loading="listLoading">
      <image-show v-for="item in pageData" :key="item.code" class="mb-12" />
      <div style="width: 250px; height: 0" v-for="item in pageData" :key="item.code + 100"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import StaticSlider from '@/components/static-slider.vue'
import ImageShow from '@/components/image-show.vue'
import LoadMore from '@/mixins/load-more'
@Component({
  components: { ImageShow, StaticSlider }
})
export default class MineralProducts extends Mixins<any>(LoadMore) {
  private search: string = ''

  private page: number = 0

  private size: number = 20

  private pageData: any[] = [{ code: 1 }, { code: 2 }, { code: 3 }, { code: 4 }, { code: 5 }, { code: 6 }]

  private finished: boolean = false

  private listLoading: boolean = false

  private requestId: number = 0

  private currentTabId: number = 0

  private async queryList(flag: boolean) {
    if (this.finished) {
      return
    }
    const params = {
      page: this.page,
      size: this.size,
      tabId: this.currentTabId
    }
    this.listLoading = true
    const id = ++this.requestId
    const res: any = await this.fetchData(params)
    console.log(res, 'res')
    if (id !== this.requestId) return
    if (flag) {
      // 下一页
      this.pageData = [...this.pageData, ...((res.data && res.data.pageData) || [])]
    } else {
      // 初次加载
      this.pageData = (res.data && res.data.pageData) || []
    }
    this.finished = this.pageData.length >= res.data.pageInfo.totalNumber
    this.listLoading = false
  }

  private fetchData(params: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(111)
        resolve({
          data: {
            pageData: [{ code: this.pageData.length + 2 }],
            pageInfo: { totalNumber: 30 }
          }
        })
      }, 2000)
    })
  }
}
</script>

<style lang="scss" scoped>
.mineral-products {
  .search-form {
    .search-input {
      width: 450px;
    }
    .search-radio-wrapper {
      width: 100%;
      ::v-deep .el-form-item__content {
        width: 100%;
      }
      .search-radio {
        width: 100%;
        display: flex;
        &-item {
          flex: 1;
          color: #333;
          &.active {
            background-color: var(--primary-color);
            color: #ffffff;
          }
        }
      }
    }
  }
  .mineral-products-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
